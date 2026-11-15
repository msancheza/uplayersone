<script setup>
import { ref, computed, onMounted, onUnmounted, watch, nextTick } from 'vue'
import { CalendarDays, ChevronLeft, ChevronRight } from 'lucide-vue-next'

/**
 * Event date picker.
 *
 * Replaces the native <input type="date">: the native control only opens
 * its calendar when you hit the small icon on the right, and on mobile the
 * native sheet can break out of the layout. This picker opens on a click
 * anywhere in the field, renders the calendar inside the viewport (bottom
 * sheet on mobile, anchored panel on desktop) and keeps the same HUD look
 * as the rest of the form.
 */

const props = defineProps({
  modelValue: { type: String, default: '' },
  /** Earliest selectable date as YYYY-MM-DD. Empty = no limit. */
  min: { type: String, default: '' },
  placeholder: { type: String, default: 'Select a date' },
  error: { type: Boolean, default: false },
  /** How many months ahead the user can browse. */
  maxMonthsAhead: { type: Number, default: 18 }
})

const emit = defineEmits(['update:modelValue'])

const WEEKDAYS = ['S', 'M', 'T', 'W', 'T', 'F', 'S']
const MONTHS = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
]

const isOpen = ref(false)
const triggerRef = ref(null)
const panelRef = ref(null)
const gridRef = ref(null)

const today = new Date()
const todayIso = toIso(today.getFullYear(), today.getMonth(), today.getDate())

const viewYear = ref(today.getFullYear())
const viewMonth = ref(today.getMonth())
const focusedIso = ref(props.modelValue || todayIso)

function toIso(year, month, day) {
  return `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`
}

function parseIso(iso) {
  if (!iso || !/^\d{4}-\d{2}-\d{2}$/.test(iso)) return null
  const [y, m, d] = iso.split('-').map(Number)
  return { year: y, month: m - 1, day: d }
}

const minParts = computed(() => parseIso(props.min))

const minTimestamp = computed(() => {
  if (!minParts.value) return null
  return new Date(minParts.value.year, minParts.value.month, minParts.value.day).getTime()
})

const maxTimestamp = computed(() => {
  const limit = new Date(today.getFullYear(), today.getMonth() + props.maxMonthsAhead, today.getDate())
  return limit.getTime()
})

const selectedLabel = computed(() => {
  const parts = parseIso(props.modelValue)
  if (!parts) return ''
  const date = new Date(parts.year, parts.month, parts.day)
  return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
})

const monthLabel = computed(() => `${MONTHS[viewMonth.value]} ${viewYear.value}`)

const isPrevDisabled = computed(() => {
  const prevLast = new Date(viewYear.value, viewMonth.value, 0).getTime()
  if (minTimestamp.value && prevLast < minTimestamp.value) return true
  return false
})

const isNextDisabled = computed(() => {
  const nextFirst = new Date(viewYear.value, viewMonth.value + 1, 1).getTime()
  return nextFirst > maxTimestamp.value
})

/** 42 cells (6 weeks) so the grid height never jumps between months. */
const days = computed(() => {
  const firstWeekday = new Date(viewYear.value, viewMonth.value, 1).getDay()
  const totalDays = new Date(viewYear.value, viewMonth.value + 1, 0).getDate()
  const cells = []

  for (let i = 0; i < 42; i += 1) {
    const dayNumber = i - firstWeekday + 1
    const inMonth = dayNumber >= 1 && dayNumber <= totalDays
    const date = new Date(viewYear.value, viewMonth.value, dayNumber)
    const iso = toIso(date.getFullYear(), date.getMonth(), date.getDate())
    const time = date.getTime()

    let disabled = !inMonth
    if (minTimestamp.value && time < minTimestamp.value) disabled = true
    if (time > maxTimestamp.value) disabled = true

    cells.push({
      day: inMonth ? dayNumber : '',
      iso,
      inMonth,
      disabled,
      isToday: iso === todayIso,
      isSelected: iso === props.modelValue,
      isFocused: iso === focusedIso.value
    })
  }

  return cells
})

/* ── Anchored panel (desktop) / bottom sheet (mobile) ── */
const isMobile = ref(false)

const panelStyle = computed(() => {
  if (isMobile.value) return {}
  if (!triggerRef.value) return {}

  const rect = triggerRef.value.getBoundingClientRect()
  const vw = window.innerWidth
  const vh = window.innerHeight
  const width = Math.min(340, vw - 24)
  const left = Math.min(Math.max(12, rect.left), Math.max(12, vw - width - 12))
  const estimatedHeight = 372
  const below = rect.bottom + 8

  if (below + estimatedHeight <= vh - 12) {
    return { left: `${left}px`, top: `${below}px`, width: `${width}px` }
  }
  return { left: `${left}px`, bottom: `${vh - rect.top + 8}px`, width: `${width}px` }
})

function syncViewport() {
  isMobile.value = window.innerWidth <= 768
}

function openPicker() {
  const parts = parseIso(props.modelValue)
  if (parts) {
    viewYear.value = parts.year
    viewMonth.value = parts.month
    focusedIso.value = props.modelValue
  } else {
    viewYear.value = today.getFullYear()
    viewMonth.value = today.getMonth()
    focusedIso.value = todayIso
  }
  isOpen.value = true
}

function closePicker() {
  isOpen.value = false
}

function togglePicker() {
  if (isOpen.value) closePicker()
  else openPicker()
}

function selectDate(iso) {
  emit('update:modelValue', iso)
  closePicker()
}

function shiftMonth(delta) {
  const next = new Date(viewYear.value, viewMonth.value + delta, 1)
  if (delta < 0 && isPrevDisabled.value) return
  if (delta > 0 && isNextDisabled.value) return
  viewYear.value = next.getFullYear()
  viewMonth.value = next.getMonth()
}

function moveFocus(daysDelta) {
  const current = parseIso(focusedIso.value)
  if (!current) return
  const next = new Date(current.year, current.month, current.day + daysDelta)
  focusedIso.value = toIso(next.getFullYear(), next.getMonth(), next.getDate())

  if (focusedIso.value !== props.modelValue) {
    // Keep the visible month in sync with the keyboard cursor.
    const parts = parseIso(focusedIso.value)
    if (parts.month !== viewMonth.value || parts.year !== viewYear.value) {
      viewYear.value = parts.year
      viewMonth.value = parts.month
    }
  }
  nextTick(() => {
    const cell = gridRef.value?.querySelector(`[data-iso="${focusedIso.value}"]`)
    if (cell) cell.focus()
  })
}

function handleGridKeydown(event) {
  const { key } = event
  if (key === 'ArrowLeft') { event.preventDefault(); moveFocus(-1) }
  else if (key === 'ArrowRight') { event.preventDefault(); moveFocus(1) }
  else if (key === 'ArrowUp') { event.preventDefault(); moveFocus(-7) }
  else if (key === 'ArrowDown') { event.preventDefault(); moveFocus(7) }
  else if (key === 'Enter' || key === ' ') {
    const iso = focusedIso.value
    const cell = days.value.find((d) => d.iso === iso)
    if (cell && !cell.disabled) {
      event.preventDefault()
      selectDate(iso)
    }
  }
}

function handleTriggerKeydown(event) {
  if (event.key === 'Enter' || event.key === ' ') {
    event.preventDefault()
    togglePicker()
  }
}

const handleClickOutside = (event) => {
  if (!isOpen.value) return
  if (triggerRef.value?.contains(event.target)) return
  if (panelRef.value?.contains(event.target)) return
  closePicker()
}

const handleEscape = (event) => {
  if (event.key === 'Escape' && isOpen.value) {
    closePicker()
    triggerRef.value?.focus()
  }
}

const handleViewportChange = () => {
  syncViewport()
  if (isOpen.value && !isMobile.value) closePicker()
}

onMounted(() => {
  syncViewport()
  document.addEventListener('click', handleClickOutside, true)
  document.addEventListener('keydown', handleEscape)
  window.addEventListener('resize', handleViewportChange)
  window.addEventListener('scroll', handleViewportChange, { passive: true })
})

onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside, true)
  document.removeEventListener('keydown', handleEscape)
  window.removeEventListener('resize', handleViewportChange)
  window.removeEventListener('scroll', handleViewportChange)
  document.body.style.overflow = ''
})

// Lock the page behind the sheet on mobile so the calendar stays put.
watch(isOpen, (open) => {
  if (typeof document === 'undefined') return
  if (open && isMobile.value) {
    document.body.style.overflow = 'hidden'
  } else if (!open) {
    document.body.style.overflow = ''
  }
})

// Follow an externally changed value (e.g. "reset the form").
watch(
  () => props.modelValue,
  (value) => {
    if (!isOpen.value) focusedIso.value = value || todayIso
  }
)
</script>

<template>
  <div class="date-picker" :class="{ open: isOpen, error }">
    <button
      ref="triggerRef"
      type="button"
      class="dp-trigger"
      :class="{ error, placeholder: !modelValue }"
      :aria-expanded="isOpen"
      aria-haspopup="dialog"
      @click="togglePicker"
      @keydown="handleTriggerKeydown"
    >
      <span class="dp-value">{{ modelValue ? selectedLabel : placeholder }}</span>
      <CalendarDays :size="17" class="dp-icon" />
    </button>

    <Teleport to="body">
      <Transition name="dp-fade">
        <div v-if="isOpen" class="dp-overlay" @click="closePicker"></div>
      </Transition>

      <Transition name="dp-sheet">
        <div
          v-if="isOpen"
          ref="panelRef"
          class="dp-panel"
          :class="{ mobile: isMobile }"
          :style="panelStyle"
          role="dialog"
          aria-label="Choose your event date"
        >
          <div class="dp-sheet-handle" aria-hidden="true"></div>

          <div class="dp-header">
            <button
              type="button"
              class="dp-nav"
              :disabled="isPrevDisabled"
              aria-label="Previous month"
              @click="shiftMonth(-1)"
            >
              <ChevronLeft :size="18" />
            </button>
            <span class="dp-month">{{ monthLabel }}</span>
            <button
              type="button"
              class="dp-nav"
              :disabled="isNextDisabled"
              aria-label="Next month"
              @click="shiftMonth(1)"
            >
              <ChevronRight :size="18" />
            </button>
          </div>

          <div class="dp-weekdays" aria-hidden="true">
            <span v-for="(day, i) in WEEKDAYS" :key="i" class="dp-weekday">{{ day }}</span>
          </div>

          <div
            ref="gridRef"
            class="dp-grid"
            role="grid"
            @keydown="handleGridKeydown"
          >
            <button
              v-for="cell in days"
              :key="cell.iso"
              type="button"
              class="dp-day"
              :class="{
                'is-today': cell.isToday,
                'is-selected': cell.isSelected,
                'is-outside': !cell.inMonth,
                'is-focused': cell.isFocused
              }"
              :disabled="cell.disabled"
              :tabindex="cell.isFocused ? 0 : -1"
              :aria-label="cell.iso"
              :aria-selected="cell.isSelected"
              :data-iso="cell.iso"
              @click="!cell.disabled && selectDate(cell.iso)"
            >
              {{ cell.day }}
            </button>
          </div>

          <p class="dp-hint">Pick the day your event starts — we confirm availability right away.</p>
        </div>
      </Transition>
    </Teleport>
  </div>
</template>

<style scoped>
.dp-trigger {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.75rem;
  padding: 0.85rem 1rem;
  background: rgba(255, 255, 255, 0.04);
  border: 1px solid rgba(255, 255, 255, 0.12);
  border-radius: 3px;
  color: #ffffff;
  font-family: var(--font-body);
  font-size: 0.95rem;
  text-align: left;
  cursor: pointer;
  transition: all 0.2s ease;
  outline: none;
}

.dp-trigger:hover {
  border-color: rgba(255, 0, 43, 0.5);
  background: rgba(255, 255, 255, 0.06);
}

.dp-trigger:focus-visible,
.date-picker.open .dp-trigger {
  border-color: #ff002b;
  background: rgba(255, 0, 43, 0.08);
  box-shadow: 0 0 0 3px rgba(255, 0, 43, 0.15);
}

.dp-trigger.error {
  border-color: #ff002b;
  background: rgba(255, 0, 43, 0.06);
  box-shadow: 0 0 12px rgba(255, 0, 43, 0.3);
}

.dp-value {
  flex: 1;
  min-width: 0;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.dp-trigger.placeholder .dp-value {
  color: rgba(255, 255, 255, 0.45);
}

.dp-icon {
  color: rgba(255, 255, 255, 0.5);
  flex-shrink: 0;
  transition: color 0.2s ease;
}

.dp-trigger:hover .dp-icon,
.date-picker.open .dp-icon {
  color: #ff002b;
}

/* Overlay behind the panel */
.dp-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.6);
  backdrop-filter: blur(2px);
  -webkit-backdrop-filter: blur(2px);
  z-index: 9998;
}

/* Panel — fixed on desktop (anchored) and a bottom sheet on mobile */
.dp-panel {
  position: fixed;
  z-index: 9999;
  background: #0a0a10;
  border: 1.5px solid rgba(255, 0, 43, 0.45);
  border-radius: 10px;
  box-shadow: 0 18px 50px rgba(0, 0, 0, 0.95), 0 0 22px rgba(255, 0, 43, 0.18);
  padding: 0.9rem 1rem 1rem;
  display: flex;
  flex-direction: column;
  gap: 0.6rem;
  animation: dp-in 0.18s ease both;
}

.dp-panel.mobile {
  left: 0;
  right: 0;
  bottom: 0;
  top: auto;
  width: auto;
  border-radius: 18px 18px 0 0;
  border-top: 1.5px solid rgba(255, 0, 43, 0.45);
  border-left: none;
  border-right: none;
  box-shadow: 0 -12px 40px rgba(0, 0, 0, 0.95), 0 -2px 12px rgba(255, 0, 43, 0.25);
  padding-bottom: calc(1rem + env(safe-area-inset-bottom, 0px));
  max-height: 88vh;
  overflow-y: auto;
}

@keyframes dp-in {
  from { opacity: 0; transform: translateY(8px) scale(0.98); }
  to { opacity: 1; transform: translateY(0) scale(1); }
}

.dp-sheet-handle {
  display: none;
  width: 40px;
  height: 4px;
  background: rgba(255, 255, 255, 0.2);
  border-radius: 2px;
  margin: 0 auto 2px auto;
  flex-shrink: 0;
}

.dp-panel.mobile .dp-sheet-handle {
  display: block;
}

/* Header */
.dp-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.75rem;
  padding-bottom: 0.6rem;
  border-bottom: 1px solid rgba(255, 255, 255, 0.08);
}

.dp-month {
  font-family: var(--font-heading);
  font-size: 0.82rem;
  font-weight: 900;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: #ffffff;
}

.dp-nav {
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.14);
  color: #ffffff;
  width: 32px;
  height: 32px;
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  flex-shrink: 0;
  transition: all 0.2s ease;
}

.dp-nav:hover:not(:disabled) {
  background: rgba(255, 0, 43, 0.15);
  border-color: #ff002b;
  color: #ff002b;
}

.dp-nav:disabled {
  opacity: 0.25;
  cursor: not-allowed;
}

/* Weekday header */
.dp-weekdays {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 2px;
}

.dp-weekday {
  text-align: center;
  font-family: var(--font-heading);
  font-size: 0.56rem;
  font-weight: 900;
  letter-spacing: 0.1em;
  color: rgba(255, 255, 255, 0.35);
  padding-bottom: 0.2rem;
}

/* Day grid */
.dp-grid {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 2px;
}

.dp-day {
  aspect-ratio: 1 / 1;
  min-height: 38px;
  background: transparent;
  border: 1px solid transparent;
  border-radius: 4px;
  color: rgba(255, 255, 255, 0.85);
  font-family: var(--font-body);
  font-size: 0.86rem;
  font-weight: 600;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.15s ease;
}

.dp-day:hover:not(:disabled) {
  background: rgba(255, 0, 43, 0.15);
  border-color: rgba(255, 0, 43, 0.5);
  color: #ffffff;
}

.dp-day.is-outside {
  color: rgba(255, 255, 255, 0.18);
}

.dp-day:disabled {
  color: rgba(255, 255, 255, 0.15);
  cursor: not-allowed;
}

.dp-day.is-today {
  border-color: rgba(255, 0, 43, 0.6);
  color: #ff002b;
}

.dp-day.is-selected {
  background: #ff002b;
  border-color: #ff002b;
  color: #ffffff;
  font-weight: 900;
  box-shadow: 0 0 14px rgba(255, 0, 43, 0.6);
}

.dp-day.is-focused {
  outline: 2px solid rgba(255, 0, 43, 0.65);
  outline-offset: 1px;
}

.dp-hint {
  margin: 0;
  font-size: 0.72rem;
  font-weight: 500;
  color: rgba(255, 255, 255, 0.45);
  text-align: center;
  line-height: 1.4;
  padding-top: 0.2rem;
}

/* Transitions */
.dp-fade-enter-active,
.dp-fade-leave-active {
  transition: opacity 0.2s ease;
}

.dp-fade-enter-from,
.dp-fade-leave-to {
  opacity: 0;
}

.dp-sheet-enter-active,
.dp-sheet-leave-active {
  transition: transform 0.22s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.18s ease;
}

.dp-sheet-enter-from,
.dp-sheet-leave-to {
  opacity: 0;
  transform: translateY(100%);
}

@media (min-width: 769px) {
  .dp-sheet-enter-from,
  .dp-sheet-leave-to {
    transform: translateY(-6px) scale(0.97);
  }
}

@media (max-width: 768px) {
  .dp-trigger {
    padding: 0.75rem 0.85rem;
    font-size: 0.88rem;
  }
  .dp-day {
    min-height: 42px;
    font-size: 0.9rem;
  }
}
</style>
