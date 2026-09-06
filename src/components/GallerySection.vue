<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { 
  ChevronLeft, 
  ChevronRight, 
  X, 
  Sparkles, 
  Maximize2, 
  MapPin, 
  Tv, 
  Gamepad2, 
  Layers,
  Filter
} from 'lucide-vue-next'
import siteConfig from '../config/siteConfig.js'

const activeFilter = ref('all')
const activeIndex = ref(2)
const isLightboxOpen = ref(false)
const lightboxIndex = ref(0)

import galleryData from '../data/gallery.json'

const rawPhotos = galleryData.photos
const categories = galleryData.categories

const filteredPhotos = computed(() => {
  if (activeFilter.value === 'all') return rawPhotos
  return rawPhotos.filter(p => p.category === activeFilter.value)
})

const currentPhoto = computed(() => {
  if (!filteredPhotos.value.length) return rawPhotos[0]
  const idx = Math.min(activeIndex.value, filteredPhotos.value.length - 1)
  return filteredPhotos.value[idx] || filteredPhotos.value[0]
})

const setFilter = (catId) => {
  activeFilter.value = catId
  const count = rawPhotos.filter(p => catId === 'all' || p.category === catId).length
  if (count > 3) {
    activeIndex.value = 2
  } else if (count > 1) {
    activeIndex.value = 1
  } else {
    activeIndex.value = 0
  }
}

const prevSlide = () => {
  if (!filteredPhotos.value.length) return
  activeIndex.value = (activeIndex.value - 1 + filteredPhotos.value.length) % filteredPhotos.value.length
}

const nextSlide = () => {
  if (!filteredPhotos.value.length) return
  activeIndex.value = (activeIndex.value + 1) % filteredPhotos.value.length
}

const selectSlide = (index) => {
  activeIndex.value = index
}

const openLightbox = (index) => {
  lightboxIndex.value = index
  isLightboxOpen.value = true
  document.body.style.overflow = 'hidden'
}

const closeLightbox = () => {
  isLightboxOpen.value = false
  document.body.style.overflow = 'auto'
}

const prevLightbox = () => {
  lightboxIndex.value = (lightboxIndex.value - 1 + filteredPhotos.value.length) % filteredPhotos.value.length
}

const nextLightbox = () => {
  lightboxIndex.value = (lightboxIndex.value + 1) % filteredPhotos.value.length
}

// Touch & Mouse Drag Handling
const isDragging = ref(false)
const startX = ref(0)
const dragOffset = ref(0)

const onTouchStart = (e) => {
  isDragging.value = true
  startX.value = e.touches ? e.touches[0].clientX : e.clientX
}

const onTouchMove = (e) => {
  if (!isDragging.value) return
  const currentX = e.touches ? e.touches[0].clientX : e.clientX
  dragOffset.value = currentX - startX.value
}

const onTouchEnd = () => {
  if (!isDragging.value) return
  if (dragOffset.value < -40) {
    nextSlide()
  } else if (dragOffset.value > 40) {
    prevSlide()
  }
  isDragging.value = false
  dragOffset.value = 0
}

// Keyboard Navigation for Lightbox & Slider
const handleKeyDown = (e) => {
  if (isLightboxOpen.value) {
    if (e.key === 'Escape') closeLightbox()
    if (e.key === 'ArrowLeft') prevLightbox()
    if (e.key === 'ArrowRight') nextLightbox()
  }
}

onMounted(() => {
  window.addEventListener('keydown', handleKeyDown)
})

onUnmounted(() => {
  window.removeEventListener('keydown', handleKeyDown)
})
</script>

<template>
  <section id="gallery" class="kinetic-gallery-section scroll-reveal">
    
    <!-- Dynamic Ambient Blurred Parallax Background -->
    <div 
      class="gallery-ambient-bg"
      :style="{ backgroundImage: `url(${currentPhoto ? currentPhoto.url : '/galleries/01.jpg'})` }"
    ></div>
    <div class="gallery-bg-overlay"></div>

    <!-- Full-Width Container -->
    <div class="full-width-wrapper">

      <!-- Top Header & Filter Bar -->
      <div class="container gallery-header">
        
        <div class="header-top-row">
          <div class="eyebrow-badge">
            <Sparkles :size="14" class="text-red" />
            <span>FULL-WIDTH KINETIC GALLERY</span>
          </div>

          <!-- Console-Style Media Counter HUD -->
          <div class="hud-media-counter">
            <span class="hud-label">MEDIA_LOG //</span>
            <span class="hud-count">
              {{ String(activeIndex + 1).padStart(2, '0') }} OF {{ String(filteredPhotos.length).padStart(2, '0') }}
            </span>
          </div>
        </div>

        <h2 class="gallery-title">
          LIVE EVENT <span class="text-red-glow">SHOWCASE</span>
        </h2>
        <p class="gallery-sub">
          Explore real party photos from our luxury mobile gaming trucks, gaming bus, and esports setups across Los Angeles.
        </p>

        <!-- Neon Category Tabs -->
        <div class="neon-tabs-bar">
          <button
            v-for="cat in categories"
            :key="cat.id"
            class="neon-tab-btn"
            :class="{ active: activeFilter === cat.id }"
            @click="setFilter(cat.id)"
          >
            <span>[ {{ cat.name }} ]</span>
          </button>
        </div>

      </div>

      <!-- 3D Kinetic Coverflow Slider Track -->
      <div 
        class="kinetic-slider-viewport"
        @mousedown="onTouchStart"
        @mousemove="onTouchMove"
        @mouseup="onTouchEnd"
        @mouseleave="onTouchEnd"
        @touchstart="onTouchStart"
        @touchmove="onTouchMove"
        @touchend="onTouchEnd"
      >
        <div class="kinetic-slider-track">
          
          <div 
            v-for="(photo, index) in filteredPhotos" 
            :key="photo.id"
            class="kinetic-card"
            :class="{ 
              active: index === activeIndex,
              prev: index === (activeIndex - 1 + filteredPhotos.length) % filteredPhotos.length,
              next: index === (activeIndex + 1) % filteredPhotos.length,
              hidden: Math.abs(index - activeIndex) > 2 && index !== 0 && index !== filteredPhotos.length - 1
            }"
            :style="{ 
              '--offset': index - activeIndex,
              transform: `translate3d(${(index - activeIndex) * 360 + dragOffset}px, 0, ${index === activeIndex ? 0 : -120}px) rotateY(${(index - activeIndex) * -12}deg)`
            }"
            @click="index === activeIndex ? openLightbox(index) : selectSlide(index)"
          >
            <!-- Cyber Bracket Corners -->
            <div class="cyber-corner top-left"></div>
            <div class="cyber-corner top-right"></div>
            <div class="cyber-corner bottom-left"></div>
            <div class="cyber-corner bottom-right"></div>

            <!-- Image -->
            <div class="card-img-wrap">
              <img :src="photo.url" :alt="photo.title" class="kinetic-img" loading="lazy" />
              <div class="card-img-overlay"></div>
            </div>

            <!-- Top Tag Badge -->
            <div class="card-top-tag">
              <span>{{ photo.tag }}</span>
            </div>

            <!-- Fullscreen Hover Trigger -->
            <button class="zoom-trigger-btn" @click.stop="openLightbox(index)">
              <Maximize2 :size="16" />
              <span>EXPAND</span>
            </button>

            <!-- Bottom Tech Metadata Overlay -->
            <div class="card-tech-overlay">
              <span class="tech-title">{{ photo.title }}</span>
              <div class="tech-meta">
                <span class="tech-loc"><MapPin :size="12" class="text-red" /> {{ photo.location }}</span>
                <span class="tech-spec">{{ photo.specs }}</span>
              </div>
            </div>

          </div>

        </div>
      </div>

      <!-- Bottom HUD Controller Bar -->
      <div class="container gallery-controls-bar">
        <button class="hud-nav-btn prev-btn" aria-label="Previous Slide" @click="prevSlide">
          <ChevronLeft :size="20" />
          <span>PREV LOG</span>
        </button>

        <div class="slider-dots-track">
          <span 
            v-for="(photo, idx) in filteredPhotos" 
            :key="photo.id"
            class="slider-dot"
            :class="{ active: idx === activeIndex }"
            @click="selectSlide(idx)"
          ></span>
        </div>

        <button class="hud-nav-btn next-btn" aria-label="Next Slide" @click="nextSlide">
          <span>NEXT LOG</span>
          <ChevronRight :size="20" />
        </button>
      </div>

    </div>

    <!-- Glassmorphism Lightbox Modal -->
    <transition name="modal-fade">
      <div v-if="isLightboxOpen" class="lightbox-modal-backdrop" @click.self="closeLightbox">
        <div class="lightbox-dialog floating-hud-glass">
          
          <button class="lightbox-close-btn" @click="closeLightbox" aria-label="Close Lightbox">
            <X :size="22" />
          </button>

          <button class="lightbox-nav-btn prev-lightbox" @click="prevLightbox">
            <ChevronLeft :size="26" />
          </button>

          <button class="lightbox-nav-btn next-lightbox" @click="nextLightbox">
            <ChevronRight :size="26" />
          </button>

          <div class="lightbox-main-body">
            <div class="lightbox-img-container">
              <img 
                :src="filteredPhotos[lightboxIndex]?.url || '/galleries/01.jpg'" 
                :alt="filteredPhotos[lightboxIndex]?.title" 
                class="lightbox-img" 
              />
            </div>

            <div class="lightbox-sidebar">
              <div class="sidebar-badge">
                <Sparkles :size="14" class="text-red" />
                <span>ULTIMATE MEDIA VAULT</span>
              </div>

              <h3 class="sidebar-title">{{ filteredPhotos[lightboxIndex]?.title }}</h3>
              <p v-if="filteredPhotos[lightboxIndex]?.description" class="sidebar-desc">
                {{ filteredPhotos[lightboxIndex]?.description }}
              </p>

              <div class="sidebar-meta-list">
                <div class="meta-row">
                  <MapPin :size="16" class="text-red flex-shrink-0" />
                  <div>
                    <strong>Location:</strong>
                    <span>{{ filteredPhotos[lightboxIndex]?.location }}</span>
                  </div>
                </div>

                <div class="meta-row">
                  <Tv :size="16" class="text-red flex-shrink-0" />
                  <div>
                    <strong>Equipment & Specs:</strong>
                    <span>{{ filteredPhotos[lightboxIndex]?.specs }}</span>
                  </div>
                </div>

                <div class="meta-row">
                  <Gamepad2 :size="16" class="text-red flex-shrink-0" />
                  <div>
                    <strong>Event Type:</strong>
                    <span>{{ filteredPhotos[lightboxIndex]?.tag }}</span>
                  </div>
                </div>
              </div>

              <a href="/#contact" class="sidebar-book-btn" @click="closeLightbox">
                <span>BOOK YOUR EVENT</span>
                <ChevronRight :size="16" />
              </a>
            </div>
          </div>

        </div>
      </div>
    </transition>

  </section>
</template>

<style scoped>
/* ============================================================
   KINETIC GALLERY SECTION WRAPPER
   ============================================================ */
.kinetic-gallery-section {
  position: relative;
  width: 100%;
  padding: 6rem 0 5rem;
  background-color: #000000;
  overflow: hidden;
}

.full-width-wrapper {
  width: 100%;
  position: relative;
  z-index: 2;
}

/* Dynamic Ambient Blurred Background */
.gallery-ambient-bg {
  position: absolute;
  inset: -10%;
  background-size: cover;
  background-position: center center;
  filter: blur(55px) brightness(0.25) contrast(1.15);
  transform: scale(1.1);
  transition: background-image 0.7s cubic-bezier(0.16, 1, 0.3, 1);
  z-index: 0;
}

.gallery-bg-overlay {
  position: absolute;
  inset: 0;
  background: radial-gradient(circle at 50% 50%, rgba(255, 0, 43, 0.12) 0%, rgba(0, 0, 0, 0.85) 75%);
  z-index: 1;
}

/* ============================================================
   HEADER & NEON TABS
   ============================================================ */
.gallery-header {
  text-align: center;
  margin-bottom: 3rem;
  position: relative;
  z-index: 5;
}

.header-top-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 1.2rem;
}

@media (max-width: 768px) {
  .header-top-row {
    flex-direction: column;
    gap: 0.8rem;
  }
}

.hud-media-counter {
  font-family: var(--font-heading);
  font-size: 0.72rem;
  font-weight: 900;
  letter-spacing: 0.15em;
  background: rgba(14, 14, 22, 0.88);
  border: 1px solid rgba(255, 0, 43, 0.4);
  padding: 0.4rem 1rem;
  border-radius: 4px;
  box-shadow: 0 0 14px rgba(255, 0, 43, 0.25);
}

.hud-label {
  color: rgba(255, 255, 255, 0.45);
  margin-right: 0.4rem;
}

.hud-count {
  color: #ff002b;
  text-shadow: 0 0 10px rgba(255, 0, 43, 0.7);
}

.gallery-title {
  font-family: var(--font-heading);
  font-size: clamp(2.2rem, 4vw, 3.4rem);
  font-weight: 900;
  color: #ffffff;
  margin-bottom: 0.8rem;
  letter-spacing: 0.02em;
}

.gallery-sub {
  font-size: 1.05rem;
  color: rgba(255, 255, 255, 0.72);
  max-width: 720px;
  margin: 0 auto 2.2rem;
  line-height: 1.6;
}

/* Neon Tabs Bar */
.neon-tabs-bar {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
  gap: 0.8rem;
}

.neon-tab-btn {
  font-family: var(--font-heading);
  font-size: 0.75rem;
  font-weight: 900;
  letter-spacing: 0.15em;
  padding: 0.6rem 1.3rem;
  background: rgba(10, 10, 16, 0.85);
  color: rgba(255, 255, 255, 0.6);
  border: 1.5px solid rgba(255, 255, 255, 0.15);
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.3s ease;
}

.neon-tab-btn:hover {
  color: #ffffff;
  border-color: rgba(255, 0, 43, 0.6);
  background: rgba(255, 0, 43, 0.12);
  box-shadow: 0 0 16px rgba(255, 0, 43, 0.3);
}

.neon-tab-btn.active {
  color: #ffffff;
  background: #ff002b;
  border-color: #ff002b;
  box-shadow: 0 0 22px rgba(255, 0, 43, 0.8);
}

/* ============================================================
   KINETIC SLIDER VIEWPORT & CARDS TRACK
   ============================================================ */
.kinetic-slider-viewport {
  width: 100%;
  height: 520px;
  position: relative;
  perspective: 1200px;
  display: flex;
  align-items: center;
  justify-content: center;
  user-select: none;
  cursor: grab;
  margin-bottom: 2.5rem;
}

.kinetic-slider-viewport:active {
  cursor: grabbing;
}

.kinetic-slider-track {
  position: relative;
  width: 380px;
  height: 480px;
  transform-style: preserve-3d;
  display: flex;
  align-items: center;
  justify-content: center;
}

/* Each Slide Card */
.kinetic-card {
  position: absolute;
  top: 0;
  left: 0;
  width: 380px;
  height: 480px;
  background: #0c0c12;
  border: 1.5px solid rgba(255, 255, 255, 0.15);
  border-radius: 8px;
  overflow: hidden;
  clip-path: polygon(14px 0, 100% 0, 100% calc(100% - 14px), calc(100% - 14px) 100%, 0 100%, 0 14px);
  box-shadow: 0 15px 40px rgba(0, 0, 0, 0.9);
  transition: transform 0.6s cubic-bezier(0.16, 1, 0.3, 1),
              filter 0.6s cubic-bezier(0.16, 1, 0.3, 1),
              border-color 0.4s ease,
              box-shadow 0.4s ease,
              opacity 0.6s ease;
  filter: brightness(0.55) blur(2px);
  opacity: 0.65;
  cursor: pointer;
}

@media (max-width: 500px) {
  .kinetic-slider-track, .kinetic-card {
    width: 300px;
    height: 400px;
  }
}

.kinetic-card.active {
  filter: brightness(1) blur(0);
  opacity: 1;
  border-color: #ff002b;
  box-shadow: 0 0 35px rgba(255, 0, 43, 0.75), inset 0 0 20px rgba(255, 0, 43, 0.1);
  z-index: 10;
}

.kinetic-card:hover:not(.active) {
  border-color: rgba(255, 0, 43, 0.5);
  filter: brightness(0.8) blur(0);
  opacity: 0.9;
}

/* Cyber Corner Brackets */
.cyber-corner {
  position: absolute;
  width: 14px;
  height: 14px;
  border-color: #ff002b;
  border-style: solid;
  z-index: 5;
  pointer-events: none;
}

.cyber-corner.top-left { top: -2px; left: -2px; border-width: 2px 0 0 2px; }
.cyber-corner.top-right { top: -2px; right: -2px; border-width: 2px 2px 0 0; }
.cyber-corner.bottom-left { bottom: -2px; left: -2px; border-width: 0 0 2px 2px; }
.cyber-corner.bottom-right { bottom: -2px; right: -2px; border-width: 0 2px 2px 0; }

/* Image Wrapper */
.card-img-wrap {
  width: 100%;
  height: 100%;
  position: relative;
}

.kinetic-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center center;
  transition: transform 0.6s ease;
}

.kinetic-card.active:hover .kinetic-img {
  transform: scale(1.06);
}

.card-img-overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(180deg, rgba(0, 0, 0, 0.3) 0%, transparent 40%, rgba(0, 0, 0, 0.92) 100%);
}

/* Card Top Tag */
.card-top-tag {
  position: absolute;
  top: 1.1rem;
  left: 1.2rem;
  z-index: 4;
  background: rgba(0, 0, 0, 0.85);
  border: 1px solid rgba(255, 0, 43, 0.5);
  padding: 0.28rem 0.75rem;
  border-radius: 3px;
  font-family: var(--font-heading);
  font-size: 0.58rem;
  font-weight: 900;
  letter-spacing: 0.15em;
  color: #ff002b;
}

/* Expand Button */
.zoom-trigger-btn {
  position: absolute;
  top: 1.1rem;
  right: 1.2rem;
  z-index: 4;
  background: rgba(0, 0, 0, 0.85);
  border: 1px solid rgba(255, 255, 255, 0.25);
  color: #ffffff;
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  padding: 0.35rem 0.75rem;
  border-radius: 3px;
  font-family: var(--font-heading);
  font-size: 0.58rem;
  font-weight: 800;
  letter-spacing: 0.1em;
  cursor: pointer;
  opacity: 0;
  transition: all 0.25s ease;
}

.kinetic-card.active:hover .zoom-trigger-btn {
  opacity: 1;
}

.zoom-trigger-btn:hover {
  background: #ff002b;
  border-color: #ff002b;
  box-shadow: 0 0 12px rgba(255, 0, 43, 0.8);
}

/* Card Tech Overlay */
.card-tech-overlay {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 1.4rem;
  z-index: 4;
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
}

.tech-title {
  font-family: var(--font-heading);
  font-size: 0.85rem;
  font-weight: 900;
  color: #ffffff;
  letter-spacing: 0.04em;
  line-height: 1.25;
}

.tech-meta {
  display: flex;
  flex-direction: column;
  gap: 0.2rem;
  font-size: 0.72rem;
  color: rgba(255, 255, 255, 0.75);
}

.tech-loc {
  display: flex;
  align-items: center;
  gap: 0.35rem;
  font-weight: 700;
  color: #ffffff;
}

.tech-spec {
  font-size: 0.68rem;
  color: rgba(255, 255, 255, 0.55);
}

/* ============================================================
   BOTTOM HUD CONTROLLER BAR
   ============================================================ */
.gallery-controls-bar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: relative;
  z-index: 5;
}

.hud-nav-btn {
  display: inline-flex;
  align-items: center;
  gap: 0.6rem;
  background: rgba(10, 10, 16, 0.9);
  border: 1.5px solid rgba(255, 0, 43, 0.45);
  color: #ffffff;
  font-family: var(--font-heading);
  font-size: 0.78rem;
  font-weight: 900;
  letter-spacing: 0.12em;
  padding: 0.7rem 1.4rem;
  border-radius: 4px;
  cursor: pointer;
  box-shadow: 0 0 16px rgba(255, 0, 43, 0.25);
  transition: all 0.25s ease;
}

.hud-nav-btn:hover {
  background: #ff002b;
  border-color: #ff002b;
  box-shadow: 0 0 25px rgba(255, 0, 43, 0.8);
  transform: translateY(-2px);
}

.slider-dots-track {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.slider-dot {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.2);
  border: 1px solid rgba(255, 255, 255, 0.3);
  cursor: pointer;
  transition: all 0.25s ease;
}

.slider-dot.active {
  background: #ff002b;
  border-color: #ff002b;
  box-shadow: 0 0 12px #ff002b;
  transform: scale(1.3);
}

/* ============================================================
   GLASSMORPHISM LIGHTBOX MODAL
   ============================================================ */
.lightbox-modal-backdrop {
  position: fixed;
  inset: 0;
  z-index: 10000;
  background: rgba(0, 0, 0, 0.92);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem;
}

.lightbox-dialog {
  position: relative;
  width: 100%;
  max-width: 1100px;
  background: rgba(14, 14, 22, 0.96);
  border: 1.5px solid rgba(255, 0, 43, 0.5);
  border-radius: 8px;
  box-shadow: 0 25px 70px rgba(0, 0, 0, 0.98), 0 0 40px rgba(255, 0, 43, 0.25);
  overflow: hidden;
}

.lightbox-close-btn {
  position: absolute;
  top: 1.2rem;
  right: 1.4rem;
  z-index: 20;
  background: rgba(0, 0, 0, 0.8);
  border: 1.5px solid rgba(255, 255, 255, 0.3);
  color: #ffffff;
  width: 42px;
  height: 42px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.25s ease;
}

.lightbox-close-btn:hover {
  border-color: #ff002b;
  color: #ff002b;
  background: rgba(255, 0, 43, 0.2);
  transform: rotate(90deg);
}

.lightbox-nav-btn {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  z-index: 20;
  background: rgba(0, 0, 0, 0.8);
  border: 1.5px solid rgba(255, 255, 255, 0.25);
  color: #ffffff;
  width: 48px;
  height: 48px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.25s ease;
}

.lightbox-nav-btn.prev-lightbox { left: 1.2rem; }
.lightbox-nav-btn.next-lightbox { right: 1.2rem; }

.lightbox-nav-btn:hover {
  background: #ff002b;
  border-color: #ff002b;
  box-shadow: 0 0 20px rgba(255, 0, 43, 0.8);
}

.lightbox-main-body {
  display: grid;
  grid-template-columns: 1.4fr 1fr;
  min-height: 520px;
}

@media (max-width: 850px) {
  .lightbox-main-body {
    grid-template-columns: 1fr;
  }
}

.lightbox-img-container {
  background: #000000;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  max-height: 600px;
}

.lightbox-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.lightbox-sidebar {
  padding: 3rem 2.5rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  background: linear-gradient(180deg, rgba(16, 16, 26, 0.98) 0%, rgba(8, 8, 14, 0.98) 100%);
}

.sidebar-badge {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  font-family: var(--font-heading);
  font-size: 0.6rem;
  font-weight: 900;
  letter-spacing: 0.2em;
  color: #ff002b;
  background: rgba(255, 0, 43, 0.12);
  border: 1px solid rgba(255, 0, 43, 0.35);
  padding: 0.35rem 0.8rem;
  border-radius: 3px;
  margin-bottom: 1.2rem;
  width: fit-content;
}

.sidebar-title {
  font-family: var(--font-heading);
  font-size: 1.4rem;
  font-weight: 900;
  color: #ffffff;
  line-height: 1.2;
  margin-bottom: 2rem;
}

.sidebar-meta-list {
  display: flex;
  flex-direction: column;
  gap: 1.2rem;
  margin-bottom: 2.5rem;
}

.meta-row {
  display: flex;
  align-items: flex-start;
  gap: 0.8rem;
  font-size: 0.92rem;
  color: rgba(255, 255, 255, 0.85);
}

.meta-row strong {
  display: block;
  color: #ffffff;
  font-size: 0.75rem;
  font-family: var(--font-heading);
  letter-spacing: 0.08em;
  margin-bottom: 0.1rem;
}

.sidebar-book-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.6rem;
  background: #ff002b;
  border: 1px solid #ff002b;
  color: #ffffff;
  padding: 1rem 1.6rem;
  border-radius: 4px;
  font-family: var(--font-heading);
  font-size: 0.85rem;
  font-weight: 900;
  letter-spacing: 0.1em;
  text-decoration: none;
  box-shadow: 0 0 22px rgba(255, 0, 43, 0.6);
  transition: all 0.3s ease;
}

.sidebar-book-btn:hover {
  background: #d40024;
  box-shadow: 0 0 32px rgba(255, 0, 43, 0.9);
  transform: translateY(-2px);
}
</style>
