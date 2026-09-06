<script setup>

import { 
  Gamepad2, 
  Flame, 
  Crosshair, 
  Trophy, 
  Sparkles, 
  Check, 
  ChevronRight,
  ShieldCheck,
  Zap
} from 'lucide-vue-next'
import siteConfig from '../config/siteConfig.js'



const gameCategories = [
  {
    id: 'fortnite',
    num: '01',
    title: 'FORTNITE',
    subtitle: 'Battle Royale & Creative',
    tag: 'ULTIMATE HYPE',
    icon: Flame,
    color: '#ff002b',
    glowColor: 'rgba(255, 0, 43, 0.4)',
    desc: 'Drop into the island, build, battle, and claim Victory Royales with your entire squad across multiple high-refresh displays.',
    popularTitles: ['Fortnite Battle Royale', 'Custom Creative Maps', 'Zone Wars & Box Fights', 'Squad Duos & Trios'],
    features: ['Multi-display squads', 'Live mic communication', 'Constant season updates']
  },
  {
    id: 'racing',
    num: '02',
    title: 'RACING',
    subtitle: 'High-Speed Motorsports',
    tag: 'MAX VELOCITY',
    icon: Zap,
    color: '#ff3b00',
    glowColor: 'rgba(255, 59, 0, 0.4)',
    desc: 'Burn rubber and drift through hairpin turns. From frantic Mario Kart party races to realistic high-fidelity simulation tracks.',
    popularTitles: ['Mario Kart 8 Deluxe', 'Forza Horizon 5', 'Gran Turismo 7', 'Need for Speed Unbound'],
    features: ['Up to 8-player local racing', 'Multi-screen split action', 'Family & pro modes']
  },
  {
    id: 'shooting',
    num: '03',
    title: 'SHOOTING',
    subtitle: 'Tactical & First-Person Action',
    tag: 'TACTICAL COMBAT',
    icon: Crosshair,
    color: '#ff0055',
    glowColor: 'rgba(255, 0, 85, 0.4)',
    desc: 'Lock, load, and coordinate tactical strikes. High-energy team deathmatches and co-op campaigns with surround sound immersion.',
    popularTitles: ['Call of Duty: Modern Warfare', 'Halo Infinite', 'Overwatch 2', 'Star Wars Battlefront II'],
    features: ['Surround audio footsteps', 'Custom age-rating filters', 'Head-to-head tournaments']
  },
  {
    id: 'sports',
    num: '04',
    title: 'SPORTS',
    subtitle: 'Championship Athletics',
    tag: 'PRO LEAGUES',
    icon: Trophy,
    color: '#ff002b',
    glowColor: 'rgba(255, 0, 43, 0.4)',
    desc: 'Compete in world-class stadiums. From FIFA World Cup finals to buzzer-beater NBA games and gravity-defying Rocket League aerials.',
    popularTitles: ['EA Sports FC 25 (FIFA)', 'NBA 2K25', 'Madden NFL 25', 'Rocket League'],
    features: ['Tournament bracket setups', 'Instant replay highlights', '4-player team battles']
  }
]

const scrollToContact = () => {
  const el = document.getElementById('contact')
  if (el) el.scrollIntoView({ behavior: 'smooth' })
}
</script>

<template>
  <section id="games" class="games-section">
    <!-- Ambient Sci-Fi Glow Elements -->
    <div class="glow-orb top-left"></div>
    <div class="glow-orb bottom-right"></div>

    <div class="container">
      
      <!-- Section Header -->
      <div class="section-header scroll-reveal">
        <div class="eyebrow-badge">
          <Gamepad2 :size="14" class="text-red" />
          <span>TOP TIER TITLES</span>
        </div>
        <h2 class="section-title">
          OUR <span class="text-red-glow">GAMES</span>
        </h2>
        <!-- Mobile impact statement -->
        <div class="mobile-impact-headline">
          MORE SCREENS.<br/>MORE PLAYERS.<br/><span class="text-red-glow">MORE ACTION.</span>
        </div>
        <p class="section-subtitle">
          Loaded with the most popular multiplayer titles on PS5, Xbox Series X, and Nintendo Switch. 
          Surround sound, stadium seating, and zero lag.
        </p>
      </div>

      <!-- 4 Games Cards Grid -->
      <div class="games-grid">
        <div 
          v-for="cat in gameCategories" 
          :key="cat.id"
          class="game-card scroll-reveal"
        >
          <!-- Cyber Corner Accents -->
          <div class="corner-bracket top-left"></div>
          <div class="corner-bracket bottom-right"></div>

          <!-- Card Header: Number + Icon -->
          <div class="card-head">
            <div class="category-icon-wrapper">
              <component :is="cat.icon" :size="24" class="cat-icon" />
            </div>
            <span class="category-num">{{ cat.num }}</span>
          </div>

          <!-- Category Badge -->
          <div class="tag-badge">
            <Sparkles :size="10" />
            <span>{{ cat.tag }}</span>
          </div>

          <!-- Titles -->
          <h3 class="category-title">{{ cat.title }}</h3>
          <span class="category-sub">{{ cat.subtitle }}</span>

          <p class="category-desc">{{ cat.desc }}</p>

          <!-- Popular Games List (Badges) -->
          <div class="games-pill-container">
            <span class="pill-label">FEATURED TITLES:</span>
            <div class="pills-list">
              <span 
                v-for="(title, idx) in cat.popularTitles" 
                :key="idx"
                class="game-pill"
              >
                {{ title }}
              </span>
            </div>
          </div>

          <!-- Highlight Features -->
          <ul class="features-list">
            <li v-for="(feat, fIdx) in cat.features" :key="fIdx">
              <Check :size="13" class="feat-check" />
              <span>{{ feat }}</span>
            </li>
          </ul>

          <!-- Card Action Button -->
          <button class="card-cta-btn" @click="scrollToContact">
            <span>REQUEST {{ cat.title }}</span>
            <ChevronRight :size="14" class="btn-arrow" />
          </button>
        </div>
      </div>

      <!-- Bottom Guarantee Strip -->
      <div class="games-guarantee-strip">
        <div class="guarantee-item">
          <ShieldCheck :size="20" class="text-red" />
          <div class="guarantee-text">
            <strong>Family Friendly & Age Customization:</strong>
            <span>You control the game ratings allowed at your party (E, T, or M).</span>
          </div>
        </div>
        <div class="guarantee-item">
          <Sparkles :size="20" class="text-red" />
          <div class="guarantee-text">
            <strong>Have a Special Game Request?</strong>
            <span>Let us know when booking — we keep our library up to date!</span>
          </div>
        </div>
      </div>

    </div>
  </section>
</template>

<style scoped>
/* ============================================================
   SECTION WRAPPER (Deep Black + Cyber Grid)
   ============================================================ */
.games-section {
  background-color: #000000;
  color: #ffffff;
  padding: 7rem 0 6.5rem;
  position: relative;
  overflow: hidden;
  border-top: 1px solid rgba(255, 255, 255, 0.08);
}

/* Ambient Radial Glows */
.glow-orb {
  position: absolute;
  width: 500px;
  height: 500px;
  border-radius: 50%;
  pointer-events: none;
  filter: blur(140px);
  opacity: 0.15;
}

.glow-orb.top-left {
  top: -100px;
  left: -100px;
  background: radial-gradient(circle, #ff002b 0%, transparent 70%);
}

.glow-orb.bottom-right {
  bottom: -100px;
  right: -100px;
  background: radial-gradient(circle, #ff0055 0%, transparent 70%);
}

/* ============================================================
   HEADER
   ============================================================ */
.section-header {
  text-align: center;
  max-width: 760px;
  margin: 0 auto 4rem auto;
  position: relative;
  z-index: 2;
}

.eyebrow-badge {
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
  box-shadow: 0 0 15px rgba(255, 0, 43, 0.15);
}

.section-title {
  font-family: var(--font-heading);
  font-size: clamp(2.2rem, 4vw, 3.2rem);
  font-weight: 900;
  color: #ffffff;
  line-height: 1.05;
  margin-bottom: 1.1rem;
  letter-spacing: 0.02em;
}

.text-red-glow {
  color: #ff002b;
  text-shadow: 0 0 25px rgba(255, 0, 43, 0.6);
}

.text-red {
  color: #ff002b;
}

.section-subtitle {
  font-family: var(--font-body);
  font-size: 1.05rem;
  color: rgba(255, 255, 255, 0.55);
  line-height: 1.6;
}

/* Mobile impact headline */
.mobile-impact-headline {
  display: none;
  font-family: var(--font-heading);
  font-size: clamp(2rem, 9vw, 3.2rem);
  font-weight: 900;
  color: #ffffff;
  line-height: 1.1;
  letter-spacing: -0.01em;
  margin: 0.8rem 0 1.2rem;
}

/* ============================================================
   GAMES GRID — 4 Columns on desktop, 2 on tablet, 1 on mobile
   ============================================================ */
.games-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1.6rem;
  width: 100%;
  margin-bottom: 3.5rem;
  position: relative;
  z-index: 2;
}

@media (max-width: 1250px) {
  .games-grid {
    grid-template-columns: repeat(2, 1fr);
    gap: 1.8rem;
  }
}

@media (max-width: 680px) {
  .mobile-impact-headline {
    display: block;
  }
  .section-title {
    display: none;
  }
  .games-grid {
    display: flex;
    flex-direction: row;
    overflow-x: auto;
    scroll-snap-type: x mandatory;
    -webkit-overflow-scrolling: touch;
    gap: 1rem;
    padding-bottom: 1.2rem;
    scrollbar-width: none;
    -ms-overflow-style: none;
    margin-left: -1.4rem;
    margin-right: -1.4rem;
    padding-left: 1.4rem;
    padding-right: 1.4rem;
  }
  .games-grid::-webkit-scrollbar {
    display: none;
  }
  .game-card {
    scroll-snap-align: start;
    flex-shrink: 0;
    width: 78vw;
    max-width: 290px;
  }
}

/* ============================================================
   GAME CARD (Futuristic HUD Card)
   ============================================================ */
.game-card {
  position: relative;
  background: linear-gradient(180deg, rgba(14, 14, 22, 0.95) 0%, rgba(8, 8, 12, 0.98) 100%);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 6px;
  padding: 2.2rem 1.8rem 1.8rem;
  display: flex;
  flex-direction: column;
  transition: all 0.35s cubic-bezier(0.16, 1, 0.3, 1);
  box-shadow: 0 12px 35px rgba(0, 0, 0, 0.8), inset 0 0 15px rgba(255, 255, 255, 0.02);
}

.game-card:hover {
  border-color: #ff002b;
  transform: translateY(-6px) !important;
  opacity: 1 !important;
  box-shadow: 
    0 0 35px rgba(255, 0, 43, 0.25),
    0 20px 45px rgba(0, 0, 0, 0.95),
    inset 0 0 25px rgba(255, 0, 43, 0.08);
}

/* Corner brackets */
.corner-bracket {
  position: absolute;
  width: 10px;
  height: 10px;
  border-color: rgba(255, 0, 43, 0.4);
  border-style: solid;
  pointer-events: none;
  transition: border-color 0.3s ease, width 0.3s ease, height 0.3s ease;
}

.corner-bracket.top-left {
  top: -1px;
  left: -1px;
  border-width: 2px 0 0 2px;
}

.corner-bracket.bottom-right {
  bottom: -1px;
  right: -1px;
  border-width: 0 2px 2px 0;
}

.game-card:hover .corner-bracket {
  border-color: #ff002b;
  width: 14px;
  height: 14px;
}

/* Head */
.card-head {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 1.2rem;
}

.category-icon-wrapper {
  width: 50px;
  height: 50px;
  border-radius: 8px;
  background: rgba(255, 0, 43, 0.1);
  border: 1px solid rgba(255, 0, 43, 0.3);
  display: flex;
  align-items: center;
  justify-content: center;
  color: #ff002b;
  transition: all 0.3s ease;
}

.game-card:hover .category-icon-wrapper {
  background: #ff002b;
  color: #ffffff;
  box-shadow: 0 0 20px rgba(255, 0, 43, 0.7);
  transform: scale(1.05);
}

.category-num {
  font-family: var(--font-heading);
  font-size: 2.2rem;
  font-weight: 900;
  color: rgba(255, 255, 255, 0.12);
  line-height: 1;
  transition: color 0.3s ease;
}

.game-card:hover .category-num {
  color: rgba(255, 0, 43, 0.5);
  text-shadow: 0 0 15px rgba(255, 0, 43, 0.5);
}

/* Tag Badge */
.tag-badge {
  display: inline-flex;
  align-items: center;
  gap: 0.35rem;
  font-family: var(--font-heading);
  font-size: 0.58rem;
  font-weight: 900;
  letter-spacing: 0.18em;
  color: #ff002b;
  margin-bottom: 0.5rem;
}

/* Titles */
.category-title {
  font-family: var(--font-heading);
  font-size: 1.6rem;
  font-weight: 900;
  color: #ffffff;
  letter-spacing: 0.03em;
  line-height: 1.1;
}

.category-sub {
  font-size: 0.72rem;
  font-weight: 700;
  letter-spacing: 0.12em;
  color: rgba(255, 255, 255, 0.35);
  text-transform: uppercase;
  margin-bottom: 1rem;
}

.category-desc {
  font-family: var(--font-body);
  font-size: 0.9rem;
  color: rgba(255, 255, 255, 0.62);
  line-height: 1.55;
  margin-bottom: 1.4rem;
}

/* Pills */
.games-pill-container {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  margin-bottom: 1.4rem;
  padding-bottom: 1.2rem;
  border-bottom: 1px solid rgba(255, 255, 255, 0.08);
}

.pill-label {
  font-family: var(--font-heading);
  font-size: 0.55rem;
  font-weight: 900;
  letter-spacing: 0.2em;
  color: rgba(255, 0, 43, 0.8);
}

.pills-list {
  display: flex;
  flex-wrap: wrap;
  gap: 0.4rem;
}

.game-pill {
  font-size: 0.75rem;
  font-weight: 700;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.12);
  color: rgba(255, 255, 255, 0.85);
  padding: 0.25rem 0.6rem;
  border-radius: 3px;
  transition: all 0.2s ease;
}

.game-card:hover .game-pill {
  border-color: rgba(255, 0, 43, 0.3);
  background: rgba(255, 0, 43, 0.08);
}

/* Features */
.features-list {
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
  margin-bottom: 1.8rem;
  flex-grow: 1;
}

.features-list li {
  display: flex;
  align-items: center;
  gap: 0.55rem;
  font-size: 0.82rem;
  color: rgba(255, 255, 255, 0.7);
  font-weight: 600;
}

.feat-check {
  color: #ff002b;
  flex-shrink: 0;
}

/* CTA */
.card-cta-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.6rem;
  background: transparent;
  border: 1px solid rgba(255, 255, 255, 0.18);
  color: rgba(255, 255, 255, 0.8);
  font-family: var(--font-heading);
  font-size: 0.72rem;
  font-weight: 900;
  letter-spacing: 0.12em;
  padding: 0.85rem 1.2rem;
  border-radius: 2px;
  cursor: pointer;
  transition: all 0.25s ease;
  clip-path: polygon(5px 0, 100% 0, 100% calc(100% - 5px), calc(100% - 5px) 100%, 0 100%, 0 5px);
}

.card-cta-btn:hover,
.game-card:hover .card-cta-btn {
  background: #ff002b;
  border-color: #ff002b;
  color: #ffffff;
  box-shadow: 0 0 20px rgba(255, 0, 43, 0.5);
}

.btn-arrow {
  transition: transform 0.2s ease;
}

.card-cta-btn:hover .btn-arrow {
  transform: translateX(4px);
}

/* ============================================================
   BOTTOM GUARANTEE STRIP
   ============================================================ */
.games-guarantee-strip {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1.8rem;
  padding: 1.8rem 2.2rem;
  background: rgba(14, 14, 20, 0.8);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 4px;
  position: relative;
  z-index: 2;
}

@media (max-width: 820px) {
  .games-guarantee-strip {
    grid-template-columns: 1fr;
    padding: 1.5rem;
  }
}

.guarantee-item {
  display: flex;
  align-items: flex-start;
  gap: 0.9rem;
}

.guarantee-text {
  display: flex;
  flex-direction: column;
  gap: 0.2rem;
  font-size: 0.88rem;
  line-height: 1.45;
}

.guarantee-text strong {
  color: #ffffff;
  font-weight: 700;
}

.guarantee-text span {
  color: rgba(255, 255, 255, 0.5);
}
</style>
