<script setup>
import { ref } from 'vue'
import { 
  Send, 
  CheckCircle2, 
  Calendar, 
  Clock, 
  MapPin, 
  Truck, 
  Glasses, 
  Sparkles, 
  ChevronRight, 
  ShieldCheck, 
  Phone,
  FileCheck2,
  Lock
} from 'lucide-vue-next'
import siteConfig from '../config/siteConfig.js'

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
  }
}
</script>

<template>
  <section id="contact" class="request-builder-section">
    <div class="container">
      <div class="request-grid">
        
        <!-- Left Column: Context & Overview -->
        <div class="request-info-column scroll-reveal reveal-left">
          <div class="eyebrow-badge">
            <Sparkles :size="14" class="text-red" />
            <span>REQUEST BUILDER · NO PAYMENT REQUIRED</span>
          </div>
          
          <h2 class="section-heading">
            START YOUR <span class="text-red-glow">EVENT REQUEST</span>
          </h2>
          
          <p class="section-lead">
            Tell us about your party, and we’ll check availability and prepare a custom quote for you—<strong>no payment required</strong>.
          </p>

          <!-- 3-Step Process Flow -->
          <div class="steps-flow">
            
            <div class="step-card">
              <div class="step-num-badge">01</div>
              <div class="step-content">
                <h4>Event Logistics</h4>
                <p>Provide your preferred date, time frame, and zip code to check route availability.</p>
              </div>
            </div>

            <div class="step-card">
              <div class="step-num-badge">02</div>
              <div class="step-content">
                <h4>Experience & Vehicle</h4>
                <p>Select your favorite gaming truck model, event occasion, and optional VR upgrades.</p>
              </div>
            </div>

            <div class="step-card">
              <div class="step-num-badge">03</div>
              <div class="step-content">
                <h4>Custom Quote & Fast Response</h4>
                <p>Our coordinator evaluates your setup and sends a tailored proposal with exact pricing A.S.A.P.</p>
              </div>
            </div>

          </div>

          <!-- Free & No Obligation Guarantee Pill -->
          <div class="no-commitment-pill">
            <Lock :size="16" class="text-red flex-shrink-0" />
            <span>100% Free Consultation · Zero Immediate Payment · No Obligation</span>
          </div>

          <!-- Direct Phone Option -->
          <div class="phone-helper-card">
            <Phone :size="18" class="text-red flex-shrink-0" />
            <div>
              <strong>Prefer to discuss over the phone?</strong>
              <span>Call or text our coordinator directly: <a :href="siteConfig.phoneTel" class="phone-num-link">{{ siteConfig.phone }}</a></span>
            </div>
          </div>

        </div>

        <!-- Right Column: The Request Builder Form -->
        <div class="form-card-wrapper scroll-reveal reveal-right tilt-card">
          <div v-if="!submitted" class="builder-form-inner">
            
            <div class="form-header-bar">
              <div>
                <h3 class="builder-title">EVENT CONFIGURATOR</h3>
                <span class="builder-subtitle">Complete your event profile for a tailored quote</span>
              </div>
              <div class="free-quote-badge">
                <span>FREE QUOTE</span>
              </div>
            </div>

            <form @submit.prevent="handleSubmit" class="configurator-form">
              
              <!-- SECTION 1: Event Logistics -->
              <div class="form-section-block">
                <div class="block-label-row">
                  <span class="block-step-tag">STEP 1</span>
                  <span class="block-step-title">Basic Event Logistics</span>
                </div>

                <div class="form-row form-row-3">
                  <div class="form-group">
                    <label>Preferred Date *</label>
                    <input v-model="form.eventDate" type="date" required />
                  </div>

                  <div class="form-group">
                    <label>Preferred Time Frame</label>
                    <select v-model="form.timeFrame">
                      <option>Morning (10:00 AM – 1:00 PM)</option>
                      <option>Afternoon (1:00 PM – 5:00 PM)</option>
                      <option>Evening (5:00 PM – 9:00 PM)</option>
                      <option>Flexible / All Day Event</option>
                    </select>
                  </div>

                  <div class="form-group">
                    <label>Event Zip Code *</label>
                    <input v-model="form.zipCode" type="text" placeholder="e.g. 91803" maxlength="10" required />
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
                    <select v-model="form.truckType" class="highlight-select">
                      <option>Standard Gaming Truck (4 In / 2 Out · 6 TVs)</option>
                      <option>Deluxe Gaming Truck (6 TVs Inside · Most Popular)</option>
                      <option>Elite Gaming Truck (10 TVs Inside · 10 Displays)</option>
                      <option>Gaming Bus (6 TVs Inside)</option>
                      <option>Help Me Choose / Recommend Best Option</option>
                    </select>
                  </div>

                  <div class="form-group">
                    <label>Event Type</label>
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
                  <div class="form-group">
                    <label>Full Name *</label>
                    <input v-model="form.name" type="text" placeholder="e.g. Alex Smith" required />
                  </div>
                  <div class="form-group">
                    <label>Phone Number *</label>
                    <input v-model="form.phone" type="tel" placeholder="(626) 503-1189" required />
                  </div>
                </div>

                <div class="form-group">
                  <label>Email Address *</label>
                  <input v-model="form.email" type="email" placeholder="alex.smith@email.com" required />
                </div>

                <div class="form-group">
                  <label>Additional Details or Questions (Optional)</label>
                  <textarea v-model="form.notes" rows="2" placeholder="Tell us about the number of guests, specific game requests, or location access details..."></textarea>
                </div>
              </div>

              <!-- Submit Button -->
              <div class="submit-wrapper">
                <button type="submit" class="btn-submit-request">
                  <span>GET MY CUSTOM QUOTE</span>
                  <ChevronRight :size="18" />
                </button>
                <span class="submit-micro-reassurance">
                  No payment or credit card required. We will check schedule availability and send you a custom proposal.
                </span>
              </div>

            </form>
          </div>

          <!-- Post-Submit Confirmation (Fulfills task.txt #4) -->
          <div v-else class="post-submit-success">
            <div class="success-shield-icon">
              <CheckCircle2 :size="48" class="text-red" />
            </div>
            
            <h3 class="success-header-title">REQUEST SUBMITTED!</h3>
            
            <p class="success-official-msg">
              "Thanks! We received your request. Our team is checking availability for your date and location. We’ll get back to you A.S.A.P. with details and pricing."
            </p>

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

            <button class="btn-start-another" @click="submitted = false">
              ← Configure Another Event Request
            </button>
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
.request-builder-section {
  padding: 7rem 0 8rem;
  position: relative;
  background: #000000;
  border-top: 1px solid rgba(255, 255, 255, 0.08);
}

.request-grid {
  display: grid;
  grid-template-columns: 1fr 1.25fr;
  gap: 3.5rem;
  align-items: flex-start;
}

@media (max-width: 1040px) {
  .request-grid {
    grid-template-columns: 1fr;
    gap: 3rem;
  }
}

/* ============================================================
   LEFT COLUMN
   ============================================================ */
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

.section-lead {
  font-family: var(--font-body);
  font-size: 1.1rem;
  color: rgba(255, 255, 255, 0.7);
  line-height: 1.6;
  margin-bottom: 2.2rem;
}

.section-lead strong {
  color: #ffffff;
  text-decoration: underline;
}

/* 3 Steps Flow */
.steps-flow {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-bottom: 2rem;
}

.step-card {
  display: flex;
  align-items: flex-start;
  gap: 1.2rem;
  padding: 1.1rem 1.3rem;
  background: rgba(14, 14, 22, 0.85);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 4px;
  transition: border-color 0.2s ease;
}

.step-card:hover {
  border-color: rgba(255, 0, 43, 0.4);
}

.step-num-badge {
  font-family: var(--font-heading);
  font-size: 1.2rem;
  font-weight: 900;
  color: #ff002b;
  background: rgba(255, 0, 43, 0.1);
  border: 1px solid rgba(255, 0, 43, 0.3);
  width: 40px;
  height: 40px;
  border-radius: 6px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.step-content h4 {
  font-family: var(--font-heading);
  font-size: 0.95rem;
  font-weight: 900;
  color: #ffffff;
  margin-bottom: 0.2rem;
}

.step-content p {
  font-size: 0.85rem;
  color: rgba(255, 255, 255, 0.6);
  line-height: 1.45;
}

.no-commitment-pill {
  display: flex;
  align-items: center;
  gap: 0.6rem;
  font-size: 0.82rem;
  font-weight: 700;
  color: #ffffff;
  background: rgba(255, 0, 43, 0.08);
  border: 1px solid rgba(255, 0, 43, 0.25);
  padding: 0.7rem 1rem;
  border-radius: 4px;
  margin-bottom: 1.4rem;
}

.phone-helper-card {
  display: flex;
  align-items: center;
  gap: 0.9rem;
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 4px;
  padding: 1rem 1.2rem;
  font-size: 0.86rem;
  line-height: 1.45;
}

.phone-helper-card strong {
  display: block;
  color: #ffffff;
  margin-bottom: 0.15rem;
}

.phone-helper-card span {
  color: rgba(255, 255, 255, 0.6);
}

.phone-num-link {
  color: #ff002b;
  font-weight: 800;
  text-decoration: none;
}

/* ============================================================
   RIGHT FORM COLUMN
   ============================================================ */
.form-card-wrapper {
  background: linear-gradient(180deg, rgba(16, 14, 24, 0.95) 0%, rgba(10, 8, 14, 0.98) 100%);
  border: 1.5px solid rgba(255, 0, 43, 0.4);
  box-shadow: 0 20px 50px rgba(0, 0, 0, 0.95), inset 0 0 25px rgba(255, 0, 43, 0.05);
  border-radius: 6px;
  padding: 2.4rem;
  position: relative;
}

@media (max-width: 600px) {
  .form-card-wrapper {
    padding: 1.5rem 1.1rem;
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
  color: rgba(255, 255, 255, 0.45);
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

@media (max-width: 680px) {
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
  font-size: 0.6rem;
  font-weight: 800;
  letter-spacing: 0.12em;
  color: rgba(255, 255, 255, 0.6);
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
  font-size: 0.74rem;
  color: rgba(255, 255, 255, 0.45);
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
  font-size: 0.74rem;
  color: rgba(255, 255, 255, 0.4);
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
</style>
