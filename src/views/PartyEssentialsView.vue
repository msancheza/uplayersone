<script setup>
import { ref, computed, onMounted, nextTick, watch } from 'vue'
import {
  ArrowLeft,
  Sparkles,
  ChevronRight,
  MapPin,
  Package,
  PartyPopper,
  Gift,
  Check,
  ArrowDown,
} from 'lucide-vue-next'
import { useRouter } from 'vue-router'
import siteConfig from '../config/siteConfig.js'

const router = useRouter()
const goHome = () => router.push('/')
const goToBooking = () => router.push('/#contact')

/* -----------------------------------------------------------
   CATEGORIES — quick filter chips (only show what we actually
   have photos for in /public/supplies).
   ----------------------------------------------------------- */
const categories = [
  { id: 'all',       label: 'ALL ITEMS',  icon: Package },
  { id: 'balloons',  label: 'BALLOONS',   icon: PartyPopper },
  { id: 'decor',     label: 'DÉCOR',      icon: Sparkles },
  { id: 'jumpers',   label: 'JUMPERS',    icon: Gift },
  { id: 'packages',  label: 'PACKAGES',   icon: Gift },
]

const activeCategory = ref('all')

/* -----------------------------------------------------------
   CATALOG — sourced from /public/supplies. Each card needs
   a real photo, a friendly title, category tag, and a starting
   price label. We only show "Starting at" where the catalog
   is real; we use "Custom Quote" otherwise to stay honest.
   ----------------------------------------------------------- */
const catalog = [
  /* BALLOONS */
  { id: 'b1', category: 'balloons', badge: 'POPULAR', title: 'GAMING BALLOON GARLAND',  subtitle: 'Balloon Décor · Custom Colors',  image: '/supplies/balloon_decor/IMG_2893-1.jpg',  price: 'Starting at $___' },
  { id: 'b2', category: 'balloons', badge: '',        title: 'THEMED BALLOON ARCH',     subtitle: 'Entryway · Photo Backdrop',    image: '/supplies/balloon_decor/IMG_2929-1.jpg',  price: 'Custom Quote' },
  { id: 'b3', category: 'balloons', badge: 'NEW',     title: 'ORGANIC BALLOON CLOUD',   subtitle: 'Ceiling Install · Pastel',     image: '/supplies/balloon_decor/IMG_484028129.jpg', price: 'Custom Quote' },
  { id: 'b4', category: 'balloons', badge: '',        title: 'NUMBER BALLOON SET',      subtitle: 'Ages 1–18 · Gold or Silver',   image: '/supplies/balloon_decor/IMG_4956-1.jpg',  price: 'Starting at $___' },
  { id: 'b5', category: 'balloons', badge: '',        title: 'CHARACTER BALLOON BOUQUET', subtitle: 'Custom Themes',               image: '/supplies/balloon_decor/IMG_4987.jpg',    price: 'Custom Quote' },
  { id: 'b6', category: 'balloons', badge: '',        title: 'BALLOON CENTERPIECES',    subtitle: 'Set of 6 · Themed',           image: '/supplies/balloon_decor/IMG_4993.jpg',    price: 'Starting at $___' },
  { id: 'b7', category: 'balloons', badge: '',        title: 'BIRTHDAY BALLOON WALL',    subtitle: 'Photo-worthy Backdrop',       image: '/supplies/balloon_decor/IMG_5222.jpg',    price: 'Custom Quote' },
  { id: 'b8', category: 'balloons', badge: 'SUMMER',  title: 'GAMING PARTY BALLOONS',    subtitle: 'Console-themed Setup',        image: '/supplies/balloon_decor/IMG_5503.jpg',    price: 'Starting at $___' },
  { id: 'b9', category: 'balloons', badge: '',        title: 'CUSTOM COLOR GARLAND',     subtitle: 'Any Palette · 6–10 ft',       image: '/supplies/balloon_decor/IMG_6614.jpg',    price: 'Custom Quote' },

  /* DÉCOR */
  { id: 'd1', category: 'decor', badge: 'POPULAR', title: 'GLOW NEON SIGN',           subtitle: 'Custom Name or Phrase',     image: '/supplies/decors/E3C6F680-_01-1.jpg',  price: 'Starting at $___' },
  { id: 'd2', category: 'decor', badge: '',        title: 'PARTY BACKDROP KIT',       subtitle: 'Stand + Drapes + Custom',   image: '/supplies/decors/IMG_3754-1.jpg',     price: 'Starting at $___' },
  { id: 'd3', category: 'decor', badge: '',        title: 'TABLE DÉCOR SET',          subtitle: 'Plates · Napkins · Cutlery', image: '/supplies/decors/IMG_3755-1.jpg',     price: 'Starting at $___' },
  { id: 'd4', category: 'decor', badge: 'NEW',     title: 'CUSTOM PHOTO WALL',        subtitle: 'Printed Backdrop',          image: '/supplies/decors/IMG_4842-1.jpg',     price: 'Custom Quote' },
  { id: 'd5', category: 'decor', badge: '',        title: 'CENTERPIECE BUNDLE',       subtitle: '5 Themed Centerpieces',     image: '/supplies/decors/IMG_4849-1-1.jpg',   price: 'Starting at $___' },
  { id: 'd6', category: 'decor', badge: '',        title: 'DESSERT TABLE SETUP',      subtitle: 'Linens · Risers · Skirts',  image: '/supplies/decors/IMG_4849.jpg',       price: 'Custom Quote' },
  { id: 'd7', category: 'decor', badge: '',        title: 'LED UPLIGHT PACK',         subtitle: 'Set of 4 · Color Changing',  image: '/supplies/decors/IMG_4849_01-2.jpg',  price: 'Starting at $___' },
  { id: 'd8', category: 'decor', badge: '',        title: 'SIGNAGE + WAYFINDING',     subtitle: 'Custom Prints',             image: '/supplies/decors/IMG_5219-1.jpg',     price: 'Starting at $___' },
  { id: 'd9', category: 'decor', badge: '',        title: 'CONFETTI + BALLOON DROP',  subtitle: 'Surprise Moment',           image: '/supplies/decors/IMG_5219.jpg',       price: 'Custom Quote' },

  /* JUMPERS */
  { id: 'j1', category: 'jumpers', badge: 'POPULAR', title: 'CLASSIC CASTLE BOUNCE',   subtitle: '13×13 ft · Standard',     image: '/supplies/regular_jumpers/IMG_2030-1.jpg',  price: 'Starting at $___' },
  { id: 'j2', category: 'jumpers', badge: '',        title: 'GAMING JUMPER',           subtitle: 'Console Theme · 15×15',   image: '/supplies/regular_jumpers/IMG_2245-1.jpg',  price: 'Custom Quote' },
  { id: 'j3', category: 'jumpers', badge: '',        title: 'OBSTACLE COURSE',         subtitle: 'Dual Lane · 30 ft',       image: '/supplies/regular_jumpers/IMG_2530-1.jpg',  price: 'Starting at $___' },
  { id: 'j4', category: 'jumpers', badge: 'NEW',     title: 'COMBO BOUNCE + SLIDE',    subtitle: 'All Ages · 18×18',        image: '/supplies/regular_jumpers/IMG_4114-1-1.jpg', price: 'Starting at $___' },
  { id: 'j5', category: 'jumpers', badge: '',        title: 'SPORTS ARENA',            subtitle: 'Soccer · Basketball',      image: '/supplies/regular_jumpers/IMG_5006-1.jpg',  price: 'Custom Quote' },
  { id: 'j6', category: 'jumpers', badge: '',        title: 'MINI JUMPER',             subtitle: 'Toddler Safe · Small',    image: '/supplies/regular_jumpers/IMG_5169-1.jpg',  price: 'Starting at $___' },
  { id: 'j7', category: 'jumpers', badge: '',        title: 'WATER SLIDE COMBO',       subtitle: 'Wet + Dry · 22 ft',       image: '/supplies/regular_jumpers/IMG_6578-1-1.jpg', price: 'Starting at $___' },
  { id: 'j8', category: 'jumpers', badge: 'SUMMER',  title: 'SPLASH PAD',              subtitle: 'Summer Cooler',           image: '/supplies/water_jumpers/IMG_7959-1.jpg',   price: 'Starting at $___' },
  { id: 'j9', category: 'jumpers', badge: '',        title: 'INTERACTIVE GAME JUMPER',  subtitle: 'Built-in Games',          image: '/supplies/activity_jumpers/IMG_1666_01-1.jpg', price: 'Custom Quote' },
  { id: 'j10', category: 'jumpers', badge: '',       title: 'SPORT CHALLENGE',         subtitle: 'Inflatable Arena',        image: '/supplies/activity_jumpers/IMG_2232.jpg',   price: 'Custom Quote' },

  /* PACKAGES — virtual cards (no separate photos in /public/supplies yet) */
  { id: 'p1', category: 'packages', badge: 'POPULAR', title: 'THE GAMER SETUP',         subtitle: 'Gaming truck + balloon décor',          image: '/supplies/balloon_decor/IMG_2893-1.jpg', price: 'Custom Quote', highlight: true },
  { id: 'p2', category: 'packages', badge: 'NEW',     title: 'THE ULTIMATE CELEBRATION', subtitle: 'Truck + décor + activity jumper',       image: '/supplies/decors/IMG_4849.jpg',       price: 'Custom Quote', highlight: true },
  { id: 'p3', category: 'packages', badge: 'SUMMER',  title: 'THE SPLASH PARTY',        subtitle: 'Water jumper + balloons + essentials', image: '/supplies/water_jumpers/IMG_7959.jpg',  price: 'Custom Quote' },
]

const filteredCatalog = computed(() => {
  if (activeCategory.value === 'all') return catalog
  return catalog.filter((item) => item.category === activeCategory.value)
})

const setCategory = (id) => {
  activeCategory.value = id
}

// When the active category changes, Vue swaps the catalog items
// inside the .pe-catalog section. The new cards are mounted with
// `.reveal-card` (opacity: 0). The sentinel observer has already
// fired and unobserved the section, so the new cards stay hidden.
// Flip them visible on the next tick and refresh the stagger so the
// cascade still feels intentional. We also re-pin the chips + the
// categories label, because Vue's reactive update on
// `activeCategory` was inadvertently dropping the
// `.card-in-view` class from the first two chips during re-render.
watch(activeCategory, () => {
  nextTick(() => {
    // 1. Re-show chips that Vue may have re-rendered without the
    //    in-view class. Force them visible after the DOM settles.
    document.querySelectorAll('.chip').forEach((c) => {
      c.classList.add('card-in-view')
    })

    // 2. Replay the catalog cards so the new filter feels animated.
    const section = document.querySelector('.pe-catalog')
    if (!section) return
    const cards = section.querySelectorAll('.reveal-card')
    cards.forEach((c, i) => {
      c.style.setProperty('--card-stagger', `${i * 50}ms`)
      c.classList.remove('card-in-view')
      // Force a reflow so removing+re-adding restarts the transition.
      // eslint-disable-next-line no-unused-expressions
      void c.offsetWidth
      c.classList.add('card-in-view')
    })
  })
})

/* -----------------------------------------------------------
   HOW IT WORKS — 4-step process strip.
   ----------------------------------------------------------- */
const steps = [
  { num: '01', title: 'CHOOSE YOUR FAVORITES', desc: 'Pick balloons, décor, jumpers or a curated package.' },
  { num: '02', title: 'TELL US DATE & LOCATION', desc: 'Share your event date, city and guest count.' },
  { num: '03', title: 'WE CONFIRM + QUOTE',     desc: 'Our team checks availability and sends a custom quote.' },
  { num: '04', title: 'WE BRING IT TOGETHER',    desc: 'One local team. One unforgettable celebration.' },
]

/* -----------------------------------------------------------
   FAQ — short answers, all copy in English per design doc.
   ----------------------------------------------------------- */
const faqs = [
  {
    q: 'Do you deliver and set up the décor?',
    a: 'Yes. Our team handles delivery, setup and teardown for every décor and jumper booking within our service area.',
  },
  {
    q: 'Can I combine party supplies with a gaming truck?',
    a: 'Absolutely. Most clients bundle décor + truck. Add "Add to my Gaming Truck Party" on any item to combine into a single quote.',
  },
  {
    q: 'How far in advance should I book?',
    a: 'We recommend 2–4 weeks for décor and balloons, and 4–8 weeks for jumpers during peak season (spring/summer).',
  },
  {
    q: 'Do you handle bad weather for outdoor setups?',
    a: 'Jumpers can be moved to a covered area or rescheduled. Outdoor balloon décor is wind-sensitive; we monitor and adjust day-of.',
  },
  {
    q: 'What about a deposit?',
    a: 'A 30% deposit secures your date, with the balance due 48 hours before the event. Cancellations follow our posted policy.',
  },
]

const openFaq = ref(0)
const toggleFaq = (idx) => {
  openFaq.value = openFaq.value === idx ? -1 : idx
}

/* -----------------------------------------------------------
   HERO IMAGE — pick the most representative decor + balloons.
   ----------------------------------------------------------- */
const heroImage = '/supplies/decors/IMG_4849.jpg'

/* -----------------------------------------------------------
   Entrance reveal — flip cards to visible as soon as the user
   scrolls anywhere into the page. We use a single sentinel
   observer that watches each section and reveals ALL its cards
   at once with a staggered cascade — simpler and far more
   reliable than per-card observers.
   ----------------------------------------------------------- */
const revealCards = () => {
  const sections = document.querySelectorAll('.pe-categories, .pe-catalog, .pe-experience, .pe-how, .pe-faq, .pe-final')
  sections.forEach((section) => {
    const cards = section.querySelectorAll('.reveal-card')
    cards.forEach((c, i) => c.style.setProperty('--card-stagger', `${i * 60}ms`))
  })

  const sentinelObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.querySelectorAll('.reveal-card').forEach((c) => {
            c.classList.add('card-in-view')
          })
          sentinelObserver.unobserve(entry.target)
        }
      })
    },
    { threshold: 0.05, rootMargin: '0px 0px -10% 0px' }
  )
  sections.forEach((s) => sentinelObserver.observe(s))
}

onMounted(() => {
  nextTick(() => {
    revealCards()
    // Safety net: also flip any cards that are ALREADY in the viewport
    // at mount time (e.g. when user lands directly via hash navigation).
    setTimeout(() => {
      document.querySelectorAll('.reveal-card').forEach((c) => {
        const r = c.getBoundingClientRect()
        if (r.top < window.innerHeight && r.bottom > 0) {
          c.classList.add('card-in-view')
        }
      })
    }, 200)
  })
})
</script>

<template>
  <section class="pe-page">
    <!-- 1. HERO -->
    <div class="pe-hero">
      <div class="pe-hero-bg" :style="{ backgroundImage: `url(${heroImage})` }"></div>
      <div class="pe-hero-overlay"></div>

      <button class="back-btn" @click="goHome" aria-label="Back to home">
        <ArrowLeft :size="16" />
        <span>BACK</span>
      </button>

      <div class="pe-hero-content container">
        <div class="eyebrow-badge reveal-card">
          <Sparkles :size="14" class="text-red" />
          <span>SYSTEM 03 / PARTY ESSENTIALS</span>
        </div>

        <h1 class="pe-hero-title reveal-card">
          EVERY DETAIL.<br />
          <span class="text-red-glow">ONE UNFORGETTABLE PARTY.</span>
        </h1>

        <p class="pe-hero-sub reveal-card">
          Décor, balloons and party essentials to complete your celebration —
          paired with Los Angeles' favorite mobile gaming trucks.
        </p>

        <div class="pe-hero-cta reveal-card">
          <button class="btn-primary" @click="goToBooking">
            <span>BUILD MY PARTY</span>
            <ChevronRight :size="16" />
          </button>
          <a href="#pe-catalog" class="btn-ghost">
            <span>VIEW THE ESSENTIALS</span>
            <ArrowDown :size="14" />
          </a>
        </div>
      </div>
    </div>

    <!-- 2. CATEGORIES -->
    <div class="pe-categories container">
      <div class="categories-label reveal-card">EXPLORE PARTY ESSENTIALS</div>
      <div class="chips-row">
        <button
          v-for="cat in categories"
          :key="cat.id"
          class="chip reveal-card"
          :class="{ active: activeCategory === cat.id }"
          @click="setCategory(cat.id)"
        >
          <component :is="cat.icon" :size="14" />
          <span>[ {{ cat.label }} ]</span>
        </button>
      </div>
    </div>

    <!-- 3. CATALOG -->
    <div id="pe-catalog" class="pe-catalog container">
      <div class="catalog-grid">
        <article
          v-for="item in filteredCatalog"
          :key="item.id"
          class="catalog-card reveal-card"
          :class="{ 'is-highlight': item.highlight }"
        >
          <div class="card-img-wrap">
            <img :src="item.image" :alt="item.title" loading="lazy" />
            <div class="card-img-overlay"></div>
            <span v-if="item.badge" class="card-badge">{{ item.badge }}</span>
          </div>

          <div class="card-body">
            <h3 class="card-title">{{ item.title }}</h3>
            <p class="card-sub">{{ item.subtitle }}</p>
            <div class="card-price">{{ item.price }}</div>

            <button class="card-cta">
              <span>VIEW DETAILS</span>
              <ChevronRight :size="14" />
            </button>
          </div>
        </article>
      </div>
    </div>

    <!-- 4. BUILD THE COMPLETE EXPERIENCE -->
    <div class="pe-experience container">
      <div class="exp-eyebrow reveal-card">
        <Sparkles :size="14" class="text-red" />
        <span>BUNDLE &amp; SAVE</span>
      </div>

      <h2 class="exp-title reveal-card">
        BUILD THE <span class="text-red-glow">COMPLETE EXPERIENCE</span>
      </h2>

      <p class="exp-sub reveal-card">
        Gaming Truck + Party Décor + Jumpers — one local team, one unforgettable
        celebration.
      </p>

      <div class="pkg-grid">
        <article
          v-for="pkg in catalog.filter(i => i.category === 'packages')"
          :key="pkg.id"
          class="pkg-card reveal-card"
        >
          <div class="pkg-head">
            <span class="pkg-num">{{ pkg.id.toUpperCase() }}</span>
            <span v-if="pkg.badge" class="pkg-badge">{{ pkg.badge }}</span>
          </div>
          <h3 class="pkg-title">{{ pkg.title }}</h3>
          <p class="pkg-desc">{{ pkg.subtitle }}</p>
          <ul class="pkg-features">
            <li><Check :size="14" class="text-red" /> On-site setup &amp; teardown</li>
            <li><Check :size="14" class="text-red" /> Coordinated delivery window</li>
            <li><Check :size="14" class="text-red" /> One invoice, one point of contact</li>
          </ul>
          <button class="pkg-cta" @click="goToBooking">
            <span>BUILD THIS PARTY</span>
            <ChevronRight :size="14" />
          </button>
        </article>
      </div>
    </div>

    <!-- 5. HOW IT WORKS -->
    <div class="pe-how container">
      <div class="how-eyebrow reveal-card">
        <Sparkles :size="14" class="text-red" />
        <span>HOW IT WORKS</span>
      </div>

      <div class="steps-strip">
        <div v-for="s in steps" :key="s.num" class="step reveal-card">
          <span class="step-num">{{ s.num }}</span>
          <h4 class="step-title">{{ s.title }}</h4>
          <p class="step-desc">{{ s.desc }}</p>
        </div>
      </div>
    </div>

    <!-- 6. FAQ -->
    <div class="pe-faq container">
      <div class="faq-eyebrow reveal-card">
        <Sparkles :size="14" class="text-red" />
        <span>FREQUENTLY ASKED</span>
      </div>

      <h2 class="faq-title reveal-card">
        PARTY ESSENTIALS <span class="text-red-glow">FAQ</span>
      </h2>

      <div class="faq-list">
        <button
          v-for="(f, idx) in faqs"
          :key="idx"
          class="faq-item reveal-card"
          :class="{ open: openFaq === idx }"
          @click="toggleFaq(idx)"
        >
          <div class="faq-q">
            <span class="faq-idx">{{ String(idx + 1).padStart(2, '0') }}</span>
            <span class="faq-q-text">{{ f.q }}</span>
            <ChevronRight :size="16" class="faq-toggle" />
          </div>
          <div v-if="openFaq === idx" class="faq-a">{{ f.a }}</div>
        </button>
      </div>
    </div>

    <!-- 7. FINAL CTA -->
    <div class="pe-final container">
      <div class="final-card reveal-card">
        <div class="final-corner top-left"></div>
        <div class="final-corner top-right"></div>
        <div class="final-corner bottom-left"></div>
        <div class="final-corner bottom-right"></div>

        <h2 class="final-title">
          READY TO BUILD YOUR <span class="text-red-glow">ULTIMATE PARTY?</span>
        </h2>
        <p class="final-sub">
          Share your event date, location, guest count and party vision —
          we'll handle the rest.
        </p>

        <div class="final-actions">
          <button class="btn-primary" @click="goToBooking">
            <span>START YOUR REQUEST</span>
            <ChevronRight :size="16" />
          </button>
          <a :href="`tel:${siteConfig.phoneRaw}`" class="btn-ghost">
            <span>OR CALL {{ siteConfig.phone }}</span>
          </a>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
/* ============================================================
   SHARED HELPERS
   ============================================================ */
.text-red { color: #ff002b; }
.text-red-glow {
  color: #ff002b;
  text-shadow: 0 0 22px rgba(255, 0, 43, 0.55);
}

.container {
  width: 100%;
  max-width: 1240px;
  margin: 0 auto;
  padding: 0 1.5rem;
}

.reveal-card {
  opacity: 0;
  transform: translateY(40px) scale(0.96);
  filter: blur(3px);
  transition: opacity 0.7s cubic-bezier(0.16, 1, 0.3, 1),
              transform 0.7s cubic-bezier(0.16, 1, 0.3, 1),
              filter 0.7s cubic-bezier(0.16, 1, 0.3, 1);
  transition-delay: var(--card-stagger, 0ms);
}
.reveal-card.card-in-view {
  opacity: 1;
  transform: translateY(0) scale(1);
  filter: blur(0);
}

/* Eyebrow badge */
.eyebrow-badge,
.exp-eyebrow,
.how-eyebrow,
.faq-eyebrow {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  font-family: var(--font-heading);
  font-size: 0.68rem;
  font-weight: 900;
  letter-spacing: 0.25em;
  color: #ff002b;
  background: rgba(255, 0, 43, 0.1);
  border: 1px solid rgba(255, 0, 43, 0.3);
  padding: 0.4rem 1.1rem;
  border-radius: 4px;
  margin-bottom: 1.4rem;
}

/* Buttons */
.btn-primary {
  display: inline-flex;
  align-items: center;
  gap: 0.55rem;
  font-family: var(--font-heading);
  font-size: 0.82rem;
  font-weight: 900;
  letter-spacing: 0.12em;
  color: #ffffff;
  background: linear-gradient(180deg, #ff002b 0%, #cc0022 100%);
  border: none;
  padding: 0.95rem 1.7rem;
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.25s ease;
  clip-path: polygon(10px 0, 100% 0, 100% calc(100% - 10px), calc(100% - 10px) 100%, 0 100%, 0 10px);
}
.btn-primary:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 24px rgba(255, 0, 43, 0.5);
}
.btn-ghost {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  font-family: var(--font-heading);
  font-size: 0.78rem;
  font-weight: 800;
  letter-spacing: 0.12em;
  color: rgba(255, 255, 255, 0.85);
  background: transparent;
  border: 1px solid rgba(255, 255, 255, 0.2);
  padding: 0.9rem 1.5rem;
  border-radius: 4px;
  cursor: pointer;
  text-decoration: none;
  transition: all 0.25s ease;
}
.btn-ghost:hover {
  border-color: rgba(255, 0, 43, 0.5);
  color: #ffffff;
}

/* ============================================================
   HERO
   ============================================================ */
.pe-hero {
  position: relative;
  min-height: 88vh;
  display: flex;
  align-items: center;
  overflow: hidden;
  background: #000;
}
.pe-hero-bg {
  position: absolute;
  inset: 0;
  background-size: cover;
  background-position: center;
  filter: brightness(0.4) saturate(1.1);
  transform: scale(1.05);
}
.pe-hero-overlay {
  position: absolute;
  inset: 0;
  background:
    radial-gradient(ellipse at 30% 50%, rgba(255, 0, 43, 0.18) 0%, transparent 60%),
    linear-gradient(180deg, rgba(0, 0, 0, 0.4) 0%, rgba(0, 0, 0, 0.85) 100%);
}
.pe-hero-content {
  position: relative;
  z-index: 2;
  padding: 8rem 1.5rem 5rem;
}
.pe-hero-title {
  font-family: var(--font-heading);
  font-size: clamp(2.4rem, 6vw, 4.6rem);
  font-weight: 900;
  color: #ffffff;
  line-height: 1.05;
  letter-spacing: 0.01em;
  margin-bottom: 1.3rem;
  max-width: 900px;
}
.pe-hero-sub {
  font-size: clamp(1rem, 1.4vw, 1.2rem);
  color: rgba(255, 255, 255, 0.78);
  line-height: 1.6;
  max-width: 620px;
  margin-bottom: 2.2rem;
}
.pe-hero-cta {
  display: flex;
  gap: 0.9rem;
  flex-wrap: wrap;
}
.back-btn {
  position: absolute;
  top: 6.5rem;
  left: 1.5rem;
  z-index: 3;
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  font-family: var(--font-heading);
  font-size: 0.7rem;
  font-weight: 900;
  letter-spacing: 0.15em;
  color: rgba(255, 255, 255, 0.8);
  background: rgba(0, 0, 0, 0.55);
  border: 1px solid rgba(255, 255, 255, 0.2);
  padding: 0.55rem 0.9rem;
  border-radius: 3px;
  cursor: pointer;
  transition: all 0.25s ease;
  backdrop-filter: blur(8px);
}
.back-btn:hover {
  color: #ffffff;
  border-color: rgba(255, 0, 43, 0.5);
}

/* ============================================================
   CATEGORIES
   ============================================================ */
.pe-categories {
  padding: 3.5rem 1.5rem 1.5rem;
  text-align: center;
}
.categories-label {
  font-family: var(--font-heading);
  font-size: 0.72rem;
  font-weight: 900;
  letter-spacing: 0.3em;
  color: rgba(255, 255, 255, 0.55);
  margin-bottom: 1.4rem;
}
.chips-row {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 0.7rem;
}
.chip {
  display: inline-flex;
  align-items: center;
  gap: 0.45rem;
  font-family: var(--font-heading);
  font-size: 0.74rem;
  font-weight: 900;
  letter-spacing: 0.15em;
  padding: 0.65rem 1.2rem;
  background: rgba(10, 10, 16, 0.85);
  color: rgba(255, 255, 255, 0.6);
  border: 1.5px solid rgba(255, 255, 255, 0.15);
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.25s ease;
}
.chip:hover {
  color: #ffffff;
  border-color: rgba(255, 0, 43, 0.6);
  background: rgba(255, 0, 43, 0.12);
}
.chip.active {
  color: #ffffff;
  background: #ff002b;
  border-color: #ff002b;
  box-shadow: 0 0 22px rgba(255, 0, 43, 0.55);
}

/* ============================================================
   CATALOG
   ============================================================ */
.pe-catalog {
  padding: 2rem 1.5rem 4rem;
}
.catalog-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1.4rem;
}
.catalog-card {
  position: relative;
  background: rgba(10, 10, 16, 0.88);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 6px;
  overflow: hidden;
  transition: border-color 0.3s ease, box-shadow 0.3s ease, transform 0.3s ease;
  display: flex;
  flex-direction: column;
}
.catalog-card:hover {
  border-color: rgba(255, 0, 43, 0.5);
  box-shadow: 0 8px 28px rgba(255, 0, 43, 0.12);
  transform: translateY(-4px);
}
.catalog-card.is-highlight {
  border-color: rgba(255, 0, 43, 0.4);
}
.card-img-wrap {
  position: relative;
  aspect-ratio: 4 / 3;
  overflow: hidden;
  background: #050507;
}
.card-img-wrap img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.6s ease;
}
.catalog-card:hover .card-img-wrap img {
  transform: scale(1.05);
}
.card-img-overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(180deg, transparent 50%, rgba(0, 0, 0, 0.6) 100%);
  pointer-events: none;
}
.card-badge {
  position: absolute;
  top: 0.7rem;
  left: 0.7rem;
  z-index: 2;
  font-family: var(--font-heading);
  font-size: 0.58rem;
  font-weight: 900;
  letter-spacing: 0.15em;
  color: #ffffff;
  background: rgba(255, 0, 43, 0.92);
  padding: 0.3rem 0.6rem;
  border-radius: 3px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.5);
}
.card-body {
  padding: 1.2rem 1.1rem 1.3rem;
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
}
.card-title {
  font-family: var(--font-heading);
  font-size: 0.95rem;
  font-weight: 900;
  color: #ffffff;
  line-height: 1.2;
  letter-spacing: 0.02em;
}
.card-sub {
  font-size: 0.78rem;
  color: rgba(255, 255, 255, 0.6);
  line-height: 1.4;
}
.card-price {
  font-family: var(--font-heading);
  font-size: 0.82rem;
  font-weight: 800;
  color: #ff002b;
  letter-spacing: 0.04em;
  margin-top: 0.4rem;
}
.card-cta {
  margin-top: 0.6rem;
  display: inline-flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.4rem;
  font-family: var(--font-heading);
  font-size: 0.7rem;
  font-weight: 900;
  letter-spacing: 0.12em;
  color: #ffffff;
  background: rgba(255, 0, 43, 0.08);
  border: 1px solid rgba(255, 0, 43, 0.4);
  padding: 0.6rem 0.85rem;
  border-radius: 3px;
  cursor: pointer;
  transition: all 0.25s ease;
}
.card-cta:hover {
  background: #ff002b;
  border-color: #ff002b;
  box-shadow: 0 4px 14px rgba(255, 0, 43, 0.45);
}

/* ============================================================
   BUILD EXPERIENCE
   ============================================================ */
.pe-experience {
  padding: 4rem 1.5rem;
  text-align: center;
  border-top: 1px solid rgba(255, 255, 255, 0.05);
  border-bottom: 1px solid rgba(255, 255, 255, 0.05);
}
.exp-title {
  font-family: var(--font-heading);
  font-size: clamp(1.8rem, 3.5vw, 2.8rem);
  font-weight: 900;
  color: #ffffff;
  line-height: 1.1;
  margin-bottom: 0.8rem;
  letter-spacing: 0.02em;
}
.exp-sub {
  font-size: 1rem;
  color: rgba(255, 255, 255, 0.65);
  max-width: 600px;
  margin: 0 auto 2.5rem;
  line-height: 1.6;
}
.pkg-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1.2rem;
  text-align: left;
}
.pkg-card {
  background: rgba(10, 10, 16, 0.9);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 6px;
  padding: 1.6rem 1.3rem;
  display: flex;
  flex-direction: column;
  gap: 0.6rem;
  position: relative;
}
.pkg-card:hover {
  border-color: rgba(255, 0, 43, 0.5);
}
.pkg-head {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.pkg-num {
  font-family: var(--font-heading);
  font-size: 0.7rem;
  font-weight: 900;
  letter-spacing: 0.18em;
  color: #ff002b;
}
.pkg-badge {
  font-family: var(--font-heading);
  font-size: 0.58rem;
  font-weight: 900;
  letter-spacing: 0.15em;
  color: #ffffff;
  background: rgba(255, 0, 43, 0.85);
  padding: 0.22rem 0.55rem;
  border-radius: 3px;
}
.pkg-title {
  font-family: var(--font-heading);
  font-size: 1.05rem;
  font-weight: 900;
  color: #ffffff;
  letter-spacing: 0.02em;
}
.pkg-desc {
  font-size: 0.86rem;
  color: rgba(255, 255, 255, 0.65);
  line-height: 1.45;
}
.pkg-features {
  list-style: none;
  padding: 0;
  margin: 0.5rem 0;
  display: flex;
  flex-direction: column;
  gap: 0.35rem;
}
.pkg-features li {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.78rem;
  color: rgba(255, 255, 255, 0.75);
}
.pkg-cta {
  margin-top: 0.4rem;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.4rem;
  font-family: var(--font-heading);
  font-size: 0.72rem;
  font-weight: 900;
  letter-spacing: 0.12em;
  color: #ffffff;
  background: transparent;
  border: 1.5px solid #ff002b;
  padding: 0.75rem 1rem;
  border-radius: 3px;
  cursor: pointer;
  transition: all 0.25s ease;
  text-decoration: none;
}
.pkg-cta:hover {
  background: #ff002b;
  box-shadow: 0 4px 14px rgba(255, 0, 43, 0.45);
}

/* ============================================================
   HOW IT WORKS
   ============================================================ */
.pe-how {
  padding: 4rem 1.5rem;
  text-align: center;
}
.steps-strip {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1.2rem;
  margin-top: 1rem;
}
.step {
  background: rgba(10, 10, 16, 0.7);
  border: 1px solid rgba(255, 255, 255, 0.06);
  border-left: 2px solid #ff002b;
  border-radius: 4px;
  padding: 1.3rem 1rem;
  text-align: left;
  display: flex;
  flex-direction: column;
  gap: 0.45rem;
}
.step-num {
  font-family: var(--font-heading);
  font-size: 0.72rem;
  font-weight: 900;
  color: #ff002b;
  letter-spacing: 0.15em;
}
.step-title {
  font-family: var(--font-heading);
  font-size: 0.82rem;
  font-weight: 900;
  color: #ffffff;
  letter-spacing: 0.06em;
  line-height: 1.25;
}
.step-desc {
  font-size: 0.78rem;
  color: rgba(255, 255, 255, 0.6);
  line-height: 1.5;
}

/* ============================================================
   FAQ
   ============================================================ */
.pe-faq {
  padding: 4rem 1.5rem;
  text-align: center;
}
.faq-title {
  font-family: var(--font-heading);
  font-size: clamp(1.7rem, 3.2vw, 2.4rem);
  font-weight: 900;
  color: #ffffff;
  letter-spacing: 0.02em;
  margin-bottom: 2rem;
}
.faq-list {
  max-width: 760px;
  margin: 0 auto;
  text-align: left;
  display: flex;
  flex-direction: column;
  gap: 0.6rem;
}
.faq-item {
  background: rgba(10, 10, 16, 0.85);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 4px;
  padding: 0.95rem 1.1rem;
  cursor: pointer;
  transition: border-color 0.25s ease, background 0.25s ease;
  text-align: left;
  font-family: inherit;
  color: inherit;
}
.faq-item:hover {
  border-color: rgba(255, 0, 43, 0.35);
}
.faq-item.open {
  border-color: rgba(255, 0, 43, 0.5);
  background: rgba(255, 0, 43, 0.04);
}
.faq-q {
  display: flex;
  align-items: center;
  gap: 0.9rem;
  font-family: var(--font-heading);
  font-size: 0.88rem;
  font-weight: 800;
  color: #ffffff;
  letter-spacing: 0.04em;
}
.faq-idx {
  color: #ff002b;
  font-size: 0.72rem;
  letter-spacing: 0.15em;
  flex-shrink: 0;
}
.faq-q-text { flex: 1; }
.faq-toggle {
  color: rgba(255, 255, 255, 0.45);
  transition: transform 0.25s ease, color 0.25s ease;
}
.faq-item.open .faq-toggle {
  transform: rotate(90deg);
  color: #ff002b;
}
.faq-a {
  margin-top: 0.8rem;
  padding-left: 2.1rem;
  font-size: 0.86rem;
  color: rgba(255, 255, 255, 0.7);
  line-height: 1.6;
}

/* ============================================================
   FINAL CTA
   ============================================================ */
.pe-final {
  padding: 4rem 1.5rem 6rem;
}
.final-card {
  position: relative;
  background:
    linear-gradient(180deg, rgba(255, 0, 43, 0.12) 0%, rgba(10, 10, 16, 0.95) 100%);
  border: 1.5px solid rgba(255, 0, 43, 0.45);
  border-radius: 8px;
  padding: 3.5rem 2rem;
  text-align: center;
  box-shadow: 0 0 60px rgba(255, 0, 43, 0.15), inset 0 0 30px rgba(255, 0, 43, 0.05);
}
.final-corner {
  position: absolute;
  width: 14px;
  height: 14px;
  border-color: #ff002b;
  border-style: solid;
}
.final-corner.top-left     { top: -2px; left: -2px;     border-width: 2px 0 0 2px; }
.final-corner.top-right    { top: -2px; right: -2px;    border-width: 2px 2px 0 0; }
.final-corner.bottom-left  { bottom: -2px; left: -2px;  border-width: 0 0 2px 2px; }
.final-corner.bottom-right { bottom: -2px; right: -2px; border-width: 0 2px 2px 0; }
.final-title {
  font-family: var(--font-heading);
  font-size: clamp(1.8rem, 3.5vw, 2.6rem);
  font-weight: 900;
  color: #ffffff;
  line-height: 1.15;
  letter-spacing: 0.02em;
  margin-bottom: 0.9rem;
}
.final-sub {
  font-size: 1.02rem;
  color: rgba(255, 255, 255, 0.7);
  line-height: 1.6;
  max-width: 580px;
  margin: 0 auto 2rem;
}
.final-actions {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.8rem;
  flex-wrap: wrap;
}

/* ============================================================
   RESPONSIVE
   ============================================================ */
@media (max-width: 1024px) {
  .catalog-grid { grid-template-columns: repeat(2, 1fr); }
  .pkg-grid { grid-template-columns: repeat(2, 1fr); }
  .steps-strip { grid-template-columns: repeat(2, 1fr); }
}
@media (max-width: 640px) {
  .pe-hero { min-height: 78vh; }
  .pe-hero-content { padding: 7rem 1rem 3rem; }
  .back-btn { top: 5rem; left: 1rem; }
  .catalog-grid { grid-template-columns: 1fr; }
  .pkg-grid { grid-template-columns: 1fr; }
  .steps-strip { grid-template-columns: 1fr; }
  .final-card { padding: 2.2rem 1.3rem; }
  .final-actions { flex-direction: column; }
  .btn-primary, .btn-ghost { width: 100%; justify-content: center; }
}
</style>
