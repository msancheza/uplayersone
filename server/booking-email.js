/**
 * Booking request → Resend notification email.
 *
 * Dependency-free ESM on purpose: this exact module is imported by the
 * Vercel serverless function (api/send-booking.js) and by the Vite dev
 * middleware (vite.config.js), so there is a single implementation of the
 * validation rules, the email template and the Resend call.
 *
 * The API key never reaches the browser — it is read from the server
 * environment (UPRESEND_API) and the destination from EMAIL_NOTIFS.
 */

const RESEND_ENDPOINT = 'https://api.resend.com/emails'
const TURNSTILE_VERIFY_URL = 'https://challenges.cloudflare.com/turnstile/v0/siteverify'

/**
 * Resend's onboarding sender. It works on a fresh account (it only
 * delivers to the account owner) and acts as the safety net when the
 * custom domain has not been verified in Resend yet.
 */
const RESEND_ONBOARDING_FROM = 'onboarding@resend.dev'

export const DEFAULT_FROM = 'Ultimate Players <bookings@ultimateplayersone.com>'

const MAX_NOTES_LENGTH = 1500
const MAX_NAME_LENGTH = 80
const MAX_PHONE_LENGTH = 25
const MAX_ZIP_LENGTH = 10
const REQUEST_TIMEOUT_MS = 12000

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[a-z]{2,}$/i
const ZIP_PATTERN = /^\d{5}(-\d{4})?$/
const ISO_DATE_PATTERN = /^\d{4}-\d{2}-\d{2}$/

/** Unambiguous alphabet (no O/0, no I/1) so a reference can be read aloud. */
const REFERENCE_ALPHABET = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789'

/** Friendly message shown to the visitor whenever delivery fails. */
const FRIENDLY_DELIVERY_ERROR =
  'We could not send your request just now. Please try again in a moment, or call us and we will set up your event personally.'

/**
 * Per-IP throttle. Best effort — serverless instances are ephemeral — but
 * it stops a bored bot from burning the Resend quota in a single burst.
 */
const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000
const RATE_LIMIT_MAX = 10
const rateLimitHits = new Map()

const escapeHtml = (value) =>
  String(value ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')

const todayIso = () => {
  const now = new Date()
  return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')}`
}

export function createReference() {
  let out = ''
  for (let i = 0; i < 6; i += 1) {
    out += REFERENCE_ALPHABET[Math.floor(Math.random() * REFERENCE_ALPHABET.length)]
  }
  return `UP-${out}`
}

/**
 * Normalizes and validates the payload coming from the browser.
 * The same rules run on the client (instant feedback) and here (the
 * client cannot be trusted).
 *
 * @returns {{ valid: boolean, errors: Record<string, string>, payload: object }}
 */
export function validateBookingPayload(input = {}) {
  const errors = {}
  const source = input && typeof input === 'object' ? input : {}

  const name = String(source.name ?? '').trim().slice(0, MAX_NAME_LENGTH)
  const email = String(source.email ?? '').trim().slice(0, 120)
  const phone = String(source.phone ?? '').trim().slice(0, MAX_PHONE_LENGTH)
  const eventDate = String(source.eventDate ?? '').trim()
  const zipCode = String(source.zipCode ?? '').trim().slice(0, MAX_ZIP_LENGTH)
  const notes = String(source.notes ?? '').trim().slice(0, MAX_NOTES_LENGTH)
  const timeFrame = String(source.timeFrame ?? '').trim().slice(0, 80)
  const truckType = String(source.truckType ?? '').trim().slice(0, 120)
  const eventType = String(source.eventType ?? '').trim().slice(0, 120)
  const addOculus = Boolean(source.addOculus)

  if (!name) {
    errors.name = 'Please tell us your name.'
  } else if (name.length < 2) {
    errors.name = 'Please enter your full name.'
  }

  if (!email) {
    errors.email = 'We need your email to send the quote.'
  } else if (!EMAIL_PATTERN.test(email)) {
    errors.email = 'That email address does not look right — please check it.'
  }

  const phoneDigits = phone.replace(/\D/g, '')
  if (!phone) {
    errors.phone = 'We need a phone number to confirm your date.'
  } else if (phoneDigits.length > 11) {
    errors.phone = 'That number is too long — 10 digits is enough.'
  } else if (phoneDigits.length < 10) {
    errors.phone = 'Please enter a 10-digit number, including the area code.'
  } else if (phoneDigits.length === 11 && !phoneDigits.startsWith('1')) {
    errors.phone = 'Please check the country code — 10 digits is enough.'
  }

  if (!eventDate) {
    errors.eventDate = 'Please pick the date of your event.'
  } else if (!ISO_DATE_PATTERN.test(eventDate)) {
    errors.eventDate = 'That date does not look right — please pick it again.'
  } else if (eventDate < todayIso()) {
    errors.eventDate = 'Please choose today or a future date.'
  }

  if (!zipCode) {
    errors.zipCode = 'We need the ZIP code to check availability.'
  } else if (!ZIP_PATTERN.test(zipCode)) {
    errors.zipCode = 'Please enter a 5-digit ZIP code.'
  }

  if (notes.length > MAX_NOTES_LENGTH) {
    errors.notes = 'Please keep the notes under 1500 characters.'
  }

  return {
    valid: Object.keys(errors).length === 0,
    errors,
    payload: {
      name,
      email,
      phone,
      eventDate,
      zipCode,
      notes,
      timeFrame,
      truckType,
      eventType,
      addOculus
    }
  }
}

const formatEventDate = (isoDate) => {
  if (!ISO_DATE_PATTERN.test(isoDate)) return isoDate
  const [year, month, day] = isoDate.split('-').map(Number)
  const date = new Date(year, month - 1, day)
  return date.toLocaleDateString('en-US', {
    weekday: 'short',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
}

/**
 * Builds the subject, the branded HTML body and the plain-text fallback.
 * Every user-supplied value is escaped before it reaches the HTML.
 */
export function buildBookingEmail(payload, { reference } = {}) {
  const eventDateLabel = formatEventDate(payload.eventDate)
  const subject = `New booking request — ${payload.name} — ${eventDateLabel}`

  const rows = [
    ['Host name', payload.name],
    ['Event date', eventDateLabel],
    ['Time frame', payload.timeFrame],
    ['Event ZIP code', payload.zipCode],
    ['Vehicle', payload.truckType],
    ['Event type', payload.eventType],
    ['VR add-on', payload.addOculus ? 'Yes — Oculus Quest 2 VR Experience' : 'No'],
    ['Phone', payload.phone],
    ['Email', payload.email],
    ['Notes', payload.notes || '—']
  ]

  const htmlRows = rows
    .map(
      ([label, value]) => `
            <tr>
              <td style="padding:10px 16px;border-bottom:1px solid #1e1e28;color:#8b8b9c;font-family:Arial,Helvetica,sans-serif;font-size:12px;letter-spacing:0.08em;text-transform:uppercase;white-space:nowrap;vertical-align:top;">${escapeHtml(label)}</td>
              <td style="padding:10px 16px;border-bottom:1px solid #1e1e28;color:#ffffff;font-family:Arial,Helvetica,sans-serif;font-size:14px;vertical-align:top;">${escapeHtml(value)}</td>
            </tr>`
    )
    .join('')

  const html = `<!doctype html>
<html>
  <body style="margin:0;padding:0;background:#0a0a0f;">
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#0a0a0f;padding:28px 12px;">
      <tr>
        <td align="center">
          <table role="presentation" width="600" cellpadding="0" cellspacing="0" style="width:100%;max-width:600px;background:#101019;border:1px solid #ff002b;border-radius:8px;overflow:hidden;">
            <tr>
              <td style="padding:22px 28px;background:#000000;border-bottom:2px solid #ff002b;">
                <p style="margin:0 0 6px;font-family:Arial,Helvetica,sans-serif;font-size:11px;letter-spacing:0.24em;text-transform:uppercase;color:#ff002b;">Event Request Received</p>
                <h1 style="margin:0;font-family:Arial,Helvetica,sans-serif;font-size:22px;font-weight:bold;color:#ffffff;">Ultimate Players</h1>
                <p style="margin:8px 0 0;font-family:Arial,Helvetica,sans-serif;font-size:13px;color:#b9b9c9;line-height:1.5;">A new booking request just came in from the website. Reply directly to this email to reach the customer.</p>
              </td>
            </tr>
            <tr>
              <td style="padding:6px 28px 22px;">
                <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border-collapse:collapse;">
                  ${htmlRows}
                </table>
              </td>
            </tr>
            <tr>
              <td style="padding:18px 28px;background:#000000;border-top:1px solid #1e1e28;">
                <p style="margin:0;font-family:Arial,Helvetica,sans-serif;font-size:11px;letter-spacing:0.16em;text-transform:uppercase;color:#8b8b9c;">Reference</p>
                <p style="margin:6px 0 0;font-family:'Courier New',Courier,monospace;font-size:18px;letter-spacing:0.12em;color:#ff002b;">${escapeHtml(reference || '—')}</p>
              </td>
            </tr>
          </table>
          <p style="margin:16px 0 0;font-family:Arial,Helvetica,sans-serif;font-size:11px;color:#6b6b7b;text-align:center;">Ultimate Players · Mobile Gaming Truck &amp; Esports Services · Los Angeles, CA</p>
        </td>
      </tr>
    </table>
  </body>
</html>`

  const text = [
    'NEW BOOKING REQUEST — ULTIMATE PLAYERS',
    '',
    `Reference: ${reference || '—'}`,
    '',
    ...rows.map(([label, value]) => `${label}: ${value}`),
    '',
    'Reply directly to this email to reach the customer.'
  ].join('\n')

  return { subject, html, text }
}

export function parseRecipients(value) {
  return String(value ?? '')
    .split(/[,;\s]+/)
    .map((entry) => entry.trim())
    .filter((entry) => EMAIL_PATTERN.test(entry))
}

async function postToResend(body, apiKey) {
  const controller = new AbortController()
  const timer = setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS)

  try {
    const response = await fetch(RESEND_ENDPOINT, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(body),
      signal: controller.signal
    })

    let payload = null
    try {
      payload = await response.json()
    } catch {
      payload = null
    }

    return { ok: response.ok, status: response.status, payload }
  } finally {
    clearTimeout(timer)
  }
}

/** True when Resend rejected the sender rather than the payload. */
const isSenderRejected = (result) =>
  result.status === 403 ||
  (result.status === 422 &&
    /domain|sender|from/i.test(JSON.stringify(result.payload ?? {})))

/**
 * Resend names the only address that accepts a test send when the domain
 * is not verified yet: "…your own email address (someone@x.com)".
 * Used as the last-resort destination so a booking is never lost while
 * the domain verification is pending.
 */
const extractOwnerEmail = (payload) => {
  const message = JSON.stringify(payload ?? '')
  const match = message.match(
    /only send testing emails to your own email address \(([^)\s]+@[^)\s]+)\)/i
  )
  return match ? match[1] : null
}

/**
 * Sends the notification through Resend.
 * If the custom domain is not verified yet, it retries once with the
 * onboarding sender so the request is never silently lost.
 *
 * @returns {{ ok: boolean, id?: string, status?: number, code?: string, detail?: string }}
 */
export async function sendBookingEmail({ payload, apiKey, to, from, reference }) {
  if (!apiKey) {
    return { ok: false, status: 500, code: 'missing_api_key', detail: 'UPRESEND_API is not set' }
  }

  const recipients = parseRecipients(to)
  if (!recipients.length) {
    return { ok: false, status: 500, code: 'missing_recipient', detail: 'EMAIL_NOTIFS is not set or invalid' }
  }

  const { subject, html, text } = buildBookingEmail(payload, { reference })
  const body = {
    from: from || DEFAULT_FROM,
    to: recipients,
    reply_to: payload.email,
    subject,
    html,
    text
  }

  let result = await postToResend(body, apiKey)

  // 1) The custom domain is not verified in Resend yet → the onboarding
  //    sender accepts the message (it only delivers to the account owner).
  if (!result.ok && isSenderRejected(result) && body.from !== RESEND_ONBOARDING_FROM) {
    console.warn('[booking] sender rejected, retrying with the Resend onboarding address', result.payload)
    body.from = RESEND_ONBOARDING_FROM
    result = await postToResend(body, apiKey)
  }

  // 2) The onboarding sender only reaches the account owner. When the
  //    configured inbox is a different one, deliver there so the booking
  //    request is never silently lost while the domain is being verified.
  if (!result.ok) {
    const ownerEmail = extractOwnerEmail(result.payload)
    if (ownerEmail && !recipients.includes(ownerEmail)) {
      console.warn(
        `[booking] domain not verified in Resend — redirecting the notification to the account owner (${ownerEmail})`
      )
      body.to = [ownerEmail]
      result = await postToResend(body, apiKey)
    }
  }

  if (!result.ok) {
    return {
      ok: false,
      status: result.status || 502,
      code: 'resend_error',
      detail: JSON.stringify(result.payload ?? {})
    }
  }

  return { ok: true, id: result.payload?.id, status: result.status }
}

/**
 * Verifies a Cloudflare Turnstile token.
 *
 * The secret key never leaves the server: the browser only receives the
 * public site key and a single-use token it has to send back with the
 * form submission.
 */
export async function verifyTurnstile({ token, secret, ip }) {
  if (!secret) return { ok: true, skipped: true }
  if (!token) return { ok: false, codes: ['missing-input-response'] }

  const payload = new URLSearchParams({ secret, response: token })
  if (ip) payload.set('remoteip', ip)

  try {
    const response = await fetch(TURNSTILE_VERIFY_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: payload.toString(),
      signal: AbortSignal.timeout(REQUEST_TIMEOUT_MS)
    })

    const data = await response.json().catch(() => null)
    return {
      ok: Boolean(data?.success),
      codes: data?.['error-codes'] ?? []
    }
  } catch (error) {
    console.error('[booking] turnstile verification failed', error)
    return { ok: false, codes: ['verification-unreachable'] }
  }
}

export function checkRateLimit(ip) {
  if (!ip) return { allowed: true }
  const now = Date.now()

  for (const [key, hits] of rateLimitHits) {
    const recent = hits.filter((time) => now - time < RATE_LIMIT_WINDOW_MS)
    if (recent.length) rateLimitHits.set(key, recent)
    else rateLimitHits.delete(key)
  }

  const hits = rateLimitHits.get(ip) ?? []
  if (hits.length >= RATE_LIMIT_MAX) {
    return { allowed: false, retryInMinutes: Math.ceil(RATE_LIMIT_WINDOW_MS / 60000) }
  }

  hits.push(now)
  rateLimitHits.set(ip, hits)
  return { allowed: true }
}

/**
 * Shared request handler used by the Vercel function and the dev middleware.
 * Never leaks a technical reason to the browser — the visitor only ever
 * sees `message`, while the real cause is logged on the server.
 */
export async function handleBookingSubmission({ body = {}, env = {}, ip = '' } = {}) {
  // Honeypot: a hidden field only a bot would fill in. Answer as if it
  // worked so the bot does not learn to change tactics, but send nothing.
  const honeypot = String(body?.website ?? '').trim()
  if (honeypot) {
    return {
      status: 200,
      body: { ok: true, reference: createReference(), message: 'Request received.' }
    }
  }

  const throttle = checkRateLimit(ip)
  if (!throttle.allowed) {
    return {
      status: 429,
      body: {
        ok: false,
        code: 'rate_limited',
        message: `We are getting a lot of requests right now. Please try again in a few minutes, or call us and we will book your event directly.`
      }
    }
  }

  const { valid, errors, payload } = validateBookingPayload(body)
  if (!valid) {
    return {
      status: 422,
      body: {
        ok: false,
        code: 'validation_failed',
        message: 'Please check the highlighted fields and try again.',
        errors
      }
    }
  }

  // Turnstile is enforced only when BOTH keys are configured, so a
  // missing env var can never leave the form unusable. The field
  // validation runs first on purpose: a visitor who mistyped an email
  // must not lose the Turnstile token while fixing it.
  const turnstileSecret = env.TURNSTILE_SECRET_KEY
  const turnstileSiteKey = env.TURNSTILE_SITE_KEY
  if (turnstileSecret && turnstileSiteKey) {
    const verification = await verifyTurnstile({
      token: body?.turnstileToken,
      secret: turnstileSecret,
      ip
    })

    if (!verification.ok) {
      console.warn('[booking] turnstile rejected the submission', verification.codes)
      return {
        status: 403,
        body: {
          ok: false,
          code: 'turnstile_failed',
          message:
            'We could not verify that you are human. Please refresh the page and try again, or call us and we will set up your event personally.'
        }
      }
    }
  }

  const reference = createReference()
  const result = await sendBookingEmail({
    payload,
    apiKey: env.UPRESEND_API,
    to: env.EMAIL_NOTIFS,
    from: env.UPRESEND_FROM || DEFAULT_FROM,
    reference
  })

  if (!result.ok) {
    console.error('[booking] delivery failed', { code: result.code, status: result.status, detail: result.detail })
    return {
      status: 502,
      body: {
        ok: false,
        code: 'delivery_failed',
        message: FRIENDLY_DELIVERY_ERROR,
        reference
      }
    }
  }

  return {
    status: 200,
    body: {
      ok: true,
      reference,
      message: 'Request received.'
    }
  }
}
