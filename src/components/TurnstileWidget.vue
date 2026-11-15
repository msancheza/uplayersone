<script setup>
import { ref, onMounted, onUnmounted, watch } from 'vue'

/**
 * Cloudflare Turnstile widget.
 *
 * The secret key never reaches the browser — only the public site key
 * does, and it is fetched from the server (`GET /api/send-booking`) so the
 * same env var pair drives both sides. A build-time `VITE_TURNSTILE_SITE_KEY`
 * is honoured too, if the project prefers that route.
 *
 * The widget runs in `interaction-only` mode: invisible for real visitors,
 * and it only challenges when something looks automated. When Turnstile is
 * not configured the component stays silent and the form keeps working
 * with the honeypot + rate limit protection.
 */

const emit = defineEmits(['token', 'status'])

const containerRef = ref(null)
const siteKey = ref('')
const state = ref('loading')

let widgetId = null
let scriptPromise = null

const SCRIPT_ID = 'cf-turnstile-script'

const loadScript = () => {
  if (window.turnstile) return Promise.resolve(window.turnstile)
  if (scriptPromise) return scriptPromise

  scriptPromise = new Promise((resolve, reject) => {
    const existing = document.getElementById(SCRIPT_ID)
    const script = existing || document.createElement('script')

    script.addEventListener('load', () => resolve(window.turnstile))
    script.addEventListener('error', () => reject(new Error('turnstile script failed')))

    if (!existing) {
      script.id = SCRIPT_ID
      script.src = 'https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit'
      script.async = true
      script.defer = true
      document.head.appendChild(script)
    }
  })

  return scriptPromise
}

const resolveSiteKey = async () => {
  const buildTimeKey = import.meta.env.VITE_TURNSTILE_SITE_KEY
  if (buildTimeKey) return buildTimeKey

  try {
    const response = await fetch('/api/send-booking', { method: 'GET' })
    if (!response.ok) return ''
    const data = await response.json()
    return data?.siteKey || ''
  } catch {
    return ''
  }
}

const render = async () => {
  if (widgetId !== null || !containerRef.value) return

  const key = siteKey.value
  if (!key) {
    state.value = 'disabled'
    emit('status', 'disabled')
    return
  }

  try {
    const turnstile = await loadScript()
    if (!turnstile || !containerRef.value) {
      state.value = 'disabled'
      emit('status', 'disabled')
      return
    }

    widgetId = turnstile.render(containerRef.value, {
      sitekey: key,
      theme: 'dark',
      appearance: 'interaction-only',
      callback: (token) => {
        state.value = 'ready'
        emit('token', token)
        emit('status', 'ready')
      },
      'expired-callback': () => emit('token', ''),
      'error-callback': () => {
        emit('token', '')
        emit('status', 'error')
      }
    })
  } catch (error) {
    console.error('[turnstile] could not render the widget', error)
    state.value = 'error'
    emit('status', 'error')
  }
}

/** Called by the parent when a submission was rejected: the token is
 *  single-use, so the widget has to be reset for the next attempt. */
const reset = () => {
  if (widgetId !== null && window.turnstile) {
    window.turnstile.reset(widgetId)
  }
  emit('token', '')
}

defineExpose({ reset })

onMounted(async () => {
  siteKey.value = await resolveSiteKey()
  await render()
})

watch(siteKey, async (key) => {
  if (key) await render()
})

onUnmounted(() => {
  if (widgetId !== null && window.turnstile) {
    window.turnstile.remove(widgetId)
    widgetId = null
  }
})
</script>

<template>
  <div class="turnstile-wrap" :class="state">
    <div ref="containerRef" class="turnstile-container"></div>
    <span v-if="state === 'error'" class="turnstile-note">
      Human check unavailable — the form will still work.
    </span>
  </div>
</template>

<style scoped>
.turnstile-wrap {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
  gap: 0.5rem;
  min-height: 0;
  margin-top: 0.4rem;
}

.turnstile-container {
  min-height: 0;
  display: flex;
  justify-content: center;
}

.turnstile-note {
  font-family: var(--font-heading);
  font-size: 0.62rem;
  font-weight: 700;
  letter-spacing: 0.08em;
  color: rgba(255, 255, 255, 0.4);
}
</style>
