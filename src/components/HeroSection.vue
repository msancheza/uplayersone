<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { ChevronUp, ChevronDown, ChevronRight, Gamepad2, Users, Truck, Phone, Tv, Wind, Sparkles } from 'lucide-vue-next'
import siteConfig from '../config/siteConfig.js'

const videoRef = ref(null)
const selectedVehicle = ref(1)

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
    image: '/trucks/01.jpg'
  },
  {
    id: 2,
    num: '02',
    title: 'DELUXE',
    subtitle: 'GAMING TRUCK',
    displays: '6 DISPLAYS',
    detail: 'ALL INSIDE',
    image: '/trucks/02.jpg'
  },
  {
    id: 3,
    num: '03',
    title: 'ELITE',
    subtitle: 'GAMING TRUCK',
    displays: '10 DISPLAYS',
    detail: 'ALL INSIDE',
    image: '/trucks/04.jpg'
  },
  {
    id: 4,
    num: '04',
    title: 'GAMING BUS',
    subtitle: 'MOBILE GAMING BUS',
    displays: '6 DISPLAYS',
    detail: 'ALL INSIDE',
    image: '/trucks/04.jpg'
  }
]

// Dynamically load all photos from /public/galleries/ directory
const galleryModules = import.meta.glob('/public/galleries/*.{jpg,jpeg,png,webp,gif,JPG,JPEG,PNG,WEBP,GIF}', { eager: true })
const dynamicGalleryImages = Object.keys(galleryModules)
  .map(path => path.replace('/public', ''))
  .sort((a, b) => {
    // Custom sort so numeric filenames order properly (e.g., 88.jpg, 875.jpg, 960.jpg)
    const numA = parseInt(a.replace(/[^0-9]/g, '')) || 0
    const numB = parseInt(b.replace(/[^0-9]/g, '')) || 0
    return numA - numB
  })

const fallbackGalleryImages = [
  '/galleries/88.jpg', '/galleries/90.jpg', '/galleries/92.jpg', '/galleries/94.jpg',
  '/galleries/96.jpg', '/galleries/98.jpg', '/galleries/875.jpg', '/galleries/876.jpg',
  '/galleries/877.jpg', '/galleries/878.jpg', '/galleries/881.jpg', '/galleries/882.jpg',
  '/galleries/883.jpg', '/galleries/884.jpg', '/galleries/960.jpg', '/galleries/961.jpg',
  '/galleries/962.jpg', '/galleries/963.jpg', '/galleries/964.jpg', '/galleries/965.jpg',
  '/galleries/966.jpg', '/galleries/967.jpg', '/galleries/968.jpg', '/galleries/969.jpg',
  '/galleries/970.jpg', '/galleries/971.jpg', '/galleries/972.jpg'
]

const allGalleryImages = dynamicGalleryImages.length > 0 ? dynamicGalleryImages : fallbackGalleryImages

const activeImageIndex = ref(0)
const startIndex = ref(0)
const isModalOpen = ref(false)
const modalImageIndex = ref(0)
let autoRotateTimer = null

const visibleGalleryImages = computed(() => {
  const result = []
  const total = allGalleryImages.length
  if (total === 0) return result
  for (let i = 0; i < 4; i++) {
    const idx = (startIndex.value + i) % total
    result.push({
      originalIndex: idx,
      url: allGalleryImages[idx]
    })
  }
  return result
})

const selectImage = (index) => {
  activeImageIndex.value = index
  const total = allGalleryImages.length
  // Keep active image visible within the 4 thumbnail slots
  const relativePos = (index - startIndex.value + total) % total
  if (relativePos >= 4) {
    startIndex.value = index
  }
}

const nextImage = () => {
  if (allGalleryImages.length === 0) return
  const nextIdx = (activeImageIndex.value + 1) % allGalleryImages.length
  activeImageIndex.value = nextIdx
  startIndex.value = (startIndex.value + 1) % allGalleryImages.length
}

const prevImage = () => {
  if (allGalleryImages.length === 0) return
  const prevIdx = (activeImageIndex.value - 1 + allGalleryImages.length) % allGalleryImages.length
  activeImageIndex.value = prevIdx
  startIndex.value = (startIndex.value - 1 + allGalleryImages.length) % allGalleryImages.length
}

const openLightbox = (index) => {
  modalImageIndex.value = index
  isModalOpen.value = true
  stopAutoRotate()
}

const closeLightbox = () => {
  isModalOpen.value = false
  startAutoRotate()
}

const nextModalImage = () => {
  modalImageIndex.value = (modalImageIndex.value + 1) % allGalleryImages.length
}

const prevModalImage = () => {
  modalImageIndex.value = (modalImageIndex.value - 1 + allGalleryImages.length) % allGalleryImages.length
}

const startAutoRotate = () => {
  stopAutoRotate()
  autoRotateTimer = setInterval(() => {
    nextImage()
  }, 3000)
}

const stopAutoRotate = () => {
  if (autoRotateTimer) {
    clearInterval(autoRotateTimer)
    autoRotateTimer = null
  }
}

const handleUserInteraction = (action) => {
  action()
  startAutoRotate() // reset timer
}

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
  startAutoRotate()
})

onUnmounted(() => {
  window.removeEventListener('mousemove', handleMouseMove)
  stopAutoRotate()
})

const navigateToContact = () => {
  const el = document.getElementById('contact')
  if (el) el.scrollIntoView({ behavior: 'smooth' })
}

const navigateToTrucks = () => {
  const el = document.getElementById('prices')
  if (el) el.scrollIntoView({ behavior: 'smooth' })
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
        poster="/galleries/88.jpg"
        class="hero-bg-video"
      >
        <source src="/vid01.mp4" type="video/mp4" />
        <source src="https://assets.mixkit.co/videos/preview/mixkit-gaming-room-with-neon-lights-42998-large.mp4" type="video/mp4" />
      </video>
      <div class="hero-bg-dark-overlay"></div>
    </div>

    <!-- Main Dashboard Workspace Layout (Floating over Video Background) -->
    <div class="hero-dashboard-container">
      <!-- 1. Left Panel: Vehicle Selector List (Floating HUD Glass) -->
      <div 
        class="vehicle-selector-panel floating-hud-glass"
        :style="{ transform: `translate3d(${parallaxX * 0.3}px, ${parallaxY * 0.3}px, 0)` }"
      >
        <div class="panel-tech-corner top-left"></div>
        <div class="panel-tech-corner top-right"></div>
        
        <div class="vehicles-list">
          <div 
            v-for="v in vehicles" 
            :key="v.id"
            class="vehicle-card"
            :class="{ active: selectedVehicle === v.id }"
            @click="selectedVehicle = v.id"
          >
            <div class="vehicle-card-info">
              <span class="v-num bright-red-num">{{ v.num }}</span>
              <div class="v-titles">
                <h4 class="v-title">{{ v.title }}</h4>
                <span class="v-subtitle">{{ v.subtitle }}</span>
              </div>
              <div class="v-specs">
                <div class="v-displays-row text-red">
                  <Tv :size="13" class="v-display-icon" />
                  <span class="v-displays">{{ v.displays }}</span>
                </div>
                <span class="v-detail">{{ v.detail }}</span>
              </div>
            </div>
            <div class="vehicle-card-img-box">
              <img :src="v.image" :alt="v.title" class="v-img" />
            </div>
            <ChevronRight :size="16" class="v-arrow" />
          </div>
        </div>

        <div class="vehicle-selector-footer" @click="navigateToTrucks">
          <span class="footer-label">VIEW ALL GAMING UNITS</span>
          <ChevronRight :size="14" class="text-red" />
        </div>
      </div>

      <!-- 2. Middle Panel: Interior Gallery Carousel Column (Floating HUD Glass) -->
      <div 
        class="interior-carousel-panel floating-hud-glass"
        :style="{ transform: `translate3d(${parallaxX * 0.2}px, ${parallaxY * 0.2}px, 0)` }"
      >
        <button class="carousel-nav-btn top-btn" aria-label="Scroll Up" @click="handleUserInteraction(prevImage)">
          <ChevronUp :size="24" class="arrow-icon" />
        </button>

        <div class="thumbnails-list">
          <div 
            v-for="item in visibleGalleryImages" 
            :key="item.originalIndex"
            class="thumbnail-box"
            :class="{ active: activeImageIndex === item.originalIndex }"
            @click="handleUserInteraction(() => selectImage(item.originalIndex))"
          >
            <img :src="item.url" alt="Gaming Truck Interior" class="thumb-img" />
            <div v-if="activeImageIndex === item.originalIndex" class="thumb-target-dot"></div>
          </div>
        </div>

        <button class="carousel-nav-btn bottom-btn" aria-label="Scroll Down" @click="handleUserInteraction(nextImage)">
          <ChevronDown :size="24" class="arrow-icon" />
        </button>
      </div>

      <!-- 3. Center-Right Main Hero Content Area -->
      <div 
        class="hero-main-showcase"
        :style="{ transform: `translate3d(${parallaxX * 0.5}px, ${parallaxY * 0.5}px, 0)` }"
      >
        <div class="showcase-content">
          <span class="tagline-sub">WE DON'T JUST BRING GAMES.</span>
          
          <h1 class="hero-headline">
            WE BRING <br />
            <span class="text-red-glow">THE ULTIMATE <br />EXPERIENCE.</span>
          </h1>

          <p class="hero-subtext">
            High-end gaming trucks. <br />
            Top consoles. Epic setups. <br />
            Unforgettable parties.
          </p>
        </div>

        <!-- Scroll Indicator -->
        <div class="scroll-explore-indicator">
          <span class="scroll-text">SCROLL TO EXPLORE</span>
          <div class="mouse-icon">
            <span class="mouse-dot"></span>
          </div>
          <ChevronDown :size="14" class="text-red scroll-down-arrow" />
        </div>
      </div>
    </div>

    <!-- 4. Bottom Ticker / Feature Highlights Bar -->
    <div class="bottom-features-bar">
      <div class="feature-col">
        <Gamepad2 :size="22" class="text-red flex-shrink-0" />
        <div class="feat-text">
          <h5 class="feat-title">POWERFUL CONSOLES</h5>
          <p class="feat-desc">PS5, Xbox Series X, Nintendo Switch & more.</p>
        </div>
      </div>

      <div class="feature-col">
        <Users :size="22" class="text-red flex-shrink-0" />
        <div class="feat-text">
          <h5 class="feat-title">PERFECT FOR ANY EVENT</h5>
          <p class="feat-desc">Birthdays, school events, corporate events & more.</p>
        </div>
      </div>

      <div class="feature-col">
        <Truck :size="22" class="text-red flex-shrink-0" />
        <div class="feat-text">
          <h5 class="feat-title">WE COME TO YOU</h5>
          <p class="feat-desc">Los Angeles & surrounding areas.</p>
        </div>
      </div>

      <div class="feature-col">
        <Phone :size="22" class="text-red flex-shrink-0" />
        <div class="feat-text">
          <h5 class="feat-title">CALL OR TEXT</h5>
          <p class="feat-desc"><strong class="text-red">{{ siteConfig.phone }}</strong> — Let's book your experience.</p>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.home-hero-mockup-section {
  width: 100vw;
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
}

.hero-bg-video {
  width: 100%;
  height: 100%;
  object-fit: cover;
  filter: brightness(0.95) contrast(1.12) saturate(1.15);
}

/* Dynamic Multi-Stop Gradient Overlay (task.txt: Left = Darker, Center = Medium, Right = Video Highlight) */
.hero-bg-dark-overlay {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  background: 
    /* 1. Horizontal gradient: Left (Dark) -> Center (Medium) -> Right (Visible) */
    linear-gradient(
      90deg, 
      rgba(0, 0, 0, 0.92) 0%, 
      rgba(0, 0, 0, 0.84) 28%, 
      rgba(0, 0, 0, 0.52) 58%, 
      rgba(0, 0, 0, 0.18) 82%, 
      rgba(0, 0, 0, 0.05) 100%
    ),
    /* 2. Vertical top & bottom vignette to blend with navbar and bottom bar */
    linear-gradient(
      180deg, 
      rgba(0, 0, 0, 0.88) 0%, 
      rgba(0, 0, 0, 0.15) 16%, 
      transparent 35%, 
      transparent 72%, 
      rgba(0, 0, 0, 0.90) 100%
    );
  pointer-events: none;
}

/* Dashboard Workspace Layout (Floating higher up, scaled to viewport height) */
.hero-dashboard-container {
  position: relative;
  z-index: 2;
  width: 100%;
  height: calc(100vh - 80px);
  padding-top: 4.6rem;
  padding-right: 170px;
  padding-left: 2rem;
  display: grid;
  grid-template-columns: 340px 175px 1fr;
  gap: 1.8rem;
  align-items: center;
}

/* Floating Glass HUD Base */
.floating-hud-glass {
  background: rgba(6, 6, 10, 0.9);
  backdrop-filter: blur(28px);
  -webkit-backdrop-filter: blur(28px);
  border: 1.5px solid rgba(255, 255, 255, 0.16);
  box-shadow: 0 16px 45px rgba(0, 0, 0, 0.98), inset 0 0 20px rgba(255, 0, 43, 0.08);
  border-radius: 6px;
  position: relative;
  overflow: visible;
}

.panel-tech-corner {
  position: absolute;
  width: 12px;
  height: 12px;
  border-color: #ff002b;
  border-style: solid;
  pointer-events: none;
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

/* 1. Left Vehicle Selector Panel */
.vehicle-selector-panel {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: calc(100vh - 160px);
  max-height: 760px;
  min-height: 520px;
  padding: 1.1rem;
}

.vehicles-list {
  display: flex;
  flex-direction: column;
  gap: 0.85rem;
  flex-grow: 1;
  justify-content: space-around;
}

.vehicle-card {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.95rem 1rem;
  background: rgba(14, 14, 22, 0.88);
  border: 1.5px solid rgba(255, 255, 255, 0.12);
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.25s ease;
  position: relative;
}

.vehicle-card:hover {
  background: rgba(28, 20, 32, 0.95);
  border-color: rgba(255, 0, 43, 0.6);
  transform: translateX(3px);
}

.vehicle-card.active {
  background: linear-gradient(90deg, rgba(255, 0, 43, 0.25) 0%, rgba(22, 10, 18, 0.96) 100%);
  border-color: #ff002b;
  box-shadow: 0 0 24px rgba(255, 0, 43, 0.5);
}

.vehicle-card-info {
  display: flex;
  flex-direction: column;
  gap: 0.2rem;
}

.bright-red-num {
  font-family: var(--font-heading);
  font-size: 1.45rem;
  font-weight: 900;
  line-height: 1;
  color: #ff002b;
  text-shadow: 0 0 12px rgba(255, 0, 43, 0.6);
}

.v-title {
  font-family: var(--font-heading);
  font-size: 1.05rem;
  font-weight: 900;
  color: #ffffff;
  line-height: 1;
  letter-spacing: 0.04em;
}

.v-subtitle {
  font-size: 0.68rem;
  color: #a0a0b2;
  text-transform: uppercase;
  font-weight: 700;
  letter-spacing: 0.06em;
}

.v-specs {
  display: flex;
  flex-direction: column;
  margin-top: 0.4rem;
}

.v-displays-row {
  display: flex;
  align-items: center;
  gap: 0.35rem;
  color: #ff002b;
}

.v-display-icon {
  color: #ff002b;
  flex-shrink: 0;
}

.v-displays {
  font-size: 0.72rem;
  font-weight: 800;
  letter-spacing: 0.06em;
}

.v-detail {
  font-size: 0.64rem;
  color: #888899;
}

.vehicle-card-img-box {
  width: 90px;
  height: 64px;
  border-radius: 5px;
  overflow: hidden;
  border: 1.5px solid rgba(255, 255, 255, 0.2);
  background: #000000;
  flex-shrink: 0;
}

.v-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center center;
  image-rendering: -webkit-optimize-contrast;
  image-rendering: crisp-edges;
  transform: translateZ(0);
  will-change: transform;
}

.v-arrow {
  color: #666677;
  transition: color 0.2s ease;
}

.vehicle-card.active .v-arrow {
  color: #ff002b;
}

.vehicle-selector-footer {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.6rem;
  padding: 0.85rem 0.5rem 0.3rem 0.5rem;
  border-top: 1.5px solid rgba(255, 255, 255, 0.14);
  font-family: var(--font-heading);
  font-size: 0.82rem;
  font-weight: 900;
  letter-spacing: 0.15em;
  color: #ffffff;
  cursor: pointer;
  transition: all 0.2s ease;
}

.vehicle-selector-footer:hover {
  color: #ff002b;
  text-shadow: 0 0 12px rgba(255, 0, 43, 0.7);
}

/* 2. Middle Panel: Interior Gallery Carousel */
.interior-carousel-panel {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  height: calc(100vh - 160px);
  max-height: 760px;
  min-height: 520px;
  padding: 0.9rem 0.7rem;
}

.carousel-nav-btn {
  background: rgba(12, 12, 18, 0.95);
  border: 1px solid rgba(255, 255, 255, 0.15);
  color: #ffffff;
  cursor: pointer;
  padding: 0.4rem 1.8rem;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.25s ease;
  width: 100%;
}

.carousel-nav-btn.top-btn {
  clip-path: polygon(14px 0, calc(100% - 14px) 0, 100% 100%, 0 100%);
  border-bottom: 1.5px solid rgba(255, 0, 43, 0.4);
}

.carousel-nav-btn.bottom-btn {
  clip-path: polygon(0 0, 100% 0, calc(100% - 14px) 100%, 14px 100%);
  border-top: 1.5px solid rgba(255, 0, 43, 0.4);
}

.carousel-nav-btn .arrow-icon {
  color: rgba(255, 255, 255, 0.9);
  filter: drop-shadow(0 0 4px rgba(255, 255, 255, 0.3));
  transition: all 0.25s ease;
}

.carousel-nav-btn:hover {
  background: rgba(255, 0, 43, 0.2);
  border-color: #ff002b;
}

.carousel-nav-btn:hover .arrow-icon {
  color: #ff002b;
  transform: scale(1.2);
  filter: drop-shadow(0 0 10px rgba(255, 0, 43, 0.9));
}

.thumbnails-list {
  display: flex;
  flex-direction: column;
  gap: 0.9rem;
  width: 100%;
  align-items: center;
  flex-grow: 1;
  justify-content: space-around;
  margin: 0.5rem 0;
}

.thumbnail-box {
  width: 160px;
  height: 130px;
  border-radius: 4px;
  overflow: hidden;
  border: 1.5px solid rgba(255, 255, 255, 0.22);
  cursor: pointer;
  position: relative;
  transition: border-color 0.3s cubic-bezier(0.34, 1.56, 0.64, 1),
              box-shadow 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
  background: #000000;
}

.thumbnail-box:hover {
  border-color: rgba(255, 0, 43, 0.7);
}

.thumbnail-box.active {
  border: 2px solid #ff002b;
  outline: 1.5px solid #ff002b;
  outline-offset: -5px;
  box-shadow: 0 0 25px rgba(255, 0, 43, 0.85), inset 0 0 15px rgba(255, 0, 43, 0.35);
}

.thumb-img {
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center center;
  image-rendering: -webkit-optimize-contrast;
  image-rendering: crisp-edges;
  transform: translateZ(0);
  will-change: transform;
}

.thumb-target-dot {
  position: absolute;
  left: -12px;
  top: 50%;
  transform: translateY(-50%);
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background: rgba(0, 0, 0, 0.95);
  border: 2px solid #ff002b;
  box-shadow: 0 0 12px #ff002b, 0 0 20px rgba(255, 0, 43, 0.9);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 20;
}

.thumb-target-dot::after {
  content: '';
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: #ffffff;
  box-shadow: 0 0 8px #ffffff;
}

/* 3. Center-Right Main Hero Content Area */
.hero-main-showcase {
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding-left: 2.5rem;
  position: relative;
  height: 100%;
}

.tagline-sub {
  font-family: var(--font-heading);
  font-size: 0.85rem;
  font-weight: 800;
  letter-spacing: 0.18em;
  color: #ffffff;
  margin-bottom: 0.8rem;
  display: block;
  text-shadow: 0 2px 10px rgba(0, 0, 0, 0.95), 0 0 20px rgba(0, 0, 0, 0.9);
}

.hero-headline {
  font-family: var(--font-heading);
  font-size: 4rem;
  font-weight: 900;
  line-height: 1.02;
  letter-spacing: -0.02em;
  color: #ffffff;
  margin-bottom: 1.4rem;
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

.hero-subtext {
  font-size: 1.15rem;
  color: #f0f0f5;
  margin-bottom: 2.2rem;
  line-height: 1.6;
  text-shadow: 0 2px 15px rgba(0, 0, 0, 0.98), 0 1px 6px rgba(0, 0, 0, 0.9);
  max-width: 480px;
}

.btn-tech-inquire {
  display: inline-flex;
  align-items: center;
  gap: 0.8rem;
  font-family: var(--font-heading);
  font-weight: 900;
  font-size: 0.92rem;
  letter-spacing: 0.12em;
  padding: 0.85rem 2.2rem;
  background: rgba(0, 0, 0, 0.85);
  color: #ffffff;
  border: 1.5px solid var(--primary-red);
  cursor: pointer;
  transition: all 0.3s ease;
  width: fit-content;
  clip-path: polygon(8px 0, 100% 0, 100% calc(100% - 8px), calc(100% - 8px) 100%, 0 100%, 0 8px);
}

.btn-tech-inquire:hover {
  background: var(--primary-red);
  box-shadow: 0 0 25px var(--primary-red-glow);
  transform: translateY(-2px);
}

.scroll-explore-indicator {
  position: absolute;
  bottom: 0.8rem;
  left: 2.5rem;
  display: flex;
  align-items: center;
  gap: 0.9rem;
  padding: 0.65rem 1.4rem;
  background: rgba(10, 10, 16, 0.88);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border: 1.5px solid rgba(255, 0, 43, 0.45);
  border-radius: 30px;
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.95), 0 0 16px rgba(255, 0, 43, 0.25);
  transition: all 0.3s ease;
}

.scroll-explore-indicator:hover {
  border-color: #ff002b;
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.95), 0 0 22px rgba(255, 0, 43, 0.55);
  transform: translateY(-2px);
}

.scroll-text {
  font-family: var(--font-heading);
  font-size: 0.78rem;
  font-weight: 900;
  letter-spacing: 0.18em;
  color: #ffffff;
  text-shadow: 0 0 8px rgba(255, 255, 255, 0.3);
}

.mouse-icon {
  width: 20px;
  height: 32px;
  border: 2px solid #ff002b;
  border-radius: 12px;
  position: relative;
  display: flex;
  justify-content: center;
  padding-top: 5px;
  box-shadow: 0 0 10px rgba(255, 0, 43, 0.4);
}

.mouse-dot {
  width: 4px;
  height: 8px;
  border-radius: 2px;
  background: #ff002b;
  box-shadow: 0 0 8px #ff002b;
  animation: mouse-scroll 1.5s infinite;
}

.scroll-down-arrow {
  color: #ff002b !important;
  filter: drop-shadow(0 0 6px rgba(255, 0, 43, 0.8));
  animation: bounce 2s infinite;
}

@keyframes mouse-scroll {
  0% { transform: translateY(0); opacity: 1; }
  100% { transform: translateY(8px); opacity: 0; }
}

@keyframes bounce {
  0%, 20%, 50%, 80%, 100% { transform: translateY(0); }
  40% { transform: translateY(-4px); }
  60% { transform: translateY(-2px); }
}

/* 4. Bottom Ticker / Feature Highlights Bar */
.bottom-features-bar {
  position: relative;
  z-index: 2;
  width: 100%;
  background: rgba(5, 5, 8, 0.95);
  backdrop-filter: blur(12px);
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  padding: 0.85rem 2rem;
}

.feature-col {
  display: flex;
  align-items: center;
  gap: 0.85rem;
  padding: 0 1rem;
  border-right: 1px solid rgba(255, 255, 255, 0.08);
}

.feature-col:last-child {
  border-right: none;
}

.feat-text {
  display: flex;
  flex-direction: column;
}

.feat-title {
  font-family: var(--font-heading);
  font-weight: 900;
  font-size: 0.78rem;
  letter-spacing: 0.08em;
  color: var(--white);
  line-height: 1.1;
}

.feat-desc {
  font-size: 0.72rem;
  color: var(--text-muted);

}

.flex-shrink-0 {
  flex-shrink: 0;
}

@media (max-width: 1200px) {
  .hero-dashboard-container {
    grid-template-columns: 240px 110px 1fr;
    padding-right: 120px;
  }
  .hero-headline {
    font-size: 3.2rem;
  }
}

@media (max-width: 900px) {
  .hero-dashboard-container {
    grid-template-columns: 1fr;
    padding: 6rem 1.5rem 2rem 1.5rem;
    height: auto;
  }
  .vehicle-selector-panel, .interior-carousel-panel {
    display: none;
  }
  .hero-main-showcase {
    padding-left: 0;
  }
  .bottom-features-bar {
    grid-template-columns: repeat(2, 1fr);
    gap: 1rem;
  }
}
</style>
