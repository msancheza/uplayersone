/**
 * Vercel serverless function — POST /api/send-booking
 *
 * The browser posts the booking form here; this function validates it and
 * forwards a notification through Resend. The API key stays on the server:
 * UPRESEND_API and EMAIL_NOTIFS are read from the Vercel environment, so
 * they are never part of the client bundle.
 */

import { handleBookingSubmission } from '../server/booking-email.js'

const FRIENDLY_SERVER_ERROR =
  'Something went wrong on our side. Please try again in a moment, or call us and we will set up your event personally.'

const getIp = (req) => {
  const forwarded = req.headers?.['x-forwarded-for']
  if (typeof forwarded === 'string' && forwarded.length) {
    return forwarded.split(',')[0].trim()
  }
  return req.headers?.['x-real-ip'] || req.socket?.remoteAddress || ''
}

const parseBody = (req) => {
  const raw = req.body
  if (!raw) return {}
  if (typeof raw === 'object') return raw
  if (typeof raw === 'string') {
    try {
      return JSON.parse(raw)
    } catch {
      return {}
    }
  }
  return {}
}

export default async function handler(req, res) {
  // GET returns the public Turnstile site key so the browser can render
  // the widget without the secret ever leaving the server.
  if (req.method === 'GET') {
    return res.status(200).json({
      ok: true,
      siteKey: process.env.TURNSTILE_SITE_KEY || ''
    })
  }

  if (req.method !== 'POST') {
    res.setHeader('Allow', 'GET, POST')
    return res.status(405).json({
      ok: false,
      code: 'method_not_allowed',
      message: 'This endpoint only accepts form submissions.'
    })
  }

  try {
    const result = await handleBookingSubmission({
      body: parseBody(req),
      env: process.env,
      ip: getIp(req)
    })

    return res.status(result.status).json(result.body)
  } catch (error) {
    // The cause stays on the server log; the visitor gets a friendly line.
    console.error('[booking] unexpected error', error)
    return res.status(500).json({
      ok: false,
      code: 'server_error',
      message: FRIENDLY_SERVER_ERROR
    })
  }
}
