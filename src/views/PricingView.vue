<script setup>
import { ref } from 'vue'
import { 
  Tv, 
  Wind, 
  Volume2, 
  Gamepad2, 
  Glasses, 
  AlertTriangle, 
  Calendar, 
  MapPin, 
  Phone, 
  ChevronRight, 
  Check, 
  Clock, 
  Sparkles,
  ArrowLeft
} from 'lucide-vue-next'
import { useRouter } from 'vue-router'
import siteConfig from '../config/siteConfig.js'

const router = useRouter()

const packages = [
  {
    id: 1,
    name: 'Standard Gaming Truck',
    num: '01',
    basePrice: 450,
    baseDuration: 'First 2 Hours',
    extraHourPrice: 130,
    tvs: '4 Inside · 2 Outside',
    tvCount: 6,
    features: ['A/C Units', 'Stadium Seating', 'Surround System', 'LED Lights'],
    consoles: [
      '2× Nintendo Switch',
      '1× PlayStation 4',
      '1× PlayStation 5',
      '1× Xbox One S',
      '1× Xbox Series X'
    ],
    popular: false,
    tag: 'OUTDOOR & INDOOR'
  },
  {
    id: 2,
    name: 'Deluxe Gaming Truck',
    num: '02',
    basePrice: 450,
    baseDuration: 'First 2 Hours',
    extraHourPrice: 130,
    tvs: '6 TVs All Inside',
    tvCount: 6,
    features: ['A/C Units', 'Stadium Seating', 'Surround System', 'LED Lights'],
    consoles: [
      '2× Nintendo Switch',
      '1× PlayStation 4',
      '1× PlayStation 5',
      '1× Xbox One S',
      '1× Xbox Series X'
    ],
    popular: true,
    tag: 'MOST POPULAR'
  },
  {
    id: 3,
    name: 'Gaming Bus',
    num: '03',
    basePrice: 450,
    baseDuration: 'First 2 Hours',
    extraHourPrice: 130,
    tvs: '6 TVs All Inside',
    tvCount: 6,
    features: ['Stadium Seating'],
    consoles: [
      '2× Nintendo Switch',
      '1× PlayStation 4',
      '1× PlayStation 5',
      '1× Xbox',
      '1× Xbox Series X'
    ],
    popular: false,
    tag: 'MOBILE BUS'
  },
  {
    id: 4,
    name: 'Elite Gaming Truck',
    num: '04',
    basePrice: 500,
    baseDuration: 'First 2 Hours',
    extraHourPrice: 130,
    tvs: '10 TVs All Inside',
    tvCount: 10,
    features: ['A/C Units', 'Stadium Seating', 'Surround System', 'LED Lights'],
    consoles: [
      '2× Nintendo Switch',
      '3× PlayStation 4',
      '1× PlayStation 5',
      '3× Xbox One S',
      '1× Xbox Series X'
    ],
    popular: false,
    tag: 'ULTIMATE 10 TVS'
  }
]

const goHome = () => {
  router.push('/')
}

const goToBooking = () => {
  router.push('/#contact')
}
</script>

<template>
  <div class="pricing-page">
    
    <!-- Hero Header Banner -->
    <header class="pricing-hero">
      <div class="container">
        
        <button class="back-link" @click="goHome">
          <ArrowLeft :size="16" />
          <span>Back to Home</span>
        </button>

        <div class="hero-badge">
          <Sparkles :size="14" class="text-red" />
          <span>OFFICIAL RATES & PACKAGES</span>
        </div>

        <h1 class="hero-title">
          PRICING & <span class="text-red-glow">PACKAGES</span>
        </h1>

        <p class="hero-lead">
          Ultimate Players will make your event perfect with its surround sound and LED lights. 
          You and your guests will definitely have the <strong>Ultimate</strong> experience!
        </p>

      </div>
    </header>

    <main class="pricing-body">
      <div class="container">

        <!-- Important Pricing Notes Banner -->
        <div class="pricing-notes-card">
          <div class="notes-header">
            <div class="alert-icon-box">
              <AlertTriangle :size="22" />
            </div>
            <div>
              <h3 class="notes-title">IMPORTANT PRICING NOTES</h3>
              <p class="notes-sub">
                Prices shown below are standard residential party rates and 
                <strong>do not apply</strong> for School Events, Church Events, Business Events, 
                Corporate Events, City Events, Fairs, Sports Events, or Community Events.
              </p>
            </div>
          </div>

          <div class="notes-grid">
            <div class="note-pill">
              <Calendar :size="18" class="text-red flex-shrink-0" />
              <div>
                <strong>Holidays & Super Bowl:</strong>
                <span>Major Holidays and Super Bowl Sunday — please call for pricing.</span>
              </div>
            </div>

            <div class="note-pill">
              <MapPin :size="18" class="text-red flex-shrink-0" />
              <div>
                <strong>Travel Fee:</strong>
                <span>An additional fuel charge applies outside of a 12-mile radius from zip code 91803.</span>
              </div>
            </div>
          </div>
        </div>

        <!-- 4 Pricing Cards Grid -->
        <div class="section-title-wrap">
          <span class="sub-label">OUR FLEET</span>
          <h2>CHOOSE YOUR GAMING PACKAGE</h2>
        </div>

        <div class="pricing-cards-grid">
          <div 
            v-for="pkg in packages" 
            :key="pkg.id"
            class="pricing-card"
            :class="{ highlight: pkg.popular }"
          >
            <!-- Badge -->
            <div v-if="pkg.popular" class="card-pop-badge">
              <span>MOST POPULAR</span>
            </div>
            <div v-else class="card-tag-badge">
              <span>{{ pkg.tag }}</span>
            </div>

            <!-- Card Header -->
            <div class="card-top">
              <span class="pkg-num">{{ pkg.num }}</span>
              <div>
                <h3 class="pkg-name">{{ pkg.name }}</h3>
                <span class="pkg-tv-badge">{{ pkg.tvs }}</span>
              </div>
            </div>

            <!-- Price Block -->
            <div class="price-box">
              <div class="price-main">
                <span class="currency">$</span>
                <span class="amount">{{ pkg.basePrice }}</span>
              </div>
              <span class="duration">{{ pkg.baseDuration }}</span>
              <div class="extra-rate">
                <Clock :size="13" class="text-red" />
                <span>+${{ pkg.extraHourPrice }}/hr additional hours</span>
              </div>
            </div>

            <div class="divider"></div>

            <!-- Specs list -->
            <div class="pkg-specs">
              <!-- Features -->
              <div class="spec-group">
                <span class="spec-heading">INCLUDED FEATURES</span>
                <div class="features-pill-wrap">
                  <span v-for="(f, fIdx) in pkg.features" :key="fIdx" class="feat-pill">
                    <Check :size="12" class="text-red" />
                    {{ f }}
                  </span>
                </div>
              </div>

              <!-- Consoles -->
              <div class="spec-group">
                <span class="spec-heading">CONSOLES INCLUDED</span>
                <ul class="consoles-ul">
                  <li v-for="(c, cIdx) in pkg.consoles" :key="cIdx">{{ c }}</li>
                </ul>
              </div>
            </div>

            <!-- CTA -->
            <button 
              class="pkg-cta-btn" 
              :class="{ 'btn-highlight': pkg.popular }"
              @click="goToBooking"
            >
              <span>BOOK THIS TRUCK</span>
              <ChevronRight :size="16" />
            </button>
          </div>
        </div>

        <!-- Comprehensive Pricing Table (Markdown Table Fidelity) -->
        <div class="table-section">
          <div class="section-title-wrap">
            <span class="sub-label">SPECIFICATIONS</span>
            <h2>PRICING & FLEET COMPARISON MATRIX</h2>
          </div>

          <div class="table-container">
            <table class="pricing-table">
              <thead>
                <tr>
                  <th>Package</th>
                  <th>Base Price (First 2 Hours)</th>
                  <th>Additional Hours</th>
                  <th>TVs</th>
                  <th>Features</th>
                  <th>Included Consoles</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="pkg in packages" :key="pkg.id" :class="{ 'row-popular': pkg.popular }">
                  <td class="td-name">
                    <strong>{{ pkg.name }}</strong>
                    <span v-if="pkg.popular" class="table-pop-tag">POPULAR</span>
                  </td>
                  <td class="td-price">${{ pkg.basePrice }}</td>
                  <td class="td-extra">${{ pkg.extraHourPrice }}/hr</td>
                  <td>{{ pkg.tvs }}</td>
                  <td>{{ pkg.features.join(', ') }}</td>
                  <td class="td-consoles">{{ pkg.consoles.join(' · ') }}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <!-- Optional Add-ons Section -->
        <div class="addons-section">
          <div class="section-title-wrap">
            <span class="sub-label">UPGRADES</span>
            <h2>OPTIONAL ADD-ONS</h2>
          </div>

          <div class="addon-card">
            <div class="addon-visual">
              <div class="addon-icon-circle">
                <Glasses :size="32" class="text-red" />
              </div>
              <span class="addon-status">VR EXPERIENCE</span>
            </div>

            <div class="addon-info">
              <h3 class="addon-name">Oculus Quest 2 Virtual Reality Experience</h3>
              <p class="addon-desc">
                Step inside breathtaking VR worlds, rhythm games, and immersive 360° virtual adventures. 
                Complete with full coaching assistance and sanitized VR headsets.
              </p>
              
              <div class="addon-pricing-boxes">
                <div class="addon-rate-box">
                  <span class="rate-label">FIRST 2 HOURS</span>
                  <span class="rate-val">$100</span>
                </div>
                <div class="addon-rate-box">
                  <span class="rate-label">ADDITIONAL HOURS</span>
                  <span class="rate-val">$50 <small>/ hr after first 2 hrs</small></span>
                </div>
              </div>
            </div>

            <div class="addon-action">
              <button class="addon-btn" @click="goToBooking">
                <span>ADD TO BOOKING</span>
                <ChevronRight :size="15" />
              </button>
            </div>
          </div>
        </div>

        <!-- Bottom Contact / Call Bar -->
        <div class="pricing-cta-footer">
          <div class="cta-left">
            <h3>READY TO LOCK IN YOUR DATE?</h3>
            <p>We only require a deposit to hold your slot. Call or text us today!</p>
          </div>
          <div class="cta-right">
            <a :href="siteConfig.phoneTel" class="cta-phone-btn">
              <Phone :size="18" />
              <span>{{ siteConfig.phone }}</span>
            </a>
            <button class="cta-online-btn" @click="goToBooking">
              <span>INQUIRE ONLINE</span>
              <ChevronRight :size="16" />
            </button>
          </div>
        </div>

      </div>
    </main>

  </div>
</template>

<style scoped>
/* ============================================================
   PRICING PAGE WRAPPER
   ============================================================ */
.pricing-page {
  background-color: #000000;
  color: #ffffff;
  min-height: 100vh;
  padding-top: 5rem;
  padding-bottom: 6rem;
  position: relative;
  overflow-x: hidden;
  max-width: 100vw;
}

/* ============================================================
   HERO BANNER
   ============================================================ */
.pricing-hero {
  padding: 3rem 0 3.5rem;
  border-bottom: 1px solid rgba(255, 255, 255, 0.08);
  background: radial-gradient(circle at 50% 0%, rgba(255, 0, 43, 0.12) 0%, transparent 70%);
  text-align: center;
  max-width: 100%;
  overflow: hidden;
}

.back-link {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  background: transparent;
  border: none;
  color: rgba(255, 255, 255, 0.6);
  font-family: var(--font-heading);
  font-size: 0.72rem;
  font-weight: 800;
  letter-spacing: 0.1em;
  cursor: pointer;
  margin-bottom: 1.6rem;
  transition: color 0.2s ease, transform 0.2s ease;
}

.back-link:hover {
  color: #ff002b;
  transform: translateX(-4px);
}

.hero-badge {
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
  margin-bottom: 1.2rem;
}

.hero-title {
  font-family: var(--font-heading);
  font-size: clamp(2.4rem, 4.5vw, 3.8rem);
  font-weight: 900;
  color: #ffffff;
  line-height: 1.05;
  margin-bottom: 1.2rem;
  letter-spacing: 0.02em;
}

.text-red-glow {
  color: #ff002b;
  text-shadow: 0 0 25px rgba(255, 0, 43, 0.6);
}

.text-red {
  color: #ff002b;
}

.hero-lead {
  font-family: var(--font-body);
  font-size: 1.15rem;
  color: rgba(255, 255, 255, 0.7);
  max-width: 780px;
  margin: 0 auto;
  line-height: 1.6;
}

.hero-lead strong {
  color: #ff002b;
}

/* ============================================================
   PRICING BODY & NOTES
   ============================================================ */
.pricing-body {
  padding-top: 3.5rem;
}

.pricing-notes-card {
  background: rgba(16, 12, 16, 0.95);
  border: 1.5px solid rgba(255, 0, 43, 0.4);
  box-shadow: 0 0 35px rgba(255, 0, 43, 0.12), inset 0 0 20px rgba(255, 0, 43, 0.04);
  border-radius: 6px;
  padding: 2.2rem 2.5rem;
  margin-bottom: 4rem;
}

.notes-header {
  display: flex;
  align-items: flex-start;
  gap: 1.2rem;
  margin-bottom: 1.5rem;
  padding-bottom: 1.2rem;
  border-bottom: 1px solid rgba(255, 255, 255, 0.08);
}

.alert-icon-box {
  width: 44px;
  height: 44px;
  border-radius: 6px;
  background: rgba(255, 0, 43, 0.15);
  border: 1px solid #ff002b;
  color: #ff002b;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.notes-title {
  font-family: var(--font-heading);
  font-size: 1.2rem;
  font-weight: 900;
  letter-spacing: 0.08em;
  color: #ff002b;
  margin-bottom: 0.4rem;
}

.notes-sub {
  font-size: 0.98rem;
  color: rgba(255, 255, 255, 0.82);
  line-height: 1.55;
}

.notes-sub strong {
  color: #ffffff;
  text-decoration: underline;
}

.notes-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1.2rem;
}

@media (max-width: 768px) {
  .notes-grid {
    grid-template-columns: 1fr;
  }
}

.note-pill {
  display: flex;
  align-items: flex-start;
  gap: 0.9rem;
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 4px;
  padding: 1rem 1.2rem;
  font-size: 0.9rem;
  line-height: 1.45;
}

.note-pill strong {
  display: block;
  color: #ffffff;
  font-weight: 800;
  margin-bottom: 0.2rem;
}

.note-pill span {
  color: rgba(255, 255, 255, 0.65);
}

/* ============================================================
   SECTION TITLES
   ============================================================ */
.section-title-wrap {
  text-align: center;
  margin-bottom: 2.5rem;
}

.sub-label {
  display: block;
  font-family: var(--font-heading);
  font-size: 0.65rem;
  font-weight: 900;
  letter-spacing: 0.25em;
  color: #ff002b;
  margin-bottom: 0.5rem;
}

.section-title-wrap h2 {
  font-family: var(--font-heading);
  font-size: clamp(1.8rem, 3vw, 2.4rem);
  font-weight: 900;
  color: #ffffff;
  letter-spacing: 0.02em;
}

/* ============================================================
   PRICING CARDS GRID
   ============================================================ */
.pricing-cards-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1.5rem;
  margin-bottom: 5rem;
}

@media (max-width: 1280px) {
  .pricing-cards-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 680px) {
  .pricing-cards-grid {
    grid-template-columns: 1fr;
  }
}

.pricing-card {
  position: relative;
  background: linear-gradient(180deg, rgba(14, 14, 22, 0.95) 0%, rgba(8, 8, 12, 0.98) 100%);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 6px;
  padding: 2.2rem 1.8rem 1.8rem;
  display: flex;
  flex-direction: column;
  transition: all 0.35s cubic-bezier(0.16, 1, 0.3, 1);
}

.pricing-card:hover {
  border-color: rgba(255, 0, 43, 0.4);
  box-shadow: 0 0 30px rgba(255, 0, 43, 0.15);
  transform: translateY(-4px);
}

.pricing-card.highlight {
  border-color: #ff002b;
  box-shadow: 0 0 35px rgba(255, 0, 43, 0.3), inset 0 0 20px rgba(255, 0, 43, 0.05);
}

/* Badges */
.card-pop-badge {
  position: absolute;
  top: -1px;
  right: 1.2rem;
  background: #ff002b;
  padding: 0.28rem 0.8rem;
  font-family: var(--font-heading);
  font-size: 0.58rem;
  font-weight: 900;
  letter-spacing: 0.15em;
  color: #ffffff;
  border-radius: 0 0 4px 4px;
}

.card-tag-badge {
  position: absolute;
  top: 1.2rem;
  right: 1.2rem;
  font-family: var(--font-heading);
  font-size: 0.55rem;
  font-weight: 900;
  letter-spacing: 0.12em;
  color: rgba(255, 255, 255, 0.35);
}

/* Card Top */
.card-top {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1.2rem;
}

.pkg-num {
  font-family: var(--font-heading);
  font-size: 2.2rem;
  font-weight: 900;
  color: rgba(255, 0, 43, 0.35);
  line-height: 1;
}

.pkg-name {
  font-family: var(--font-heading);
  font-size: 1.2rem;
  font-weight: 900;
  color: #ffffff;
  line-height: 1.15;
}

.pkg-tv-badge {
  display: inline-block;
  font-size: 0.72rem;
  font-weight: 700;
  color: #ff002b;
  margin-top: 0.2rem;
}

/* Price Box */
.price-box {
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.06);
  border-radius: 4px;
  padding: 1.2rem;
  margin-bottom: 1.4rem;
  text-align: center;
}

.price-main {
  display: flex;
  align-items: flex-start;
  justify-content: center;
  gap: 0.15rem;
}

.currency {
  font-family: var(--font-heading);
  font-size: 1.4rem;
  font-weight: 900;
  color: #ff002b;
  margin-top: 0.4rem;
}

.amount {
  font-family: var(--font-heading);
  font-size: 2.8rem;
  font-weight: 900;
  color: #ffffff;
  line-height: 1;
}

.duration {
  display: block;
  font-family: var(--font-heading);
  font-size: 0.65rem;
  font-weight: 800;
  letter-spacing: 0.12em;
  color: rgba(255, 255, 255, 0.45);
  margin-top: 0.2rem;
}

.extra-rate {
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  font-size: 0.8rem;
  font-weight: 700;
  color: rgba(255, 255, 255, 0.85);
  margin-top: 0.6rem;
  padding-top: 0.5rem;
  border-top: 1px dashed rgba(255, 255, 255, 0.1);
  width: 100%;
  justify-content: center;
}

.divider {
  height: 1px;
  background: linear-gradient(90deg, #ff002b 0%, rgba(255, 255, 255, 0.08) 70%, transparent 100%);
  margin-bottom: 1.4rem;
}

/* Specs */
.pkg-specs {
  display: flex;
  flex-direction: column;
  gap: 1.2rem;
  flex-grow: 1;
  margin-bottom: 1.8rem;
}

.spec-group {
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
}

.spec-heading {
  font-family: var(--font-heading);
  font-size: 0.55rem;
  font-weight: 900;
  letter-spacing: 0.2em;
  color: rgba(255, 0, 43, 0.8);
}

.features-pill-wrap {
  display: flex;
  flex-wrap: wrap;
  gap: 0.35rem;
}

.feat-pill {
  display: inline-flex;
  align-items: center;
  gap: 0.3rem;
  font-size: 0.72rem;
  font-weight: 700;
  background: rgba(255, 255, 255, 0.04);
  border: 1px solid rgba(255, 255, 255, 0.08);
  padding: 0.2rem 0.5rem;
  border-radius: 3px;
  color: rgba(255, 255, 255, 0.8);
}

.consoles-ul {
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 0.2rem;
}

.consoles-ul li {
  font-size: 0.8rem;
  color: rgba(255, 255, 255, 0.75);
  font-weight: 600;
  padding-left: 0.7rem;
  position: relative;
}

.consoles-ul li::before {
  content: '·';
  position: absolute;
  left: 0;
  color: #ff002b;
  font-weight: 900;
}

/* CTA */
.pkg-cta-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.6rem;
  background: transparent;
  border: 1px solid rgba(255, 255, 255, 0.18);
  color: rgba(255, 255, 255, 0.85);
  font-family: var(--font-heading);
  font-size: 0.74rem;
  font-weight: 900;
  letter-spacing: 0.1em;
  padding: 0.85rem 1.4rem;
  cursor: pointer;
  transition: all 0.25s ease;
  clip-path: polygon(5px 0, 100% 0, 100% calc(100% - 5px), calc(100% - 5px) 100%, 0 100%, 0 5px);
}

.pkg-cta-btn:hover {
  background: #ff002b;
  border-color: #ff002b;
  color: #ffffff;
  box-shadow: 0 0 20px rgba(255, 0, 43, 0.5);
}

.pkg-cta-btn.btn-highlight {
  background: rgba(255, 0, 43, 0.15);
  border-color: #ff002b;
  color: #ffffff;
}

.pkg-cta-btn.btn-highlight:hover {
  background: #ff002b;
}

/* ============================================================
   TABLE SECTION
   ============================================================ */
.table-section {
  margin-bottom: 5rem;
}

.table-container {
  width: 100%;
  overflow-x: auto;
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 6px;
  background: rgba(10, 10, 16, 0.8);
}

.pricing-table {
  width: 100%;
  border-collapse: collapse;
  text-align: left;
  font-size: 0.88rem;
}

.pricing-table th {
  background: rgba(255, 0, 43, 0.08);
  padding: 1.1rem 1.2rem;
  font-family: var(--font-heading);
  font-size: 0.68rem;
  font-weight: 900;
  letter-spacing: 0.14em;
  color: #ffffff;
  border-bottom: 1px solid rgba(255, 0, 43, 0.3);
  white-space: nowrap;
}

.pricing-table td {
  padding: 1.2rem;
  border-bottom: 1px solid rgba(255, 255, 255, 0.06);
  color: rgba(255, 255, 255, 0.75);
  vertical-align: middle;
}

.pricing-table tr:hover td {
  background: rgba(255, 255, 255, 0.02);
}

.pricing-table tr.row-popular td {
  background: rgba(255, 0, 43, 0.04);
}

.td-name {
  font-family: var(--font-heading);
  color: #ffffff !important;
  font-size: 0.95rem;
  white-space: nowrap;
}

.table-pop-tag {
  display: inline-block;
  background: #ff002b;
  color: #fff;
  font-size: 0.5rem;
  font-weight: 900;
  padding: 0.15rem 0.4rem;
  border-radius: 2px;
  margin-left: 0.5rem;
  vertical-align: middle;
}

.td-price {
  font-family: var(--font-heading);
  font-size: 1.2rem;
  font-weight: 900;
  color: #ff002b !important;
  white-space: nowrap;
}

.td-extra {
  font-weight: 700;
  color: #ffffff !important;
  white-space: nowrap;
}

.td-consoles {
  font-size: 0.8rem;
  line-height: 1.45;
}

/* ============================================================
   ADDONS SECTION
   ============================================================ */
.addons-section {
  margin-bottom: 5rem;
}

.addon-card {
  background: linear-gradient(135deg, rgba(16, 12, 20, 0.95) 0%, rgba(10, 10, 15, 0.98) 100%);
  border: 1px solid rgba(255, 0, 43, 0.35);
  box-shadow: 0 16px 40px rgba(0, 0, 0, 0.8), inset 0 0 20px rgba(255, 0, 43, 0.05);
  border-radius: 6px;
  padding: 2.2rem 2.5rem;
  display: grid;
  grid-template-columns: 160px 1fr 220px;
  gap: 2.2rem;
  align-items: center;
}

@media (max-width: 960px) {
  .addon-card {
    grid-template-columns: 1fr;
    text-align: center;
    gap: 1.5rem;
  }
}

.addon-visual {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.6rem;
}

.addon-icon-circle {
  width: 70px;
  height: 70px;
  border-radius: 50%;
  background: rgba(255, 0, 43, 0.12);
  border: 1.5px solid #ff002b;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 0 25px rgba(255, 0, 43, 0.3);
}

.addon-status {
  font-family: var(--font-heading);
  font-size: 0.6rem;
  font-weight: 900;
  letter-spacing: 0.15em;
  color: #ff002b;
}

.addon-name {
  font-family: var(--font-heading);
  font-size: 1.4rem;
  font-weight: 900;
  color: #ffffff;
  margin-bottom: 0.5rem;
}

.addon-desc {
  font-size: 0.92rem;
  color: rgba(255, 255, 255, 0.65);
  line-height: 1.55;
  margin-bottom: 1.2rem;
}

.addon-pricing-boxes {
  display: flex;
  gap: 1rem;
}

@media (max-width: 960px) {
  .addon-pricing-boxes {
    justify-content: center;
  }
}

.addon-rate-box {
  background: rgba(255, 255, 255, 0.04);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 4px;
  padding: 0.6rem 1rem;
  display: flex;
  flex-direction: column;
}

.rate-label {
  font-family: var(--font-heading);
  font-size: 0.52rem;
  font-weight: 900;
  letter-spacing: 0.16em;
  color: rgba(255, 0, 43, 0.8);
}

.rate-val {
  font-family: var(--font-heading);
  font-size: 1.2rem;
  font-weight: 900;
  color: #ffffff;
}

.rate-val small {
  font-size: 0.65rem;
  font-family: var(--font-body);
  font-weight: 600;
  color: rgba(255, 255, 255, 0.5);
}

.addon-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.6rem;
  width: 100%;
  background: #ff002b;
  color: #ffffff;
  font-family: var(--font-heading);
  font-size: 0.76rem;
  font-weight: 900;
  letter-spacing: 0.1em;
  padding: 0.95rem 1.4rem;
  border: none;
  cursor: pointer;
  transition: all 0.25s ease;
  clip-path: polygon(5px 0, 100% 0, 100% calc(100% - 5px), calc(100% - 5px) 100%, 0 100%, 0 5px);
}

.addon-btn:hover {
  background: #d60024;
  box-shadow: 0 0 25px rgba(255, 0, 43, 0.6);
  transform: translateY(-2px);
}

/* ============================================================
   BOTTOM CTA FOOTER
   ============================================================ */
.pricing-cta-footer {
  background: rgba(14, 14, 20, 0.9);
  border: 1px solid rgba(255, 255, 255, 0.12);
  border-radius: 6px;
  padding: 2.2rem 2.8rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 2rem;
}

@media (max-width: 860px) {
  .pricing-cta-footer {
    flex-direction: column;
    text-align: center;
    padding: 2rem;
  }
}

.cta-left h3 {
  font-family: var(--font-heading);
  font-size: 1.4rem;
  font-weight: 900;
  color: #ffffff;
  margin-bottom: 0.3rem;
}

.cta-left p {
  color: rgba(255, 255, 255, 0.6);
  font-size: 0.95rem;
}

.cta-right {
  display: flex;
  align-items: center;
  gap: 1.2rem;
  flex-shrink: 0;
}

@media (max-width: 860px) {
  .cta-right {
    flex-direction: column;
    width: 100%;
  }
}

.cta-phone-btn {
  display: inline-flex;
  align-items: center;
  gap: 0.6rem;
  background: rgba(255, 0, 43, 0.15);
  border: 1px solid #ff002b;
  color: #ffffff;
  font-family: var(--font-heading);
  font-size: 0.8rem;
  font-weight: 900;
  padding: 0.85rem 1.4rem;
  border-radius: 3px;
  text-decoration: none;
  transition: all 0.25s ease;
}

.cta-phone-btn:hover {
  background: #ff002b;
  box-shadow: 0 0 20px rgba(255, 0, 43, 0.5);
}

.cta-online-btn {
  display: inline-flex;
  align-items: center;
  gap: 0.6rem;
  background: transparent;
  border: 1px solid rgba(255, 255, 255, 0.2);
  color: rgba(255, 255, 255, 0.85);
  font-family: var(--font-heading);
  font-size: 0.8rem;
  font-weight: 900;
  padding: 0.85rem 1.4rem;
  cursor: pointer;
  transition: all 0.25s ease;
}

.cta-online-btn:hover {
  border-color: #ff002b;
  color: #ffffff;
  background: rgba(255, 0, 43, 0.1);
}

/* ============================================================
   MOBILE FIXES — prevent horizontal overflow that hides the
   navbar hamburger and truncates the fixed dock buttons.
   ============================================================ */
@media (max-width: 768px) {
  .pricing-page {
    padding-top: 4.5rem;
    overflow-x: hidden;
    max-width: 100vw;
  }

  .pricing-hero {
    padding: 1.5rem 0 2rem;
    overflow: hidden;
  }

  .pricing-hero .container,
  .pricing-body .container {
    max-width: 100%;
    padding-left: 1rem;
    padding-right: 1rem;
  }

  .back-link {
    font-size: 0.65rem;
  }

  .hero-badge {
    font-size: 0.58rem;
    letter-spacing: 0.1em;
    padding: 0.35rem 0.8rem;
    max-width: calc(100vw - 2rem);
    flex-wrap: wrap;
    justify-content: center;
    text-align: center;
    line-height: 1.4;
    word-break: break-word;
  }

  .hero-title {
    font-size: clamp(1.4rem, 7.5vw, 2.2rem);
    line-height: 1.08;
    padding: 0 0.25rem;
    word-break: break-word;
    max-width: 100%;
  }

  .hero-lead {
    font-size: 0.9rem;
    padding: 0 0.25rem;
    overflow-wrap: break-word;
    word-wrap: break-word;
    max-width: 100%;
  }

  .pricing-notes-card {
    padding: 1.4rem 1.2rem;
  }

  .notes-header {
    flex-direction: column;
    gap: 0.8rem;
  }

  .notes-title {
    font-size: 1rem;
  }

  .notes-sub {
    font-size: 0.88rem;
  }

  .note-pill {
    font-size: 0.82rem;
    padding: 0.8rem 0.9rem;
  }

  .section-title-wrap h2 {
    font-size: clamp(1.4rem, 5vw, 2rem);
    padding: 0 0.5rem;
  }

  .pricing-card {
    padding: 1.8rem 1.3rem 1.5rem;
  }

  .card-pop-badge,
  .card-tag-badge {
    right: 0.8rem;
    font-size: 0.5rem;
  }

  .pkg-name {
    font-size: 1.05rem;
  }

  .amount {
    font-size: 2.3rem;
  }

  /* Pricing table: force horizontal scroll inside its own container */
  .table-container {
    margin: 0 -0.5rem;
    border-radius: 0;
  }

  .pricing-table {
    font-size: 0.78rem;
    min-width: 600px;
  }

  .pricing-table th,
  .pricing-table td {
    padding: 0.8rem 0.7rem;
  }

  /* Addon card */
  .addon-card {
    padding: 1.5rem 1.2rem;
  }

  .addon-name {
    font-size: 1.15rem;
  }

  .addon-pricing-boxes {
    flex-direction: column;
    gap: 0.6rem;
  }

  /* CTA footer */
  .pricing-cta-footer {
    padding: 1.5rem 1.2rem;
  }

  .cta-left h3 {
    font-size: 1.15rem;
  }

  .cta-left p {
    font-size: 0.88rem;
  }

  .cta-phone-btn,
  .cta-online-btn {
    font-size: 0.72rem;
    padding: 0.75rem 1rem;
    width: 100%;
    justify-content: center;
  }
}

@media (max-width: 480px) {
  .hero-badge {
    font-size: 0.52rem;
    letter-spacing: 0.08em;
    padding: 0.3rem 0.6rem;
    gap: 0.35rem;
  }

  .hero-title {
    font-size: clamp(1.3rem, 6.5vw, 1.7rem);
  }

  .hero-lead {
    font-size: 0.85rem;
  }

  .pricing-notes-card {
    padding: 1.2rem 1rem;
  }

  .pricing-card {
    padding: 1.5rem 1.1rem 1.3rem;
  }
}
</style>
