<script setup>
import { ref } from 'vue'
import { Send, CheckCircle2, Truck, Phone } from 'lucide-vue-next'
import siteConfig from '../config/siteConfig.js'

const form = ref({
  name: '',
  email: '',
  phone: '',
  eventDate: '',
  packageType: '2-HOUR PARTY PACKAGE ($299)',
  message: ''
})

const submitted = ref(false)

const handleSubmit = () => {
  if (form.value.name && form.value.email) {
    submitted.value = true
  }
}
</script>

<template>
  <section id="contact" class="contact-section">
    <div class="container">
      <div class="contact-grid">
        <!-- Info Column -->
        <div class="contact-info">
          <div class="badge">Direct Reservations</div>
          <h2 class="contact-title">BOOK YOUR <span class="text-gradient-red">GAMING TRUCK</span></h2>
          <p class="contact-desc">
            Fill out the inquiry form below and our event coordinator will verify Gaming Truck availability for your requested date and location.
          </p>

          <div class="contact-cards-list">
            <div class="contact-mini-card glass-card">
              <Truck :size="22" class="text-red" />
              <div>
                <h4>We Drive Direct To You</h4>
                <p>Serving {{ siteConfig.address }}.</p>
              </div>
            </div>

            <div class="contact-mini-card glass-card">
              <Phone :size="22" class="text-red" />
              <div>
                <h4>Call or Text Anytime</h4>
                <p class="text-red font-bold"><a :href="siteConfig.phoneTel" style="color: inherit; text-decoration: none;">{{ siteConfig.phone }}</a></p>
              </div>
            </div>
          </div>
        </div>

        <!-- Form Column -->
        <div class="glass-panel contact-form-card">
          <div v-if="!submitted" class="form-wrapper">
            <h3 class="form-title">Reservation Inquiry Form</h3>

            <form @submit.prevent="handleSubmit" class="contact-form">
              <div class="form-group">
                <label>Host Name</label>
                <input v-model="form.name" type="text" placeholder="e.g. John Smith" required />
              </div>

              <div class="form-row">
                <div class="form-group">
                  <label>Email Address</label>
                  <input v-model="form.email" type="email" placeholder="your.email@example.com" required />
                </div>
                <div class="form-group">
                  <label>Phone Number</label>
                  <input v-model="form.phone" type="tel" placeholder="(323) 248-8053" required />
                </div>
              </div>

              <div class="form-row">
                <div class="form-group">
                  <label>Target Event Date</label>
                  <input v-model="form.eventDate" type="date" required />
                </div>
                <div class="form-group">
                  <label>Desired Package</label>
                  <select v-model="form.packageType">
                    <option>2-HOUR PARTY PACKAGE ($299)</option>
                    <option>3-HOUR MEGA TRUCK ($399)</option>
                    <option>4-HOUR TOURNAMENT PRO ($499)</option>
                    <option>Custom Package Inquiry</option>
                  </select>
                </div>
              </div>

              <div class="form-group">
                <label>Event Address / Additional Notes</label>
                <textarea v-model="form.message" rows="3" placeholder="Provide event address or any special requests..." required></textarea>
              </div>

              <button type="submit" class="btn btn-primary w-full">
                <span>Submit Inquiry Request</span>
                <Send :size="16" />
              </button>
            </form>
          </div>

          <div v-else class="success-message">
            <CheckCircle2 :size="48" class="text-red" />
            <h3>Reservation Request Received!</h3>
            <p>An ULTIMATE PLAYERS Gaming Truck coordinator will contact you within 2 hours to confirm details for your event.</p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.contact-section {
  padding: 6rem 0 8rem 0;
  position: relative;
}

.contact-grid {
  display: grid;
  grid-template-columns: 1fr 1.1fr;
  gap: 3.5rem;
  align-items: center;
}

.contact-title {
  font-size: 3rem;
  font-weight: 900;
  margin: 0.8rem 0 1.2rem 0;
  color: #fff;
}

.contact-desc {
  font-size: 1.1rem;
  color: var(--text-muted);
  margin-bottom: 2.2rem;
}

.contact-cards-list {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.contact-mini-card {
  display: flex;
  align-items: center;
  gap: 1.2rem;
  padding: 1.2rem;
  background: rgba(14, 14, 20, 0.8);
  border: 1px solid rgba(255, 255, 255, 0.08);
}

.contact-mini-card h4 {
  font-size: 0.98rem;
  font-weight: 800;
  color: #fff;
}

.contact-mini-card p {
  font-size: 0.85rem;
  color: var(--text-muted);
}

.font-bold {
  font-weight: bold;
}

.contact-form-card {
  padding: 2.8rem;
  background: rgba(14, 14, 20, 0.9);
  border: 1px solid var(--border-red);
}

.form-title {
  font-size: 1.5rem;
  font-weight: 900;
  color: #fff;
  margin-bottom: 1.8rem;
}

.contact-form {
  display: flex;
  flex-direction: column;
  gap: 1.2rem;
}

.form-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
}

.form-group label {
  font-size: 0.82rem;
  font-weight: 800;
  text-transform: uppercase;
  color: var(--text-muted);
}

.form-group input,
.form-group select,
.form-group textarea {
  padding: 0.85rem 1rem;
  border-radius: var(--radius-sm);
  background: rgba(255, 255, 255, 0.04);
  border: 1px solid rgba(255, 255, 255, 0.12);
  color: #fff;
  font-family: var(--font-body);
  font-size: 0.95rem;
  outline: none;
  transition: border-color var(--transition-fast);
}

.form-group input:focus,
.form-group select:focus,
.form-group textarea:focus {
  border-color: var(--primary-red);
}

.w-full { width: 100%; }
.text-red { color: var(--primary-red); }

.success-message {
  text-align: center;
  padding: 2rem 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
}

.success-message h3 {
  font-size: 1.6rem;
  font-weight: 900;
  color: #fff;
}

.success-message p {
  color: var(--text-muted);
}

@media (max-width: 900px) {
  .contact-grid {
    grid-template-columns: 1fr;
  }
  .form-row {
    grid-template-columns: 1fr;
  }
}
</style>
