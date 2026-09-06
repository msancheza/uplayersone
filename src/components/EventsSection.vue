<script setup>
import { 
  Cake, 
  GraduationCap, 
  Users2, 
  School, 
  Trophy, 
  HeartHandshake, 
  Church, 
  Building2,
  ChevronRight,
  Sparkles
} from 'lucide-vue-next'
import siteConfig from '../config/siteConfig.js'

const eventTypes = [
  {
    num: '01',
    title: 'Birthdays',
    desc: 'The ultimate birthday party experience with multiplayer games, custom setups, and unforgettable memories for all ages.',
    icon: Cake,
    tag: 'MOST POPULAR'
  },
  {
    num: '02',
    title: 'Graduations',
    desc: 'Celebrate graduation milestones and academic achievements with high-energy gaming sessions and tournament play.',
    icon: GraduationCap,
    tag: 'CELEBRATION'
  },
  {
    num: '03',
    title: 'Block Parties',
    desc: 'Bring the neighborhood together! Our mobile gaming truck parks right on your street and entertains everyone.',
    icon: Users2,
    tag: 'COMMUNITY'
  },
  {
    num: '04',
    title: 'School Functions',
    desc: 'Reward days, school carnivals, STEM events, and campus celebrations with age-appropriate game selections.',
    icon: School,
    tag: 'ACADEMIC'
  },
  {
    num: '05',
    title: 'Gaming Tournaments',
    desc: 'Competitive brackets, head-to-head battles, and leaderboards across Super Smash Bros, FIFA, Mario Kart, and more.',
    icon: Trophy,
    tag: 'COMPETITIVE'
  },
  {
    num: '06',
    title: 'Fundraisers',
    desc: 'Draw crowds and boost ticket sales with a premier gaming attraction that kids, teens, and adults love.',
    icon: HeartHandshake,
    tag: 'CHARITY'
  },
  {
    num: '07',
    title: 'Church Functions',
    desc: 'Youth groups, ministry festivals, and fellowship events featuring clean, wholesome, and supervised entertainment.',
    icon: Church,
    tag: 'FELLOWSHIP'
  },
  {
    num: '08',
    title: 'Corporate & Special Events',
    desc: 'Company picnics, team building, product launches, brand activations, and private VIP gatherings.',
    icon: Building2,
    tag: 'CORPORATE'
  }
]

const scrollToContact = () => {
  const el = document.getElementById('contact')
  if (el) el.scrollIntoView({ behavior: 'smooth' })
}
</script>

<template>
  <section id="events" class="events-white-section">
    <div class="container">
      
      <!-- Section Header -->
      <div class="section-header scroll-reveal">
        <div class="eyebrow-badge">
          <Sparkles :size="14" class="text-red" />
          <span>EVENTS WE HOST</span>
        </div>
        <h2 class="events-title">
          WELCOME TO <span class="text-red">ULTIMATE PLAYERS</span>
        </h2>
        <p class="events-lead">
          Ultimate Players will make your event perfect with its surround sound and LED lights. 
          You and your guests will definitely have the <strong>Ultimate</strong> experience.
        </p>
      </div>

      <!-- Events Grid (8 Event Types) -->
      <div class="events-grid">
        <div 
          v-for="event in eventTypes" 
          :key="event.num"
          class="event-card scroll-reveal tilt-card"
        >
          <!-- Card Top Bar: Icon + Num -->
          <div class="event-card-top">
            <div class="event-icon-box">
              <component :is="event.icon" :size="22" />
            </div>
            <span class="event-num">{{ event.num }}</span>
          </div>

          <!-- Tag -->
          <span class="event-tag">{{ event.tag }}</span>

          <!-- Content -->
          <h3 class="event-name">{{ event.title }}</h3>
          <p class="event-desc">{{ event.desc }}</p>

          <!-- Card Footer Action -->
          <div class="event-card-footer" @click="scrollToContact">
            <span>Book for this event</span>
            <ChevronRight :size="15" class="footer-arrow" />
          </div>
        </div>
      </div>

      <!-- Bottom Banner / Action -->
      <div class="custom-event-banner scroll-reveal">
        <div class="banner-content">
          <h4 class="banner-title">Planning a Custom or Large-Scale Event?</h4>
          <p class="banner-desc">
            We accommodate multi-truck bookings, extended hours, and customized gaming tournaments.
          </p>
        </div>
        <div class="banner-actions">
          <button class="banner-btn" @click="scrollToContact">
            <span>INQUIRE NOW</span>
            <ChevronRight :size="16" />
          </button>
          <a :href="siteConfig.phoneTel" class="banner-phone">
            Call/Text {{ siteConfig.phone }}
          </a>
        </div>
      </div>

    </div>
  </section>
</template>

<style scoped>
/* ============================================================
   WHITE SECTION WRAPPER — Exclusive white background
   ============================================================ */
.events-white-section {
  background-color: #ffffff;
  color: #111116;
  padding: 7rem 0 6.5rem;
  position: relative;
  overflow: hidden;
}

/* Red accent stripe at top transition */
.events-white-section::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 4px;
  background: linear-gradient(90deg, #ff002b 0%, #ff4d6d 50%, #ff002b 100%);
}

/* ============================================================
   HEADER
   ============================================================ */
.section-header {
  text-align: center;
  max-width: 820px;
  margin: 0 auto 4rem auto;
}

.eyebrow-badge {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  font-family: var(--font-heading);
  font-size: 0.7rem;
  font-weight: 900;
  letter-spacing: 0.22em;
  color: #ff002b;
  background: rgba(255, 0, 43, 0.08);
  border: 1px solid rgba(255, 0, 43, 0.25);
  padding: 0.4rem 1.1rem;
  border-radius: 4px;
  margin-bottom: 1.2rem;
}

.events-title {
  font-family: var(--font-heading);
  font-size: clamp(2rem, 3.8vw, 3rem);
  font-weight: 900;
  color: #0c0c12;
  line-height: 1.1;
  margin-bottom: 1.2rem;
  letter-spacing: 0.01em;
}

.text-red {
  color: #ff002b !important;
}

.events-lead {
  font-family: var(--font-body);
  font-size: 1.15rem;
  line-height: 1.65;
  color: #4a4a58;
  font-weight: 500;
}

.events-lead strong {
  color: #ff002b;
  font-weight: 700;
}

/* ============================================================
   EVENTS GRID — 4 columns on wide screens, 2 on tablet, 1 on mobile
   ============================================================ */
.events-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1.5rem;
  width: 100%;
  margin-bottom: 3.5rem;
}

@media (max-width: 1200px) {
  .events-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 650px) {
  .events-grid {
    grid-template-columns: 1fr;
  }
}

/* ============================================================
   EVENT CARD — Clean white with crisp gamer styling
   ============================================================ */
.event-card {
  background: #f8f9fc;
  border: 1.5px solid #e5e8f0;
  border-radius: 6px;
  padding: 1.8rem 1.6rem 1.4rem;
  display: flex;
  flex-direction: column;
  position: relative;
  transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.04);
}

.event-card:hover {
  background: #ffffff;
  border-color: #ff002b;
  transform: translateY(-4px);
  box-shadow: 0 16px 36px rgba(255, 0, 43, 0.12), 0 2px 6px rgba(0, 0, 0, 0.06);
}

/* Top bar: Icon + Num */
.event-card-top {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 1rem;
}

.event-icon-box {
  width: 44px;
  height: 44px;
  border-radius: 6px;
  background: rgba(255, 0, 43, 0.08);
  border: 1px solid rgba(255, 0, 43, 0.22);
  display: flex;
  align-items: center;
  justify-content: center;
  color: #ff002b;
  transition: all 0.3s ease;
}

.event-card:hover .event-icon-box {
  background: #ff002b;
  color: #ffffff;
  box-shadow: 0 4px 14px rgba(255, 0, 43, 0.4);
}

.event-num {
  font-family: var(--font-heading);
  font-size: 1.6rem;
  font-weight: 900;
  color: #d1d6e2;
  line-height: 1;
  transition: color 0.3s ease;
}

.event-card:hover .event-num {
  color: #ff002b;
}

/* Tag */
.event-tag {
  display: inline-block;
  font-family: var(--font-heading);
  font-size: 0.58rem;
  font-weight: 800;
  letter-spacing: 0.18em;
  color: #8c93a4;
  text-transform: uppercase;
  margin-bottom: 0.4rem;
  transition: color 0.3s ease;
}

.event-card:hover .event-tag {
  color: #ff002b;
}

/* Name */
.event-name {
  font-family: var(--font-heading);
  font-size: 1.25rem;
  font-weight: 900;
  color: #0c0c12;
  margin-bottom: 0.6rem;
  line-height: 1.2;
}

/* Description */
.event-desc {
  font-family: var(--font-body);
  font-size: 0.92rem;
  color: #5c5c6e;
  line-height: 1.55;
  margin-bottom: 1.4rem;
  flex-grow: 1;
}

/* Footer Action */
.event-card-footer {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-top: 0.9rem;
  border-top: 1px solid #eef0f6;
  font-family: var(--font-heading);
  font-size: 0.68rem;
  font-weight: 800;
  letter-spacing: 0.08em;
  color: #6e7382;
  cursor: pointer;
  transition: color 0.2s ease;
}

.footer-arrow {
  transition: transform 0.2s ease;
}

.event-card:hover .event-card-footer {
  color: #ff002b;
}

.event-card:hover .footer-arrow {
  transform: translateX(4px);
}

/* ============================================================
   CUSTOM EVENT BANNER
   ============================================================ */
.custom-event-banner {
  background: #0d0d12;
  border-radius: 6px;
  padding: 2.2rem 2.8rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 2rem;
  box-shadow: 0 18px 40px rgba(0, 0, 0, 0.15);
  border: 1px solid rgba(255, 0, 43, 0.3);
}

@media (max-width: 900px) {
  .custom-event-banner {
    flex-direction: column;
    text-align: center;
    padding: 2rem;
  }
}

.banner-content {
  display: flex;
  flex-direction: column;
  gap: 0.3rem;
}

.banner-title {
  font-family: var(--font-heading);
  font-size: 1.3rem;
  font-weight: 900;
  color: #ffffff;
  letter-spacing: 0.02em;
}

.banner-desc {
  font-size: 0.95rem;
  color: rgba(255, 255, 255, 0.65);
}

.banner-actions {
  display: flex;
  align-items: center;
  gap: 1.4rem;
  flex-shrink: 0;
}

@media (max-width: 900px) {
  .banner-actions {
    flex-direction: column;
    width: 100%;
  }
}

.banner-btn {
  display: inline-flex;
  align-items: center;
  gap: 0.6rem;
  background: #ff002b;
  color: #ffffff;
  font-family: var(--font-heading);
  font-size: 0.8rem;
  font-weight: 900;
  letter-spacing: 0.12em;
  padding: 0.85rem 1.6rem;
  border: none;
  border-radius: 3px;
  cursor: pointer;
  transition: all 0.25s ease;
  clip-path: polygon(6px 0, 100% 0, 100% calc(100% - 6px), calc(100% - 6px) 100%, 0 100%, 0 6px);
}

.banner-btn:hover {
  background: #d60024;
  box-shadow: 0 0 24px rgba(255, 0, 43, 0.6);
  transform: translateY(-2px);
}

.banner-phone {
  color: rgba(255, 255, 255, 0.75);
  font-size: 0.88rem;
  font-weight: 700;
  text-decoration: none;
  white-space: nowrap;
  transition: color 0.2s ease;
}

.banner-phone:hover {
  color: #ff002b;
}
</style>
