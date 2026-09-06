<script setup>
import { onMounted, nextTick } from 'vue'
import { Tv, Wind, Volume2, Gamepad2, Plus, ChevronRight, Tag } from 'lucide-vue-next'
import { useRouter } from 'vue-router'
import siteConfig from '../config/siteConfig.js'
import { initScrollObserver } from '../utils/scrollObserver.js'

const router = useRouter()

onMounted(() => {
  nextTick(() => {
    initScrollObserver()
  })
})

const trucks = [
  {
    id: 1,
    num: '01',
    name: 'STANDARD',
    subtitle: 'Gaming Truck',
    tvSetup: '4 TVs Inside + 2 TVs Outside',
    tvCount: 6,
    amenities: ['A/C Units', 'Stadium Seating'],
    audio: 'Surround System + LED Lights',
    consoles: [
      '2× Nintendo Switch',
      '1× PlayStation 4 & 1× PlayStation 5',
      '1× Xbox One S & 1× Xbox Series X',
    ],
    addon: 'Oculus Quest 2',
    popular: false,
    highlight: false,
  },
  {
    id: 2,
    num: '02',
    name: 'DELUXE',
    subtitle: 'Gaming Truck',
    tvSetup: '6 TVs All Inside',
    tvCount: 6,
    amenities: ['A/C Units', 'Stadium Seating'],
    audio: 'Surround System + LED Lights',
    consoles: [
      '2× Nintendo Switch',
      '1× PlayStation 4 & 1× PlayStation 5',
      '1× Xbox One S & 1× Xbox Series X',
    ],
    addon: 'Oculus Quest 2',
    popular: true,
    highlight: true,
  },
  {
    id: 3,
    num: '03',
    name: 'ELITE',
    subtitle: 'Gaming Truck',
    tvSetup: '10 TVs All Inside',
    tvCount: 10,
    amenities: ['A/C Units', 'Stadium Seating'],
    audio: 'Surround System + LED Lights',
    consoles: [
      '2× Nintendo Switch',
      '3× PlayStation 4 & 1× PlayStation 5',
      '3× Xbox One S & 1× Xbox Series X',
    ],
    addon: 'Oculus Quest 2',
    popular: false,
    highlight: false,
  },
  {
    id: 4,
    num: '04',
    name: 'GAMING BUS',
    subtitle: 'Mobile Gaming Bus',
    tvSetup: '6 TVs All Inside',
    tvCount: 6,
    amenities: ['Stadium Seating'],
    audio: null,
    consoles: [
      '2× Nintendo Switch',
      '1× PlayStation 4 & 1× PlayStation 5',
      '1× Xbox & 1× Xbox Series X',
    ],
    addon: 'Oculus Quest 2',
    popular: false,
    highlight: false,
  },
]

const scrollToContact = () => {
  const el = document.getElementById('contact')
  if (el) el.scrollIntoView({ behavior: 'smooth' })
}
</script>

<template>
  <section id="prices" class="prices-section">
    <div class="container">

      <!-- Section Header -->
      <div class="section-header scroll-reveal">
        <span class="section-eyebrow">OUR FLEET</span>
        <h2>GAMING UNITS</h2>
        <!-- Mobile impact statement -->
        <div class="mobile-impact-headline">CHOOSE YOUR RIDE.</div>
        <p>Every gaming unit is fully equipped with premium consoles, surround sound, and LED lighting. We come to you.</p>
      </div>

      <!-- Truck Cards Grid -->
      <div class="trucks-grid">
        <div
          v-for="truck in trucks"
          :key="truck.id"
          class="truck-card scroll-reveal tilt-card"
          :class="{ highlight: truck.highlight }"
        >
          <!-- Popular badge -->
          <div v-if="truck.popular" class="popular-badge">
            <span>MOST POPULAR</span>
          </div>

          <!-- Card Header -->
          <div class="card-header">
            <span class="truck-num">{{ truck.num }}</span>
            <div class="truck-titles">
              <h3 class="truck-name">{{ truck.name }}</h3>
              <span class="truck-subtitle">{{ truck.subtitle }}</span>
            </div>
          </div>

          <!-- Divider -->
          <div class="card-divider"></div>

          <!-- Specs rows -->
          <div class="specs-list">

            <!-- TV Setup -->
            <div class="spec-row">
              <div class="spec-icon-wrap">
                <Tv :size="18" class="spec-icon" />
              </div>
              <div class="spec-text">
                <span class="spec-label">TV SETUP</span>
                <span class="spec-val">{{ truck.tvSetup }}</span>
              </div>
            </div>

            <!-- Amenities -->
            <div class="spec-row">
              <div class="spec-icon-wrap">
                <Wind :size="18" class="spec-icon" />
              </div>
              <div class="spec-text">
                <span class="spec-label">AMENITIES</span>
                <div class="pill-group">
                  <span
                    v-for="(item, idx) in truck.amenities"
                    :key="idx"
                    class="amenity-pill"
                  >{{ item }}</span>
                </div>
              </div>
            </div>

            <!-- Audio & Lights -->
            <div v-if="truck.audio" class="spec-row">
              <div class="spec-icon-wrap">
                <Volume2 :size="18" class="spec-icon" />
              </div>
              <div class="spec-text">
                <span class="spec-label">AUDIO & LIGHTS</span>
                <span class="spec-val">{{ truck.audio }}</span>
              </div>
            </div>

            <!-- Consoles -->
            <div class="spec-row">
              <div class="spec-icon-wrap">
                <Gamepad2 :size="18" class="spec-icon" />
              </div>
              <div class="spec-text">
                <span class="spec-label">CONSOLES INCLUDED</span>
                <ul class="console-list">
                  <li v-for="(c, cIdx) in truck.consoles" :key="cIdx">{{ c }}</li>
                </ul>
              </div>
            </div>

            <!-- Optional Addon -->
            <div class="spec-row addon-row">
              <div class="spec-icon-wrap addon-icon-wrap">
                <Plus :size="16" class="spec-icon" />
              </div>
              <div class="spec-text">
                <span class="spec-label addon-label">OPTIONAL ADD-ON</span>
                <span class="spec-val addon-val">{{ truck.addon }}</span>
              </div>
            </div>

          </div>

          <!-- Card Action Button -->
          <button
            class="btn-card-cta"
            :class="{ 'cta-highlight': truck.highlight }"
            @click="scrollToContact"
          >
            <span>INQUIRE NOW</span>
            <ChevronRight :size="16" class="btn-icon" />
          </button>
        </div>
      </div>

      <!-- Pricing Page Action Banner -->
      <div class="pricing-banner-action scroll-reveal">
        <div class="banner-text-block">
          <h4>Looking for detailed rates, hour packages & VR add-ons?</h4>
          <p>Check out our complete transparent pricing table and optional upgrades.</p>
        </div>
        <button class="btn-view-pricing" @click="router.push('/pricing')">
          <span>VIEW PRICING & PACKAGES</span>
          <ChevronRight :size="16" />
        </button>
      </div>

      <!-- Bottom note -->
      <p class="bottom-note">
        Contact us to book your truck or get more info — 
        <a :href="siteConfig.phoneTel" class="note-phone">{{ siteConfig.phone }}</a>
      </p>

    </div>
  </section>
</template>

<style scoped>
/* Action Banner */
.pricing-banner-action {
  margin-top: 3.5rem;
  background: rgba(14, 14, 20, 0.9);
  border: 1px solid rgba(255, 0, 43, 0.35);
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.8), inset 0 0 20px rgba(255, 0, 43, 0.05);
  border-radius: 6px;
  padding: 1.8rem 2.4rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1.8rem;
}

@media (max-width: 800px) {
  .pricing-banner-action {
    flex-direction: column;
    text-align: center;
    padding: 1.5rem;
  }
}

.banner-text-block h4 {
  font-family: var(--font-heading);
  font-size: 1.15rem;
  font-weight: 900;
  color: #ffffff;
  margin-bottom: 0.3rem;
}

.banner-text-block p {
  font-size: 0.92rem;
  color: rgba(255, 255, 255, 0.6);
}

.btn-view-pricing {
  display: inline-flex;
  align-items: center;
  gap: 0.6rem;
  background: #ff002b;
  color: #ffffff;
  font-family: var(--font-heading);
  font-size: 0.76rem;
  font-weight: 900;
  letter-spacing: 0.12em;
  padding: 0.9rem 1.6rem;
  border: none;
  cursor: pointer;
  white-space: nowrap;
  transition: all 0.25s ease;
  clip-path: polygon(5px 0, 100% 0, 100% calc(100% - 5px), calc(100% - 5px) 100%, 0 100%, 0 5px);
}

.btn-view-pricing:hover {
  background: #d60024;
  box-shadow: 0 0 25px rgba(255, 0, 43, 0.6);
  transform: translateY(-2px);
}
/* ============================================================
   SECTION WRAPPER
   ============================================================ */
.prices-section {
  padding: 7rem 0 6rem;
  position: relative;
  background: #000000;
}

/* ============================================================
   HEADER
   ============================================================ */
.section-header {
  text-align: center;
  max-width: 640px;
  margin: 0 auto 4rem;
}

.section-eyebrow {
  display: inline-block;
  font-family: var(--font-heading);
  font-size: 0.68rem;
  font-weight: 900;
  letter-spacing: 0.28em;
  color: #ff002b;
  margin-bottom: 0.8rem;
}

.section-header h2 {
  font-family: var(--font-heading);
  font-size: clamp(2rem, 4vw, 3rem);
  font-weight: 900;
  color: #ffffff;
  line-height: 1.05;
  margin-bottom: 1rem;
}

.text-red-glow {
  color: #ff002b;
}

.section-header p {
  font-size: 1rem;
  color: rgba(255, 255, 255, 0.45);
  line-height: 1.6;
}

/* Mobile impact headline (hidden on desktop) */
.mobile-impact-headline {
  display: none;
  font-family: var(--font-heading);
  font-size: clamp(2.2rem, 9vw, 3.5rem);
  font-weight: 900;
  color: #ffffff;
  line-height: 1.05;
  letter-spacing: -0.01em;
  margin: 0.5rem 0 1rem;
}

/* ============================================================
   GRID — 4 trucks, 2-column on desktop (Full Width)
   ============================================================ */
.trucks-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1.6rem;
  width: 100%;
}

@media (max-width: 860px) {
  .trucks-grid {
    grid-template-columns: 1fr;
  }
}

/* Mobile: horizontal snap-scroll carousel */
@media (max-width: 600px) {
  .prices-section {
    padding: 5rem 0 4.5rem;
  }

  .mobile-impact-headline {
    display: block;
  }

  .section-header h2 {
    display: none;
  }

  .section-header {
    margin-bottom: 2.5rem;
    padding: 0 0.5rem;
  }

  .section-header p {
    font-size: 0.92rem;
    padding: 0 0.5rem;
  }

  .trucks-grid {
    display: flex;
    flex-direction: row;
    overflow-x: auto;
    scroll-snap-type: x mandatory;
    -webkit-overflow-scrolling: touch;
    gap: 0.9rem;
    padding-bottom: 1.2rem;
    /* Hide scrollbar but keep functionality */
    scrollbar-width: none;
    -ms-overflow-style: none;
    margin-left: -1.25rem;
    /* Reserve space on the right for the ScrollNav indicator (right: 4px, ~28px wide) */
    margin-right: -2.5rem;
    padding-left: 1.25rem;
    padding-right: 2.5rem;
  }

  .trucks-grid::-webkit-scrollbar {
    display: none;
  }

  .truck-card {
    scroll-snap-align: start;
    flex-shrink: 0;
    /* Leave ~32px of room on the right edge so the card never sits under the ScrollNav */
    width: calc(100vw - 3.5rem);
    max-width: 300px;
    padding: 1.5rem 1.3rem;
  }

  .card-header {
    gap: 0.8rem;
    margin-bottom: 1rem;
  }

  .truck-num {
    font-size: 2.2rem;
  }

  .truck-name {
    font-size: 1.35rem;
  }

  .popular-badge {
    right: 1rem;
    font-size: 0.55rem;
    padding: 0.22rem 0.7rem;
  }

  .specs-list {
    gap: 0.85rem;
    margin-bottom: 1.4rem;
  }

  .spec-icon-wrap {
    width: 26px;
    height: 26px;
  }

  /* Force label + value to stack vertically (override inline-span default) */
  .spec-text {
    display: flex;
    flex-direction: column;
    gap: 0.25rem;
    min-width: 0;
    flex: 1;
  }

  .spec-label {
    display: block;
    line-height: 1.2;
  }

  .spec-val {
    font-size: 0.82rem;
    line-height: 1.4;
    display: block;
    word-break: break-word;
  }

  .console-list {
    list-style: none;
    display: flex;
    flex-direction: column;
    gap: 0.2rem;
    margin-top: 0.15rem;
  }

  .console-list li {
    font-size: 0.78rem;
    color: rgba(255, 255, 255, 0.78);
    font-weight: 600;
    padding-left: 0.85rem;
    position: relative;
    line-height: 1.4;
  }

  .console-list li::before {
    content: '·';
    position: absolute;
    left: 0;
    color: #ff002b;
    font-weight: 900;
    font-size: 1.1rem;
    line-height: 1;
  }

  /* Amenity pills */
  .pill-group {
    display: flex;
    flex-wrap: wrap;
    gap: 0.35rem;
    margin-top: 0.2rem;
  }

  .amenity-pill {
    display: inline-flex;
    align-items: center;
    font-size: 0.7rem;
    font-weight: 700;
    color: rgba(255, 255, 255, 0.82);
    background: rgba(255, 255, 255, 0.04);
    border: 1px solid rgba(255, 255, 255, 0.1);
    padding: 0.22rem 0.55rem;
    border-radius: 3px;
    line-height: 1.3;
  }

  .btn-card-cta {
    font-size: 0.75rem;
    padding: 0.95rem 1.2rem;
    min-height: 48px;
    margin-top: 1.2rem;
  }

  /* Pricing banner action */
  .pricing-banner-action {
    margin: 2.5rem 0.5rem 0;
    padding: 1.3rem 1.1rem;
  }

  .banner-text-block h4 {
    font-size: 1rem;
  }

  .banner-text-block p {
    font-size: 0.85rem;
  }

  .btn-view-pricing {
    font-size: 0.7rem;
    padding: 0.8rem 1.2rem;
  }

  .bottom-note {
    font-size: 0.78rem;
    padding: 0 1rem;
  }
}


/* ============================================================
   TRUCK CARD
   ============================================================ */
.truck-card {
  position: relative;
  background: rgba(10, 10, 16, 0.9);
  border: 1px solid rgba(255, 255, 255, 0.09);
  border-radius: 4px;
  padding: 2rem;
  display: flex;
  flex-direction: column;
  gap: 0;
  transition: border-color 0.3s ease, box-shadow 0.3s ease;
}

.truck-card:hover {
  border-color: rgba(255, 0, 43, 0.4);
  box-shadow: 0 0 30px rgba(255, 0, 43, 0.12);
}

.truck-card.highlight {
  border-color: #ff002b;
  box-shadow: 0 0 40px rgba(255, 0, 43, 0.3), inset 0 0 20px rgba(255, 0, 43, 0.05);
}

/* Popular badge */
.popular-badge {
  position: absolute;
  top: -1px;
  right: 1.5rem;
  background: #ff002b;
  padding: 0.28rem 0.9rem;
  font-family: var(--font-heading);
  font-size: 0.6rem;
  font-weight: 900;
  letter-spacing: 0.18em;
  color: #ffffff;
  border-radius: 0 0 4px 4px;
  box-shadow: 0 4px 14px rgba(255, 0, 43, 0.5);
}

/* Card header: number + title */
.card-header {
  display: flex;
  align-items: center;
  gap: 1.2rem;
  margin-bottom: 1.2rem;
}

.truck-num {
  font-family: var(--font-heading);
  font-size: 2.8rem;
  font-weight: 900;
  color: rgba(255, 0, 43, 0.25);
  line-height: 1;
  flex-shrink: 0;
  transition: color 0.3s ease;
}

.truck-card.highlight .truck-num,
.truck-card:hover .truck-num {
  color: rgba(255, 0, 43, 0.6);
}

.truck-titles {
  display: flex;
  flex-direction: column;
}

.truck-name {
  font-family: var(--font-heading);
  font-size: 1.6rem;
  font-weight: 900;
  color: #ffffff;
  line-height: 1;
  letter-spacing: 0.02em;
}

.truck-subtitle {
  font-size: 0.68rem;
  font-weight: 700;
  letter-spacing: 0.18em;
  color: rgba(255, 255, 255, 0.35);
  text-transform: uppercase;
  margin-top: 0.2rem;
}

/* Divider */
.card-divider {
  height: 1px;
  background: linear-gradient(90deg, #ff002b 0%, rgba(255, 255, 255, 0.06) 60%, transparent 100%);
  margin-bottom: 1.4rem;
}

/* ============================================================
   SPEC ROWS
   ============================================================ */
.specs-list {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  flex-grow: 1;
  margin-bottom: 1.8rem;
}

.spec-row {
  display: flex;
  align-items: flex-start;
  gap: 0.85rem;
}

.spec-text {
  display: flex;
  flex-direction: column;
  gap: 0.2rem;
  min-width: 0;
  flex: 1;
}

.spec-label {
  display: block;
  line-height: 1.2;
}

.spec-icon-wrap {
  width: 28px;
  height: 28px;
  border-radius: 4px;
  background: rgba(255, 0, 43, 0.1);
  border: 1px solid rgba(255, 0, 43, 0.25);
  display: flex;
  align-items: center;
  justify-content: center;
  color: #ff002b;
  flex-shrink: 0;
  margin-top: 1px;
}

.addon-icon {
  background: rgba(255, 255, 255, 0.04);
  border-color: rgba(255, 255, 255, 0.1);
  color: rgba(255, 255, 255, 0.4);
}

.spec-content {
  display: flex;
  flex-direction: column;
  gap: 0.1rem;
}

.spec-label {
  font-family: var(--font-heading);
  font-size: 0.58rem;
  font-weight: 900;
  letter-spacing: 0.2em;
  color: rgba(255, 0, 43, 0.7);
}

.spec-value {
  font-size: 0.86rem;
  color: rgba(255, 255, 255, 0.82);
  font-weight: 600;
  line-height: 1.4;
}

/* Consoles list */
.consoles-list {
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 0.15rem;
  margin-top: 0.1rem;
}

.consoles-list li {
  font-size: 0.84rem;
  color: rgba(255, 255, 255, 0.78);
  font-weight: 600;
  padding-left: 0.8rem;
  position: relative;
}

.consoles-list li::before {
  content: '·';
  position: absolute;
  left: 0;
  color: #ff002b;
  font-weight: 900;
}

/* Add-on */
.addon-value {
  font-size: 0.8rem;
  color: rgba(255, 255, 255, 0.4);
}

.addon-value em {
  font-style: italic;
  color: rgba(255, 255, 255, 0.28);
}

/* ============================================================
   CTA BUTTON
   ============================================================ */
.btn-card-cta {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.6rem;
  width: 100%;
  padding: 1.1rem 1.4rem;
  min-height: 52px;
  background: #000000;
  color: #ffffff;
  border: 1.5px solid #ff002b;
  box-shadow: 0 0 16px rgba(255, 0, 43, 0.45);
  font-family: var(--font-heading);
  font-size: 0.82rem;
  font-weight: 900;
  letter-spacing: 0.1em;
  cursor: pointer;
  clip-path: polygon(8px 0, 100% 0, 100% calc(100% - 8px), calc(100% - 8px) 100%, 0 100%, 0 8px);
  transition: all 0.3s ease;
  margin-top: 1.4rem;
}

.btn-card-cta .btn-icon {
  color: #ff002b;
  transition: transform 0.25s ease, color 0.25s ease;
}

.btn-card-cta:hover {
  background: #ff002b;
  color: #ffffff;
  box-shadow: 0 0 25px rgba(255, 0, 43, 0.85);
  transform: translateY(-2px);
}

.btn-card-cta:hover .btn-icon {
  color: #ffffff;
  transform: translateX(4px);
}

.btn-card-cta.cta-highlight {
  background: #ff002b;
  color: #ffffff;
  box-shadow: 0 0 24px rgba(255, 0, 43, 0.65);
}

.btn-card-cta.cta-highlight:hover {
  background: #d40024;
  box-shadow: 0 0 34px rgba(255, 0, 43, 0.95);
  transform: translateY(-2px);
}

/* ============================================================
   BOTTOM NOTE
   ============================================================ */
.bottom-note {
  text-align: center;
  margin-top: 2.5rem;
  font-size: 0.82rem;
  color: rgba(255, 255, 255, 0.28);
}

.note-phone {
  color: #ff002b;
  text-decoration: none;
  font-weight: 700;
  transition: color 0.2s ease;
}

.note-phone:hover {
  color: #ff4466;
}
</style>
