<script setup>
import {
  CheckCircle2,
  Glasses,
  Sparkles,
  ChevronRight,
  Phone,
  AlertTriangle,
  Loader2,
  RotateCcw,
  CalendarCheck,
  PhoneCall,
  MailCheck
} from 'lucide-vue-next'
import CustomSelect from './CustomSelect.vue'
import siteConfig from '../config/siteConfig.js'
import { useBookingRequest } from '../composables/useBookingRequest.js'

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
  submit,
  reset,
  minDate,
  maxNotesLength
} = useBookingRequest()

const handleSubmit = async () => {
  await submit()
}
</script>

<template>
  <section id="contact" class="request-builder-section">
    <div class="container">
      <div class="request-wrapper">

        <!-- Section header — centered above the form -->
        <div class="contact-section-header">
          <div class="eyebrow-badge">
            <Sparkles :size="14" class="text-red" />
            <span>REQUEST BUILDER · NO PAYMENT REQUIRED</span>
          </div>
          <h2 class="section-heading">
            START YOUR <span class="text-red-glow">EVENT REQUEST</span>
          </h2>
          <p class="section-lead">
            Tell us about your party — we’ll check availability and send you a custom quote. <strong>No payment required.</strong>
          </p>
        </div>

        <!-- Full-width Form Card -->
        <div class="form-card-wrapper tilt-card">
          <div v-if="!isSuccess" class="builder-form-inner">

            <div class="form-header-bar">
              <div class="form-header-left">
                <h3 class="builder-title">EVENT CONFIGURATOR</h3>
                <span class="builder-subtitle">Complete your event profile for a tailored quote</span>
              </div>
              <div class="form-header-right">
                <div class="free-quote-badge">
                  <span>FREE QUOTE</span>
                </div>
                <a :href="siteConfig.phoneTel" class="phone-inline-link">
                  <Phone :size="13" />
                  <span>{{ siteConfig.phone }}</span>
                </a>
              </div>
            </div>
            <form @submit.prevent="handleSubmit" class="configurator-form" novalidate>

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

              <!-- SECTION 1: Event Logistics -->
              <div class="form-section-block">
                <div class="block-label-row">
                  <span class="block-step-tag">STEP 1</span>
                  <span class="block-step-title">Basic Event Logistics</span>
                </div>

                <div class="form-row form-row-3">
                  <div class="form-group" :class="{ 'has-error': errorFor('eventDate') }">
                    <label>Preferred Date *</label>
                    <input
                      v-model="form.eventDate"
                      type="date"
                      required
                      :min="minDate"
                      data-field="eventDate"
                      :aria-invalid="!!errorFor('eventDate')"
                      :aria-describedby="errorFor('eventDate') ? 'err-eventDate' : null"
                      @blur="handleBlur('eventDate')"
                    />
                    <span v-if="errorFor('eventDate')" id="err-eventDate" class="field-error" role="alert">
                      {{ errorFor('eventDate') }}
                    </span>
                  </div>

                  <div class="form-group">
                    <label>Preferred Time Frame</label>
                    <CustomSelect
                      v-model="form.timeFrame"
                      :options="[
                        'Morning (10:00 AM – 1:00 PM)',
                        'Afternoon (1:00 PM – 5:00 PM)',
                        'Evening (5:00 PM – 9:00 PM)',
                        'Flexible / All Day Event'
                      ]"
                    />
                  </div>

                  <div class="form-group" :class="{ 'has-error': errorFor('zipCode') }">
                    <label>Event Zip Code *</label>
                    <input
                      v-model="form.zipCode"
                      type="text"
                      inputmode="numeric"
                      placeholder="e.g. 91803"
                      maxlength="10"
                      required
                      data-field="zipCode"
                      :aria-invalid="!!errorFor('zipCode')"
                      :aria-describedby="errorFor('zipCode') ? 'err-zipCode' : null"
                      @blur="handleBlur('zipCode')"
                    />
                    <span v-if="errorFor('zipCode')" id="err-zipCode" class="field-error" role="alert">
                      {{ errorFor('zipCode') }}
                    </span>
                  </div>
                </div>
              </div>

              <!-- SECTION 2: Experience Selection -->
              <div class="form-section-block">
                <div class="block-label-row">
                  <span class="block-step-tag">STEP 2</span>
                  <span class="block-step-title">Experience & Vehicle Selection</span>
                </div>

                <div class="form-row">
                  <div class="form-group">
                    <label>Vehicle Preference</label>
                    <CustomSelect
                      v-model="form.truckType"
                      highlight
                      :options="[
                        'Standard Gaming Truck (4 In / 2 Out · 6 TVs)',
                        'Deluxe Gaming Truck (6 TVs Inside · Most Popular)',
                        'Elite Gaming Truck (10 TVs Inside · 10 Displays)',
                        'Gaming Bus (6 TVs Inside)',
                        'Help Me Choose / Recommend Best Option'
                      ]"
                    />
                  </div>

                  <div class="form-group">
                    <label>Event Type</label>
                    <CustomSelect
                      v-model="form.eventType"
                      :options="[
                        'Birthday Party',
                        'School Function / STEM / Carnival',
                        'Graduation Celebration',
                        'Block Party / Community Event',
                        'Corporate Event / Team Building',
                        'Church / Youth Ministry',
                        'Gaming Tournament',
                        'Other Special Event'
                      ]"
                    />
                  </div>
                </div>

                <!-- Optional Add-on -->
                <div class="addon-toggle-box" :class="{ active: form.addOculus }">
                  <label class="addon-label">
                    <input v-model="form.addOculus" type="checkbox" />
                    <div class="addon-checkbox-square"></div>
                    <div class="addon-details">
                      <div class="addon-header-line">
                        <Glasses :size="16" class="text-red" />
                        <strong>Add Oculus Quest 2 VR Experience</strong>
                        <span class="optional-tag">OPTIONAL UPGRADE</span>
                      </div>
                      <span class="addon-note">Includes virtual reality headsets, immersive games, and coaching.</span>
                    </div>
                  </label>
                </div>
              </div>

              <!-- SECTION 3: Contact Details -->
              <div class="form-section-block">
                <div class="block-label-row">
                  <span class="block-step-tag">STEP 3</span>
                  <span class="block-step-title">Your Contact Details</span>
                </div>

                <div class="form-row">
                  <div class="form-group" :class="{ 'has-error': errorFor('name') }">
                    <label>Full Name *</label>
                    <input
                      v-model="form.name"
                      type="text"
                      autocomplete="name"
                      placeholder="e.g. Alex Smith"
                      required
                      data-field="name"
                      :aria-invalid="!!errorFor('name')"
                      :aria-describedby="errorFor('name') ? 'err-name' : null"
                      @blur="handleBlur('name')"
                    />
                    <span v-if="errorFor('name')" id="err-name" class="field-error" role="alert">
                      {{ errorFor('name') }}
                    </span>
                  </div>

                  <div class="form-group" :class="{ 'has-error': errorFor('phone') }">
                    <label>Phone Number *</label>
                    <input
                      v-model="form.phone"
                      type="tel"
                      autocomplete="tel"
                      placeholder="(626) 503-1189"
                      required
                      data-field="phone"
                      :aria-invalid="!!errorFor('phone')"
                      :aria-describedby="errorFor('phone') ? 'err-phone' : null"
                      @blur="handleBlur('phone')"
                    />
                    <span v-if="errorFor('phone')" id="err-phone" class="field-error" role="alert">
                      {{ errorFor('phone') }}
                    </span>
                  </div>
                </div>

                <div class="form-group" :class="{ 'has-error': errorFor('email') }">
                  <label>Email Address *</label>
                  <input
                    v-model="form.email"
                    type="email"
                    autocomplete="email"
                    placeholder="alex.smith@email.com"
                    required
                    data-field="email"
                    :aria-invalid="!!errorFor('email')"
                    :aria-describedby="errorFor('email') ? 'err-email' : null"
                    @blur="handleBlur('email')"
                  />
                  <span v-if="errorFor('email')" id="err-email" class="field-error" role="alert">
                    {{ errorFor('email') }}
                  </span>
                </div>

                <div class="form-group" :class="{ 'has-error': errorFor('notes') }">
                  <label>Additional Details or Questions (Optional)</label>
                  <textarea
                    v-model="form.notes"
                    rows="2"
                    :maxlength="maxNotesLength"
                    placeholder="Tell us about the number of guests, specific game requests, or location access details..."
                    data-field="notes"
                    :aria-invalid="!!errorFor('notes')"
                    :aria-describedby="errorFor('notes') ? 'err-notes' : null"
                    @blur="handleBlur('notes')"
                  ></textarea>
                  <span v-if="errorFor('notes')" id="err-notes" class="field-error" role="alert">
                    {{ errorFor('notes') }}
                  </span>
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
                      {{ errorKind === 'validation' ? 'A FEW DETAILS NEED FIXING' : "WE COULDN'T SEND THAT" }}
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

              <!-- Submit Button -->
              <div class="submit-wrapper" :class="{ 'is-sending': isSending }">
                <button type="submit" class="btn-submit-request" :disabled="isSending">
                  <Loader2 v-if="isSending" :size="18" class="spin-icon" />
                  <span>{{ isSending ? 'SENDING YOUR REQUEST' : 'GET MY CUSTOM QUOTE' }}</span>
                  <ChevronRight v-if="!isSending" :size="18" />
                </button>
                <span v-if="isSending" class="submit-status-live">
                  <span class="status-dot"></span>
                  TRANSMITTING TO THE DISPATCH DESK...
                </span>
                <span v-else class="submit-micro-reassurance">
                  No payment or credit card required. We will check schedule availability and send you a custom proposal.
                </span>
              </div>

            </form>
          </div>

          <!-- Post-Submit Confirmation -->
          <div v-else class="post-submit-success">
            <div class="success-transmit-badge">
              <span class="transmit-dot"></span>
              <span>TRANSMISSION COMPLETE</span>
            </div>

            <div class="success-shield-icon">
              <CheckCircle2 :size="48" class="text-red" />
            </div>

            <h3 class="success-header-title">REQUEST SUBMITTED!</h3>

            <p class="success-official-msg">
              "Thanks! We received your request. Our team is checking availability for your date and location. We'll get back to you A.S.A.P. with details and pricing."
            </p>

            <div v-if="reference" class="success-reference-box">
              <span class="ref-label">YOUR REFERENCE</span>
              <span class="ref-value">{{ reference }}</span>
              <span class="ref-hint">Quote this code if you call us about this event.</span>
            </div>

            <div class="summary-details-box">
              <div class="summary-row">
                <span class="sum-label">Host Name:</span>
                <span class="sum-val">{{ form.name }}</span>
              </div>
              <div class="summary-row">
                <span class="sum-label">Preferred Date:</span>
                <span class="sum-val">{{ form.eventDate }} ({{ form.timeFrame }})</span>
              </div>
              <div class="summary-row">
                <span class="sum-label">Event Zip Code:</span>
                <span class="sum-val">{{ form.zipCode }}</span>
              </div>
              <div class="summary-row">
                <span class="sum-label">Vehicle Selected:</span>
                <span class="sum-val text-red">{{ form.truckType }}</span>
              </div>
              <div v-if="form.addOculus" class="summary-row">
                <span class="sum-label">Add-on:</span>
                <span class="sum-val">Oculus Quest 2 VR Experience Included</span>
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

            <div class="success-actions">
              <a :href="siteConfig.phoneTel" class="success-call-btn">
                <PhoneCall :size="16" />
                <span>CALL {{ siteConfig.phone }}</span>
              </a>
              <button class="btn-start-another" @click="reset">
                <RotateCcw :size="14" />
                <span>Configure Another Event Request</span>
              </button>
            </div>
          </div>

        </div>

      </div>
    </div>
  </section>
</template>

<style scoped>
/* Shared booking-form feedback styles (validation, sending, success). */
@import '../styles/booking-form.css';
/* ============================================================
   SECTION WRAPPER
   ============================================================ */
.request-builder-section {
  padding: 7rem 0 8rem;
  position: relative;
  background: #000000;
  border-top: 1px solid rgba(255, 255, 255, 0.08);
}

/* ============================================================
   LAYOUT WRAPPER — full-width centered form
   ============================================================ */
.request-wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2.4rem;
}

/* Section header above the form */
.contact-section-header {
  text-align: center;
  max-width: 640px;
  width: 100%;
  animation: contact-fade-in 0.7s cubic-bezier(0.16, 1, 0.3, 1) both;
}

@keyframes contact-fade-in {
  from {
    opacity: 0;
    transform: translateY(36px) scale(0.97);
  }
  to {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
}

.eyebrow-badge {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  font-family: var(--font-heading);
  font-size: 0.65rem;
  font-weight: 900;
  letter-spacing: 0.22em;
  color: #ff002b;
  background: rgba(255, 0, 43, 0.1);
  border: 1px solid rgba(255, 0, 43, 0.3);
  padding: 0.4rem 1.1rem;
  border-radius: 4px;
  margin-bottom: 1.2rem;
}

.section-heading {
  font-family: var(--font-heading);
  font-size: clamp(2.2rem, 3.8vw, 3.2rem);
  font-weight: 900;
  color: #ffffff;
  line-height: 1.05;
  margin-bottom: 1rem;
  letter-spacing: 0.02em;
}

.text-red-glow {
  color: #ff002b;
  text-shadow: 0 0 25px rgba(255, 0, 43, 0.6);
}

.text-red {
  color: #ff002b;
}

.section-lead {
  font-family: var(--font-body);
  font-size: 1.05rem;
  font-weight: 500;
  color: #e5e7eb;
  line-height: 1.6;
  margin-bottom: 0;
}

.section-lead strong {
  color: #ffffff;
}

/* ============================================================
   FORM COLUMN (full-width)
   ============================================================ */
.form-card-wrapper {
  background: linear-gradient(180deg, rgba(16, 14, 24, 0.95) 0%, rgba(10, 8, 14, 0.98) 100%);
  border: 1.5px solid rgba(255, 0, 43, 0.4);
  box-shadow: 0 20px 50px rgba(0, 0, 0, 0.95), inset 0 0 25px rgba(255, 0, 43, 0.05);
  border-radius: 8px;
  padding: 2.6rem 3rem;
  position: relative;
  width: 100%;
  max-width: 900px;
  animation: contact-fade-in 0.85s cubic-bezier(0.16, 1, 0.3, 1) 0.15s both;
}

@media (max-width: 768px) {
  .form-card-wrapper {
    padding: 1.8rem 1.4rem;
  }
}

@media (max-width: 480px) {
  .form-card-wrapper {
    padding: 1.4rem 1rem;
  }
}

.form-header-bar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  margin-bottom: 1.8rem;
  padding-bottom: 1.2rem;
  border-bottom: 1px solid rgba(255, 255, 255, 0.08);
}

.form-header-left {
  display: flex;
  flex-direction: column;
  gap: 0.15rem;
}

.form-header-right {
  display: flex;
  align-items: center;
  gap: 1rem;
  flex-shrink: 0;
}

/* Phone link in form header */
.phone-inline-link {
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  font-family: var(--font-heading);
  font-size: 0.72rem;
  font-weight: 800;
  letter-spacing: 0.06em;
  color: rgba(255, 255, 255, 0.6);
  transition: color 0.2s ease;
  white-space: nowrap;
}

.phone-inline-link:hover {
  color: #ff002b;
}

.builder-title {
  font-family: var(--font-heading);
  font-size: 1.3rem;
  font-weight: 900;
  color: #ffffff;
  letter-spacing: 0.04em;
  margin-bottom: 0.2rem;
}

.builder-subtitle {
  font-size: 0.75rem;
  font-weight: 700;
  letter-spacing: 0.08em;
  color: #d1d5e5;
  text-transform: uppercase;
}

.free-quote-badge {
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

.configurator-form {
  display: flex;
  flex-direction: column;
  gap: 1.6rem;
}

.form-section-block {
  display: flex;
  flex-direction: column;
  gap: 0.9rem;
}

.block-label-row {
  display: flex;
  align-items: center;
  gap: 0.6rem;
  margin-bottom: 0.2rem;
}

.block-step-tag {
  font-family: var(--font-heading);
  font-size: 0.55rem;
  font-weight: 900;
  letter-spacing: 0.12em;
  background: #ff002b;
  color: #ffffff;
  padding: 0.18rem 0.45rem;
  border-radius: 2px;
}

.block-step-title {
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

@media (max-width: 768px) {
  .form-row,
  .form-row-3 {
    grid-template-columns: 1fr;
  }
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 0.35rem;
}

.form-group label {
  font-family: var(--font-heading);
  font-size: 0.62rem;
  font-weight: 800;
  letter-spacing: 0.12em;
  color: #d1d5e5;
  text-transform: uppercase;
}

.form-group input,
.form-group select,
.form-group textarea {
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

.form-group input:focus,
.form-group select:focus,
.form-group textarea:focus {
  border-color: #ff002b;
  background: rgba(255, 0, 43, 0.04);
  box-shadow: 0 0 12px rgba(255, 0, 43, 0.25);
}

.highlight-select {
  color: #ff4d6d !important;
  font-weight: 700;
}

/* Addon Toggle */
.addon-toggle-box {
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 4px;
  padding: 0.85rem 1.1rem;
  cursor: pointer;
  transition: all 0.2s ease;
}

.addon-toggle-box:hover,
.addon-toggle-box.active {
  border-color: #ff002b;
  background: rgba(255, 0, 43, 0.06);
}

.addon-label {
  display: flex;
  align-items: center;
  gap: 0.8rem;
  cursor: pointer;
  user-select: none;
}

.addon-label input {
  display: none;
}

.addon-checkbox-square {
  width: 18px;
  height: 18px;
  border-radius: 3px;
  border: 1.5px solid rgba(255, 255, 255, 0.3);
  background: transparent;
  flex-shrink: 0;
  position: relative;
  transition: all 0.2s ease;
}

.addon-label input:checked + .addon-checkbox-square {
  background: #ff002b;
  border-color: #ff002b;
}

.addon-label input:checked + .addon-checkbox-square::after {
  content: '✓';
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  color: #fff;
  font-size: 0.72rem;
  font-weight: 900;
}

.addon-details {
  display: flex;
  flex-direction: column;
  gap: 0.15rem;
}

.addon-header-line {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.86rem;
  color: #ffffff;
}

.optional-tag {
  background: rgba(255, 255, 255, 0.08);
  color: rgba(255, 255, 255, 0.7);
  font-size: 0.55rem;
  font-weight: 800;
  letter-spacing: 0.1em;
  padding: 0.15rem 0.4rem;
  border-radius: 2px;
}

.addon-note {
  font-size: 0.76rem;
  font-weight: 500;
  color: #d1d5e5;
}

/* Submit */
.submit-wrapper {
  display: flex;
  flex-direction: column;
  gap: 0.6rem;
  margin-top: 0.5rem;
}

.btn-submit-request {
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

.btn-submit-request:hover {
  background: #d60024;
  box-shadow: 0 0 30px rgba(255, 0, 43, 0.7);
  transform: translateY(-2px);
}

.submit-micro-reassurance {
  text-align: center;
  font-size: 0.78rem;
  font-weight: 500;
  color: #d1d5e5;
  line-height: 1.4;
}

/* ============================================================
   POST-SUBMIT SUCCESS STATE
   ============================================================ */
.post-submit-success {
  text-align: center;
  padding: 3rem 1.5rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.4rem;
}

.success-shield-icon {
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

.success-header-title {
  font-family: var(--font-heading);
  font-size: 1.6rem;
  font-weight: 900;
  color: #ffffff;
  letter-spacing: 0.03em;
}

.success-official-msg {
  font-size: 1.05rem;
  color: rgba(255, 255, 255, 0.9);
  line-height: 1.6;
  max-width: 520px;
  background: rgba(255, 0, 43, 0.08);
  border: 1px solid rgba(255, 0, 43, 0.3);
  padding: 1.2rem 1.6rem;
  border-radius: 4px;
}

.summary-details-box {
  width: 100%;
  max-width: 500px;
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 4px;
  padding: 1.2rem 1.5rem;
  display: flex;
  flex-direction: column;
  gap: 0.6rem;
  text-align: left;
}

.summary-row {
  display: flex;
  justify-content: space-between;
  gap: 1rem;
  font-size: 0.85rem;
}

.sum-label {
  color: rgba(255, 255, 255, 0.45);
  font-weight: 600;
}

.sum-val {
  color: #ffffff;
  font-weight: 700;
  text-align: right;
}

.btn-start-another {
  background: transparent;
  border: 1px solid rgba(255, 255, 255, 0.2);
  color: rgba(255, 255, 255, 0.8);
  font-family: var(--font-heading);
  font-size: 0.75rem;
  font-weight: 900;
  padding: 0.8rem 1.6rem;
  cursor: pointer;
  margin-top: 0.5rem;
  transition: all 0.2s ease;
}

.btn-start-another:hover {
  border-color: #ff002b;
  color: #ffffff;
}

/* ============================================================
   MOBILE FIXES — prevent overflow under the ScrollNav
   indicator and tighten typography for narrow viewports.
   ============================================================ */
@media (max-width: 768px) {
  .request-builder-section {
    padding: 5rem 0 6rem;
  }

  /* Reserve right space so content never sits under the ScrollNav
     (ScrollNav is at right: 4px, ~24-28px wide) */
  .request-builder-section .container {
    padding-right: 2.8rem !important;
    max-width: 100% !important;
    box-sizing: border-box !important;
  }

  .request-info-column,
  .form-card-wrapper {
    max-width: 100%;
    min-width: 0; /* critical: prevents grid 1fr track from expanding past container */
    margin-right: 0;
    width: 100%;
  }

  .request-grid {
    min-width: 0;
  }

  /* Mobile-only: hide descriptive cards so the section is just title + subtitle + form.
     On desktop, the full 3-step flow + guarantee pill + phone helper are still visible. */
  .steps-flow,
  .no-commitment-pill,
  .phone-helper-card {
    display: none !important;
  }

  /* Add right padding to all children that could overflow */
  .eyebrow-badge,
  .section-heading,
  .section-lead,
  .steps-flow,
  .step-card,
  .no-commitment-pill,
  .phone-helper-card,
  .builder-form-inner,
  .form-header-bar,
  .form-section-block,
  .configurator-form,
  .submit-wrapper,
  .post-submit-success,
  .summary-details-box,
  .success-official-msg {
    max-width: 100%;
    overflow-wrap: break-word;
    word-break: break-word;
  }

  .step-content,
  .step-content h4,
  .step-content p,
  .phone-helper-card span,
  .no-commitment-pill,
  .builder-subtitle,
  .block-step-title,
  .submit-micro-reassurance {
    overflow-wrap: break-word;
    word-break: break-word;
  }

  .request-grid {
    gap: 2.2rem;
  }

  /* Header / Left Column */
  .eyebrow-badge {
    font-size: 0.58rem;
    letter-spacing: 0.15em;
    padding: 0.35rem 0.8rem;
    max-width: 100%;
  }

  .section-heading {
    font-size: clamp(1.5rem, 7vw, 2.2rem);
    line-height: 1.08;
    padding: 0 2.6rem 0 0.25rem;
    word-break: break-all;
    overflow-wrap: anywhere;
    max-width: 100%;
  }

  .section-lead {
    font-size: 0.88rem;
    padding: 0 2.6rem 0 0.25rem;
    line-height: 1.5;
    overflow-wrap: break-word;
    max-width: 100%;
  }

  /* Step inline rows */
  .steps-flow {
    gap: 0.5rem;
    padding: 0 2.6rem 0 0.25rem;
  }

  .step-inline {
    padding: 0.4rem 0.1rem;
    gap: 0.7rem;
  }

  .step-inline-num {
    font-size: 0.72rem;
    padding: 0.22rem 0.4rem;
    min-width: 28px;
  }

  .step-inline-title {
    font-size: 0.82rem;
  }

  /* No-commitment pill */
  .no-commitment-pill {
    font-size: 0.76rem;
    padding: 0.7rem 2.6rem 0.7rem 0.9rem;
    gap: 0.5rem;
    line-height: 1.4;
    margin: 0 0 1.2rem;
  }

  /* Phone helper card */
  .phone-helper-card {
    padding: 0.9rem 2.6rem 0.9rem 1rem;
    gap: 0.7rem;
    font-size: 0.8rem;
    margin: 0;
  }

  .phone-helper-card strong {
    font-size: 0.8rem;
  }

  .phone-helper-card span {
    font-size: 0.76rem;
  }

  /* Form wrapper — give the form real breathing room so content
     never crowds the right edge (ScrollNav reserves ~32px on the right). */
  .form-card-wrapper {
    padding: 0;
    margin-right: 0.5rem; /* extra safety vs ScrollNav */
  }

  .builder-form-inner {
    padding: 1.4rem 1.25rem 1.6rem;
  }

  .form-header-bar {
    flex-direction: column;
    align-items: flex-start;
    gap: 0.6rem;
    text-align: left;
  }

  .builder-title {
    font-size: 1.05rem;
  }

  .builder-subtitle {
    font-size: 0.78rem;
  }

  .free-quote-badge {
    font-size: 0.6rem;
    padding: 0.3rem 0.6rem;
  }

  .configurator-form {
    gap: 1.2rem;
  }

  /* Each form section is its own visual block — keeps the form from
     feeling like one long blob on mobile. */
  .form-section-block {
    padding: 1.1rem 0.95rem;
    background: rgba(255, 255, 255, 0.02);
    border: 1px solid rgba(255, 255, 255, 0.06);
    border-radius: 5px;
  }

  .block-label-row {
    flex-wrap: wrap;
    gap: 0.4rem;
    margin-bottom: 0.4rem;
  }

  .block-step-tag {
    font-size: 0.58rem;
  }

  .block-step-title {
    font-size: 0.78rem;
  }

  .form-group label {
    font-size: 0.55rem;
  }

  .form-group input,
  .form-group select,
  .form-group textarea {
    padding: 0.78rem 0.9rem;
    font-size: 0.9rem;
    width: 100%;
    max-width: 100%;
    min-width: 0;
    box-sizing: border-box;
  }

  /* CustomSelect renders its own dropdown — make sure the closed
     trigger and the menu panel both respect the form width. */
  .form-group :deep(.custom-select) {
    width: 100%;
    max-width: 100%;
    min-width: 0;
  }

  .form-group :deep(.custom-select-trigger) {
    width: 100%;
    max-width: 100%;
    min-width: 0;
    box-sizing: border-box;
    padding: 0.78rem 0.9rem;
    font-size: 0.9rem;
  }

  .form-group {
    min-width: 0;
    width: 100%;
    box-sizing: border-box;
  }

  .addon-toggle-box {
    padding: 0.85rem 0.95rem;
  }

  .addon-header-line {
    font-size: 0.78rem;
    flex-wrap: wrap;
  }

  .optional-tag {
    font-size: 0.5rem;
  }

  .addon-note {
    font-size: 0.7rem;
  }

  .btn-submit-request {
    font-size: 0.75rem;
    padding: 0.95rem 1.2rem;
    width: 100%;
  }

  .submit-micro-reassurance {
    font-size: 0.7rem;
    padding: 0 0.25rem;
  }

  /* Success state */
  .post-submit-success {
    padding: 2rem 1rem;
  }

  .success-header-title {
    font-size: 1.3rem;
  }

  .success-official-msg {
    font-size: 0.9rem;
    padding: 1rem 1.2rem;
  }

  .summary-details-box {
    padding: 1rem 1.2rem;
  }

  .summary-row {
    font-size: 0.78rem;
    flex-wrap: wrap;
    gap: 0.3rem;
  }

  .btn-start-another {
    font-size: 0.7rem;
    padding: 0.7rem 1.2rem;
    width: 100%;
  }
}

@media (max-width: 480px) {
  .section-heading {
    font-size: clamp(1.4rem, 7vw, 1.9rem);
  }

  .step-card {
    padding: 0.8rem 0.85rem;
    gap: 0.75rem;
  }

  .step-num-badge {
    width: 32px;
    height: 32px;
    font-size: 0.82rem;
  }

  .builder-form-inner {
    padding: 1.2rem 0.9rem;
  }
}
</style>
