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
    if (digits.length < 10 || digits.length > 15) {
      return 'Please enter a full phone number, including the area code.'
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

export function useBookingRequest({ endpoint = '/api/send-booking', defaults = {} } = {}) {
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
  /** 'validation' → the visitor must fix a field. 'delivery' → the request could not be sent. */
  const errorKind = ref('')

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
        body: JSON.stringify({ ...form })
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
        errorKind.value = data?.code === 'validation_failed' ? 'validation' : 'delivery'
        status.value = 'error'
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
    isSending,
    isSuccess,
    isError,
    isSubmitted,
    errorFor,
    validateField,
    handleBlur,
    validateAll,
    submit,
    reset,
    dismissError,
    minDate: todayIso(),
    maxNotesLength: MAX_NOTES_LENGTH
  }
}
