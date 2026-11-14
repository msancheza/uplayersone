<script setup>
import { ref, computed, onMounted, onUnmounted, nextTick } from 'vue'
import { ChevronLeft, ChevronRight, X, Sparkles, Maximize2, MapPin, Tv, Gamepad2, ArrowLeft, LayoutGrid, Rows3 } from 'lucide-vue-next'
import { useRouter } from 'vue-router'
import galleryData from '../data/gallery.json'
import SEOHead from '../components/SEOHead.vue'
import { routeSeo, buildRouteGraph } from '../data/seoRoutes.js'
import { imageGallerySchema } from '../data/structuredData.js'
import { galleryAlt } from '../utils/imageAlt.js'

const seo = routeSeo.gallery

const router = useRouter()

const rawPhotos = galleryData.photos
const categories = galleryData.categories

// Structured data for the photo archive.
const gallerySchema = computed(() =>
  imageGallerySchema({
    name: 'Ultimate Players Live Event Gallery',
    description:
      'Real event photography from Ultimate Players gaming truck and gaming bus rentals across Los Angeles — birthdays, tournaments, corporate activations and community parties.',
    photos: rawPhotos,
    path: '/gallery'
  })
)

const activeFilter = ref('all')
const viewMode = ref('masonry')
const isLightboxOpen = ref(false)
const lightboxIndex = ref(0)

/* -----------------------------------------------------------
   FILTERING — 'all' shows every photo; otherwise filter by
   category. The grid re-flows on change and the reveal
   animation replays via the section class toggle.
   ----------------------------------------------------------- */
const filteredPhotos = computed(() => {
  if (activeFilter.value === 'all') return rawPhotos
  return rawPhotos.filter((p) => p.category === activeFilter.value)
})

const categoryCounts = computed(() => {
  const map = { all: rawPhotos.length }
  rawPhotos.forEach((p) => {
    map[p.category] = (map[p.category] || 0) + 1
  })
  return map
})

const setFilter = (catId) => {
  activeFilter.value = catId
  lightboxIndex.value = 0
}

/* -----------------------------------------------------------
   LIGHTBOX — click any tile to enlarge. Full-viewport on
   mobile (photo is the protagonist, minimal HUD overlay),
   two-column with metadata sidebar on desktop.
   ----------------------------------------------------------- */
const openLightbox = (index) => {
  lightboxIndex.value = index
  isLightboxOpen.value = true
  document.body.style.overflow = 'hidden'
}

const closeLightbox = () => {
  isLightboxOpen.value = false
  document.body.style.overflow = ''
}

const prevLightbox = () => {
  const n = filteredPhotos.value.length
  if (!n) return
  lightboxIndex.value = (lightboxIndex.value - 1 + n) % n
}

const nextLightbox = () => {
  const n = filteredPhotos.value.length
  if (!n) return
  lightboxIndex.value = (lightboxIndex.value + 1) % n
}

const currentPhoto = computed(() => filteredPhotos.value[lightboxIndex.value] || null)

const handleKeyDown = (e) => {
  if (!isLightboxOpen.value) return
  if (e.key === 'Escape') closeLightbox()
  if (e.key === 'ArrowLeft') prevLightbox()
  if (e.key === 'ArrowRight') nextLightbox()
}

/* Swipe-down to dismiss (native iOS-style). */
const lightboxDragY = ref(0)
const lightboxDragging = ref(false)
let lightboxTouchStartY = 0

const onLightboxTouchStart = (e) => {
  if (e.touches?.length !== 1) return
  lightboxTouchStartY = e.touches[0].clientY
  lightboxDragging.value = true
  lightboxDragY.value = 0
}

const onLightboxTouchMove = (e) => {
  if (!lightboxDragging.value || e.touches?.length !== 1) return
  const dy = e.touches[0].clientY - lightboxTouchStartY
  lightboxDragY.value = dy > 0 ? dy : 0
}

const onLightboxTouchEnd = () => {
  if (!lightboxDragging.value) return
  if (lightboxDragY.value > 120 || lightboxDragY.value > window.innerHeight * 0.25) {
    closeLightbox()
  }
  lightboxDragging.value = false
  lightboxDragY.value = 0
}

/* -----------------------------------------------------------
   REVEAL — cards animate in as they scroll into view.
   The trigger class lives on the SECTION (a static div) so
   Vue's :class binding can never wipe it out on re-render.
   ----------------------------------------------------------- */
const REVEAL_TARGET = '.gv-grid'
let revealObserver = null

const observeTiles = () => {
  if (typeof window === 'undefined') return
  if (revealObserver) revealObserver.disconnect()

  const section = document.querySelector(REVEAL_TARGET)
  if (!section) return

  const tiles = section.querySelectorAll('.gv-tile')
  tiles.forEach((tile, i) => {
    tile.classList.remove('card-in-view')
    tile.style.setProperty('--tile-stagger', `${(i % 12) * 55}ms`)
  })

  revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('card-in-view')
          revealObserver.unobserve(entry.target)
        }
      })
    },
    { threshold: 0.08, rootMargin: '0px 0px -40px 0px' }
  )

  tiles.forEach((t) => revealObserver.observe(t))
}

const goHome = () => router.push('/')

onMounted(() => {
  window.addEventListener('keydown', handleKeyDown)
  nextTick(() => {
    observeTiles()
    // Safety net for tiles already in the viewport at mount time.
    setTimeout(() => {
      const section = document.querySelector(REVEAL_TARGET)
      if (!section) return
      const r = section.getBoundingClientRect()
      if (r.top < window.innerHeight && r.bottom > 0) {
        section.classList.add('card-in-view')
      }
    }, 200)
  })
})

onUnmounted(() => {
  window.removeEventListener('keydown', handleKeyDown)
  if (revealObserver) {
    revealObserver.disconnect()
    revealObserver = null
  }
  document.body.style.overflow = ''
})
</script>

<template>
  <div class="gallery-page">
      <SEOHead
        :title="seo.title"
        :description="seo.description"
        :path="seo.path"
        :breadcrumb="seo.breadcrumb"
        :schema="buildRouteGraph('gallery', { photos: rawPhotos })"
      />


    <!-- ═══════════ HERO HEADER ═══════════ -->
    <header class="gv-hero">
      <div class="gv-hero-bg" :style="{ backgroundImage: `url(${filteredPhotos[0]?.webp || '/galleries/01.webp'})` }"></div>
      <div class="gv-hero-overlay"></div>

      <div class="gv-hero-content">
        <button class="gv-back-btn" @click="goHome" aria-label="Back to home">
          <ArrowLeft :size="15" />
          <span>BACK TO HOME</span>
        </button>

        <div class="gv-eyebrow reveal-item">
          <Sparkles :size="14" class="text-red" />
          <span>LIVE EVENT SHOWCASE · LOS ANGELES</span>
        </div>

        <h1 class="gv-title reveal-item">
          GALLERY<br />
          <span class="text-red-glow">VAULT</span>
        </h1>

        <p class="gv-sub reveal-item">
          Real party footage from our luxury mobile gaming trucks, gaming bus and esports
          setups across Southern California.
        </p>

        <div class="gv-hero-stats reveal-item">
          <div class="gv-stat">
            <span class="gv-stat-num">{{ rawPhotos.length }}</span>
            <span class="gv-stat-label">PHOTOS</span>
          </div>
          <div class="gv-stat-divider"></div>
          <div class="gv-stat">
            <span class="gv-stat-num">{{ categories.length - 1 }}</span>
            <span class="gv-stat-label">CATEGORIES</span>
          </div>
          <div class="gv-stat-divider"></div>
          <div class="gv-stat">
            <span class="gv-stat-num">100%</span>
            <span class="gv-stat-label">REAL EVENTS</span>
          </div>
        </div>
      </div>
    </header>

    <!-- ═══════════ FILTER BAR ═══════════ -->
    <div class="gv-filter-wrap">
      <div class="gv-filter-bar">
        <div class="gv-filters">
          <button
            v-for="cat in categories"
            :key="cat.id"
            class="gv-filter-chip"
            :class="{ active: activeFilter === cat.id }"
            @click="setFilter(cat.id)"
          >
            <span class="gv-chip-name">[ {{ cat.name }} ]</span>
            <span class="gv-chip-count">{{ String(categoryCounts[cat.id] || 0).padStart(2, '0') }}</span>
          </button>
        </div>

        <div class="gv-view-toggle">
          <button
            class="gv-view-btn"
            :class="{ active: viewMode === 'masonry' }"
            @click="viewMode = 'masonry'"
            aria-label="Masonry view"
            title="Masonry view"
          >
            <LayoutGrid :size="16" />
          </button>
          <button
            class="gv-view-btn"
            :class="{ active: viewMode === 'grid' }"
            @click="viewMode = 'grid'"
            aria-label="Uniform grid view"
            title="Uniform grid view"
          >
            <Rows3 :size="16" />
          </button>
        </div>
      </div>
    </div>

    <!-- ═══════════ GALLERY GRID ═══════════ -->
    <section class="gv-section">
      <div class="gv-grid" :class="`mode-${viewMode}`">

        <article
          v-for="(photo, index) in filteredPhotos"
          :key="photo.id"
          class="gv-tile"
          :style="{ '--tile-index': index }"
          @click="openLightbox(index)"
        >
          <div class="gv-tile-frame">
            <picture>
              <source :srcset="photo.webp" type="image/webp" />
              <img
                :src="photo.url"
                :alt="galleryAlt(photo)"
                class="gv-img"
                loading="lazy"
                decoding="async"
                :width="photo.width"
                :height="photo.height"
              />
            </picture>

            <div class="gv-tile-shade"></div>

            <!-- Corner brackets -->
            <span class="gv-corner tl"></span>
            <span class="gv-corner tr"></span>
            <span class="gv-corner bl"></span>
            <span class="gv-corner br"></span>

            <!-- Top tag -->
            <span class="gv-tile-tag">{{ photo.tag }}</span>

            <!-- Expand affordance -->
            <span class="gv-expand">
              <Maximize2 :size="15" />
              <span>EXPAND</span>
            </span>

            <!-- Bottom meta -->
            <div class="gv-tile-meta">
              <span class="gv-tile-title">{{ photo.title }}</span>
              <span class="gv-tile-loc"><MapPin :size="11" class="text-red" /> {{ photo.location }}</span>
            </div>
          </div>
        </article>

      </div>

      <!-- Empty state (defensive — shouldn't happen) -->
      <div v-if="!filteredPhotos.length" class="gv-empty">
        <Sparkles :size="32" class="text-red" />
        <p>No photos in this category yet.</p>
        <button class="gv-empty-btn" @click="setFilter('all')">VIEW ALL PHOTOS</button>
      </div>
    </section>

    <!-- ═══════════ BOTTOM CTA ═══════════ -->
    <section class="gv-cta">
      <div class="gv-cta-inner">
        <div class="gv-cta-copy">
          <span class="gv-cta-eyebrow">READY WHEN YOU ARE</span>
          <h2 class="gv-cta-title">BOOK YOUR <span class="text-red-glow">EVENT</span></h2>
          <p>Tell us your date and guest count — we'll check availability and send a custom quote. No payment required.</p>
        </div>
        <div class="gv-cta-actions">
          <RouterLink to="/#contact" class="gv-cta-btn primary">
            <span>START MY REQUEST</span>
            <ChevronRight :size="16" />
          </RouterLink>
          <RouterLink to="/pricing" class="gv-cta-btn ghost">
            <span>VIEW PRICING</span>
            <ChevronRight :size="16" />
          </RouterLink>
        </div>
      </div>
    </section>

    <!-- ═══════════ LIGHTBOX (teleported to body) ═══════════ -->
    <Teleport to="body">
      <transition name="gv-modal-fade" :duration="250" type="transition">
        <div
          v-if="isLightboxOpen && currentPhoto"
          class="gv-lb-backdrop"
          @click.self="closeLightbox"
          @touchstart.passive="onLightboxTouchStart"
          @touchmove.passive="onLightboxTouchMove"
          @touchend="onLightboxTouchEnd"
        >
          <div
            class="gv-lb-dialog"
            :style="lightboxDragY > 0 ? { transform: `translateY(${lightboxDragY}px)`, opacity: Math.max(0.35, 1 - lightboxDragY / 400) } : null"
          >
            <button class="gv-lb-close" @click="closeLightbox" aria-label="Close gallery">
              <X :size="22" />
            </button>

            <button class="gv-lb-nav prev" @click="prevLightbox" aria-label="Previous photo">
              <ChevronLeft :size="26" />
            </button>
            <button class="gv-lb-nav next" @click="nextLightbox" aria-label="Next photo">
              <ChevronRight :size="26" />
            </button>

            <div class="gv-lb-body">
              <div class="gv-lb-media">
                <picture>
                  <source :srcset="currentPhoto.webp" type="image/webp" />
                  <img :src="currentPhoto.url" :alt="galleryAlt(currentPhoto)" class="gv-lb-img" decoding="async" />
                </picture>

                <!-- Minimal HUD — mobile hero -->
                <div class="gv-lb-hud">
                  <div class="gv-lb-hud-top">
                    <span class="gv-lb-counter">
                      {{ String(lightboxIndex + 1).padStart(2, '0') }} / {{ String(filteredPhotos.length).padStart(2, '0') }}
                    </span>
                  </div>
                  <div class="gv-lb-hud-bottom">
                    <span class="gv-lb-tag">{{ currentPhoto.tag }}</span>
                    <span class="gv-lb-title">{{ currentPhoto.title }}</span>
                  </div>
                </div>
              </div>

              <aside class="gv-lb-side">
                <div class="gv-lb-badge">
                  <Sparkles :size="14" class="text-red" />
                  <span>ULTIMATE MEDIA VAULT</span>
                </div>

                <h3 class="gv-lb-side-title">{{ currentPhoto.title }}</h3>
                <p v-if="currentPhoto.description" class="gv-lb-side-desc">{{ currentPhoto.description }}</p>

                <div class="gv-lb-meta">
                  <div class="gv-lb-meta-row">
                    <MapPin :size="16" class="text-red flex-shrink-0" />
                    <div>
                      <strong>Location:</strong>
                      <span>{{ currentPhoto.location }}</span>
                    </div>
                  </div>
                  <div class="gv-lb-meta-row">
                    <Tv :size="16" class="text-red flex-shrink-0" />
                    <div>
                      <strong>Equipment & Specs:</strong>
                      <span>{{ currentPhoto.specs }}</span>
                    </div>
                  </div>
                  <div class="gv-lb-meta-row">
                    <Gamepad2 :size="16" class="text-red flex-shrink-0" />
                    <div>
                      <strong>Event Type:</strong>
                      <span>{{ currentPhoto.tag }}</span>
                    </div>
                  </div>
                </div>

                <RouterLink to="/#contact" class="gv-lb-book" @click="closeLightbox">
                  <span>BOOK YOUR EVENT</span>
                  <ChevronRight :size="16" />
                </RouterLink>
              </aside>
            </div>
          </div>
        </div>
      </transition>
    </Teleport>

  </div>
</template>

<style scoped>
/* ============================================================
   PAGE SHELL
   ============================================================ */
.gallery-page {
  background: #000000;
  color: #ffffff;
  min-height: 100vh;
  overflow-x: clip;
}

.text-red {
  color: #ff002b;
}

.text-red-glow {
  color: #ff002b;
  text-shadow: 0 0 30px rgba(255, 0, 43, 0.55);
}

/* ============================================================
   HERO
   ============================================================ */
.gv-hero {
  position: relative;
  width: 100%;
  min-height: 62vh;
  display: flex;
  align-items: center;
  overflow: hidden;
  padding: 5rem 0 4rem;
}

.gv-hero-bg {
  position: absolute;
  inset: -12%;
  background-size: cover;
  background-position: center 35%;
  filter: blur(50px) brightness(0.28) contrast(1.15) saturate(1.2);
  transform: scale(1.15);
  transition: background-image 0.8s cubic-bezier(0.16, 1, 0.3, 1);
}

.gv-hero-overlay {
  position: absolute;
  inset: 0;
  background:
    radial-gradient(ellipse at 22% 45%, rgba(255, 0, 43, 0.16) 0%, transparent 55%),
    linear-gradient(180deg, rgba(0, 0, 0, 0.92) 0%, rgba(0, 0, 0, 0.55) 45%, rgba(0, 0, 0, 0.96) 100%);
}

.gv-back-btn {
  position: relative;
  z-index: 12;
  display: flex;
  width: fit-content;
  align-items: center;
  gap: 0.45rem;
  background: rgba(0, 0, 0, 0.55);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border: 1px solid rgba(255, 255, 255, 0.18);
  color: rgba(255, 255, 255, 0.85);
  font-family: var(--font-heading);
  font-size: 0.62rem;
  font-weight: 900;
  letter-spacing: 0.14em;
  padding: 0.5rem 0.9rem;
  border-radius: 3px;
  cursor: pointer;
  margin-bottom: 1.3rem;
  transition: all 0.25s ease;
}

.gv-back-btn:hover {
  border-color: #ff002b;
  color: #ffffff;
  box-shadow: 0 0 18px rgba(255, 0, 43, 0.45);
}

.gv-hero-content {
  position: relative;
  z-index: 6;
  width: 100%;
  max-width: 1600px;
  margin: 0 auto;
  padding: 0 clamp(1.25rem, 5vw, 5rem);
}

.gv-eyebrow {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  font-family: var(--font-heading);
  font-size: 0.68rem;
  font-weight: 900;
  letter-spacing: 0.24em;
  color: #ff002b;
  background: rgba(255, 0, 43, 0.1);
  border: 1px solid rgba(255, 0, 43, 0.32);
  padding: 0.45rem 1.1rem;
  border-radius: 3px;
  margin-bottom: 1.4rem;
}

.gv-title {
  font-family: var(--font-heading);
  font-size: clamp(3rem, 9vw, 8rem);
  font-weight: 900;
  line-height: 0.92;
  letter-spacing: -0.01em;
  margin-bottom: 1.2rem;
  color: #ffffff;
}

.gv-sub {
  font-size: clamp(0.95rem, 1.5vw, 1.15rem);
  color: rgba(255, 255, 255, 0.68);
  line-height: 1.6;
  max-width: 560px;
  margin-bottom: 2.2rem;
}

.gv-hero-stats {
  display: flex;
  align-items: center;
  gap: clamp(1rem, 3vw, 2.4rem);
  flex-wrap: wrap;
}

.gv-stat {
  display: flex;
  flex-direction: column;
  gap: 0.2rem;
}

.gv-stat-num {
  font-family: var(--font-heading);
  font-size: clamp(1.5rem, 3vw, 2.2rem);
  font-weight: 900;
  color: #ffffff;
  line-height: 1;
}

.gv-stat-label {
  font-family: var(--font-heading);
  font-size: 0.58rem;
  font-weight: 800;
  letter-spacing: 0.2em;
  color: rgba(255, 255, 255, 0.42);
}

.gv-stat-divider {
  width: 1px;
  height: 38px;
  background: linear-gradient(180deg, transparent, rgba(255, 0, 43, 0.55), transparent);
}

/* Hero entrance */
.reveal-item {
  opacity: 0;
  transform: translateY(30px);
  animation: gv-hero-in 0.9s cubic-bezier(0.16, 1, 0.3, 1) forwards;
}

.gv-eyebrow { animation-delay: 0.05s; }
.gv-title { animation-delay: 0.14s; }
.gv-sub { animation-delay: 0.23s; }
.gv-hero-stats { animation-delay: 0.32s; }

@keyframes gv-hero-in {
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* ============================================================
   FILTER BAR
   ============================================================ */
.gv-filter-wrap {
  position: sticky;
  top: 66px; /* navbar height on mobile */
  z-index: 40;
  background: rgba(5, 5, 9, 0.9);
  backdrop-filter: blur(22px);
  -webkit-backdrop-filter: blur(22px);
  border-top: 1px solid rgba(255, 255, 255, 0.08);
  border-bottom: 1px solid rgba(255, 0, 43, 0.28);
}

.gv-filter-bar {
  width: 100%;
  max-width: 1600px;
  margin: 0 auto;
  padding: 0.85rem clamp(1rem, 4vw, 4rem);
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
}

.gv-filters {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  overflow-x: auto;
  scrollbar-width: none;
  -ms-overflow-style: none;
  -webkit-overflow-scrolling: touch;
  padding-bottom: 2px;
}

.gv-filters::-webkit-scrollbar {
  display: none;
}

.gv-filter-chip {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  flex-shrink: 0;
  background: rgba(10, 10, 16, 0.9);
  border: 1px solid rgba(255, 255, 255, 0.14);
  color: rgba(255, 255, 255, 0.62);
  font-family: var(--font-heading);
  font-size: 0.68rem;
  font-weight: 900;
  letter-spacing: 0.13em;
  padding: 0.55rem 0.85rem;
  border-radius: 3px;
  cursor: pointer;
  white-space: nowrap;
  transition: all 0.25s ease;
}

.gv-filter-chip:hover {
  color: #ffffff;
  border-color: rgba(255, 0, 43, 0.55);
  background: rgba(255, 0, 43, 0.08);
}

.gv-filter-chip.active {
  color: #ffffff;
  background: #ff002b;
  border-color: #ff002b;
  box-shadow: 0 0 20px rgba(255, 0, 43, 0.6);
}

.gv-chip-count {
  font-size: 0.56rem;
  padding: 0.12rem 0.32rem;
  border-radius: 2px;
  background: rgba(255, 255, 255, 0.12);
  color: rgba(255, 255, 255, 0.75);
}

.gv-filter-chip.active .gv-chip-count {
  background: rgba(0, 0, 0, 0.28);
  color: #ffffff;
}

.gv-view-toggle {
  display: flex;
  align-items: center;
  gap: 0.3rem;
  flex-shrink: 0;
  padding-left: 0.75rem;
  border-left: 1px solid rgba(255, 255, 255, 0.1);
}

.gv-view-btn {
  width: 34px;
  height: 34px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  background: rgba(10, 10, 16, 0.9);
  border: 1px solid rgba(255, 255, 255, 0.14);
  color: rgba(255, 255, 255, 0.55);
  border-radius: 3px;
  cursor: pointer;
  transition: all 0.25s ease;
}

.gv-view-btn:hover {
  color: #ffffff;
  border-color: rgba(255, 0, 43, 0.5);
}

.gv-view-btn.active {
  color: #ffffff;
  background: rgba(255, 0, 43, 0.16);
  border-color: #ff002b;
  color: #ff002b;
}

/* ============================================================
   GALLERY GRID — full width, no container cap.

   TWO LAYOUT ENGINES:
   • Masonry mode → CSS multi-columns (Pinterest/Behance style).
     Bulletproof: no grid track placement issues, tiles flow
     top-to-bottom per column. Aspect ratios vary per tile for
     visual rhythm; object-fit keeps photos uncropped.
   • Grid mode → uniform CSS grid (Apple-style), every tile square.
   ============================================================ */
.gv-section {
  position: relative;
  width: 100%;
  padding: 2.5rem 0 5rem;
}

.gv-grid {
  width: 100%;
  max-width: 1600px;
  margin: 0 auto;
  padding: 0 clamp(0.75rem, 2.5vw, 2.5rem);
}

/* ── MASONRY MODE ── */
.mode-masonry {
  column-count: 6;
  column-gap: clamp(0.5rem, 1vw, 0.9rem);
}

.mode-masonry .gv-tile {
  break-inside: avoid;
  -webkit-column-break-inside: avoid;
  page-break-inside: avoid;
  margin-bottom: clamp(0.5rem, 1vw, 0.9rem);
  display: block;
  width: 100%;
}

/* Varied aspect ratios create the editorial rhythm */
.mode-masonry .gv-tile:nth-child(5n + 2) .gv-tile-frame {
  aspect-ratio: 4 / 5;
}

.mode-masonry .gv-tile:nth-child(7n + 4) .gv-tile-frame {
  aspect-ratio: 16 / 11;
}

.mode-masonry .gv-tile:nth-child(9n + 6) .gv-tile-frame {
  aspect-ratio: 3 / 4;
}

/* ── UNIFORM GRID MODE ── */
.mode-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: clamp(0.5rem, 1vw, 0.9rem);
}

.mode-grid .gv-tile {
  margin-bottom: 0;
  display: block;
}

.mode-grid .gv-tile-frame {
  aspect-ratio: 1 / 1;
}

.gv-tile {
  position: relative;
  cursor: pointer;
  opacity: 0;
  transform: translateY(34px) scale(0.96);
  transform-origin: center 90%;
}

.gv-tile.card-in-view {
  animation: gv-tile-in 0.85s cubic-bezier(0.16, 1, 0.3, 1) var(--tile-stagger, 0ms) forwards;
}

@keyframes gv-tile-in {
  0% {
    opacity: 0;
    transform: translateY(34px) scale(0.96);
    filter: blur(6px);
  }
  100% {
    opacity: 1;
    transform: translateY(0) scale(1);
    filter: blur(0);
  }
}

.gv-tile-frame {
  position: relative;
  width: 100%;
  aspect-ratio: 1 / 1;
  overflow: hidden;
  border-radius: 4px;
  background: #0c0c12;
  border: 1px solid rgba(255, 255, 255, 0.08);
  transition: border-color 0.3s ease, box-shadow 0.3s ease;
}

.gv-tile:hover .gv-tile-frame {
  border-color: rgba(255, 0, 43, 0.75);
  box-shadow: 0 0 30px rgba(255, 0, 43, 0.28), 0 12px 30px rgba(0, 0, 0, 0.7);
}

.gv-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center center;
  transition: transform 0.7s cubic-bezier(0.16, 1, 0.3, 1);
  display: block;
}

.gv-tile:hover .gv-img {
  transform: scale(1.07);
}

.gv-tile-shade {
  position: absolute;
  inset: 0;
  background: linear-gradient(180deg, rgba(0, 0, 0, 0.35) 0%, transparent 42%, rgba(0, 0, 0, 0.92) 100%);
  opacity: 0.9;
  transition: opacity 0.3s ease;
}

.gv-tile:hover .gv-tile-shade {
  opacity: 1;
}

/* Corner brackets */
.gv-corner {
  position: absolute;
  width: 13px;
  height: 13px;
  border-color: #ff002b;
  border-style: solid;
  opacity: 0;
  transition: opacity 0.3s ease, transform 0.3s ease;
  pointer-events: none;
  z-index: 4;
}

.gv-tile:hover .gv-corner { opacity: 1; }
.gv-corner.tl { top: 6px; left: 6px; border-width: 2px 0 0 2px; transform: translate(-3px, -3px); }
.gv-corner.tr { top: 6px; right: 6px; border-width: 2px 2px 0 0; transform: translate(3px, -3px); }
.gv-corner.bl { bottom: 6px; left: 6px; border-width: 0 0 2px 2px; transform: translate(-3px, 3px); }
.gv-corner.br { bottom: 6px; right: 6px; border-width: 0 2px 2px 0; transform: translate(3px, 3px); }

.gv-tile:hover .gv-corner.tl { transform: translate(0, 0); }
.gv-tile:hover .gv-corner.tr { transform: translate(0, 0); }
.gv-tile:hover .gv-corner.bl { transform: translate(0, 0); }
.gv-tile:hover .gv-corner.br { transform: translate(0, 0); }

/* Top tag */
.gv-tile-tag {
  position: absolute;
  top: 0.7rem;
  left: 0.8rem;
  z-index: 4;
  background: rgba(0, 0, 0, 0.8);
  border: 1px solid rgba(255, 0, 43, 0.5);
  color: #ff002b;
  font-family: var(--font-heading);
  font-size: 0.55rem;
  font-weight: 900;
  letter-spacing: 0.15em;
  padding: 0.25rem 0.6rem;
  border-radius: 2px;
}

/* Expand affordance */
.gv-expand {
  position: absolute;
  top: 0.7rem;
  right: 0.8rem;
  z-index: 4;
  display: inline-flex;
  align-items: center;
  gap: 0.35rem;
  background: rgba(0, 0, 0, 0.8);
  border: 1px solid rgba(255, 255, 255, 0.25);
  color: #ffffff;
  font-family: var(--font-heading);
  font-size: 0.55rem;
  font-weight: 900;
  letter-spacing: 0.1em;
  padding: 0.3rem 0.6rem;
  border-radius: 2px;
  opacity: 0;
  transform: translateY(-4px);
  transition: all 0.28s ease;
}

.gv-tile:hover .gv-expand {
  opacity: 1;
  transform: translateY(0);
}

/* Bottom meta */
.gv-tile-meta {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 4;
  padding: 0.9rem 0.9rem 0.8rem;
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
  transform: translateY(6px);
  opacity: 0.85;
  transition: all 0.3s ease;
}

.gv-tile:hover .gv-tile-meta {
  transform: translateY(0);
  opacity: 1;
}

.gv-tile-title {
  font-family: var(--font-heading);
  font-size: 0.78rem;
  font-weight: 900;
  color: #ffffff;
  letter-spacing: 0.05em;
  line-height: 1.2;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.gv-tile-loc {
  display: flex;
  align-items: center;
  gap: 0.3rem;
  font-size: 0.68rem;
  font-weight: 700;
  color: rgba(255, 255, 255, 0.72);
}

/* ============================================================
   EMPTY STATE
   ============================================================ */
.gv-empty {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  padding: 5rem 1rem;
  text-align: center;
  color: rgba(255, 255, 255, 0.6);
}

.gv-empty-btn {
  background: #ff002b;
  border: none;
  color: #ffffff;
  font-family: var(--font-heading);
  font-size: 0.72rem;
  font-weight: 900;
  letter-spacing: 0.14em;
  padding: 0.8rem 1.5rem;
  border-radius: 3px;
  cursor: pointer;
  transition: all 0.25s ease;
}

.gv-empty-btn:hover {
  background: #d60024;
  box-shadow: 0 0 22px rgba(255, 0, 43, 0.6);
}

/* ============================================================
   BOTTOM CTA
   ============================================================ */
.gv-cta {
  position: relative;
  width: 100%;
  padding: 4rem 0 5rem;
  background: linear-gradient(180deg, #000000 0%, rgba(20, 6, 10, 0.9) 50%, #000000 100%);
  border-top: 1px solid rgba(255, 255, 255, 0.08);
}

.gv-cta-inner {
  width: 100%;
  max-width: 1600px;
  margin: 0 auto;
  padding: 0 clamp(1.25rem, 5vw, 5rem);
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 2.5rem;
  flex-wrap: wrap;
}

.gv-cta-eyebrow {
  font-family: var(--font-heading);
  font-size: 0.62rem;
  font-weight: 900;
  letter-spacing: 0.26em;
  color: #ff002b;
  display: block;
  margin-bottom: 0.7rem;
}

.gv-cta-title {
  font-family: var(--font-heading);
  font-size: clamp(1.9rem, 4.5vw, 3.2rem);
  font-weight: 900;
  color: #ffffff;
  line-height: 1;
  margin-bottom: 0.8rem;
}

.gv-cta-copy p {
  font-size: 0.98rem;
  color: rgba(255, 255, 255, 0.62);
  line-height: 1.6;
  max-width: 480px;
}

.gv-cta-actions {
  display: flex;
  align-items: center;
  gap: 0.9rem;
  flex-wrap: wrap;
}

.gv-cta-btn {
  display: inline-flex;
  align-items: center;
  gap: 0.55rem;
  font-family: var(--font-heading);
  font-size: 0.76rem;
  font-weight: 900;
  letter-spacing: 0.13em;
  padding: 1rem 1.7rem;
  border-radius: 3px;
  text-decoration: none;
  transition: all 0.25s ease;
  white-space: nowrap;
}

.gv-cta-btn.primary {
  background: #ff002b;
  color: #ffffff;
  border: 1px solid #ff002b;
  box-shadow: 0 0 22px rgba(255, 0, 43, 0.55);
}

.gv-cta-btn.primary:hover {
  background: #d60024;
  box-shadow: 0 0 32px rgba(255, 0, 43, 0.85);
  transform: translateY(-2px);
}

.gv-cta-btn.ghost {
  background: transparent;
  color: rgba(255, 255, 255, 0.82);
  border: 1px solid rgba(255, 255, 255, 0.22);
}

.gv-cta-btn.ghost:hover {
  border-color: #ff002b;
  color: #ffffff;
  transform: translateY(-2px);
}

/* ============================================================
   LIGHTBOX
   ============================================================ */
.gv-modal-fade-enter-active,
.gv-modal-fade-leave-active {
  transition: opacity 0.25s ease;
}

.gv-modal-fade-enter-from,
.gv-modal-fade-leave-to {
  opacity: 0;
}

.gv-lb-backdrop {
  position: fixed;
  inset: 0;
  z-index: 99999;
  background: rgba(0, 0, 0, 0.94);
  backdrop-filter: blur(22px);
  -webkit-backdrop-filter: blur(22px);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem;
}

.gv-lb-dialog {
  position: relative;
  width: 100%;
  max-width: 1200px;
  background: rgba(12, 12, 20, 0.97);
  border: 1.5px solid rgba(255, 0, 43, 0.45);
  border-radius: 6px;
  box-shadow: 0 30px 80px rgba(0, 0, 0, 0.98), 0 0 50px rgba(255, 0, 43, 0.2);
  overflow: hidden;
}

.gv-lb-close {
  position: absolute;
  top: 1rem;
  right: 1.2rem;
  z-index: 30;
  background: rgba(0, 0, 0, 0.8);
  border: 1.5px solid rgba(255, 255, 255, 0.28);
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

.gv-lb-close:hover {
  border-color: #ff002b;
  color: #ff002b;
  background: rgba(255, 0, 43, 0.18);
  transform: rotate(90deg);
}

.gv-lb-nav {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  z-index: 30;
  background: rgba(0, 0, 0, 0.75);
  border: 1.5px solid rgba(255, 255, 255, 0.25);
  color: #ffffff;
  width: 46px;
  height: 46px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.25s ease;
}

.gv-lb-nav.prev { left: 1rem; }
.gv-lb-nav.next { right: 1rem; }

.gv-lb-nav:hover {
  background: #ff002b;
  border-color: #ff002b;
  box-shadow: 0 0 20px rgba(255, 0, 43, 0.8);
}

.gv-lb-body {
  display: grid;
  grid-template-columns: 1.45fr 1fr;
  min-height: 540px;
}

.gv-lb-media {
  position: relative;
  background: #000000;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  max-height: 620px;
}

.gv-lb-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}

/* Minimal HUD (hidden on desktop — sidebar carries the info) */
.gv-lb-hud {
  display: none;
}

.gv-lb-side {
  padding: 2.8rem 2.4rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  background: linear-gradient(180deg, rgba(16, 16, 26, 0.98) 0%, rgba(8, 8, 14, 0.98) 100%);
}

.gv-lb-badge {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  font-family: var(--font-heading);
  font-size: 0.58rem;
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

.gv-lb-side-title {
  font-family: var(--font-heading);
  font-size: 1.35rem;
  font-weight: 900;
  color: #ffffff;
  line-height: 1.2;
  margin-bottom: 1.4rem;
}

.gv-lb-side-desc {
  font-size: 0.92rem;
  color: rgba(255, 255, 255, 0.68);
  line-height: 1.6;
  margin-bottom: 1.8rem;
}

.gv-lb-meta {
  display: flex;
  flex-direction: column;
  gap: 1.1rem;
  margin-bottom: 2.2rem;
}

.gv-lb-meta-row {
  display: flex;
  align-items: flex-start;
  gap: 0.75rem;
  font-size: 0.88rem;
  color: rgba(255, 255, 255, 0.85);
}

.gv-lb-meta-row strong {
  display: block;
  color: #ffffff;
  font-size: 0.72rem;
  font-family: var(--font-heading);
  letter-spacing: 0.08em;
  margin-bottom: 0.1rem;
}

.gv-lb-book {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.55rem;
  background: #ff002b;
  border: 1px solid #ff002b;
  color: #ffffff;
  padding: 0.95rem 1.5rem;
  border-radius: 3px;
  font-family: var(--font-heading);
  font-size: 0.8rem;
  font-weight: 900;
  letter-spacing: 0.1em;
  text-decoration: none;
  box-shadow: 0 0 20px rgba(255, 0, 43, 0.5);
  transition: all 0.3s ease;
}

.gv-lb-book:hover {
  background: #d40024;
  box-shadow: 0 0 30px rgba(255, 0, 43, 0.85);
  transform: translateY(-2px);
}

/* ============================================================
   RESPONSIVE
   ============================================================ */

/* Tablet */
@media (max-width: 1100px) {
  .mode-masonry {
    column-count: 4;
  }

  .mode-grid {
    grid-template-columns: repeat(3, 1fr);
  }

  .gv-lb-body {
    grid-template-columns: 1.25fr 1fr;
    min-height: 460px;
  }

  .gv-lb-side {
    padding: 2rem 1.6rem;
  }
}

/* Mobile */
@media (max-width: 768px) {
  .gv-hero {
    min-height: auto;
    padding: 6rem 0 3.5rem;
  }

  .gv-back-btn {
    font-size: 0.56rem;
    padding: 0.42rem 0.7rem;
    margin-bottom: 1rem;
  }

  .gv-eyebrow {
    font-size: 0.56rem;
    letter-spacing: 0.16em;
    padding: 0.35rem 0.75rem;
  }

  .gv-title {
    font-size: clamp(2.6rem, 14vw, 4.5rem);
    margin-bottom: 0.9rem;
  }

  .gv-sub {
    font-size: 0.9rem;
    margin-bottom: 1.6rem;
  }

  .gv-hero-stats {
    gap: 1.1rem;
  }

  .gv-stat-num {
    font-size: 1.4rem;
  }

  .gv-stat-label {
    font-size: 0.5rem;
    letter-spacing: 0.16em;
  }

  .gv-stat-divider {
    height: 30px;
  }

  /* Filter bar */
  .gv-filter-wrap {
    top: 66px;
  }

  .gv-filter-bar {
    padding: 0.65rem 0.85rem;
    gap: 0.6rem;
  }

  .gv-filter-chip {
    font-size: 0.58rem;
    padding: 0.45rem 0.65rem;
    letter-spacing: 0.1em;
  }

  .gv-chip-count {
    font-size: 0.5rem;
  }

  .gv-view-toggle {
    padding-left: 0.5rem;
  }

  .gv-view-btn {
    width: 30px;
    height: 30px;
  }

  /* Grid — 2 columns on mobile */
  .mode-masonry {
    column-count: 2;
    column-gap: 0.55rem;
  }

  .mode-masonry .gv-tile {
    margin-bottom: 0.55rem;
  }

  .mode-grid {
    grid-template-columns: repeat(2, 1fr);
    gap: 0.55rem;
  }

  .gv-grid {
    padding: 0 0.75rem;
  }

  .gv-tile-meta {
    padding: 0.6rem 0.6rem 0.55rem;
    opacity: 1;
    transform: none;
  }

  .gv-tile-title {
    font-size: 0.66rem;
  }

  .gv-tile-loc {
    font-size: 0.58rem;
  }

  .gv-tile-tag {
    top: 0.45rem;
    left: 0.5rem;
    font-size: 0.46rem;
    padding: 0.18rem 0.42rem;
    letter-spacing: 0.1em;
  }

  /* Expand affordance always visible on mobile (no hover) */
  .gv-expand {
    top: 0.45rem;
    right: 0.5rem;
    opacity: 1;
    transform: none;
    font-size: 0;
    padding: 0.32rem;
  }

  .gv-expand span {
    display: none;
  }

  .gv-corner {
    display: none;
  }

  /* CTA */
  .gv-cta {
    padding: 3rem 0 4rem;
  }

  .gv-cta-inner {
    flex-direction: column;
    align-items: flex-start;
    gap: 1.6rem;
  }

  .gv-cta-actions {
    width: 100%;
    flex-direction: column;
    align-items: stretch;
  }

  .gv-cta-btn {
    width: 100%;
    justify-content: center;
  }

  /* ── LIGHTBOX: fullscreen photo + minimal HUD (mobile hero) ── */
  .gv-lb-backdrop {
    padding: 0;
  }

  .gv-lb-dialog {
    width: 100%;
    max-width: 100%;
    height: 100vh;
    height: 100dvh;
    max-height: 100vh;
    border: none;
    border-radius: 0;
    transition: transform 0.25s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.25s ease;
  }

  .gv-lb-close {
    top: max(0.8rem, env(safe-area-inset-top, 0.8rem));
    right: 0.9rem;
    width: 44px;
    height: 44px;
    background: rgba(0, 0, 0, 0.65);
    backdrop-filter: blur(10px);
    -webkit-backdrop-filter: blur(10px);
  }

  .gv-lb-nav {
    width: 44px;
    height: 44px;
    background: rgba(0, 0, 0, 0.55);
    backdrop-filter: blur(10px);
    -webkit-backdrop-filter: blur(10px);
  }

  .gv-lb-nav.prev { left: 0.6rem; }
  .gv-lb-nav.next { right: 0.6rem; }

  .gv-lb-body {
    grid-template-columns: 1fr;
    height: 100%;
    min-height: 100%;
  }

  .gv-lb-media {
    height: 100%;
    max-height: 100%;
    min-height: 100%;
    width: 100%;
  }

  .gv-lb-img {
    /* Contain = show the FULL photo, no crop */
    object-fit: contain;
  }

  /* HUD overlay — counter top, tag+title bottom */
  .gv-lb-hud {
    position: absolute;
    inset: 0;
    pointer-events: none;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding: max(0.8rem, env(safe-area-inset-top, 0.8rem)) 0.9rem max(0.9rem, env(safe-area-inset-bottom, 0.9rem));
    z-index: 25;
  }

  .gv-lb-hud-top {
    display: flex;
    justify-content: flex-end;
    margin-right: 3.2rem;
  }

  .gv-lb-hud-bottom {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    flex-wrap: wrap;
  }

  .gv-lb-counter {
    font-family: var(--font-heading);
    font-size: 0.7rem;
    font-weight: 900;
    letter-spacing: 0.18em;
    color: #ffffff;
    background: rgba(0, 0, 0, 0.65);
    backdrop-filter: blur(10px);
    -webkit-backdrop-filter: blur(10px);
    border: 1px solid rgba(255, 0, 43, 0.4);
    padding: 0.32rem 0.7rem;
    border-radius: 3px;
  }

  .gv-lb-tag {
    font-family: var(--font-heading);
    font-size: 0.55rem;
    font-weight: 900;
    letter-spacing: 0.18em;
    color: #ff002b;
    background: rgba(0, 0, 0, 0.72);
    border: 1px solid rgba(255, 0, 43, 0.5);
    padding: 0.25rem 0.55rem;
    border-radius: 2px;
    flex-shrink: 0;
  }

  .gv-lb-title {
    font-family: var(--font-heading);
    font-size: 0.82rem;
    font-weight: 900;
    color: #ffffff;
    background: rgba(0, 0, 0, 0.65);
    backdrop-filter: blur(10px);
    -webkit-backdrop-filter: blur(10px);
    padding: 0.3rem 0.6rem;
    border-radius: 3px;
    max-width: 60vw;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  /* Sidebar hidden on mobile — text lives in the HUD */
  .gv-lb-side {
    display: none;
  }
}

/* Very small screens */
@media (max-width: 380px) {
  .gv-filter-bar {
    padding: 0.55rem 0.6rem;
  }

  .gv-filter-chip {
    font-size: 0.54rem;
    padding: 0.4rem 0.55rem;
  }

  .gv-view-toggle {
    display: none;
  }

  .gv-grid {
    padding: 0 0.6rem;
  }

  .mode-masonry {
    column-gap: 0.45rem;
  }

  .mode-masonry .gv-tile {
    margin-bottom: 0.45rem;
  }

  .mode-grid {
    gap: 0.45rem;
  }
}
</style>
