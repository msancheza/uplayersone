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
  FileText
} from 'lucide-vue-next'
import siteConfig from '../config/siteConfig.js'

const activeIndex = ref(0)

const faqs = [
  {
    id: 1,
    question: 'How does it work?',
    type: 'booking',
    icon: Globe,
    answer: 'If you want to book with Ultimate Players, all you have to do is choose one of the following options:',
    options: [
      {
        icon: Globe,
        label: 'Website',
        text: 'Fill out the inquiry form below, and we will contact you back A.S.A.P.',
        action: 'contact'
      },
      {
        icon: Share2,
        label: 'Social Media',
        text: 'Send us a direct message through Facebook or Instagram.',
        link: siteConfig.socials.instagram
      },
      {
        icon: Phone,
        label: 'Phone',
        text: `Simply call us at ${siteConfig.phone}.`,
        tel: siteConfig.phoneTel
      }
    ]
  },
  {
    id: 2,
    question: 'How do I know the trailer can come to my house?',
    type: 'location',
    icon: MapPin,
    answer: 'We can go nearly anywhere, as long as your street isn’t on a very sharp hill.'
  },
  {
    id: 3,
    question: 'Can the gaming trailer go into my driveway?',
    type: 'parking',
    icon: AlertTriangle,
    answer: 'No, we do not park in driveways or alleys.',
    policyNotice: 'Ultimate Players does not park in driveways, alleys, backyards, or residential parking structures.'
  },
  {
    id: 4,
    question: 'Will the kids know what to do?',
    type: 'coach',
    icon: ShieldCheck,
    answer: "Don't worry! Our head coach is on-site throughout the entire event to help with any questions, switch games, and ensure everyone has a blast."
  },
  {
    id: 5,
    question: 'Do I have to pay for the party in advance?',
    type: 'payment',
    icon: CreditCard,
    answer: 'We only require a deposit in order to lock in your date and time. The remaining balance is due the day of your event.'
  },
  {
    id: 6,
    question: 'What time will you be arriving?',
    type: 'arrival',
    icon: Clock,
    answer: 'We arrive about 15 to 20 minutes before your scheduled start time to set up and have all systems ready to play.'
  },
  {
    id: 7,
    question: 'Where can I view your official policies?',
    type: 'policies',
    icon: FileText,
    answer: 'Contact us directly by phone, message, or via our booking questionnaire for full details on our official service and reservation policies.'
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
      <div class="faq-accordion">
        <div 
          v-for="(faq, index) in faqs" 
          :key="faq.id"
          class="faq-item scroll-reveal"
          :class="{ active: activeIndex === index }"
        >
          <!-- Question Header -->
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

          <!-- Answer Body -->
          <transition name="expand">
            <div v-if="activeIndex === index" class="faq-answer-wrapper">
              <div class="faq-answer-content">
                <p class="answer-main">{{ faq.answer }}</p>

                <!-- Booking Options List (for Q1) -->
                <div v-if="faq.options" class="booking-options-grid">
                  <div 
                    v-for="(opt, oIdx) in faq.options" 
                    :key="oIdx"
                    class="booking-opt-card"
                  >
                    <div class="opt-head">
                      <component :is="opt.icon" :size="16" class="text-red" />
                      <span class="opt-label">{{ opt.label }}</span>
                    </div>
                    <p class="opt-text">{{ opt.text }}</p>
                    <button 
                      v-if="opt.action" 
                      class="opt-btn"
                      @click="scrollToSection(opt.action)"
                    >
                      Fill Online Form →
                    </button>
                    <a 
                      v-else-if="opt.tel" 
                      :href="opt.tel" 
                      class="opt-link"
                    >
                      Call Now →
                    </a>
                    <a 
                      v-else-if="opt.link" 
                      :href="opt.link" 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      class="opt-link"
                    >
                      Message Us →
                    </a>
                  </div>
                </div>

                <!-- Parking Policy Alert (for Q3) -->
                <div v-if="faq.policyNotice" class="parking-alert-box">
                  <div class="alert-icon-wrap">
                    <AlertTriangle :size="18" />
                  </div>
                  <div class="alert-text">
                    <strong class="alert-title">PARKING POLICY:</strong>
                    <span>{{ faq.policyNotice }}</span>
                  </div>
                </div>

              </div>
            </div>
          </transition>
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
}

.text-red {
  color: #ff002b;
}

.faq-subtitle {
  font-family: var(--font-body);
  font-size: 1.05rem;
  color: rgba(255, 255, 255, 0.5);
  line-height: 1.6;
}

/* ============================================================
   ACCORDION (Full Width)
   ============================================================ */
.faq-accordion {
  width: 100%;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 1.1rem;
}

.faq-item {
  background: rgba(12, 12, 18, 0.9);
  border: 1px solid rgba(255, 255, 255, 0.09);
  border-radius: 5px;
  overflow: hidden;
  transition: all 0.3s ease;
  width: 100%;
}

.faq-item:hover {
  border-color: rgba(255, 0, 43, 0.4);
  background: rgba(16, 16, 24, 0.95);
}

.faq-item.active {
  border-color: #ff002b;
  box-shadow: 0 0 25px rgba(255, 0, 43, 0.18);
  background: rgba(18, 18, 28, 0.95);
}

/* Button */
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
  font-size: 1.25rem;
  font-weight: 900;
  color: rgba(255, 0, 43, 0.5);
  line-height: 1;
  flex-shrink: 0;
  transition: color 0.3s ease;
}

.faq-item.active .faq-num,
.faq-item:hover .faq-num {
  color: #ff002b;
}

.question-text {
  font-family: var(--font-heading);
  font-size: 1.15rem;
  font-weight: 800;
  color: #ffffff;
  letter-spacing: 0.01em;
  line-height: 1.35;
}

.faq-icon-pill {
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.12);
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  transition: all 0.3s ease;
}

.arrow-icon {
  color: rgba(255, 255, 255, 0.5);
  transition: transform 0.3s ease, color 0.3s ease;
}

.faq-item.active .faq-icon-pill {
  background: rgba(255, 0, 43, 0.15);
  border-color: #ff002b;
}

.faq-item.active .arrow-icon {
  transform: rotate(180deg);
  color: #ff002b;
}

/* ============================================================
   ANSWER
   ============================================================ */
.faq-answer-wrapper {
  overflow: hidden;
}

.faq-answer-content {
  padding: 0 2.2rem 1.8rem 4.8rem;
  border-top: 1px solid rgba(255, 255, 255, 0.05);
  padding-top: 1.4rem;
}

@media (max-width: 600px) {
  .faq-answer-content {
    padding-left: 1.4rem;
    padding-right: 1.4rem;
  }
}

.answer-main {
  font-family: var(--font-body);
  font-size: 1rem;
  color: rgba(255, 255, 255, 0.78);
  line-height: 1.65;
  font-weight: 500;
}

/* ============================================================
   BOOKING OPTIONS GRID (Q1)
   ============================================================ */
.booking-options-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1rem;
  margin-top: 1.2rem;
}

@media (max-width: 768px) {
  .booking-options-grid {
    grid-template-columns: 1fr;
  }
}

.booking-opt-card {
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 4px;
  padding: 1.1rem;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.opt-head {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.opt-label {
  font-family: var(--font-heading);
  font-size: 0.78rem;
  font-weight: 900;
  color: #ffffff;
  letter-spacing: 0.04em;
}

.opt-text {
  font-size: 0.85rem;
  color: rgba(255, 255, 255, 0.6);
  line-height: 1.45;
  flex-grow: 1;
}

.opt-btn,
.opt-link {
  display: inline-flex;
  align-items: center;
  font-family: var(--font-heading);
  font-size: 0.68rem;
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
  color: #ff4d6d;
  transform: translateX(3px);
}

/* ============================================================
   PARKING POLICY CALLOUT (Q3)
   ============================================================ */
.parking-alert-box {
  display: flex;
  align-items: flex-start;
  gap: 0.9rem;
  margin-top: 1.2rem;
  padding: 1rem 1.3rem;
  background: rgba(255, 0, 43, 0.08);
  border: 1px solid rgba(255, 0, 43, 0.35);
  border-radius: 4px;
  border-left: 3px solid #ff002b;
}

.alert-icon-wrap {
  color: #ff002b;
  flex-shrink: 0;
  margin-top: 2px;
}

.alert-text {
  display: flex;
  flex-direction: column;
  gap: 0.2rem;
  font-size: 0.88rem;
  line-height: 1.5;
}

.alert-title {
  font-family: var(--font-heading);
  font-size: 0.72rem;
  font-weight: 900;
  letter-spacing: 0.12em;
  color: #ff002b;
}

.alert-text span {
  color: rgba(255, 255, 255, 0.85);
  font-weight: 600;
}

/* ============================================================
   TRANSITIONS
   ============================================================ */
.expand-enter-active,
.expand-leave-active {
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  max-height: 500px;
  opacity: 1;
}

.expand-enter-from,
.expand-leave-to {
  max-height: 0;
  opacity: 0;
  padding-top: 0;
  padding-bottom: 0;
}
</style>
