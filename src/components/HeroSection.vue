<script setup>
import { ref, computed, onMounted, onUnmounted, nextTick } from 'vue'
import { ChevronDown, ChevronRight, Gamepad2, Users, Truck, Phone, Tv, Wind, Sparkles, MapPin } from 'lucide-vue-next'
import siteConfig from '../config/siteConfig.js'
import { truckAlt } from '../utils/imageAlt.js'

const videoRef = ref(null)
const selectedVehicle = ref(null)

const parallaxX = ref(0)
const parallaxY = ref(0)

const vehicles = [
  {
    id: 1,
    num: '01',
    title: 'STANDARD',
    subtitle: 'GAMING TRUCK',
    displays: '6 DISPLAYS',
    detail: '4 INSIDE / 2 OUTSIDE',
    image: '/trucks/01.png',
    webp: '/trucks/01.webp'
  },
  {
    id: 2,
    num: '02',
    title: 'DELUXE',
    subtitle: 'GAMING TRUCK',
    displays: '6 DISPLAYS',
    detail: 'ALL INSIDE',
    image: '/trucks/02.png',
    webp: '/trucks/02.webp'
  },
  {
    id: 3,
    num: '03',
    title: 'ELITE',
    subtitle: 'GAMING TRUCK',
    displays: '10 DISPLAYS',
    detail: 'ALL INSIDE',
    image: '/trucks/03.jpg',
    webp: '/trucks/03.webp'
  },
  {
    id: 4,
    num: '04',
    title: 'GAMING BUS',
    subtitle: 'MOBILE GAMING BUS',
    displays: '6 DISPLAYS',
    detail: 'ALL INSIDE',
    image: '/trucks/04.png',
    webp: '/trucks/04.webp'
  }
]

import { useRouter } from 'vue-router'
import { useSelectedTruck } from '../composables/useSelectedTruck.js'
const router = useRouter()
const { setSelectedTruckId } = useSelectedTruck()

// Smooth scroll helper that respects fixed header offset across desktop and mobile
const smoothScrollTo = (targetId) => {
  const el = document.getElementById(targetId)
  if (!el) return
  const isMobile = typeof window !== 'undefined' && window.innerWidth <= 768
  const navOffset = isMobile ? 70 : 92
  const rect = el.getBoundingClientRect()
  const targetTop = rect.top + window.pageYOffset - navOffset

  window.scrollTo({
    top: Math.max(0, targetTop),
    behavior: 'smooth'
  })
}

// Navigate from the "POWERFUL CONSOLES" hero card to the OUR FLEET section (#prices).
const goToFleet = () => {
  const onHome = router.currentRoute.value.path === '/' || router.currentRoute.value.path === ''
  if (onHome) {
    smoothScrollTo('prices')
  } else {
    router.push({ path: '/', hash: '#prices' })
  }
}

// Navigate from the "PERFECT FOR ANY EVENT" hero card to the EVENTS section (#events).
const goToEvents = () => {
  const onHome = router.currentRoute.value.path === '/' || router.currentRoute.value.path === ''
  if (onHome) {
    smoothScrollTo('events')
  } else {
    router.push({ path: '/', hash: '#events' })
  }
}

const hoveredVehicle = ref(null)

const handleMouseMove = (e) => {
  const { clientX, clientY } = e
  const centerX = window.innerWidth / 2
  const centerY = window.innerHeight / 2
  parallaxX.value = (clientX - centerX) * 0.02
  parallaxY.value = (clientY - centerY) * 0.02
}

const startVideo = () => {
  if (videoRef.value) {
    videoRef.value.muted = true
    videoRef.value.defaultMuted = true
    videoRef.value.play().catch(() => {})
  }
}

onMounted(() => {
  window.addEventListener('mousemove', handleMouseMove)
  startVideo()
  setTimeout(startVideo, 200)
  setTimeout(startVideo, 600)
})

onUnmounted(() => {
  window.removeEventListener('mousemove', handleMouseMove)
})

const navigateToContact = () => {
  const onHome = router.currentRoute.value.path === '/' || router.currentRoute.value.path === ''
  if (onHome) {
    smoothScrollTo('contact')
  } else {
    router.push({ path: '/', hash: '#contact' })
  }
}

const navigateToTrucks = (truckId = null) => {
  if (truckId !== null) {
    selectedVehicle.value = truckId
    setSelectedTruckId(truckId)
  }
  const onHome = router.currentRoute.value.path === '/' || router.currentRoute.value.path === ''
  if (onHome) {
    smoothScrollTo('prices')
  } else {
    router.push({ path: '/', hash: '#prices' })
  }
}
</script>

<template>
  <section id="hero" class="home-hero-mockup-section">
    <!-- Full-Width Background Video (vid01.mp4) with Parallax Overlay -->
    <div 
      class="hero-bg-wrapper"
      :style="{ transform: `translate3d(${parallaxX * -0.6}px, ${parallaxY * -0.6}px, 0)` }"
    >
      <video
        ref="videoRef"
        autoplay
        loop
        muted
        playsinline
        webkit-playsinline
        preload="auto"
        class="hero-bg-video"
      >
        <source src="/vid01.mp4" type="video/mp4" />
        <source src="https://assets.mixkit.co/videos/preview/mixkit-gaming-room-with-neon-lights-42998-large.mp4" type="video/mp4" />
      </video>
      <div class="hero-bg-dark-overlay"></div>
    </div>

    <!-- Main Dashboard Workspace Layout (Floating over Video Background) -->
    <div 
      class="hero-dashboard-container"
      :style="{ transform: `translate3d(${parallaxX * 0.3}px, ${parallaxY * 0.3}px, 0)` }"
    >
      <!-- 1. Top Section: Hero Titles, Sublines & Texts -->
      <div class="hero-top-showcase">
        <div class="showcase-content">
          <!-- Location badge -->
          <div class="hero-location-badge">
            <MapPin :size="13" class="text-red flex-shrink-0" />
            <span>{{ siteConfig.location }}</span>
          </div>

          <span class="tagline-sub">WE DON'T JUST BRING GAMES.</span>
          
          <h1 class="hero-headline">
            WE BRING <span class="text-red-glow">THE ULTIMATE EXPERIENCE.</span>
            <span class="hero-h1-service">GAMING TRUCK SERVICES · LOS ANGELES, CA</span>
          </h1>

          <p class="hero-subtext">
            Premier mobile gaming truck & esports services in Los Angeles. Top consoles. Epic setups. Unforgettable parties.
          </p>
        </div>
      </div>

      <!-- 2. Middle Section: Horizontal Fleet Strip spanning Full Width -->
      <div class="hero-fleet-strip">
        <div class="fleet-strip-header">
          <div class="fleet-strip-title-group">
            <span class="fleet-strip-tag">EXPLORE OUR FLEET</span>
            <span class="fleet-strip-divider"></span>
            <span class="fleet-strip-sub">FOUR DISTINCT GAMING UNITS</span>
          </div>
          <button type="button" class="fleet-view-all-btn" @click="() => navigateToTrucks()">
            <span>COMPARE ALL UNITS</span>
            <ChevronRight :size="13" class="text-red" />
          </button>
        </div>

        <div class="fleet-cards-grid">
          <div
            v-for="v in vehicles"
            :key="v.id"
            class="fleet-card floating-hud-glass"
            :class="{ active: selectedVehicle === v.id, hovered: hoveredVehicle === v.id }"
            @mouseenter="hoveredVehicle = v.id"
            @mouseleave="hoveredVehicle = null"
            @click="() => navigateToTrucks(v.id)"
          >
            <div class="panel-tech-corner top-left"></div>
            <div class="panel-tech-corner top-right"></div>
            <div class="panel-tech-corner bottom-left"></div>
            <div class="panel-tech-corner bottom-right"></div>

            <!-- Top info: number, title, displays & specs -->
            <div class="fleet-card-info">
              <div class="f-info-left">
                <span class="f-num bright-red-num">{{ v.num }}</span>
                <div class="f-titles">
                  <h4 class="f-title">{{ v.title }}</h4>
                  <span class="f-chip">{{ v.subtitle }}</span>
                </div>
              </div>
              <div class="f-specs">
                <div class="f-displays-row text-red">
                  <Tv :size="12" class="f-display-icon" />
                  <span class="f-displays">{{ v.displays }}</span>
                </div>
                <span class="f-detail">{{ v.detail }}</span>
              </div>
            </div>

            <!-- Bottom: Floating truck showcase -->
            <div class="fleet-card-showcase">
              <div class="showcase-floor"></div>
              <div class="showcase-floor-grid"></div>
              <picture>
                <source :srcset="v.webp" type="image/webp" />
                <img :src="v.image" :alt="truckAlt(v)" class="f-img" fetchpriority="high" decoding="async" />
              </picture>
              <div class="f-action-bar">
                <span class="f-select-text">VIEW SPECS</span>
                <ChevronRight :size="14" class="f-arrow" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 4. Bottom Ticker / Feature Highlights Bar -->
    <div class="bottom-features-bar">
      <button type="button" class="feature-col feature-col-link" @click="goToFleet">
        <div class="feat-icon-box">
          <Gamepad2 :size="20" class="text-red flex-shrink-0 feat-icon" />
        </div>
        <div class="feat-text">
          <h5 class="feat-title">POWERFUL CONSOLES <ChevronRight :size="12" class="feat-arrow" /></h5>
          <p class="feat-desc">PS5, Xbox Series X, Nintendo Switch & more.</p>
        </div>
      </button>

      <button type="button" class="feature-col feature-col-link" @click="goToEvents">
        <div class="feat-icon-box">
          <Users :size="20" class="text-red flex-shrink-0 feat-icon" />
        </div>
        <div class="feat-text">
          <h5 class="feat-title">PERFECT FOR ANY EVENT <ChevronRight :size="12" class="feat-arrow" /></h5>
          <p class="feat-desc">Birthdays, school events, corporate events & more.</p>
        </div>
      </button>

      <router-link to="/party-essentials" class="feature-col feature-col-link feature-col-cta">
        <div class="feat-icon-box">
          <Sparkles :size="20" class="text-red flex-shrink-0 feat-icon" />
        </div>
        <div class="feat-text">
          <h5 class="feat-title">EXPLORE THE EXPERIENCE <ChevronRight :size="12" class="feat-arrow" /></h5>
          <p class="feat-desc">Choose what your party needs.</p>
        </div>
      </router-link>

      <a :href="siteConfig.phoneTel" class="feature-col feature-col-link">
        <div class="feat-icon-box">
          <Phone :size="20" class="text-red flex-shrink-0 feat-icon" />
        </div>
        <div class="feat-text">
          <h5 class="feat-title">CALL OR TEXT <ChevronRight :size="12" class="feat-arrow" /></h5>
          <p class="feat-desc"><strong class="text-red">{{ siteConfig.phone }}</strong> — Let's book your experience.</p>
        </div>
      </a>
    </div>
  </section>
</template>

<style scoped>
.home-hero-mockup-section {
  width: 100%;
  max-width: 100%;
  height: 100vh;
  position: relative;
  overflow: hidden;
  background-color: #000000;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

/* Background Video & Dark Overlay */
.hero-bg-wrapper {
  position: absolute;
  top: -5%;
  left: -5%;
  width: 110%;
  height: 110%;
  z-index: 0;
  /* Solid dark fallback shown while the video loads — prevents the
     flash of the previous poster image (e.g. a gallery photo). */
  background-color: #000000;
  background-image:
    radial-gradient(
      ellipse at 70% 50%,
      rgba(40, 30, 45, 0.5) 0%,
      rgba(0, 0, 0, 0.9) 60%,
      #000000 100%
    );
}

.hero-bg-video {
  width: 100%;
  height: 100%;
  object-fit: cover;
  filter: brightness(0.95) contrast(1.12) saturate(1.15);
}

/* Dynamic Multi-Stop Gradient Overlay */
.hero-bg-dark-overlay {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  background: 
    linear-gradient(
      180deg, 
      rgba(0, 0, 0, 0.82) 0%, 
      rgba(0, 0, 0, 0.45) 35%, 
      rgba(0, 0, 0, 0.55) 70%, 
      rgba(0, 0, 0, 0.94) 100%
    ),
    radial-gradient(
      ellipse at 50% 40%,
      transparent 0%,
      rgba(0, 0, 0, 0.4) 60%,
      rgba(0, 0, 0, 0.85) 100%
    );
  pointer-events: none;
}

/* Main Dashboard Layout */
.hero-dashboard-container {
  position: relative;
  z-index: 2;
  width: 100%;
  max-width: 1540px;
  margin: 0 auto;
  padding: 6.2rem 2.5rem 1.2rem 2.5rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  flex: 1 1 auto;
  gap: 1.4rem;
}

/* Floating Glass HUD Base */
.floating-hud-glass {
  background: rgba(8, 8, 14, 0.9);
  backdrop-filter: blur(28px);
  -webkit-backdrop-filter: blur(28px);
  border: 1.5px solid rgba(255, 255, 255, 0.16);
  box-shadow: 0 16px 45px rgba(0, 0, 0, 0.95), inset 0 0 20px rgba(255, 0, 43, 0.08);
  border-radius: 6px;
  position: relative;
  overflow: visible;
}

.panel-tech-corner {
  position: absolute;
  width: 10px;
  height: 10px;
  border-color: #ff002b;
  border-style: solid;
  pointer-events: none;
  z-index: 5;
}
.panel-tech-corner.top-left {
  top: -2px;
  left: -2px;
  border-width: 2px 0 0 2px;
}
.panel-tech-corner.top-right {
  top: -2px;
  right: -2px;
  border-width: 2px 2px 0 0;
}
.panel-tech-corner.bottom-left {
  bottom: -2px;
  left: -2px;
  border-width: 0 0 2px 2px;
}
.panel-tech-corner.bottom-right {
  bottom: -2px;
  right: -2px;
  border-width: 0 2px 2px 0;
}

/* 1. Top Showcase: Titles, Sublines & Texts */
.hero-top-showcase {
  display: flex;
  flex-direction: column;
  width: 100%;
  position: relative;
}

.hero-location-badge {
  display: inline-flex;
  align-items: center;
  gap: 0.45rem;
  padding: 0.35rem 0.85rem;
  margin-bottom: 0.65rem;
  width: fit-content;
  background: rgba(8, 8, 14, 0.88);
  border: 1px solid rgba(255, 0, 43, 0.4);
  border-radius: 9999px;
  box-shadow: 0 0 16px rgba(255, 0, 43, 0.25), inset 0 0 8px rgba(255, 0, 43, 0.15);
  font-family: var(--font-heading);
  font-size: 0.74rem;
  font-weight: 800;
  letter-spacing: 0.14em;
  color: #ffffff;
  text-transform: uppercase;
}

.tagline-sub {
  font-family: var(--font-heading);
  font-size: 0.82rem;
  font-weight: 800;
  letter-spacing: 0.2em;
  color: #ffffff;
  margin-bottom: 0.45rem;
  display: block;
  text-shadow: 0 2px 10px rgba(0, 0, 0, 0.95);
}

.hero-headline {
  font-family: var(--font-heading);
  font-size: clamp(2.2rem, 3.8vw, 3.6rem);
  font-weight: 900;
  line-height: 1.05;
  letter-spacing: -0.02em;
  color: #ffffff;
  margin-bottom: 0.55rem;
  text-shadow: 
    0 4px 30px rgba(0, 0, 0, 0.98), 
    0 2px 12px rgba(0, 0, 0, 0.95), 
    0 0 45px rgba(0, 0, 0, 0.85);
}

.text-red-glow {
  color: #ff002b !important;
  text-shadow: 
    0 0 25px rgba(255, 0, 43, 0.8), 
    0 4px 30px rgba(0, 0, 0, 0.98), 
    0 2px 10px rgba(0, 0, 0, 0.95) !important;
}

.hero-h1-service {
  display: block;
  margin-top: 0.55rem;
  font-family: var(--font-heading);
  font-size: 0.78rem;
  font-weight: 800;
  letter-spacing: 0.26em;
  color: rgba(255, 255, 255, 0.92);
  text-shadow: 0 2px 12px rgba(0, 0, 0, 0.95);
}

.hero-subtext {
  font-size: 1.05rem;
  font-weight: 500;
  color: #d1d5e5;
  line-height: 1.45;
  text-shadow: 0 2px 15px rgba(0, 0, 0, 0.98);
  max-width: 780px;
}

/* 2. Middle Section: Horizontal Fleet Strip spanning Full Width */
.hero-fleet-strip {
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.fleet-strip-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  padding: 0 0.2rem;
}

.fleet-strip-title-group {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.fleet-strip-tag {
  font-family: var(--font-heading);
  font-size: 0.78rem;
  font-weight: 800;
  letter-spacing: 0.2em;
  color: #ff002b;
  text-shadow: 0 0 10px rgba(255, 0, 43, 0.7);
  text-transform: uppercase;
}

.fleet-strip-divider {
  display: inline-block;
  width: 20px;
  height: 1.5px;
  background: rgba(255, 255, 255, 0.3);
}

.fleet-strip-sub {
  font-family: var(--font-heading);
  font-size: 0.68rem;
  font-weight: 700;
  letter-spacing: 0.14em;
  color: #e5e7eb;
  text-transform: uppercase;
}

.fleet-view-all-btn {
  background: transparent;
  border: none;
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  font-family: var(--font-heading);
  font-size: 0.68rem;
  font-weight: 800;
  letter-spacing: 0.14em;
  color: #ffffff;
  cursor: pointer;
  padding: 0.25rem 0.5rem;
  transition: all 0.2s ease;
}

.fleet-view-all-btn:hover {
  color: #ff002b;
  text-shadow: 0 0 10px rgba(255, 0, 43, 0.8);
}

.fleet-cards-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1.1rem;
  width: 100%;
}

.fleet-card {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 0.75rem 0.95rem 0.65rem 0.95rem;
  cursor: pointer;
  transition: all 0.28s cubic-bezier(0.16, 1, 0.3, 1);
  position: relative;
  background: rgba(10, 10, 16, 0.88);
  border: 1.5px solid rgba(255, 255, 255, 0.14);
  border-radius: 6px;
  overflow: hidden;
}

.fleet-card:hover {
  background: linear-gradient(180deg, rgba(255, 0, 43, 0.16) 0%, rgba(18, 12, 18, 0.96) 100%);
  border-color: #ff002b;
  box-shadow: 
    0 12px 35px rgba(0, 0, 0, 0.9), 
    0 0 24px rgba(255, 0, 43, 0.5), 
    inset 0 0 15px rgba(255, 0, 43, 0.15);
  transform: translateY(-4px);
}

.fleet-card.active {
  border-color: #ff002b;
  box-shadow: 0 0 22px rgba(255, 0, 43, 0.55);
}

.fleet-card-info {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 0.5rem;
  margin-bottom: 0.25rem;
}

.f-info-left {
  display: flex;
  align-items: center;
  gap: 0.55rem;
  min-width: 0;
}

.bright-red-num {
  font-family: var(--font-heading);
  font-size: 1.15rem;
  font-weight: 900;
  line-height: 1;
  color: #ff002b;
  text-shadow: 0 0 12px rgba(255, 0, 43, 0.6);
  flex-shrink: 0;
}

.f-titles {
  display: flex;
  flex-direction: column;
  gap: 0.12rem;
  min-width: 0;
}

.f-title {
  font-family: var(--font-heading);
  font-size: 0.95rem;
  font-weight: 900;
  color: #ffffff;
  letter-spacing: 0.04em;
  line-height: 1;
}

.f-chip {
  font-family: var(--font-heading);
  font-size: 0.52rem;
  font-weight: 800;
  letter-spacing: 0.08em;
  color: #d1d5e5;
  text-transform: uppercase;
}

.f-specs {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 0.08rem;
  text-align: right;
  flex-shrink: 0;
}

.f-displays-row {
  display: flex;
  align-items: center;
  gap: 0.3rem;
  color: #ff002b;
}

.f-display-icon {
  color: #ff002b;
  flex-shrink: 0;
}

.f-displays {
  font-size: 0.68rem;
  font-weight: 800;
  letter-spacing: 0.06em;
  color: #ffffff;
  text-shadow: 0 1px 4px rgba(0, 0, 0, 0.9);
}

.f-detail {
  font-size: 0.56rem;
  font-weight: 600;
  color: #d1d5e5;
  letter-spacing: 0.03em;
}

.fleet-card-showcase {
  position: relative;
  width: 100%;
  height: 145px;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
}

.showcase-floor {
  position: absolute;
  left: 50%;
  bottom: 6px;
  width: 60%;
  height: 6px;
  transform: translateX(-50%);
  background: radial-gradient(
    ellipse at center,
    rgba(255, 0, 43, 0.4) 0%,
    rgba(255, 0, 43, 0.12) 45%,
    transparent 75%
  );
  filter: blur(3px);
  pointer-events: none;
}

.showcase-floor-grid {
  position: absolute;
  inset: 0;
  background-image:
    linear-gradient(rgba(255, 255, 255, 0.04) 1px, transparent 1px),
    linear-gradient(90deg, rgba(255, 255, 255, 0.04) 1px, transparent 1px);
  background-size: 14px 14px;
  mask-image: radial-gradient(ellipse at center, black 0%, transparent 70%);
  -webkit-mask-image: radial-gradient(ellipse at center, black 0%, transparent 70%);
  pointer-events: none;
}

.fleet-card-showcase picture {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 2;
}

.f-img {
  position: relative;
  z-index: 2;
  width: 100%;
  height: 100%;
  object-fit: contain;
  object-position: center center;
  padding: 2px 4px;
  image-rendering: high-quality;
  filter: drop-shadow(0 4px 10px rgba(0, 0, 0, 0.7));
  transition: transform 0.35s cubic-bezier(0.16, 1, 0.3, 1);
  pointer-events: none;
}

.fleet-card:hover .f-img {
  transform: translateY(-2px) scale(1.06);
}

.f-action-bar {
  position: absolute;
  right: 0.2rem;
  bottom: 0.1rem;
  z-index: 3;
  display: inline-flex;
  align-items: center;
  gap: 0.25rem;
  font-family: var(--font-heading);
  font-size: 0.56rem;
  font-weight: 800;
  letter-spacing: 0.1em;
  color: #d1d5e5;
  transition: all 0.2s ease;
}

.fleet-card:hover .f-action-bar {
  color: #ff002b;
}

.fleet-card:hover .f-arrow {
  transform: translateX(3px);
  color: #ff002b;
}

/* 4. Bottom Ticker / Feature Highlights Bar */
.bottom-features-bar {
  position: relative;
  z-index: 2;
  width: 100%;
  background: rgba(8, 8, 12, 0.96);
  backdrop-filter: blur(14px);
  -webkit-backdrop-filter: blur(14px);
  border-top: 1px solid rgba(255, 255, 255, 0.14);
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  padding: 0.85rem 2rem;
  overflow: hidden;
}

.feature-col {
  display: flex;
  align-items: center;
  gap: 0.9rem;
  padding: 0.5rem 1rem;
  border-right: 1px solid rgba(255, 255, 255, 0.08);
  /* Reset for the tappable variant — see .feature-col-link below */
  background: transparent;
  color: inherit;
  text-align: left;
  font: inherit;
  text-decoration: none;
  position: relative;
}

.feature-col:last-child {
  border-right: none;
}

/* Tappable feature variant — used for cards that navigate (e.g. POWERFUL
   CONSOLES → OUR FLEET). Looks like the rest of the bar but adds a hover
   glow, an active press state, and a chevron hint so it's obvious the
   card is clickable. */
.feature-col-link {
  cursor: pointer;
  position: relative;
  transition: background 0.3s cubic-bezier(0.16, 1, 0.3, 1),
              transform 0.25s cubic-bezier(0.16, 1, 0.3, 1),
              box-shadow 0.3s ease;
  text-decoration: none;
  border-radius: 4px;
}

/* Glowing top neon laser line indicator on hover */
.feature-col-link::before {
  content: '';
  position: absolute;
  top: -0.85rem;
  left: 0;
  right: 0;
  height: 2px;
  background: linear-gradient(90deg, transparent, #ff002b 30%, #ff4d6d 50%, #ff002b 70%, transparent);
  opacity: 0;
  transform: scaleX(0.3);
  transition: opacity 0.3s ease, transform 0.35s cubic-bezier(0.16, 1, 0.3, 1);
  box-shadow: 0 0 12px #ff002b, 0 0 24px rgba(255, 0, 43, 0.8);
  pointer-events: none;
}

.feature-col-link:hover::before {
  opacity: 1;
  transform: scaleX(1);
}

/* Subtle glass shimmer background on hover */
.feature-col-link:hover {
  background: linear-gradient(180deg, rgba(255, 0, 43, 0.09) 0%, rgba(255, 255, 255, 0.02) 100%);
  transform: translateY(-2px);
}

.feature-col-link:active {
  background: rgba(255, 0, 43, 0.16);
  transform: scale(0.98) translateY(0);
}

.feature-col-link:hover,
.feature-col-link:focus,
.feature-col-link:active {
  text-decoration: none;
}

/* Icon Container & Hover Animation */
.feat-icon-box {
  width: 38px;
  height: 38px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(255, 0, 43, 0.08);
  border: 1px solid rgba(255, 0, 43, 0.25);
  border-radius: 6px;
  flex-shrink: 0;
  transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
}

.feat-icon {
  transition: transform 0.3s cubic-bezier(0.16, 1, 0.3, 1),
              filter 0.3s ease;
}

.feature-col-link:hover .feat-icon-box {
  background: rgba(255, 0, 43, 0.22);
  border-color: rgba(255, 0, 43, 0.7);
  box-shadow: 0 0 16px rgba(255, 0, 43, 0.5), inset 0 0 8px rgba(255, 0, 43, 0.25);
  transform: scale(1.08);
}

.feature-col-link:hover .feat-icon {
  transform: scale(1.12);
  filter: drop-shadow(0 0 8px rgba(255, 0, 43, 0.95));
}

.feat-text {
  display: flex;
  flex-direction: column;
}

.feat-title {
  font-family: var(--font-heading);
  font-weight: 900;
  font-size: 0.82rem;
  letter-spacing: 0.08em;
  color: #ffffff;
  line-height: 1.15;
  text-decoration: none;
  text-shadow: 0 1px 6px rgba(0, 0, 0, 0.95);
  display: flex;
  align-items: center;
  gap: 0.25rem;
  transition: color 0.25s ease, text-shadow 0.25s ease;
}

.feature-col-link:hover .feat-title {
  color: #ffffff;
  text-shadow: 0 0 12px rgba(255, 0, 43, 0.6), 0 1px 6px rgba(0, 0, 0, 0.95);
}

.feature-col-link .feat-arrow {
  display: inline-block;
  color: #ff002b;
  margin-left: 0.15rem;
  transition: transform 0.3s cubic-bezier(0.16, 1, 0.3, 1), filter 0.3s ease;
}

.feature-col-link:hover .feat-arrow {
  transform: translateX(4px);
  filter: drop-shadow(0 0 6px rgba(255, 0, 43, 0.9));
}

.feat-desc {
  font-size: 0.78rem;
  font-weight: 500;
  color: #e5e7eb;
  line-height: 1.35;
  text-decoration: none;
  text-shadow: 0 1px 4px rgba(0, 0, 0, 0.9);
  -webkit-font-smoothing: antialiased;
  transition: color 0.25s ease;
}

.feature-col-link:hover .feat-desc {
  color: #ffffff;
}

.flex-shrink-0 {
  flex-shrink: 0;
}

@media (max-width: 1200px) {
  .hero-dashboard-container {
    padding-top: 5.8rem;
    padding-right: 1.8rem;
    padding-left: 1.8rem;
  }
  .fleet-cards-grid {
    gap: 0.8rem;
  }
}

/* ── TABLET (992px) ── */
@media (max-width: 992px) {
  .home-hero-mockup-section {
    height: auto;
    min-height: 100vh;
  }
  .hero-dashboard-container {
    padding: 5.6rem 1.5rem 1.5rem 1.5rem;
    gap: 1.2rem;
    height: auto;
  }
  .fleet-cards-grid {
    grid-template-columns: repeat(2, 1fr);
    gap: 0.85rem;
  }
  .bottom-features-bar {
    grid-template-columns: repeat(2, 1fr);
    gap: 0.8rem;
  }
}

/* ── MOBILE (<768px): Full immersive hero ── */
@media (max-width: 768px) {
  .home-hero-mockup-section {
    height: auto;
    min-height: 100svh;
  }

  /* On mobile, parallax can cause jitter — disable */
  .hero-bg-wrapper {
    transform: none !important;
  }

  .hero-dashboard-container {
    transform: none !important;
    padding: 5.5rem 1rem 1rem 1rem;
    gap: 1rem;
    height: auto;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
  }

  .tagline-sub {
    font-size: 0.72rem;
    letter-spacing: 0.2em;
    margin-bottom: 0.4rem;
    color: #ffffff;
    text-shadow: 0 1px 4px rgba(0, 0, 0, 0.9);
  }

  .hero-headline {
    font-size: clamp(1.85rem, 7.5vw, 2.6rem);
    line-height: 1.05;
    margin-bottom: 0.6rem;
  }

  .hero-h1-service {
    font-size: 0.62rem;
    letter-spacing: 0.18em;
    margin-top: 0.4rem;
    color: rgba(255, 255, 255, 0.92);
    text-shadow: 0 1px 4px rgba(0, 0, 0, 0.9);
  }

  .hero-subtext {
    font-size: 0.88rem;
    line-height: 1.4;
    display: block;
    color: #d1d5e5;
  }

  /* Fleet strip on mobile: 2x2 grid */
  .fleet-strip-header {
    flex-wrap: wrap;
    gap: 0.4rem;
  }

  .fleet-strip-tag {
    font-size: 0.7rem;
  }

  .fleet-strip-sub {
    font-size: 0.6rem;
  }

  .fleet-cards-grid {
    grid-template-columns: repeat(2, 1fr);
    gap: 0.65rem;
  }

  /* Card: flex column so info block stacks vertically */
  .fleet-card {
    padding: 0.65rem 0.7rem 0.5rem;
    flex-direction: column;
    gap: 0.4rem;
  }

  /* Info row becomes column: number + title on top, then showcase */
  .fleet-card-info {
    flex-direction: column;
    align-items: flex-start;
    gap: 0.25rem;
    margin-bottom: 0;
  }

  /* Number + title side by side, chips + specs hidden */
  .f-info-left {
    align-items: center;
    gap: 0.4rem;
    width: 100%;
  }

  .bright-red-num {
    font-size: 0.9rem;
    flex-shrink: 0;
  }

  .f-titles {
    min-width: 0;
    flex: 1;
  }

  .f-title {
    font-size: 0.75rem;
    white-space: normal;
    word-break: break-word;
    line-height: 1.15;
  }

  .f-chip {
    font-size: 0.46rem;
    letter-spacing: 0.06em;
  }

  /* Specs hidden on mobile — saves space */
  .f-specs {
    display: none;
  }

  .fleet-card-showcase {
    height: 100px;
    margin-top: auto;
  }

  .f-action-bar {
    display: none;
  }

  /* Bottom features bar — 2 cols on mobile */
  .bottom-features-bar {
    grid-template-columns: repeat(2, 1fr);
    padding: 0.6rem 0.8rem;
    gap: 0.45rem;
  }

  .feature-col {
    padding: 0.5rem 0.65rem;
    gap: 0.55rem;
    border-right: none;
    background: rgba(255, 255, 255, 0.03);
    border: 1px solid rgba(255, 255, 255, 0.08);
    border-radius: 5px;
  }

  .feature-col-link::before {
    display: none;
  }

  .feat-icon-box {
    width: 32px;
    height: 32px;
  }

  .feat-title {
    font-size: 0.72rem;
    line-height: 1.15;
  }

  .feat-desc {
    font-size: 0.68rem;
    font-weight: 500;
    color: #e5e7eb;
    line-height: 1.25;
  }

  /* Stronger mobile overlay to ensure text contrast */
  .hero-bg-dark-overlay {
    background:
      linear-gradient(
        180deg,
        rgba(0, 0, 0, 0.75) 0%,
        rgba(0, 0, 0, 0.35) 30%,
        rgba(0, 0, 0, 0.45) 55%,
        rgba(0, 0, 0, 0.92) 100%
      );
  }

  /* Hero Location Badge on mobile */
  .hero-location-badge {
    font-size: 0.64rem;
    padding: 0.28rem 0.7rem;
    margin-bottom: 0.5rem;
  }
}

/* ── SMALL MOBILE (≤480px): tighten fleet cards further ── */
@media (max-width: 480px) {
  .fleet-cards-grid {
    gap: 0.5rem;
  }

  .fleet-card {
    padding: 0.55rem 0.6rem 0.45rem;
  }

  .f-title {
    font-size: 0.7rem;
    line-height: 1.2;
  }

  .f-chip {
    font-size: 0.42rem;
  }

  .bright-red-num {
    font-size: 0.82rem;
  }

  .fleet-card-showcase {
    height: 90px;
  }
}

</style>
