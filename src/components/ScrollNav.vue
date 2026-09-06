<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { ChevronDown } from 'lucide-vue-next'

const sections = [
  { id: 'hero',        label: 'HOME' },
  { id: 'prices',      label: 'FLEET' },
  { id: 'events',      label: 'EVENTS' },
  { id: 'gallery',     label: 'GALLERY' },
  { id: 'games',       label: 'GAMES' },
  { id: 'faq',         label: 'FAQ' },
  { id: 'contact',     label: 'REQUEST' },
]

const activeSection = ref('hero')
let observers = []

const scrollTo = (id) => {
  const el = document.getElementById(id)
  if (el) el.scrollIntoView({ behavior: 'smooth' })
}

const scrollDown = () => {
  const currentIdx = sections.findIndex(s => s.id === activeSection.value)
  const next = sections[currentIdx + 1]
  if (next) scrollTo(next.id)
}

const getActiveIndex = () => sections.findIndex(s => s.id === activeSection.value)
const totalSections = sections.length

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
        if (entry.isIntersecting) {
          activeSection.value = id
        }
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
  <div class="scroll-nav-wrapper" aria-label="Section Navigation">
    <!-- ── DESKTOP / TABLET FULL HUD PANEL ── -->
    <div class="hud-panel">
      <!-- Top accent line -->
      <div class="nav-top-accent"></div>

      <!-- Header: SYSTEM + counter -->
      <div class="nav-header">
        <span class="nav-system-label">SYSTEM</span>
        <div class="nav-counter">
          <span class="nav-counter-current">
            {{ String(getActiveIndex() + 1).padStart(2, '0') }}
          </span>
          <span class="nav-counter-sep"> / </span>
          <span class="nav-counter-total">{{ String(totalSections).padStart(2, '0') }}</span>
        </div>
      </div>

      <!-- Vertical spine + dots + labels -->
      <div class="nav-track-container">
        <!-- The continuous vertical line -->
        <div class="nav-spine">
          <!-- Active fill that grows from top -->
          <div
            class="nav-spine-fill"
            :style="{ height: `${((getActiveIndex()) / (totalSections - 1)) * 100}%` }"
          ></div>
        </div>

        <!-- Section items -->
        <div class="nav-items">
          <button
            v-for="(section, idx) in sections"
            :key="section.id"
            class="nav-item"
            :class="{ active: activeSection === section.id }"
            @click="scrollTo(section.id)"
            :aria-label="`Navigate to ${section.label}`"
          >
            <!-- Dot on the spine -->
            <div class="nav-dot-wrapper">
              <div class="nav-dot">
                <div class="nav-dot-inner"></div>
              </div>
            </div>

            <!-- Section info — hidden on tablet (compact mode) -->
            <div class="nav-item-content">
              <span class="nav-item-num">{{ String(idx + 1).padStart(2, '0') }}</span>
              <span class="nav-item-label">{{ section.label }}</span>
            </div>
          </button>
        </div>
      </div>

      <!-- Scroll down arrow -->
      <button class="nav-scroll-down" @click="scrollDown" aria-label="Scroll to next section">
        <div class="scroll-arrow-ring">
          <ChevronDown :size="14" />
        </div>
      </button>

      <!-- Bottom accent line -->
      <div class="nav-bottom-accent"></div>
    </div>

    <!-- ── MOBILE VERTICAL PROGRESS SPINE ── -->
    <div class="mobile-spine" aria-label="Section Level Indicator">
      <!-- Active Level Number -->
      <span class="mobile-section-num">
        {{ String(getActiveIndex() + 1).padStart(2, '0') }}
      </span>

      <!-- Track container with continuous spine + nodes -->
      <div class="mobile-track-box">
        <!-- Continuous background line -->
        <div class="mobile-track-line">
          <!-- Active red glowing fill line -->
          <div 
            class="mobile-track-fill"
            :style="{ height: `${((getActiveIndex()) / (totalSections - 1)) * 100}%` }"
          ></div>
        </div>

        <!-- Level Nodes (01 to 07) -->
        <div class="mobile-nodes-list">
          <button
            v-for="(section, idx) in sections"
            :key="section.id"
            class="mobile-node-btn"
            :class="{ active: activeSection === section.id, passed: idx < getActiveIndex() }"
            @click="scrollTo(section.id)"
            :aria-label="`Navigate to ${section.label}`"
          >
            <div class="node-bullet">
              <div class="node-bullet-inner"></div>
            </div>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* ============================================================
   WRAPPER — positions both HUD and mobile spine
   ============================================================ */
.scroll-nav-wrapper {
  position: fixed;
  right: 16px;
  top: 50%;
  transform: translateY(-50%);
  z-index: 100;
  display: flex;
  flex-direction: column;
  align-items: center;
}

/* ============================================================
   DESKTOP FULL HUD PANEL (78px wide glass card)
   ============================================================ */
.hud-panel {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0;

  /* Glass HUD panel */
  background: rgba(4, 4, 8, 0.88);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-left: 1px solid rgba(255, 0, 43, 0.4);
  border-radius: 4px;
  padding: 0;
  width: 78px;
  overflow: hidden;
  box-shadow:
    0 0 0 0.5px rgba(255, 0, 43, 0.25),
    0 20px 50px rgba(0, 0, 0, 0.95),
    inset 0 0 20px rgba(255, 0, 43, 0.05);
}

/* ── Accent lines ── */
.nav-top-accent,
.nav-bottom-accent {
  width: 100%;
  height: 2px;
  background: linear-gradient(90deg, #ff002b 0%, rgba(255, 0, 43, 0.3) 70%, transparent 100%);
}

.nav-bottom-accent {
  background: linear-gradient(90deg, transparent 0%, rgba(255, 0, 43, 0.3) 30%, #ff002b 100%);
}

/* ── Header ── */
.nav-header {
  width: 100%;
  padding: 0.55rem 0.4rem 0.4rem;
  text-align: center;
  border-bottom: 1px solid rgba(255, 255, 255, 0.07);
}

.nav-system-label {
  display: block;
  font-family: 'Orbitron', 'Rajdhani', sans-serif;
  font-size: 0.5rem;
  font-weight: 800;
  letter-spacing: 0.22em;
  color: #ff002b;
  text-shadow: 0 0 8px rgba(255, 0, 43, 0.6);
  margin-bottom: 0.15rem;
}

.nav-counter {
  font-family: 'Orbitron', 'Rajdhani', monospace;
  font-size: 0.65rem;
  font-weight: 700;
  letter-spacing: 0.04em;
  color: rgba(255, 255, 255, 0.55);
}

.nav-counter-current {
  color: #ffffff;
  font-size: 0.72rem;
}

/* ── Track Container ── */
.nav-track-container {
  position: relative;
  width: 100%;
  padding: 0.5rem 0;
  flex-grow: 1;
}

.nav-spine {
  position: absolute;
  left: 14px;
  top: 0;
  bottom: 0;
  width: 1px;
  background: rgba(255, 255, 255, 0.1);
}

.nav-spine-fill {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  background: linear-gradient(180deg, #ff002b 0%, rgba(255, 0, 43, 0.5) 100%);
  transition: height 0.5s cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow: 0 0 6px rgba(255, 0, 43, 0.6);
}

/* ── Section Items ── */
.nav-items {
  display: flex;
  flex-direction: column;
  gap: 0;
}

.nav-item {
  display: flex;
  align-items: center;
  gap: 0;
  background: transparent;
  border: none;
  cursor: pointer;
  padding: 0.45rem 0.35rem 0.45rem 0;
  width: 100%;
  text-align: left;
  transition: background 0.2s ease;
  position: relative;
}

.nav-item:hover {
  background: rgba(255, 0, 43, 0.08);
}

.nav-item.active {
  background: rgba(255, 0, 43, 0.12);
}

.nav-dot-wrapper {
  width: 28px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-shrink: 0;
  position: relative;
  z-index: 2;
}

.nav-dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  border: 1.5px solid rgba(255, 255, 255, 0.25);
  background: rgba(4, 4, 8, 0.95);
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
}

.nav-item.active .nav-dot {
  border-color: #ff002b;
  box-shadow: 0 0 8px rgba(255, 0, 43, 0.8), 0 0 16px rgba(255, 0, 43, 0.4);
  background: rgba(255, 0, 43, 0.2);
}

.nav-dot-inner {
  width: 3px;
  height: 3px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.25);
  transition: all 0.3s ease;
}

.nav-item.active .nav-dot-inner {
  background: #ff002b;
  box-shadow: 0 0 6px #ff002b;
}

/* Section number + label */
.nav-item-content {
  display: flex;
  flex-direction: column;
  line-height: 1.1;
  overflow: hidden;
}

.nav-item-num {
  font-family: 'Orbitron', 'Rajdhani', monospace;
  font-size: 0.72rem;
  font-weight: 800;
  letter-spacing: 0.04em;
  color: rgba(255, 255, 255, 0.35);
  transition: all 0.3s ease;
}

.nav-item.active .nav-item-num {
  color: #ff002b;
  text-shadow: 0 0 10px rgba(255, 0, 43, 0.7);
  font-size: 0.82rem;
}

.nav-item-label {
  font-family: 'Rajdhani', 'Orbitron', sans-serif;
  font-size: 0.48rem;
  font-weight: 700;
  letter-spacing: 0.1em;
  color: rgba(255, 255, 255, 0.28);
  transition: all 0.3s ease;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.nav-item.active .nav-item-label {
  color: rgba(255, 255, 255, 0.9);
  letter-spacing: 0.12em;
}

/* ── Scroll Down Button ── */
.nav-scroll-down {
  background: transparent;
  border: none;
  cursor: pointer;
  padding: 0.45rem 0 0.5rem;
  display: flex;
  justify-content: center;
  width: 100%;
  border-top: 1px solid rgba(255, 255, 255, 0.07);
  transition: all 0.25s ease;
}

.nav-scroll-down:hover .scroll-arrow-ring {
  border-color: #ff002b;
  box-shadow: 0 0 12px rgba(255, 0, 43, 0.6);
  color: #ff002b;
  transform: translateY(2px);
}

.scroll-arrow-ring {
  width: 22px;
  height: 22px;
  border-radius: 50%;
  border: 1.5px solid rgba(255, 0, 43, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  color: #ff002b;
  transition: all 0.3s ease;
  animation: pulse-down 2s ease-in-out infinite;
}

@keyframes pulse-down {
  0%, 100% { box-shadow: 0 0 0 0 rgba(255, 0, 43, 0); }
  50%       { box-shadow: 0 0 0 4px rgba(255, 0, 43, 0.2); }
}

/* ============================================================
   TABLET (769px–1024px): Compact — hide labels, keep numbers
   ============================================================ */
@media (max-width: 1024px) and (min-width: 769px) {
  .hud-panel {
    width: 52px;
  }

  .nav-system-label {
    display: none;
  }

  .nav-item-label {
    display: none;
  }

  .nav-item-num {
    font-size: 0.68rem;
  }

  .nav-item.active .nav-item-num {
    font-size: 0.76rem;
  }

  .nav-counter {
    font-size: 0.6rem;
  }
}

/* ============================================================
   MOBILE SPINE (≤768px) — Continuous vertical progress line
   ============================================================ */
.mobile-spine {
  display: none;
}

@media (max-width: 768px) {
  .scroll-nav-wrapper {
    right: 4px;
    z-index: 990;
    pointer-events: auto;
  }

  /* Hide the full HUD panel */
  .hud-panel {
    display: none;
  }

  /* Show mobile spine pill — more transparent, glued to right edge */
  .mobile-spine {
    display: flex;
    flex-direction: column;
    align-items: center;
    background: rgba(6, 6, 10, 0.5);
    backdrop-filter: blur(10px);
    -webkit-backdrop-filter: blur(10px);
    border: 1px solid rgba(255, 0, 43, 0.2);
    border-radius: 20px;
    padding: 0.5rem 0.3rem;
    box-shadow: 0 2px 14px rgba(0, 0, 0, 0.75), 0 0 8px rgba(255, 0, 43, 0.12);
  }

  .mobile-section-num {
    font-family: 'Orbitron', monospace;
    font-size: 0.68rem;
    font-weight: 900;
    color: #ff002b;
    letter-spacing: 0.08em;
    text-shadow: 0 0 8px rgba(255, 0, 43, 0.7);
    margin-bottom: 0.4rem;
    display: block;
    line-height: 1;
  }

  .mobile-track-box {
    position: relative;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 0.2rem 0;
  }

  .mobile-track-line {
    position: absolute;
    top: 4px;
    bottom: 4px;
    left: 50%;
    transform: translateX(-50%);
    width: 2px;
    background: rgba(255, 255, 255, 0.18);
    border-radius: 2px;
    z-index: 1;
  }

  .mobile-track-fill {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    background: #ff002b;
    box-shadow: 0 0 8px #ff002b;
    border-radius: 2px;
    transition: height 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  }

  .mobile-nodes-list {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 13px;
    position: relative;
    z-index: 2;
  }

  .mobile-node-btn {
    background: none;
    border: none;
    padding: 0;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    outline: none;
  }

  .node-bullet {
    width: 7px;
    height: 7px;
    border-radius: 50%;
    border: 1.5px solid rgba(255, 255, 255, 0.4);
    background: #06060a;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all 0.3s ease;
  }

  .mobile-node-btn.passed .node-bullet {
    border-color: #ff002b;
    background: #ff002b;
    box-shadow: 0 0 6px rgba(255, 0, 43, 0.7);
  }

  .mobile-node-btn.active .node-bullet {
    width: 11px;
    height: 11px;
    border-color: #ffffff;
    background: #ff002b;
    box-shadow: 0 0 10px #ff002b, 0 0 20px rgba(255, 0, 43, 0.85);
    transform: scale(1.15);
  }

  .node-bullet-inner {
    width: 3px;
    height: 3px;
    border-radius: 50%;
    background: #ffffff;
    display: block;
  }
}
</style>
