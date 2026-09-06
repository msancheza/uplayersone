<script setup>
import { ref } from 'vue'
import { 
  ChevronDown, 
  HelpCircle, 
  Globe, 
  Share2, 
  Phone, 
  AlertTriangle, 
  ShieldCheck,
  Clock,
  CreditCard,
  MapPin,
  FileText,
  Truck,
  Gamepad2,
  Sparkles,
  Users,
  ChevronRight
} from 'lucide-vue-next'
import siteConfig from '../config/siteConfig.js'

const activeIndex = ref(0)

const faqs = [
  {
    id: 1,
    question: 'How does it work?',
    type: 'booking',
    icon: Globe,
    answer: 'Booking with Ultimate Players is quick and seamless. Choose any of our convenient reservation channels:',
    options: [
      {
        icon: Globe,
        label: 'Website Configurator',
        text: 'Fill out our fast request form to receive a customized proposal with zero upfront payment.',
        action: 'contact',
        btnText: 'Start Request →'
      },
      {
        icon: Share2,
        label: 'Social Media',
        text: 'Send us a direct message on Instagram or Facebook for fast answers to your questions.',
        link: siteConfig.socials.instagram,
        btnText: 'Message Us →'
      },
      {
        icon: Phone,
        label: 'Direct Phone',
        text: `Call or text our event coordinator directly at ${siteConfig.phone}.`,
        tel: siteConfig.phoneTel,
        btnText: 'Call Now →'
      }
    ]
  },
  {
    id: 2,
    question: 'How do I know the trailer can come to my house?',
    type: 'location',
    icon: MapPin,
    answer: 'We service all residential neighborhoods and event venues across Los Angeles and surrounding counties, provided the street is safe, reasonably level, and accessible.',
    highlights: [
      {
        icon: Truck,
        title: 'Street Requirements',
        desc: 'We require approximately 50–60 feet of curbside space (roughly 4–5 parallel car lengths) on a reasonably flat street.'
      },
      {
        icon: ShieldCheck,
        title: 'Clearance & Safety',
        desc: 'Streets must have adequate overhead clearance free of low-hanging tree limbs, power lines, or severe sharp hills.'
      },
      {
        icon: MapPin,
        title: 'Service Coverage',
        desc: 'Covering Los Angeles, San Gabriel Valley, Pasadena, Glendale, Burbank, Long Beach, Irvine, and neighboring cities.'
      }
    ]
  },
  {
    id: 3,
    question: 'Can the gaming trailer go into my driveway?',
    type: 'parking',
    icon: AlertTriangle,
    answer: 'No, our gaming trailers and buses are operated exclusively curbside on public residential streets or designated commercial parking lots.',
    policyNotice: 'Ultimate Players does not park in driveways, alleys, backyards, lawns, or residential parking structures to prevent property damage and ensure optimal hydraulic leveling.',
    highlights: [
      {
        icon: ShieldCheck,
        title: 'Curbside Alignment',
        desc: 'We park directly in front of your residence, level the unit with hydraulic stabilizers, and operate self-powered quiet generators.'
      },
      {
        icon: AlertTriangle,
        title: 'Driveway Blocking',
        desc: 'We may park across your own driveway to ensure the safest, most stable setup without blocking neighbors or traffic.'
      }
    ]
  },
  {
    id: 4,
    question: 'Will the kids know what to do?',
    type: 'coach',
    icon: ShieldCheck,
    answer: "Absolutely! Every party is fully staffed with dedicated, certified Game Coaches who handle everything from start to finish.",
    highlights: [
      {
        icon: Gamepad2,
        title: 'Dedicated Game Coach',
        desc: 'Our coaches guide players, switch game titles, troubleshoot, and keep all players engaged and excited.'
      },
      {
        icon: Sparkles,
        title: 'Tournaments & Minigames',
        desc: 'We organize head-to-head tournaments (Mario Kart, Super Smash Bros, Fortnite) and age-appropriate rotations.'
      },
      {
        icon: Users,
        title: 'Stress-Free For Parents',
        desc: 'Parents can sit back and relax while our staff keeps all guests entertained, safe, and supervised.'
      }
    ]
  },
  {
    id: 5,
    question: 'Do I have to pay for the party in advance?',
    type: 'payment',
    icon: CreditCard,
    answer: 'No full prepayment is required upfront. We offer a flexible and secure booking structure:',
    highlights: [
      {
        icon: CreditCard,
        title: 'Deposit To Lock Date',
        desc: 'A non-refundable deposit guarantees your exclusive vehicle and time slot on our calendar.'
      },
      {
        icon: Clock,
        title: 'Balance Due On Arrival',
        desc: 'The remaining balance is paid on the day of your party before the gameplay begins.'
      },
      {
        icon: ShieldCheck,
        title: 'Secure Payment Methods',
        desc: 'We accept major credit and debit cards securely through encrypted payment processing.'
      }
    ]
  },
  {
    id: 6,
    question: 'What time will you be arriving?',
    type: 'arrival',
    icon: Clock,
    answer: 'We arrive 15 to 20 minutes prior to your scheduled reservation time to complete full setup and equipment testing.',
    highlights: [
      {
        icon: Clock,
        title: 'Early Arrival Setup',
        desc: 'Our team starts generators, initializes all consoles, tests controllers, and calibrates climate control before start time.'
      },
      {
        icon: Sparkles,
        title: 'Full Gameplay Time',
        desc: 'Your booked party time begins exactly at your scheduled time—setup time is completely on us.'
      },
      {
        icon: Truck,
        title: 'Host Preparation Tip',
        desc: 'Please ensure curbside parking space is cleared prior to our arrival to prevent any setup delays.'
      }
    ]
  },
  {
    id: 7,
    question: 'Where can I view your official policies?',
    type: 'policies',
    icon: FileText,
    answer: 'You can review all our official terms, cancellation policies, and guidelines directly online:',
    policyLinks: [
      {
        label: 'Cancellation & Refund Policy',
        desc: 'Deposit terms, rescheduling rules, and organization policies.',
        to: '/policies'
      },
      {
        label: 'Terms & Conditions',
        desc: 'Safety guidelines, supervision requirements, and damage policies.',
        to: '/terms-and-conditions'
      },
      {
        label: 'Privacy Policy',
        desc: 'Data protection standards and photo/media capture guidelines.',
        to: '/privacy-policy'
      }
    ]
  }
]

const toggleFaq = (index) => {
  activeIndex.value = activeIndex.value === index ? null : index
}

const scrollToSection = (id) => {
  const el = document.getElementById(id)
  if (el) el.scrollIntoView({ behavior: 'smooth' })
}
</script>

<template>
  <section id="faq" class="faq-section">
    <div class="container">
      
      <!-- Section Header -->
      <div class="section-header scroll-reveal">
        <div class="eyebrow-badge">
          <HelpCircle :size="14" class="text-red" />
          <span>HELP & INFORMATION</span>
        </div>
        <h2 class="faq-title">
          FREQUENTLY ASKED <span class="text-red-glow">QUESTIONS</span>
        </h2>
        <p class="faq-subtitle">
          Everything you need to know before booking your Ultimate Players gaming truck experience.
        </p>
      </div>

      <!-- FAQ Accordion List -->
      <div class="faq-accordion scroll-reveal">
        <div 
          v-for="(faq, index) in faqs" 
          :key="faq.id"
          class="faq-item"
          :class="{ active: activeIndex === index }"
        >
          <!-- Question Header Button -->
          <button 
            class="faq-question-btn"
            @click="toggleFaq(index)"
            :aria-expanded="activeIndex === index"
          >
            <div class="question-left">
              <span class="faq-num">{{ String(index + 1).padStart(2, '0') }}</span>
              <h3 class="question-text">{{ faq.question }}</h3>
            </div>
            <div class="faq-icon-pill">
              <ChevronDown :size="18" class="arrow-icon" />
            </div>
          </button>

          <!-- Answer Body (CSS Grid Smooth Accordion) -->
          <div class="faq-answer-wrapper" :class="{ open: activeIndex === index }">
            <div class="faq-answer-inner">
              <div class="faq-answer-content">
                
                <p class="answer-main">{{ faq.answer }}</p>

                <!-- Booking Options List (Q1) -->
                <div v-if="faq.options" class="booking-options-grid">
                  <div 
                    v-for="(opt, oIdx) in faq.options" 
                    :key="oIdx"
                    class="booking-opt-card"
                  >
                    <div class="opt-head">
                      <component :is="opt.icon" :size="18" class="text-red flex-shrink-0" />
                      <span class="opt-label">{{ opt.label }}</span>
                    </div>
                    <p class="opt-text">{{ opt.text }}</p>
                    <button 
                      v-if="opt.action" 
                      class="opt-btn"
                      @click="scrollToSection(opt.action)"
                    >
                      {{ opt.btnText }}
                    </button>
                    <a 
                      v-else-if="opt.tel" 
                      :href="opt.tel" 
                      class="opt-link"
                    >
                      {{ opt.btnText }}
                    </a>
                    <a 
                      v-else-if="opt.link" 
                      :href="opt.link" 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      class="opt-link"
                    >
                      {{ opt.btnText }}
                    </a>
                  </div>
                </div>

                <!-- Structured Highlights Grid (Q2, Q3, Q4, Q5, Q6) -->
                <div v-if="faq.highlights" class="highlights-grid">
                  <div 
                    v-for="(hl, hlIdx) in faq.highlights" 
                    :key="hlIdx"
                    class="highlight-card"
                  >
                    <div class="hl-icon-box">
                      <component :is="hl.icon" :size="18" class="text-red" />
                    </div>
                    <div class="hl-content">
                      <h4 class="hl-title">{{ hl.title }}</h4>
                      <p class="hl-desc">{{ hl.desc }}</p>
                    </div>
                  </div>
                </div>

                <!-- Parking Policy Alert (Q3) -->
                <div v-if="faq.policyNotice" class="parking-alert-box">
                  <div class="alert-icon-wrap">
                    <AlertTriangle :size="20" />
                  </div>
                  <div class="alert-text">
                    <strong class="alert-title">OFFICIAL PARKING PROTOCOL:</strong>
                    <span>{{ faq.policyNotice }}</span>
                  </div>
                </div>

                <!-- Policy Navigation Cards (Q7) -->
                <div v-if="faq.policyLinks" class="policy-links-grid">
                  <RouterLink 
                    v-for="(pl, plIdx) in faq.policyLinks" 
                    :key="plIdx"
                    :to="pl.to"
                    class="policy-link-card"
                  >
                    <div class="pl-content">
                      <h4 class="pl-label">{{ pl.label }}</h4>
                      <p class="pl-desc">{{ pl.desc }}</p>
                    </div>
                    <ChevronRight :size="18" class="pl-arrow text-red" />
                  </RouterLink>
                </div>

              </div>
            </div>
          </div>
        </div>
      </div>

    </div>
  </section>
</template>

<style scoped>
/* ============================================================
   SECTION WRAPPER
   ============================================================ */
.faq-section {
  padding: 7rem 0 6.5rem;
  position: relative;
  background-color: #000000;
  border-top: 1px solid rgba(255, 255, 255, 0.08);
}

/* ============================================================
   HEADER
   ============================================================ */
.section-header {
  text-align: center;
  max-width: 720px;
  margin: 0 auto 3.8rem auto;
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
  margin-bottom: 1.1rem;
}

.faq-title {
  font-family: var(--font-heading);
  font-size: clamp(2rem, 3.8vw, 3rem);
  font-weight: 900;
  color: #ffffff;
  line-height: 1.1;
  margin-bottom: 1rem;
  letter-spacing: 0.02em;
}

.text-red-glow {
  color: #ff002b;
  text-shadow: 0 0 20px rgba(255, 0, 43, 0.6);
}

.text-red {
  color: #ff002b;
}

.faq-subtitle {
  font-family: var(--font-body);
  font-size: 1.05rem;
  color: rgba(255, 255, 255, 0.65);
  line-height: 1.6;
}

/* ============================================================
   ACCORDION
   ============================================================ */
.faq-accordion {
  width: 100%;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 1.1rem;
}

.faq-item {
  background: rgba(14, 14, 22, 0.95);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 6px;
  overflow: hidden;
  transition: all 0.3s ease;
  width: 100%;
}

.faq-item:hover {
  border-color: rgba(255, 0, 43, 0.45);
  background: rgba(18, 16, 26, 0.98);
}

.faq-item.active {
  border-color: #ff002b;
  box-shadow: 0 0 35px rgba(255, 0, 43, 0.25), inset 0 0 15px rgba(255, 0, 43, 0.05);
  background: linear-gradient(180deg, rgba(22, 18, 32, 0.98) 0%, rgba(12, 10, 18, 0.99) 100%);
}

/* Question Button */
.faq-question-btn {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1.5rem;
  padding: 1.6rem 2.2rem;
  background: transparent;
  border: none;
  cursor: pointer;
  text-align: left;
  color: inherit;
}

.question-left {
  display: flex;
  align-items: center;
  gap: 1.4rem;
  flex-grow: 1;
}

.faq-num {
  font-family: var(--font-heading);
  font-size: 1.3rem;
  font-weight: 900;
  color: rgba(255, 0, 43, 0.6);
  line-height: 1;
  flex-shrink: 0;
  transition: color 0.3s ease;
}

.faq-item.active .faq-num,
.faq-item:hover .faq-num {
  color: #ff002b;
  text-shadow: 0 0 10px rgba(255, 0, 43, 0.6);
}

.question-text {
  font-family: var(--font-heading);
  font-size: 1.18rem;
  font-weight: 800;
  color: #ffffff;
  letter-spacing: 0.01em;
  line-height: 1.35;
}

.faq-icon-pill {
  width: 38px;
  height: 38px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.06);
  border: 1px solid rgba(255, 255, 255, 0.15);
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  transition: all 0.3s ease;
}

.arrow-icon {
  color: rgba(255, 255, 255, 0.6);
  transition: transform 0.3s ease, color 0.3s ease;
}

.faq-item.active .faq-icon-pill {
  background: rgba(255, 0, 43, 0.15);
  border-color: #ff002b;
  box-shadow: 0 0 12px rgba(255, 0, 43, 0.5);
}

.faq-item.active .arrow-icon {
  transform: rotate(180deg);
  color: #ff002b;
}

/* ============================================================
   ANSWER CONTENT (CSS GRID ACCORDION)
   ============================================================ */
.faq-answer-wrapper {
  display: grid;
  grid-template-rows: 0fr;
  transition: grid-template-rows 0.35s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.3s ease;
  opacity: 0;
  visibility: hidden;
}

.faq-answer-wrapper.open {
  grid-template-rows: 1fr;
  opacity: 1;
  visibility: visible;
}

.faq-answer-inner {
  overflow: hidden;
  min-height: 0;
}

.faq-answer-content {
  padding: 1.6rem 2.2rem 2.2rem 2.2rem;
  border-top: 1px solid rgba(255, 0, 43, 0.25);
  background: rgba(0, 0, 0, 0.5);
}

@media (max-width: 600px) {
  .faq-answer-content {
    padding: 1.2rem 1.2rem 1.6rem 1.2rem;
  }
}

.answer-main {
  font-family: var(--font-body);
  font-size: 1.08rem;
  color: #ffffff;
  line-height: 1.75;
  font-weight: 500;
  margin-bottom: 0.5rem;
}

/* ============================================================
   BOOKING OPTIONS GRID (Q1)
   ============================================================ */
.booking-options-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1.2rem;
  margin-top: 1.4rem;
}

@media (max-width: 768px) {
  .booking-options-grid {
    grid-template-columns: 1fr;
  }
}

.booking-opt-card {
  background: linear-gradient(180deg, rgba(25, 20, 35, 0.95) 0%, rgba(15, 12, 22, 0.98) 100%);
  border: 1px solid rgba(255, 255, 255, 0.15);
  border-radius: 6px;
  padding: 1.3rem;
  display: flex;
  flex-direction: column;
  gap: 0.6rem;
  transition: all 0.25s ease;
}

.booking-opt-card:hover {
  background: rgba(255, 0, 43, 0.12);
  border-color: #ff002b;
  box-shadow: 0 0 20px rgba(255, 0, 43, 0.25);
  transform: translateY(-2px);
}

.opt-head {
  display: flex;
  align-items: center;
  gap: 0.6rem;
}

.opt-label {
  font-family: var(--font-heading);
  font-size: 0.85rem;
  font-weight: 900;
  color: #ffffff;
  letter-spacing: 0.04em;
}

.opt-text {
  font-size: 0.92rem;
  color: rgba(255, 255, 255, 0.85);
  line-height: 1.55;
  flex-grow: 1;
}

.opt-btn,
.opt-link {
  display: inline-flex;
  align-items: center;
  font-family: var(--font-heading);
  font-size: 0.72rem;
  font-weight: 900;
  letter-spacing: 0.08em;
  color: #ff002b;
  background: transparent;
  border: none;
  cursor: pointer;
  text-decoration: none;
  margin-top: 0.4rem;
  padding: 0;
  transition: color 0.2s ease, transform 0.2s ease;
}

.opt-btn:hover,
.opt-link:hover {
  color: #ffffff;
  text-shadow: 0 0 12px rgba(255, 0, 43, 0.8);
  transform: translateX(4px);
}

/* ============================================================
   STRUCTURED HIGHLIGHTS GRID (Q2, Q3, Q4, Q5, Q6)
   ============================================================ */
.highlights-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1.2rem;
  margin-top: 1.4rem;
}

@media (max-width: 900px) {
  .highlights-grid {
    grid-template-columns: 1fr;
  }
}

.highlight-card {
  background: linear-gradient(180deg, rgba(22, 18, 30, 0.95) 0%, rgba(12, 10, 18, 0.98) 100%);
  border: 1px solid rgba(255, 255, 255, 0.12);
  border-radius: 6px;
  padding: 1.2rem 1.3rem;
  display: flex;
  align-items: flex-start;
  gap: 1rem;
  transition: all 0.25s ease;
}

.highlight-card:hover {
  border-color: rgba(255, 0, 43, 0.5);
  background: rgba(255, 0, 43, 0.08);
  box-shadow: 0 0 16px rgba(255, 0, 43, 0.15);
  transform: translateY(-2px);
}

.hl-icon-box {
  width: 36px;
  height: 36px;
  border-radius: 6px;
  background: rgba(255, 0, 43, 0.12);
  border: 1px solid rgba(255, 0, 43, 0.35);
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.hl-content {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.hl-title {
  font-family: var(--font-heading);
  font-size: 0.82rem;
  font-weight: 900;
  color: #ffffff;
  letter-spacing: 0.04em;
}

.hl-desc {
  font-size: 0.88rem;
  color: rgba(255, 255, 255, 0.82);
  line-height: 1.5;
}

/* ============================================================
   PARKING POLICY CALLOUT (Q3)
   ============================================================ */
.parking-alert-box {
  display: flex;
  align-items: flex-start;
  gap: 1rem;
  margin-top: 1.4rem;
  padding: 1.2rem 1.5rem;
  background: rgba(255, 0, 43, 0.12);
  border: 1px solid rgba(255, 0, 43, 0.45);
  border-radius: 6px;
  border-left: 4px solid #ff002b;
}

.alert-icon-wrap {
  color: #ff002b;
  flex-shrink: 0;
  margin-top: 2px;
}

.alert-text {
  display: flex;
  flex-direction: column;
  gap: 0.3rem;
}

.alert-title {
  font-family: var(--font-heading);
  font-size: 0.78rem;
  font-weight: 900;
  letter-spacing: 0.12em;
  color: #ff002b;
}

.alert-text span {
  color: #ffffff;
  font-size: 0.95rem;
  font-weight: 600;
  line-height: 1.55;
}

/* ============================================================
   POLICY DIRECT LINKS (Q7)
   ============================================================ */
.policy-links-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1.2rem;
  margin-top: 1.4rem;
}

@media (max-width: 850px) {
  .policy-links-grid {
    grid-template-columns: 1fr;
  }
}

.policy-link-card {
  background: linear-gradient(180deg, rgba(22, 18, 30, 0.95) 0%, rgba(12, 10, 18, 0.98) 100%);
  border: 1px solid rgba(255, 255, 255, 0.14);
  border-radius: 6px;
  padding: 1.2rem 1.4rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  text-decoration: none;
  transition: all 0.25s ease;
}

.policy-link-card:hover {
  border-color: #ff002b;
  background: rgba(255, 0, 43, 0.12);
  box-shadow: 0 0 20px rgba(255, 0, 43, 0.3);
  transform: translateY(-2px);
}

.pl-content {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.pl-label {
  font-family: var(--font-heading);
  font-size: 0.85rem;
  font-weight: 900;
  color: #ffffff;
  letter-spacing: 0.03em;
}

.pl-desc {
  font-size: 0.85rem;
  color: rgba(255, 255, 255, 0.75);
  line-height: 1.45;
}

.pl-arrow {
  transition: transform 0.2s ease;
  flex-shrink: 0;
}

.policy-link-card:hover .pl-arrow {
  transform: translateX(4px);
  color: #ffffff;
}

/* ============================================================
   MOBILE — tighten question typography and padding
   ============================================================ */
@media (max-width: 600px) {
  .faq-section {
    padding: 4.5rem 0 5rem;
  }

  .section-header {
    margin: 0 auto 2.2rem auto;
    padding: 0 0.25rem;
  }

  .eyebrow-badge {
    font-size: 0.6rem;
    padding: 0.35rem 0.9rem;
  }

  .faq-title {
    font-size: clamp(1.5rem, 6.5vw, 2rem);
    line-height: 1.1;
  }

  .faq-subtitle {
    font-size: 0.88rem;
    line-height: 1.5;
  }

  .faq-question-btn {
    padding: 1.05rem 0.9rem;
    gap: 0.9rem;
  }

  .question-left {
    gap: 0.7rem;
  }

  .faq-num {
    font-size: 0.95rem;
  }

  .question-text {
    font-size: 0.92rem;
    line-height: 1.3;
    letter-spacing: 0;
  }

  .faq-icon-pill {
    width: 30px;
    height: 30px;
  }

  .faq-icon-pill :deep(svg) {
    width: 15px;
    height: 15px;
  }
}

@media (max-width: 380px) {
  .question-text {
    font-size: 0.84rem;
  }
  .faq-num {
    font-size: 0.85rem;
  }
  .faq-question-btn {
    padding: 0.95rem 0.8rem;
  }
}

</style>
