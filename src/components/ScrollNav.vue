<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const sections = [
  { id: 'hero',    label: 'HOME' },
  { id: 'prices',  label: 'FLEET' },
  { id: 'events',  label: 'EVENTS' },
  { id: 'gallery', label: 'GALLERY' },
  { id: 'games',   label: 'GAMES' },
  { id: 'faq',     label: 'FAQ' },
  { id: 'contact', label: 'REQUEST' },
]

const activeSection = ref('hero')
const isHovered = ref(false)
let observers = []

const scrollTo = (id) => {
  const el = document.getElementById(id)
  if (el) el.scrollIntoView({ behavior: 'smooth' })
}

const getActiveIndex = () => sections.findIndex(s => s.id === activeSection.value)

onMounted(() => {
  const options = {
    root: null,
    rootMargin: '-40% 0px -40% 0px',
    threshold: 0,
  }
  sections.forEach(({ id }) => {
    const el = document.getElementById(id)
    if (!el) return
    const obs = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) activeSection.value = id
      })
    }, options)
    obs.observe(el)
    observers.push(obs)
  })
})

onUnmounted(() => {
  observers.forEach(obs => obs.disconnect())
  observers = []
})
</script>

<template>
  <div
    class="scroll-nav-wrapper"
    aria-label="Section Navigation"
    @mouseenter="isHovered = true"
    @mouseleave="isHovered = false"
  >
    <!-- DESKTOP: minimal dot rail -->
    <div class="dot-rail">
      <!-- Thin vertical spine line -->
      <div class="spine-line"></div>

      <!-- Dot buttons -->
      <button
        v-for="(section) in sections"
        :key="section.id"
        class="dot-btn"
        :class="{ active: activeSection === section.id }"
        @click="scrollTo(section.id)"
        :aria-label="`Navigate to ${section.label}`"
      >
        <!-- Label (visible on hover) -->
        <span class="dot-label" :class="{ visible: isHovered }">{{ section.label }}</span>
        <!-- Dot -->
        <div class="dot"></div>
      </button>
    </div>

    <!-- MOBILE: same minimal dot rail -->
    <div class="mobile-dot-rail">
      <div class="mobile-spine-line"></div>
      <div class="mobile-nodes">
        <button
          v-for="(section, idx) in sections"
          :key="section.id"
          class="mobile-dot-btn"
          :class="{ active: activeSection === section.id, passed: idx < getActiveIndex() }"
          @click="scrollTo(section.id)"
          :aria-label="`Navigate to ${section.label}`"
        >
          <div class="mobile-dot"></div>
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* ============================================================
   WRAPPER
   ============================================================ */
.scroll-nav-wrapper {
  position: fixed;
  right: 14px;
  top: 50%;
  transform: translateY(-50%);
  z-index: 100;
  display: flex;
  flex-direction: column;
  align-items: center;
}

/* ============================================================
   DESKTOP DOT RAIL
   ============================================================ */
.dot-rail {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0;
}

/* Thin vertical line behind dots */
.spine-line {
  position: absolute;
  left: 50%;
  top: 10px;
  bottom: 10px;
  transform: translateX(-50%);
  width: 1px;
  background: rgba(255, 255, 255, 0.1);
  pointer-events: none;
}

/* Each dot button row */
.dot-btn {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 8px;
  background: transparent;
  border: none;
  cursor: pointer;
  padding: 7px 0;
  /* wide enough for label + dot */
  width: 90px;
}

/* The dot itself */
.dot {
  width: 5px;
  height: 5px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.22);
  flex-shrink: 0;
  transition: background 0.3s ease, box-shadow 0.3s ease, transform 0.3s ease;
  position: relative;
  z-index: 2;
}

.dot-btn.active .dot {
  background: #ff002b;
  box-shadow: 0 0 6px rgba(255, 0, 43, 0.9), 0 0 12px rgba(255, 0, 43, 0.4);
  transform: scale(1.4);
}

.dot-btn:hover .dot {
  background: rgba(255, 255, 255, 0.5);
}

.dot-btn.active:hover .dot {
  background: #ff002b;
}

/* Section label — hidden by default, fades in on nav hover */
.dot-label {
  font-family: 'Orbitron', monospace;
  font-size: 0.42rem;
  font-weight: 700;
  letter-spacing: 0.14em;
  color: rgba(255, 255, 255, 0.0);
  white-space: nowrap;
  transition: color 0.3s ease, opacity 0.3s ease;
  pointer-events: none;
  user-select: none;
}

.dot-label.visible {
  color: rgba(255, 255, 255, 0.45);
}

.dot-btn.active .dot-label.visible {
  color: rgba(255, 255, 255, 0.85);
}

/* ============================================================
   MOBILE: simple dot rail (≤768px)
   ============================================================ */
.mobile-dot-rail {
  display: none;
}

@media (max-width: 768px) {
  .scroll-nav-wrapper {
    right: 5px;
    z-index: 990;
  }

  /* Hide desktop rail */
  .dot-rail {
    display: none;
  }

  /* Show mobile rail */
  .mobile-dot-rail {
    display: flex;
    flex-direction: column;
    align-items: center;
    position: relative;
  }

  .mobile-spine-line {
    position: absolute;
    left: 50%;
    top: 6px;
    bottom: 6px;
    transform: translateX(-50%);
    width: 1px;
    background: rgba(255, 255, 255, 0.1);
    pointer-events: none;
  }

  .mobile-nodes {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 14px;
    position: relative;
    z-index: 2;
  }

  .mobile-dot-btn {
    background: none;
    border: none;
    padding: 0;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .mobile-dot {
    width: 5px;
    height: 5px;
    border-radius: 50%;
    background: rgba(255, 255, 255, 0.2);
    transition: all 0.3s ease;
  }

  .mobile-dot-btn.passed .mobile-dot {
    background: rgba(255, 0, 43, 0.5);
  }

  .mobile-dot-btn.active .mobile-dot {
    width: 7px;
    height: 7px;
    background: #ff002b;
    box-shadow: 0 0 8px rgba(255, 0, 43, 0.9);
  }
}
</style>
