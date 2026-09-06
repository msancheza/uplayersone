<script setup>
import { ref, computed, onMounted, onUnmounted, watch } from 'vue'
import { ChevronDown, Check } from 'lucide-vue-next'

const props = defineProps({
  modelValue: { type: String, required: true },
  options: { type: Array, required: true },
  placeholder: { type: String, default: 'Select an option' },
  highlight: { type: Boolean, default: false }
})

const emit = defineEmits(['update:modelValue'])

const isOpen = ref(false)
const triggerRef = ref(null)
const dropdownRef = ref(null)
const selectedIndex = computed(() => props.options.indexOf(props.modelValue))

const toggle = () => {
  isOpen.value = !isOpen.value
}

const close = () => {
  isOpen.value = false
}

const selectOption = (opt) => {
  emit('update:modelValue', opt)
  close()
}

const handleClickOutside = (e) => {
  if (!isOpen.value) return
  if (
    triggerRef.value && !triggerRef.value.contains(e.target) &&
    dropdownRef.value && !dropdownRef.value.contains(e.target)
  ) {
    close()
  }
}

const handleKeydown = (e) => {
  if (e.key === 'Escape' && isOpen.value) close()
}

onMounted(() => {
  document.addEventListener('click', handleClickOutside, true)
  document.addEventListener('keydown', handleKeydown)
})

onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside, true)
  document.removeEventListener('keydown', handleKeydown)
})

// Lock body scroll when the bottom-sheet is open on mobile
watch(isOpen, (open) => {
  if (typeof document === 'undefined') return
  if (open) {
    document.body.style.overflow = 'hidden'
  } else {
    document.body.style.overflow = ''
  }
})
</script>

<template>
  <div class="custom-select" :class="{ open: isOpen, highlight }">
    <button
      ref="triggerRef"
      type="button"
      class="cs-trigger"
      :class="{ highlight }"
      @click="toggle"
      :aria-expanded="isOpen"
      aria-haspopup="listbox"
    >
      <span class="cs-value" :class="{ placeholder: !modelValue }">
        {{ modelValue || placeholder }}
      </span>
      <ChevronDown :size="18" class="cs-chevron" :class="{ rotated: isOpen }" />
    </button>

    <Teleport to="body">
      <Transition name="cs-fade">
        <div v-if="isOpen" class="cs-overlay" @click="close"></div>
      </Transition>

      <Transition name="cs-sheet">
        <div
          v-if="isOpen"
          ref="dropdownRef"
          class="cs-dropdown"
          :class="{ highlight }"
          role="listbox"
        >
          <div class="cs-sheet-handle" aria-hidden="true"></div>
          <div class="cs-sheet-title">Select an option</div>
          <ul class="cs-options">
            <li
              v-for="(opt, i) in options"
              :key="i"
              class="cs-option"
              :class="{ selected: modelValue === opt }"
              role="option"
              :aria-selected="modelValue === opt"
              @click="selectOption(opt)"
            >
              <span class="cs-option-text">{{ opt }}</span>
              <Check v-if="modelValue === opt" :size="18" class="cs-check" />
            </li>
          </ul>
        </div>
      </Transition>
    </Teleport>
  </div>
</template>

<style scoped>
.custom-select {
  position: relative;
  width: 100%;
}

/* Trigger (the closed state) */
.cs-trigger {
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

.cs-trigger:hover {
  border-color: rgba(255, 0, 43, 0.5);
  background: rgba(255, 255, 255, 0.06);
}

.cs-trigger:focus-visible,
.custom-select.open .cs-trigger {
  border-color: #ff002b;
  background: rgba(255, 0, 43, 0.08);
  box-shadow: 0 0 0 3px rgba(255, 0, 43, 0.15);
}

.cs-trigger.highlight {
  background: rgba(255, 0, 43, 0.08);
  border-color: rgba(255, 0, 43, 0.4);
}

.cs-value {
  flex: 1;
  min-width: 0;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.cs-value.placeholder {
  color: rgba(255, 255, 255, 0.45);
}

.cs-chevron {
  color: rgba(255, 255, 255, 0.55);
  flex-shrink: 0;
  transition: transform 0.25s ease, color 0.2s ease;
}

.cs-chevron.rotated {
  transform: rotate(180deg);
  color: #ff002b;
}

/* Dark overlay (covers page when open) */
.cs-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.6);
  backdrop-filter: blur(2px);
  -webkit-backdrop-filter: blur(2px);
  z-index: 9998;
}

/* Bottom sheet (used on both mobile and desktop for consistent UX) */
.cs-dropdown {
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 9999;
  background: #0a0a10;
  border-top: 1.5px solid rgba(255, 0, 43, 0.45);
  border-radius: 18px 18px 0 0;
  box-shadow: 0 -12px 40px rgba(0, 0, 0, 0.95), 0 -2px 12px rgba(255, 0, 43, 0.25);
  max-height: 80vh;
  display: flex;
  flex-direction: column;
  padding-bottom: calc(0.5rem + env(safe-area-inset-bottom, 0px));
}

.cs-sheet-handle {
  width: 40px;
  height: 4px;
  background: rgba(255, 255, 255, 0.2);
  border-radius: 2px;
  margin: 10px auto 6px auto;
  flex-shrink: 0;
}

.cs-sheet-title {
  font-family: var(--font-heading);
  font-size: 0.7rem;
  font-weight: 900;
  letter-spacing: 0.18em;
  color: rgba(255, 255, 255, 0.55);
  text-align: center;
  padding: 0.25rem 1rem 0.75rem 1rem;
  border-bottom: 1px solid rgba(255, 255, 255, 0.08);
  flex-shrink: 0;
}

.cs-options {
  list-style: none;
  margin: 0;
  padding: 0.5rem 0;
  overflow-y: auto;
  overscroll-behavior: contain;
  -webkit-overflow-scrolling: touch;
}

.cs-option {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.75rem;
  padding: 1rem 1.25rem;
  font-size: 0.95rem;
  line-height: 1.35;
  color: #ffffff;
  cursor: pointer;
  transition: background 0.15s ease;
  min-height: 52px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.04);
}

.cs-option:last-child {
  border-bottom: none;
}

.cs-option:active {
  background: rgba(255, 0, 43, 0.15);
}

.cs-option.selected {
  background: rgba(255, 0, 43, 0.1);
  color: #ffffff;
}

.cs-option-text {
  flex: 1;
  min-width: 0;
  word-break: break-word;
}

.cs-check {
  color: #ff002b;
  flex-shrink: 0;
}

/* Desktop: keep the bottom sheet but cap its width and center it */
@media (min-width: 769px) {
  .cs-dropdown {
    left: 50%;
    right: auto;
    transform: translateX(-50%);
    bottom: auto;
    top: 50%;
    margin-top: -200px;
    width: min(420px, calc(100vw - 2rem));
    max-height: 70vh;
    border-radius: 12px;
    border: 1.5px solid rgba(255, 0, 43, 0.45);
  }
  .cs-sheet-handle {
    display: none;
  }
  .cs-sheet-title {
    border-bottom: 1px solid rgba(255, 255, 255, 0.08);
  }
}

/* Transitions */
.cs-fade-enter-active,
.cs-fade-leave-active {
  transition: opacity 0.2s ease;
}
.cs-fade-enter-from,
.cs-fade-leave-to {
  opacity: 0;
}

.cs-sheet-enter-active,
.cs-sheet-leave-active {
  transition: transform 0.28s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.2s ease;
}
.cs-sheet-enter-from,
.cs-sheet-leave-to {
  transform: translateY(100%);
  opacity: 0;
}

@media (min-width: 769px) {
  .cs-sheet-enter-active,
  .cs-sheet-leave-active {
    transition: transform 0.22s ease, opacity 0.18s ease;
  }
  .cs-sheet-enter-from,
  .cs-sheet-leave-to {
    transform: translate(-50%, -50%) scale(0.96);
    opacity: 0;
  }
}

/* Mobile form-group padding override (match existing form spacing) */
@media (max-width: 768px) {
  .cs-trigger {
    padding: 0.75rem 0.85rem;
    font-size: 0.88rem;
  }
  .cs-option {
    padding: 0.95rem 1.1rem;
    font-size: 0.92rem;
    min-height: 50px;
  }
}
</style>
