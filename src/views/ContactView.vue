<script setup>
import { ref } from 'vue'
import { 
  ArrowLeft, 
  Sparkles, 
  Phone, 
  Mail, 
  MapPin, 
  Clock, 
  MessageSquare, 
  CheckCircle2, 
  Glasses, 
  ChevronRight, 
  ShieldCheck, 
  Lock,
  Calendar,
  Truck,
  HelpCircle
} from 'lucide-vue-next'
import { useRouter } from 'vue-router'
import siteConfig from '../config/siteConfig.js'

const router = useRouter()

const form = ref({
  eventDate: '',
  timeFrame: 'Afternoon (1:00 PM – 5:00 PM)',
  zipCode: '',
  truckType: 'Deluxe Gaming Truck (6 TVs Inside · Most Popular)',
  eventType: 'Birthday Party',
  addOculus: false,
  name: '',
  email: '',
  phone: '',
  notes: ''
})

const submitted = ref(false)

const handleSubmit = () => {
  if (form.value.name && form.value.email && form.value.phone && form.value.eventDate && form.value.zipCode) {
    submitted.value = true
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }
}

const goHome = () => {
  router.push('/')
}
</script>

<template>
  <div class="contact-page">
    
    <!-- Hero Header -->
    <header class="contact-hero">
      <div class="container">
        
        <button class="back-link" @click="goHome">
          <ArrowLeft :size="16" />
          <span>Back to Home</span>
        </button>

        <div class="hero-badge">
          <Sparkles :size="14" class="text-red" />
          <span>DIRECT DISPATCH & EVENT BOOKING</span>
        </div>

        <h1 class="hero-title">
          CONTACT <span class="text-red-glow">US</span>
        </h1>

        <p class="hero-lead">
          Get in touch with our event coordination team. Request a free quote, check date availability, 
          or speak directly with our luxury mobile gaming specialists.
        </p>

      </div>
    </header>

    <main class="contact-body">
      <div class="container">

        <!-- Fast Contact Methods Grid -->
        <div class="contact-channels-grid">
          
          <div class="channel-card">
            <div class="channel-icon-box">
              <Phone :size="24" />
            </div>
            <div class="channel-info">
              <span class="channel-tag">DIRECT CALL / SMS</span>
              <h3>Speak With a Specialist</h3>
              <p>Immediate assistance for bookings, date reservations, and questions.</p>
              <a :href="siteConfig.phoneTel" class="channel-action-btn">
                <span>{{ siteConfig.phone }}</span>
                <ChevronRight :size="16" />
              </a>
            </div>
          </div>

          <div class="channel-card">
            <div class="channel-icon-box">
              <Mail :size="24" />
            </div>
            <div class="channel-info">
              <span class="channel-tag">EMAIL DISPATCH</span>
              <h3>Send An Inquiry</h3>
              <p>Corporate proposals, COI requests, and customized event solutions.</p>
              <a :href="'mailto:' + siteConfig.email" class="channel-action-btn secondary">
                <span>{{ siteConfig.email }}</span>
                <ChevronRight :size="16" />
              </a>
            </div>
          </div>

          <div class="channel-card">
            <div class="channel-icon-box">
              <Clock :size="24" />
            </div>
            <div class="channel-info">
              <span class="channel-tag">OPERATIONAL HOURS</span>
              <h3>Coordination Desk</h3>
              <p><strong>Support:</strong> Mon – Sun: 8:00 AM – 9:00 PM PST</p>
              <p><strong>Events:</strong> Operated 24/7 by advance reservation.</p>
              <span class="channel-status-pill">
                <span class="status-dot"></span> Active & Dispatching
              </span>
            </div>
          </div>

          <div class="channel-card">
            <div class="channel-icon-box">
              <MapPin :size="24" />
            </div>
            <div class="channel-info">
              <span class="channel-tag">PRIMARY FLEET HUB</span>
              <h3>Coverage Area</h3>
              <p>{{ siteConfig.address }} & all surrounding Southern California communities.</p>
              <span class="channel-subtext">Free standard travel within primary service radius.</span>
            </div>
          </div>

        </div>

        <!-- Two Column Main Booking & Information Grid -->
        <div class="booking-section-wrapper">
          
          <div class="booking-grid">
            
            <!-- Left Column: Context & Guarantees -->
            <div class="booking-info-col">
              <div class="info-card-panel">
                <div class="panel-eyebrow">
                  <ShieldCheck :size="16" class="text-red" />
                  <span>PREMIER SERVICE PROMISE</span>
                </div>
                <h2>Why Book With Ultimate Players?</h2>
                
                <div class="perks-list">
                  <div class="perk-item">
                    <div class="perk-bullet">01</div>
                    <div>
                      <h4>Zero Obligation Custom Quote</h4>
                      <p>Check dates, customize trailers, and receive honest upfront pricing without entering payment details.</p>
                    </div>
                  </div>

                  <div class="perk-item">
                    <div class="perk-bullet">02</div>
                    <div>
                      <h4>Dedicated Game Coach Included</h4>
                      <p>Every booking includes certified coaches who manage players, switch games, and ensure nonstop entertainment.</p>
                    </div>
                  </div>

                  <div class="perk-item">
                    <div class="perk-bullet">03</div>
                    <div>
                      <h4>All-Weather Climate Control</h4>
                      <p>High-efficiency dual air conditioning and heating keeps guests comfortable year-round, rain or shine.</p>
                    </div>
                  </div>

                  <div class="perk-item">
                    <div class="perk-bullet">04</div>
                    <div>
                      <h4>Next-Gen Consoles & VR</h4>
                      <p>PlayStation 5, Xbox Series X, Nintendo Switch OLED, and optional Oculus Quest 2 virtual reality.</p>
                    </div>
                  </div>
                </div>

                <div class="help-box">
                  <HelpCircle :size="20" class="text-red flex-shrink-0" />
                  <div>
                    <strong>Need policy details first?</strong>
                    <p>Review our cancellation rules, damage policies, and supervisor guidelines on our <RouterLink to="/policies" class="text-red">policies page</RouterLink>.</p>
                  </div>
                </div>

              </div>
            </div>

            <!-- Right Column: The Form -->
            <div class="booking-form-col">
              <div v-if="!submitted" class="form-card-box">
                
                <div class="form-title-bar">
                  <div>
                    <h3 class="box-main-title">EVENT CONFIGURATOR</h3>
                    <p class="box-sub-title">Complete your details for immediate availability check</p>
                  </div>
                  <div class="quote-badge">
                    <span>100% FREE QUOTE</span>
                  </div>
                </div>

                <form @submit.prevent="handleSubmit" class="main-contact-form">
                  
                  <!-- Step 1 -->
                  <div class="form-step-group">
                    <div class="step-header">
                      <span class="step-pill">STEP 1</span>
                      <span class="step-title">Event Logistics</span>
                    </div>

                    <div class="form-row form-row-3">
                      <div class="input-field">
                        <label>Event Date *</label>
                        <input v-model="form.eventDate" type="date" required />
                      </div>
                      <div class="input-field">
                        <label>Time Slot *</label>
                        <select v-model="form.timeFrame">
                          <option>Morning (10:00 AM – 1:00 PM)</option>
                          <option>Afternoon (1:00 PM – 5:00 PM)</option>
                          <option>Evening (5:00 PM – 9:00 PM)</option>
                          <option>Flexible / All Day Event</option>
                        </select>
                      </div>
                      <div class="input-field">
                        <label>Zip Code *</label>
                        <input v-model="form.zipCode" type="text" placeholder="e.g. 91803" maxlength="10" required />
                      </div>
                    </div>
                  </div>

                  <!-- Step 2 -->
                  <div class="form-step-group">
                    <div class="step-header">
                      <span class="step-pill">STEP 2</span>
                      <span class="step-title">Vehicle & Experience</span>
                    </div>

                    <div class="form-row">
                      <div class="input-field">
                        <label>Vehicle Model Preference</label>
                        <select v-model="form.truckType" class="highlight-select">
                          <option>Deluxe Gaming Truck (6 TVs Inside · Most Popular)</option>
                          <option>Standard Gaming Truck (4 In / 2 Out · 6 TVs)</option>
                          <option>Elite Gaming Truck (10 TVs Inside · 10 Displays)</option>
                          <option>Gaming Bus (6 TVs Inside)</option>
                          <option>Recommend Best Option For My Group</option>
                        </select>
                      </div>
                      <div class="input-field">
                        <label>Occasion / Event Type</label>
                        <select v-model="form.eventType">
                          <option>Birthday Party</option>
                          <option>School Function / STEM / Carnival</option>
                          <option>Graduation Celebration</option>
                          <option>Block Party / Community Event</option>
                          <option>Corporate Event / Team Building</option>
                          <option>Church / Youth Ministry</option>
                          <option>Gaming Tournament</option>
                          <option>Other Special Event</option>
                        </select>
                      </div>
                    </div>

                    <!-- VR Addon Toggle -->
                    <div class="vr-addon-box" :class="{ active: form.addOculus }">
                      <label class="vr-toggle-label">
                        <input v-model="form.addOculus" type="checkbox" />
                        <div class="vr-check-square"></div>
                        <div class="vr-info">
                          <div class="vr-title-row">
                            <Glasses :size="16" class="text-red" />
                            <strong>Add Oculus Quest 2 VR Experience</strong>
                            <span class="badge-opt">OPTIONAL</span>
                          </div>
                          <span class="vr-desc">Includes virtual reality headsets, immersive 3D games, and coach setup.</span>
                        </div>
                      </label>
                    </div>
                  </div>

                  <!-- Step 3 -->
                  <div class="form-step-group">
                    <div class="step-header">
                      <span class="step-pill">STEP 3</span>
                      <span class="step-title">Contact Information</span>
                    </div>

                    <div class="form-row">
                      <div class="input-field">
                        <label>Your Full Name *</label>
                        <input v-model="form.name" type="text" placeholder="e.g. Michael Miller" required />
                      </div>
                      <div class="input-field">
                        <label>Phone Number *</label>
                        <input v-model="form.phone" type="tel" placeholder="(626) 503-1189" required />
                      </div>
                    </div>

                    <div class="input-field">
                      <label>Email Address *</label>
                      <input v-model="form.email" type="email" placeholder="michael@example.com" required />
                    </div>

                    <div class="input-field">
                      <label>Additional Notes or Questions (Optional)</label>
                      <textarea v-model="form.notes" rows="3" placeholder="Tell us about expected guest count, specific games, or location access..."></textarea>
                    </div>
                  </div>

                  <div class="form-submit-container">
                    <button type="submit" class="btn-submit-contact">
                      <span>SUBMIT EVENT REQUEST</span>
                      <ChevronRight :size="18" />
                    </button>
                    <span class="secure-note">
                      <Lock :size="12" class="text-red" /> No credit card required. Our coordinator will contact you promptly.
                    </span>
                  </div>

                </form>
              </div>

              <!-- Success View -->
              <div v-else class="form-success-panel">
                <div class="success-icon-badge">
                  <CheckCircle2 :size="48" class="text-red" />
                </div>
                <h3>REQUEST RECEIVED!</h3>
                <p class="success-intro">
                  Thank you, <strong>{{ form.name }}</strong>! Our team is reviewing availability for 
                  <strong>{{ form.eventDate }}</strong> in zip code <strong>{{ form.zipCode }}</strong>.
                </p>
                <div class="success-summary">
                  <div class="sum-item">
                    <span>Vehicle:</span>
                    <strong class="text-red">{{ form.truckType }}</strong>
                  </div>
                  <div class="sum-item">
                    <span>Occasion:</span>
                    <strong>{{ form.eventType }}</strong>
                  </div>
                  <div class="sum-item">
                    <span>Time Slot:</span>
                    <strong>{{ form.timeFrame }}</strong>
                  </div>
                  <div v-if="form.addOculus" class="sum-item">
                    <span>Add-on:</span>
                    <strong>Oculus Quest 2 VR Included</strong>
                  </div>
                </div>
                <p class="followup-msg">
                  We will reach out shortly by phone ({{ form.phone }}) and email ({{ form.email }}) with your confirmed schedule and custom quote.
                </p>
                <button class="btn-reset-form" @click="submitted = false">
                  ← Submit Another Inquire
                </button>
              </div>

            </div>

          </div>

        </div>

      </div>
    </main>

  </div>
</template>

<style scoped>
/* ============================================================
   CONTACT PAGE WRAPPER
   ============================================================ */
.contact-page {
  background-color: #000000;
  color: #ffffff;
  min-height: 100vh;
  padding-top: 5rem;
  padding-bottom: 6rem;
}

/* ============================================================
   HERO BANNER
   ============================================================ */
.contact-hero {
  padding: 3rem 0 3.5rem;
  border-bottom: 1px solid rgba(255, 255, 255, 0.08);
  background: radial-gradient(circle at 50% 0%, rgba(255, 0, 43, 0.15) 0%, transparent 70%);
  text-align: center;
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
  color: rgba(255, 255, 255, 0.75);
  max-width: 760px;
  margin: 0 auto;
  line-height: 1.6;
}

/* ============================================================
   CONTACT CHANNELS GRID
   ============================================================ */
.contact-body {
  padding-top: 3.5rem;
}

.contact-channels-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1.5rem;
  margin-bottom: 4.5rem;
}

@media (max-width: 1100px) {
  .contact-channels-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 600px) {
  .contact-channels-grid {
    grid-template-columns: 1fr;
  }
}

.channel-card {
  background: linear-gradient(180deg, rgba(16, 14, 24, 0.95) 0%, rgba(10, 8, 14, 0.98) 100%);
  border: 1px solid rgba(255, 255, 255, 0.09);
  border-radius: 8px;
  padding: 1.8rem 1.5rem;
  display: flex;
  flex-direction: column;
  transition: all 0.3s ease;
}

.channel-card:hover {
  border-color: rgba(255, 0, 43, 0.45);
  box-shadow: 0 0 25px rgba(255, 0, 43, 0.15);
  transform: translateY(-3px);
}

.channel-icon-box {
  width: 48px;
  height: 48px;
  border-radius: 6px;
  background: rgba(255, 0, 43, 0.12);
  border: 1px solid rgba(255, 0, 43, 0.4);
  color: #ff002b;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 1.2rem;
}

.channel-tag {
  display: block;
  font-family: var(--font-heading);
  font-size: 0.58rem;
  font-weight: 900;
  letter-spacing: 0.18em;
  color: #ff002b;
  margin-bottom: 0.3rem;
}

.channel-info h3 {
  font-family: var(--font-heading);
  font-size: 1.1rem;
  font-weight: 900;
  color: #ffffff;
  margin-bottom: 0.5rem;
}

.channel-info p {
  font-size: 0.88rem;
  color: rgba(255, 255, 255, 0.65);
  line-height: 1.45;
  margin-bottom: 1.1rem;
}

.channel-action-btn {
  display: inline-flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  background: #ff002b;
  color: #ffffff;
  font-family: var(--font-heading);
  font-size: 0.78rem;
  font-weight: 900;
  letter-spacing: 0.05em;
  padding: 0.65rem 1rem;
  border-radius: 4px;
  text-decoration: none;
  transition: all 0.25s ease;
}

.channel-action-btn:hover {
  background: #d60024;
  box-shadow: 0 0 16px rgba(255, 0, 43, 0.7);
}

.channel-action-btn.secondary {
  background: rgba(255, 255, 255, 0.08);
  border: 1px solid rgba(255, 255, 255, 0.2);
}

.channel-action-btn.secondary:hover {
  background: rgba(255, 255, 255, 0.15);
  border-color: #ffffff;
}

.channel-status-pill {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.75rem;
  font-weight: 700;
  color: #22c55e;
  background: rgba(34, 197, 94, 0.1);
  border: 1px solid rgba(34, 197, 94, 0.3);
  padding: 0.3rem 0.7rem;
  border-radius: 20px;
}

.status-dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: #22c55e;
  box-shadow: 0 0 8px #22c55e;
}

.channel-subtext {
  font-size: 0.75rem;
  color: rgba(255, 255, 255, 0.45);
  font-style: italic;
}

/* ============================================================
   BOOKING & CONFIGURATOR PANEL
   ============================================================ */
.booking-section-wrapper {
  margin-bottom: 4rem;
}

.booking-grid {
  display: grid;
  grid-template-columns: 1fr 1.35fr;
  gap: 3.5rem;
  align-items: flex-start;
}

@media (max-width: 1000px) {
  .booking-grid {
    grid-template-columns: 1fr;
  }
}

.info-card-panel {
  background: linear-gradient(180deg, rgba(14, 14, 22, 0.95) 0%, rgba(8, 8, 12, 0.98) 100%);
  border: 1px solid rgba(255, 255, 255, 0.09);
  border-radius: 8px;
  padding: 2.5rem 2.2rem;
}

.panel-eyebrow {
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  font-family: var(--font-heading);
  font-size: 0.62rem;
  font-weight: 900;
  letter-spacing: 0.2em;
  color: #ff002b;
  margin-bottom: 0.8rem;
}

.info-card-panel h2 {
  font-family: var(--font-heading);
  font-size: 1.8rem;
  font-weight: 900;
  color: #ffffff;
  line-height: 1.15;
  margin-bottom: 2rem;
}

.perks-list {
  display: flex;
  flex-direction: column;
  gap: 1.4rem;
  margin-bottom: 2.2rem;
}

.perk-item {
  display: flex;
  align-items: flex-start;
  gap: 1.1rem;
}

.perk-bullet {
  font-family: var(--font-heading);
  font-size: 1rem;
  font-weight: 900;
  color: #ff002b;
  background: rgba(255, 0, 43, 0.1);
  border: 1px solid rgba(255, 0, 43, 0.3);
  width: 36px;
  height: 36px;
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.perk-item h4 {
  font-family: var(--font-heading);
  font-size: 0.95rem;
  font-weight: 900;
  color: #ffffff;
  margin-bottom: 0.2rem;
}

.perk-item p {
  font-size: 0.85rem;
  color: rgba(255, 255, 255, 0.65);
  line-height: 1.45;
}

.help-box {
  display: flex;
  align-items: flex-start;
  gap: 1rem;
  background: rgba(255, 0, 43, 0.06);
  border: 1px solid rgba(255, 0, 43, 0.25);
  border-radius: 6px;
  padding: 1.2rem;
  font-size: 0.88rem;
}

.help-box strong {
  display: block;
  color: #ffffff;
  margin-bottom: 0.2rem;
}

.help-box p {
  color: rgba(255, 255, 255, 0.7);
  line-height: 1.45;
}

/* ============================================================
   RIGHT FORM CARD
   ============================================================ */
.form-card-box {
  background: linear-gradient(180deg, rgba(16, 14, 24, 0.95) 0%, rgba(10, 8, 14, 0.98) 100%);
  border: 1.5px solid rgba(255, 0, 43, 0.4);
  box-shadow: 0 20px 50px rgba(0, 0, 0, 0.95), inset 0 0 25px rgba(255, 0, 43, 0.05);
  border-radius: 8px;
  padding: 2.5rem;
}

@media (max-width: 600px) {
  .form-card-box {
    padding: 1.6rem 1.2rem;
  }
}

.form-title-bar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  margin-bottom: 1.8rem;
  padding-bottom: 1.2rem;
  border-bottom: 1px solid rgba(255, 255, 255, 0.08);
}

.box-main-title {
  font-family: var(--font-heading);
  font-size: 1.35rem;
  font-weight: 900;
  color: #ffffff;
  letter-spacing: 0.04em;
  margin-bottom: 0.2rem;
}

.box-sub-title {
  font-size: 0.75rem;
  font-weight: 700;
  letter-spacing: 0.06em;
  color: rgba(255, 255, 255, 0.45);
  text-transform: uppercase;
}

.quote-badge {
  background: rgba(255, 0, 43, 0.15);
  border: 1px solid #ff002b;
  color: #ff002b;
  font-family: var(--font-heading);
  font-size: 0.58rem;
  font-weight: 900;
  letter-spacing: 0.15em;
  padding: 0.35rem 0.75rem;
  border-radius: 3px;
  white-space: nowrap;
}

.main-contact-form {
  display: flex;
  flex-direction: column;
  gap: 1.6rem;
}

.form-step-group {
  display: flex;
  flex-direction: column;
  gap: 0.9rem;
}

.step-header {
  display: flex;
  align-items: center;
  gap: 0.6rem;
  margin-bottom: 0.2rem;
}

.step-pill {
  font-family: var(--font-heading);
  font-size: 0.55rem;
  font-weight: 900;
  letter-spacing: 0.12em;
  background: #ff002b;
  color: #ffffff;
  padding: 0.18rem 0.45rem;
  border-radius: 2px;
}

.step-title {
  font-family: var(--font-heading);
  font-size: 0.72rem;
  font-weight: 800;
  letter-spacing: 0.1em;
  color: rgba(255, 255, 255, 0.85);
  text-transform: uppercase;
}

.form-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
}

.form-row-3 {
  grid-template-columns: 1.2fr 1.4fr 1fr;
}

@media (max-width: 680px) {
  .form-row, .form-row-3 {
    grid-template-columns: 1fr;
  }
}

.input-field {
  display: flex;
  flex-direction: column;
  gap: 0.35rem;
}

.input-field label {
  font-family: var(--font-heading);
  font-size: 0.6rem;
  font-weight: 800;
  letter-spacing: 0.12em;
  color: rgba(255, 255, 255, 0.6);
  text-transform: uppercase;
}

.input-field input,
.input-field select,
.input-field textarea {
  padding: 0.85rem 1rem;
  background: rgba(255, 255, 255, 0.04);
  border: 1px solid rgba(255, 255, 255, 0.12);
  border-radius: 3px;
  color: #ffffff;
  font-family: var(--font-body);
  font-size: 0.95rem;
  outline: none;
  transition: all 0.2s ease;
}

.input-field input:focus,
.input-field select:focus,
.input-field textarea:focus {
  border-color: #ff002b;
  background: rgba(255, 0, 43, 0.04);
  box-shadow: 0 0 12px rgba(255, 0, 43, 0.25);
}

.highlight-select {
  color: #ff4d6d !important;
  font-weight: 700;
}

/* VR Addon */
.vr-addon-box {
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 4px;
  padding: 0.85rem 1.1rem;
  cursor: pointer;
  transition: all 0.2s ease;
}

.vr-addon-box:hover,
.vr-addon-box.active {
  border-color: #ff002b;
  background: rgba(255, 0, 43, 0.06);
}

.vr-toggle-label {
  display: flex;
  align-items: center;
  gap: 0.8rem;
  cursor: pointer;
  user-select: none;
}

.vr-toggle-label input {
  display: none;
}

.vr-check-square {
  width: 18px;
  height: 18px;
  border-radius: 3px;
  border: 1.5px solid rgba(255, 255, 255, 0.3);
  background: transparent;
  flex-shrink: 0;
  position: relative;
  transition: all 0.2s ease;
}

.vr-toggle-label input:checked + .vr-check-square {
  background: #ff002b;
  border-color: #ff002b;
}

.vr-toggle-label input:checked + .vr-check-square::after {
  content: '✓';
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  color: #fff;
  font-size: 0.72rem;
  font-weight: 900;
}

.vr-info {
  display: flex;
  flex-direction: column;
  gap: 0.15rem;
}

.vr-title-row {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.86rem;
  color: #ffffff;
}

.badge-opt {
  background: rgba(255, 255, 255, 0.08);
  color: rgba(255, 255, 255, 0.7);
  font-size: 0.55rem;
  font-weight: 800;
  letter-spacing: 0.1em;
  padding: 0.15rem 0.4rem;
  border-radius: 2px;
}

.vr-desc {
  font-size: 0.74rem;
  color: rgba(255, 255, 255, 0.45);
}

/* Submit */
.form-submit-container {
  display: flex;
  flex-direction: column;
  gap: 0.6rem;
  margin-top: 0.5rem;
}

.btn-submit-contact {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.7rem;
  background: #ff002b;
  color: #ffffff;
  font-family: var(--font-heading);
  font-size: 0.88rem;
  font-weight: 900;
  letter-spacing: 0.12em;
  padding: 1.1rem 2rem;
  border: none;
  cursor: pointer;
  transition: all 0.25s ease;
  clip-path: polygon(6px 0, 100% 0, 100% calc(100% - 6px), calc(100% - 6px) 100%, 0 100%, 0 6px);
}

.btn-submit-contact:hover {
  background: #d60024;
  box-shadow: 0 0 30px rgba(255, 0, 43, 0.7);
  transform: translateY(-2px);
}

.secure-note {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.4rem;
  font-size: 0.74rem;
  color: rgba(255, 255, 255, 0.45);
}

/* ============================================================
   SUCCESS STATE
   ============================================================ */
.form-success-panel {
  text-align: center;
  padding: 3rem 1.5rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.4rem;
  background: linear-gradient(180deg, rgba(16, 14, 24, 0.95) 0%, rgba(10, 8, 14, 0.98) 100%);
  border: 1.5px solid rgba(255, 0, 43, 0.4);
  border-radius: 8px;
}

.success-icon-badge {
  width: 76px;
  height: 76px;
  border-radius: 50%;
  background: rgba(255, 0, 43, 0.12);
  border: 2px solid #ff002b;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 0 30px rgba(255, 0, 43, 0.4);
}

.form-success-panel h3 {
  font-family: var(--font-heading);
  font-size: 1.6rem;
  font-weight: 900;
  color: #ffffff;
}

.success-intro {
  font-size: 1.05rem;
  color: rgba(255, 255, 255, 0.85);
  line-height: 1.55;
  max-width: 500px;
}

.success-summary {
  width: 100%;
  max-width: 480px;
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 4px;
  padding: 1.2rem 1.5rem;
  display: flex;
  flex-direction: column;
  gap: 0.6rem;
  text-align: left;
}

.sum-item {
  display: flex;
  justify-content: space-between;
  font-size: 0.88rem;
}

.sum-item span {
  color: rgba(255, 255, 255, 0.5);
}

.followup-msg {
  font-size: 0.86rem;
  color: rgba(255, 255, 255, 0.6);
  max-width: 460px;
  line-height: 1.45;
}

.btn-reset-form {
  background: transparent;
  border: 1px solid rgba(255, 255, 255, 0.2);
  color: #ffffff;
  font-family: var(--font-heading);
  font-size: 0.75rem;
  font-weight: 800;
  padding: 0.75rem 1.4rem;
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.2s ease;
}

.btn-reset-form:hover {
  border-color: #ff002b;
  color: #ff002b;
}
</style>
