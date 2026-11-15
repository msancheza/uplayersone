import { reactive, ref, computed } from 'vue'
import siteConfig from '../config/siteConfig.js'

/**
 * Booking request client logic.
 *
 * Owns the field validation, the submit state machine (idle → sending →
 * success | error) and the friendly copy shown to the visitor. Both booking
 * forms (home section + /contact page) use this composable, so the two
 * screens behave identically.
 *
 * The API key never lives here — the browser only talks to
 * POST /api/send-booking, which is the Vercel function that talks to Resend.
 */

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[a-z]{2,}$/i
const ZIP_PATTERN = /^\d{5}(-\d{4})?$/
const ISO_DATE_PATTERN = /^\d{4}-\d{2}-\d{2}$/
const MAX_NOTES_LENGTH = 1500

/** Shown when the request could not be delivered — no technical detail. */
const FRIENDLY_FALLBACK = `We could not send your request right now. Please check your connection and try again, or call us at ${siteConfig.phone} and we will set up your event personally.`

const todayIso = () => {
  const now = new Date()
  return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')}`
}

/**
 * Formats a US phone number as the visitor types: (626) 503-1189.
 * A leading country code (+1 / 1…) is accepted and dropped.
 */
export const formatPhone = (value) => {
  const digits = String(value ?? '').replace(/\D/g, '').slice(0, 11)
  if (!digits) return ''

  const local = digits.length === 11 && digits.startsWith('1') ? digits.slice(1) : digits
  const area = local.slice(0, 3)
  const middle = local.slice(3, 6)
  const end = local.slice(6, 10)

  if (local.length <= 3) return `(${area}`
  if (local.length <= 6) return `(${area}) ${middle}`
  return `(${area}) ${middle}-${end}`
}

const validators = {
  name(value) {
    const trimmed = value.trim()
    if (!trimmed) return 'Please tell us your name.'
    if (trimmed.length < 2) return 'Please enter your full name.'
    return ''
  },
  email(value) {
    const trimmed = value.trim()
    if (!trimmed) return 'We need your email to send the quote.'
    if (!EMAIL_PATTERN.test(trimmed)) return 'That email address does not look right — please check it.'
    return ''
  },
  phone(value) {
    const trimmed = value.trim()
    if (!trimmed) return 'We need a phone number to confirm your date.'
    const digits = trimmed.replace(/\D/g, '')
    if (digits.length > 11) return 'That number is too long — 10 digits is enough.'
    if (digits.length < 10) return 'Please enter a 10-digit number, including the area code.'
    if (digits.length === 11 && !digits.startsWith('1')) {
      return 'Please check the country code — 10 digits is enough.'
    }
    return ''
  },
  eventDate(value) {
    if (!value) return 'Please pick the date of your event.'
    if (!ISO_DATE_PATTERN.test(value)) return 'That date does not look right — please pick it again.'
    if (value < todayIso()) return 'Please choose today or a future date.'
    return ''
  },
  zipCode(value) {
    const trimmed = value.trim()
    if (!trimmed) return 'We need the ZIP code to check availability.'
    if (!ZIP_PATTERN.test(trimmed)) return 'Please enter a 5-digit ZIP code.'
    return ''
  },
  notes(value) {
    if (value.length > MAX_NOTES_LENGTH) return 'Please keep the notes under 1500 characters.'
    return ''
  }
}

const FIELD_ORDER = ['eventDate', 'timeFrame', 'zipCode', 'truckType', 'eventType', 'name', 'email', 'phone', 'notes']

export function useBookingRequest({
  endpoint = '/api/send-booking',
  defaults = {},
  /** Called when Turnstile rejects a submission so the widget can reset. */
  onTurnstileInvalid
} = {}) {
  const form = reactive({
    eventDate: '',
    timeFrame: 'Afternoon (1:00 PM – 5:00 PM)',
    zipCode: '',
    truckType: 'Deluxe Gaming Truck (6 TVs Inside · Most Popular)',
    eventType: 'Birthday Party',
    addOculus: false,
    name: '',
    email: '',
    phone: '',
    notes: '',
    // Honeypot — hidden from people, irresistible to bots.
    website: '',
    ...defaults
  })

  const errors = reactive({})
  const touched = reactive({})
  const status = ref('idle')
  const errorMessage = ref('')
  const reference = ref('')
  /** 'validation' → the visitor must fix a field. 'delivery' → the request could not be sent. 'turnstile' → the human check failed. */
  const errorKind = ref('')
  /** Cloudflare Turnstile token — single use, sent with the submission. */
  const turnstileToken = ref('')

  const isSending = computed(() => status.value === 'sending')
  const isSuccess = computed(() => status.value === 'success')
  const isError = computed(() => status.value === 'error')
  const isSubmitted = computed(() => status.value === 'success')

  const errorFor = (field) => (touched[field] && errors[field] ? errors[field] : '')

  const validateField = (field) => {
    const validator = validators[field]
    if (!validator) return true
    const message = validator(String(form[field] ?? ''))
    if (message) errors[field] = message
    else delete errors[field]
    return !message
  }

  const handleBlur = (field) => {
    touched[field] = true
    validateField(field)
  }

  /**
   * Formats the phone number while it is being typed. The field is bound
   * with :value + @input instead of v-model so the caret can follow the
   * digits the visitor already typed instead of jumping to the end.
   */
  const handlePhoneInput = (event) => {
    const el = event.target
    const caretBefore = el.selectionStart ?? el.value.length
    const digitsBefore = el.value.slice(0, caretBefore).replace(/\D/g, '').length

    const formatted = formatPhone(el.value)
    el.value = formatted

    if (formatted) {
      let seen = 0
      let caret = formatted.length
      for (let i = 0; i < formatted.length; i += 1) {
        if (/\d/.test(formatted[i])) {
          seen += 1
          if (seen === digitsBefore) {
            caret = i + 1
            break
          }
        }
      }
      try {
        el.setSelectionRange(caret, caret)
      } catch {
        /* selection is not supported on every input type */
      }
    }

    form.phone = formatted
    if (touched.phone) validateField('phone')
  }

  const validateAll = () => {
    let firstInvalid = null
    FIELD_ORDER.forEach((field) => {
      touched[field] = true
      const valid = validateField(field)
      if (!valid && !firstInvalid) firstInvalid = field
    })
    return { valid: !firstInvalid, firstInvalid }
  }

  const focusField = (field) => {
    if (!field || typeof document === 'undefined') return
    const el = document.querySelector(`[data-field="${field}"]`)
    if (!el) return
    el.scrollIntoView({ behavior: 'smooth', block: 'center' })
    if (typeof el.focus === 'function') el.focus({ preventScroll: true })
  }

  const setTurnstileToken = (token) => {
    turnstileToken.value = token || ''
  }

  const submit = async () => {
    const { valid, firstInvalid } = validateAll()

    if (!valid) {
      errorMessage.value = 'Almost there — a couple of fields still need your attention.'
      errorKind.value = 'validation'
      status.value = 'error'
      focusField(firstInvalid)
      return false
    }

    status.value = 'sending'
    errorMessage.value = ''
    errorKind.value = ''

    try {
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, turnstileToken: turnstileToken.value })
      })

      let data = null
      try {
        data = await response.json()
      } catch {
        data = null
      }

      if (!response.ok || !data?.ok) {
        if (data?.errors && typeof data.errors === 'object') {
          Object.entries(data.errors).forEach(([field, message]) => {
            errors[field] = message
            touched[field] = true
          })
        }
        errorMessage.value = data?.message || FRIENDLY_FALLBACK
        errorKind.value =
          data?.code === 'validation_failed'
            ? 'validation'
            : data?.code === 'turnstile_failed'
              ? 'turnstile'
              : 'delivery'
        status.value = 'error'
        if (data?.code === 'turnstile_failed') onTurnstileInvalid?.()
        return false
      }

      reference.value = data?.reference || ''
      status.value = 'success'
      return true
    } catch {
      errorMessage.value = FRIENDLY_FALLBACK
      errorKind.value = 'delivery'
      status.value = 'error'
      return false
    }
  }

  const reset = () => {
    Object.keys(errors).forEach((key) => delete errors[key])
    Object.keys(touched).forEach((key) => delete touched[key])
    errorMessage.value = ''
    errorKind.value = ''
    reference.value = ''
    turnstileToken.value = ''
    status.value = 'idle'
    Object.assign(form, {
      eventDate: '',
      zipCode: '',
      addOculus: false,
      name: '',
      email: '',
      phone: '',
      notes: '',
      website: '',
      ...defaults
    })
  }

  /** Dismiss the error banner without clearing the form. */
  const dismissError = () => {
    if (status.value === 'error') {
      errorMessage.value = ''
      errorKind.value = ''
      status.value = 'idle'
    }
  }

  return {
    form,
    errors,
    touched,
    status,
    errorMessage,
    errorKind,
    reference,
    turnstileToken,
    setTurnstileToken,
    isSending,
    isSuccess,
    isError,
    isSubmitted,
    errorFor,
    validateField,
    handleBlur,
    handlePhoneInput,
    validateAll,
    submit,
    reset,
    dismissError,
    minDate: todayIso(),
    maxNotesLength: MAX_NOTES_LENGTH
  }
}
