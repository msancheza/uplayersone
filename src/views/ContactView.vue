<script setup>
import { ref } from 'vue'
import {
  ArrowLeft,
  Sparkles,
  Phone,
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
  HelpCircle,
  Rocket,
  AlertTriangle,
  Loader2,
  RotateCcw,
  PhoneCall
} from 'lucide-vue-next'
import { useRouter } from 'vue-router'
import siteConfig from '../config/siteConfig.js'
import SEOHead from '../components/SEOHead.vue'
import BookingDatePicker from '../components/BookingDatePicker.vue'
import TurnstileWidget from '../components/TurnstileWidget.vue'
import { routeSeo } from '../data/seoRoutes.js'
import { useBookingRequest } from '../composables/useBookingRequest.js'

const seo = routeSeo.contact

const router = useRouter()

const turnstileRef = ref(null)

const {
  form,
  errorMessage,
  errorKind,
  reference,
  isSending,
  isSuccess,
  isError,
  errorFor,
  handleBlur,
  handlePhoneInput,
  setTurnstileToken,
  submit,
  reset,
  minDate,
  maxNotesLength
} = useBookingRequest({
  onTurnstileInvalid: () => turnstileRef.value?.reset()
})

const handleSubmit = async () => {
  const sent = await submit()
  if (sent) {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }
}

const goHome = () => {
  router.push('/')
}

// Scroll smoothly to the EVENT CONFIGURATOR form below. Used by the
// "Start Your Event Request" channel card (replaces the old email card
// so users are funneled to the booking form instead of slow email).
const scrollToRequestForm = () => {
  const el = document.getElementById('start-event-request-form')
  if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
}
</script>

<template>
  <div class="contact-page">
      <SEOHead
        :title="seo.title"
        :description="seo.description"
        :path="seo.path"
        :breadcrumb="seo.breadcrumb"
      />

    
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
              <Rocket :size="24" />
            </div>
            <div class="channel-info">
              <span class="channel-tag">FASTEST RESPONSE</span>
              <h3>Start Your Event Request</h3>
              <p>Skip the email back-and-forth — get a custom quote in minutes via the booking form.</p>
              <button type="button" class="channel-action-btn secondary" @click="scrollToRequestForm">
                <span>START MY REQUEST</span>
                <ChevronRight :size="16" />
              </button>
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
                    <p>Review our cancellation rules, damage policies, and supervisor guidelines on our <RouterLink to="/our-policies" class="text-red">policies page</RouterLink>.</p>
                  </div>
                </div>

              </div>
            </div>

            <!-- Right Column: The Form -->
            <div class="booking-form-col">
              <div v-if="!isSuccess" id="start-event-request-form" class="form-card-box">
                
                <div class="form-title-bar">
                  <div>
                    <h3 class="box-main-title">EVENT CONFIGURATOR</h3>
                    <p class="box-sub-title">Complete your details for immediate availability check</p>
                  </div>
                  <div class="quote-badge">
                    <span>100% FREE QUOTE</span>
                  </div>
                </div>

                <form @submit.prevent="handleSubmit" class="main-contact-form" novalidate>

                  <!-- Honeypot: hidden from people, fills only for bots -->
                  <input
                    type="text"
                    name="website"
                    tabindex="-1"
                    autocomplete="off"
                    aria-hidden="true"
                    class="hp-field"
                    v-model="form.website"
                  />

                  <!-- Step 1 -->
                  <div class="form-step-group">
                    <div class="step-header">
                      <span class="step-pill">STEP 1</span>
                      <span class="step-title">Event Logistics</span>
                    </div>

                    <div class="form-row form-row-3">
                      <div class="input-field" :class="{ 'has-error': errorFor('eventDate') }">
                        <label>Event Date *</label>
                        <BookingDatePicker
                          v-model="form.eventDate"
                          :min="minDate"
                          placeholder="Select your event date"
                          :error="!!errorFor('eventDate')"
                          data-field="eventDate"
                          @blur="handleBlur('eventDate')"
                        />
                        <span v-if="errorFor('eventDate')" id="cv-err-eventDate" class="field-error" role="alert">
                          {{ errorFor('eventDate') }}
                        </span>
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
                      <div class="input-field" :class="{ 'has-error': errorFor('zipCode') }">
                        <label>Zip Code *</label>
                        <input
                          v-model="form.zipCode"
                          type="text"
                          inputmode="numeric"
                          placeholder="e.g. 91803"
                          maxlength="10"
                          required
                          data-field="zipCode"
                          :aria-invalid="!!errorFor('zipCode')"
                          :aria-describedby="errorFor('zipCode') ? 'cv-err-zipCode' : null"
                          @blur="handleBlur('zipCode')"
                        />
                        <span v-if="errorFor('zipCode')" id="cv-err-zipCode" class="field-error" role="alert">
                          {{ errorFor('zipCode') }}
                        </span>
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
                      <div class="input-field" :class="{ 'has-error': errorFor('name') }">
                        <label>Your Full Name *</label>
                        <input
                          v-model="form.name"
                          type="text"
                          autocomplete="name"
                          placeholder="e.g. Michael Miller"
                          required
                          data-field="name"
                          :aria-invalid="!!errorFor('name')"
                          :aria-describedby="errorFor('name') ? 'cv-err-name' : null"
                          @blur="handleBlur('name')"
                        />
                        <span v-if="errorFor('name')" id="cv-err-name" class="field-error" role="alert">
                          {{ errorFor('name') }}
                        </span>
                      </div>
                      <div class="input-field" :class="{ 'has-error': errorFor('phone') }">
                        <label>Phone Number *</label>
                        <input
                          :value="form.phone"
                          type="tel"
                          inputmode="tel"
                          autocomplete="tel"
                          placeholder="(626) 503-1189"
                          maxlength="14"
                          required
                          data-field="phone"
                          :aria-invalid="!!errorFor('phone')"
                          :aria-describedby="errorFor('phone') ? 'cv-err-phone' : 'cv-hint-phone'"
                          @input="handlePhoneInput"
                          @blur="handleBlur('phone')"
                        />
                        <span v-if="errorFor('phone')" id="cv-err-phone" class="field-error" role="alert">
                          {{ errorFor('phone') }}
                        </span>
                        <span v-else id="cv-hint-phone" class="field-hint">
                          10 digits, area code included — we only use it for your quote.
                        </span>
                      </div>
                    </div>

                    <div class="input-field" :class="{ 'has-error': errorFor('email') }">
                      <label>Email Address *</label>
                      <input
                        v-model="form.email"
                        type="email"
                        autocomplete="email"
                        placeholder="michael@example.com"
                        required
                        data-field="email"
                        :aria-invalid="!!errorFor('email')"
                        :aria-describedby="errorFor('email') ? 'cv-err-email' : null"
                        @blur="handleBlur('email')"
                      />
                      <span v-if="errorFor('email')" id="cv-err-email" class="field-error" role="alert">
                        {{ errorFor('email') }}
                      </span>
                    </div>

                    <div class="input-field" :class="{ 'has-error': errorFor('notes') }">
                      <label>Additional Notes or Questions (Optional)</label>
                      <textarea
                        v-model="form.notes"
                        rows="3"
                        :maxlength="maxNotesLength"
                        placeholder="Tell us about expected guest count, specific games, or location access..."
                        data-field="notes"
                        :aria-invalid="!!errorFor('notes')"
                        :aria-describedby="errorFor('notes') ? 'cv-err-notes' : null"
                        @blur="handleBlur('notes')"
                      ></textarea>
                      <span v-if="errorFor('notes')" id="cv-err-notes" class="field-error" role="alert">
                        {{ errorFor('notes') }}
                      </span>
                      <span v-else class="field-counter">{{ form.notes.length }}/{{ maxNotesLength }}</span>
                    </div>
                  </div>

                  <!-- Friendly error banner — never shows a technical reason -->
                  <Transition name="banner-slide">
                    <div v-if="isError && errorMessage" class="form-alert" role="alert">
                      <div class="alert-icon-wrap">
                        <AlertTriangle :size="20" />
                      </div>
                      <div class="alert-body">
                        <strong class="alert-title">
                          {{
                            errorKind === 'validation'
                              ? 'A FEW DETAILS NEED FIXING'
                              : errorKind === 'turnstile'
                                ? 'WE NEED ONE MORE CHECK'
                                : "WE COULDN'T SEND THAT"
                          }}
                        </strong>
                        <span class="alert-text">{{ errorMessage }}</span>
                        <div class="alert-actions">
                          <button type="button" class="alert-retry-btn" @click="handleSubmit">
                            <RotateCcw :size="14" />
                            <span>TRY AGAIN</span>
                          </button>
                          <a :href="siteConfig.phoneTel" class="alert-call-link">
                            <PhoneCall :size="14" />
                            <span>CALL {{ siteConfig.phone }}</span>
                          </a>
                        </div>
                      </div>
                    </div>
                  </Transition>

                  <!-- Cloudflare Turnstile — silent unless it needs to challenge -->
                  <TurnstileWidget
                    ref="turnstileRef"
                    @token="setTurnstileToken"
                  />

                  <div class="form-submit-container" :class="{ 'is-sending': isSending }">
                    <button type="submit" class="btn-submit-contact" :disabled="isSending">
                      <Loader2 v-if="isSending" :size="18" class="spin-icon" />
                      <span>{{ isSending ? 'SENDING YOUR REQUEST' : 'SUBMIT EVENT REQUEST' }}</span>
                      <ChevronRight v-if="!isSending" :size="18" />
                    </button>
                    <span v-if="isSending" class="submit-status-live">
                      <span class="status-dot"></span>
                      TRANSMITTING TO THE DISPATCH DESK...
                    </span>
                    <span v-else class="secure-note">
                      <Lock :size="12" class="text-red" /> No credit card required. Our coordinator will contact you promptly.
                    </span>
                  </div>

                </form>
              </div>

              <!-- Success View -->
              <div v-else class="form-success-panel">
                <div class="success-transmit-badge">
                  <span class="transmit-dot"></span>
                  <span>TRANSMISSION COMPLETE</span>
                </div>
                <div class="success-icon-badge">
                  <CheckCircle2 :size="48" class="text-red" />
                </div>
                <h3>REQUEST RECEIVED!</h3>
                <p class="success-intro">
                  Thank you, <strong>{{ form.name }}</strong>! Our team is reviewing availability for
                  <strong>{{ form.eventDate }}</strong> in zip code <strong>{{ form.zipCode }}</strong>.
                </p>

                <div v-if="reference" class="success-reference-box">
                  <span class="ref-label">YOUR REFERENCE</span>
                  <span class="ref-value">{{ reference }}</span>
                  <span class="ref-hint">Quote this code if you call us about this event.</span>
                </div>

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

                <div class="next-steps-block">
                  <span class="next-steps-label">WHAT HAPPENS NEXT</span>
                  <ol class="next-steps-list">
                    <li class="next-step">
                      <span class="step-dot"></span>
                      <span class="step-text">We confirm availability for your date and ZIP code.</span>
                    </li>
                    <li class="next-step">
                      <span class="step-dot"></span>
                      <span class="step-text">You receive a custom quote by email.</span>
                    </li>
                    <li class="next-step">
                      <span class="step-dot"></span>
                      <span class="step-text">A deposit locks the date — the balance is due on the day.</span>
                    </li>
                  </ol>
                </div>

                <p class="followup-msg">
                  We will reach out shortly by phone ({{ form.phone }}) and email ({{ form.email }}) with your confirmed schedule and custom quote.
                </p>

                <div class="success-actions">
                  <a :href="siteConfig.phoneTel" class="success-call-btn">
                    <PhoneCall :size="16" />
                    <span>CALL {{ siteConfig.phone }}</span>
                  </a>
                  <button class="btn-reset-form" @click="reset">
                    <RotateCcw :size="14" />
                    <span>Submit Another Inquire</span>
                  </button>
                </div>
              </div>

            </div>

          </div>

        </div>

      </div>
    </main>

  </div>
</template>

<style scoped>
/* Shared booking-form feedback styles (validation, sending, success). */
@import '../styles/booking-form.css';
/* ============================================================
   CONTACT PAGE WRAPPER
   ============================================================ */
.contact-page {
  background-color: #000000;
  color: #ffffff;
  min-height: 100vh;
  padding-top: 5rem;
  padding-bottom: 6rem;
  overflow-x: hidden;
  max-width: 100vw;
}

/* ============================================================
   HERO BANNER
   ============================================================ */
.contact-hero {
  padding: 3rem 0 3.5rem;
  border-bottom: 1px solid rgba(255, 255, 255, 0.08);
  background: radial-gradient(circle at 50% 0%, rgba(255, 0, 43, 0.15) 0%, transparent 70%);
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
  position: relative;
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

/* ============================================================
   MOBILE FIXES — prevent horizontal overflow that hides the
   navbar hamburger and truncates the fixed dock buttons.
   ============================================================ */
@media (max-width: 768px) {
  .contact-page {
    padding-top: 4.5rem;
    overflow-x: hidden;
    max-width: 100vw;
  }

  .contact-hero {
    padding: 1.5rem 0 2rem;
    overflow: hidden;
  }

  .contact-hero .container,
  .contact-body .container {
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

  .channel-card {
    padding: 1.4rem 1.2rem;
  }

  .channel-info h3 {
    font-size: 1rem;
  }

  .channel-info p {
    font-size: 0.82rem;
  }

  .channel-action-btn {
    font-size: 0.72rem;
    padding: 0.6rem 0.8rem;
  }

  .info-card-panel {
    padding: 1.8rem 1.4rem;
  }

  .info-card-panel h2 {
    font-size: 1.4rem;
  }

  .perk-item h4 {
    font-size: 0.88rem;
  }

  .perk-item p {
    font-size: 0.82rem;
  }

  .form-card-box {
    padding: 1.5rem 1.2rem;
  }

  .form-title-bar {
    flex-direction: column;
    gap: 0.6rem;
    text-align: center;
  }

  .box-main-title {
    font-size: 1.1rem;
  }

  .form-row-3 {
    flex-direction: column;
    gap: 0.8rem;
  }

  .btn-submit-contact {
    font-size: 0.78rem;
    padding: 1rem 1.2rem;
  }

  .form-success-panel {
    padding: 2rem 1.2rem;
  }

  .form-success-panel h3 {
    font-size: 1.3rem;
  }

  .success-summary {
    padding: 1rem;
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

  .channel-card {
    padding: 1.2rem 1rem;
  }

  .info-card-panel {
    padding: 1.5rem 1.1rem;
  }

  .form-card-box {
    padding: 1.3rem 1rem;
  }
}
</style>
