<script setup>
import { 
  ArrowLeft, 
  FileText, 
  ShieldAlert, 
  Truck, 
  Users, 
  UtensilsCrossed, 
  AlertTriangle, 
  CloudRain, 
  Sparkles,
  ChevronRight,
  Phone,
  Scale
} from 'lucide-vue-next'
import { useRouter } from 'vue-router'
import siteConfig from '../config/siteConfig.js'

const router = useRouter()

const goHome = () => {
  router.push('/')
}
</script>

<template>
  <div class="legal-page">
    
    <!-- Hero Banner -->
    <header class="legal-hero">
      <div class="container">
        
        <button class="back-link" @click="goHome">
          <ArrowLeft :size="16" />
          <span>Back to Home</span>
        </button>

        <div class="hero-badge">
          <Scale :size="14" class="text-red" />
          <span>SERVICE AGREEMENT</span>
        </div>

        <h1 class="hero-title">
          TERMS & <span class="text-red-glow">CONDITIONS</span>
        </h1>

        <p class="hero-lead">
          Last Updated: March 2026. Please read these Terms and Conditions carefully before submitting 
          a booking request or contracting services with Ultimate Players Inc.
        </p>

      </div>
    </header>

    <main class="legal-body">
      <div class="container">
        <div class="legal-layout-grid">
          
          <!-- Content Sections -->
          <article class="legal-content">
            
            <section class="legal-block">
              <div class="block-title-row">
                <FileText :size="20" class="text-red flex-shrink-0" />
                <h2>1. Booking & Reservation Confirmation</h2>
              </div>
              <p>
                By reserving a gaming trailer, gaming bus, or auxiliary party equipment with Ultimate Players Inc., the client agrees to be bound by these standard Terms and Conditions. A booking is formally confirmed once the required deposit is processed and our coordination desk issues an official confirmation receipt.
              </p>
              <p>
                A valid credit or debit card must be placed on file to guarantee any reservation and cover incidentals or damages as outlined herein.
              </p>
            </section>

            <section class="legal-block">
              <div class="block-title-row">
                <ShieldAlert :size="20" class="text-red flex-shrink-0" />
                <h2>2. Deposit & Cancellation Policy</h2>
              </div>
              <p>Because our luxury units and certified coaches are reserved exclusively for your scheduled time slot:</p>
              <ul>
                <li><strong>Non-Refundable Deposits:</strong> All initial deposits are strictly non-refundable once your event date and time window are locked. No exceptions are made for rain, shine, COVID-19, or personal schedule changes.</li>
                <li><strong>No Rescheduling:</strong> Rescheduling of confirmed event dates, timeframes, or service addresses is not permitted.</li>
                <li><strong>Cancellation Fee:</strong> A mandatory cancellation fee of <strong>$200 per gaming trailer / gaming bus</strong> and per auxiliary service (jumpers, nerf battle, popcorn machine, balloon décor, etc.) applies if canceled by the client.</li>
                <li><strong>Organizations & Fairs:</strong> Schools, churches, corporations, and community festivals are subject to identical non-refundable deposit and $200 cancellation terms.</li>
              </ul>
            </section>

            <section class="legal-block">
              <div class="block-title-row">
                <Truck :size="20" class="text-red flex-shrink-0" />
                <h2>3. Vehicle Access, Parking & Clearance</h2>
              </div>
              <p>
                Our mobile gaming trucks and attached towing vehicles measure approximately 50 to 60 feet in total length and require adequate parking space (equivalent to roughly 4-5 parallel parked cars).
              </p>
              <ul>
                <li><strong>Parking Location:</strong> We park in the most flat, level, and safe curbside location available directly in front of the residence or event venue. We may block your driveway to ensure optimal leveling.</li>
                <li><strong>Prohibited Areas:</strong> We do not park in residential driveways, backyards, dirt alleys, grass fields, or covered parking garages without prior written authorization.</li>
                <li><strong>Coach Authority:</strong> The assigned Game Coach has final authority on parking safety. If an area poses hazards to persons, overhead trees, power lines, or equipment, the coach will select an alternate safe location.</li>
                <li><strong>Truck Attachment:</strong> The towing vehicle remains coupled to the trailer throughout the duration of the event.</li>
              </ul>
            </section>

            <section class="legal-block">
              <div class="block-title-row">
                <Users :size="20" class="text-red flex-shrink-0" />
                <h2>4. Adult Supervision & Conduct</h2>
              </div>
              <p>
                While our Game Coaches guide gaming sessions, organize tournaments, and operate equipment, they are not babysitters or daycare providers.
              </p>
              <ul>
                <li><strong>Parental Presence:</strong> A parent or responsible adult host must be present on site (inside or immediately outside the trailer) at all times during the event.</li>
                <li><strong>Children Age 5 & Under:</strong> Young children aged 5 and younger must be accompanied and supervised by a parent or adult guardian inside the trailer at all times.</li>
              </ul>
            </section>

            <section class="legal-block">
              <div class="block-title-row">
                <UtensilsCrossed :size="20" class="text-red flex-shrink-0" />
                <h2>5. Food, Drinks, Alcohol & Substance Policy</h2>
              </div>
              <p>
                To preserve high-end gaming electronics, sanitized controllers, and custom seating:
              </p>
              <ul>
                <li><strong>No Food or Drinks:</strong> Food, candy, chewing gum, and drinks are strictly forbidden inside the gaming truck. Guests must finish refreshments outside before entering.</li>
                <li><strong>Strict Alcohol & Drug Prohibition:</strong> Alcohol, drugs, and smoking/vaping are strictly prohibited inside or immediately around the gaming trailer. Ultimate Players reserves the immediate right to terminate an event with zero refund if illicit substances or disorderly conduct occur.</li>
              </ul>
            </section>

            <section class="legal-block">
              <div class="block-title-row">
                <AlertTriangle :size="20" class="text-red flex-shrink-0" />
                <h2>6. Damage, Liability & Indemnification</h2>
              </div>
              <p>
                The client assumes full responsibility for the conduct of all party guests:
              </p>
              <ul>
                <li><strong>Equipment Damage:</strong> Ultimate Players reserves the right to charge the client's credit card for willful damage, theft, or negligent destruction of consoles, TVs, controllers, headsets, or trailer interior caused by guests.</li>
                <li><strong>Property Damage & Injuries:</strong> Ultimate Players is not liable for underground pipes, driveway cracking, or property damage resulting from host-requested positioning. Liability for personal injuries sustained on the client's private premises rests solely with the host.</li>
              </ul>
            </section>

            <section class="legal-block">
              <div class="block-title-row">
                <CloudRain :size="20" class="text-red flex-shrink-0" />
                <h2>7. Weather Policy</h2>
              </div>
              <p>
                Our gaming trailers and buses are fully insulated and equipped with high-output air conditioning and heating systems, operating comfortably in heat, cold, or light rain.
              </p>
              <p>
                In rare events of severe declared emergencies (flooding, hurricane-force winds, lightning storms, or ice hazards), Ultimate Players reserves the right to reschedule the party timeframe for safety.
              </p>
            </section>

            <section class="legal-block">
              <div class="block-title-row">
                <Sparkles :size="20" class="text-red flex-shrink-0" />
                <h2>8. Special Requests & Permits</h2>
              </div>
              <p>Additional administrative fees apply for:</p>
              <ul>
                <li>Certificate of Insurance (COI) issuance naming third-party venues or municipalities as additional insureds.</li>
                <li>Dedicated park parking permits and municipal generator permits.</li>
                <li>Specific custom gaming title downloads or live online multiplayer network setups.</li>
              </ul>
            </section>

          </article>

          <!-- Sidebar -->
          <aside class="legal-sidebar">
            <div class="sidebar-box">
              <span class="sidebar-eyebrow">LEGAL NAVIGATION</span>
              <ul class="sidebar-links">
                <li><RouterLink to="/privacy-policy">Privacy Policy</RouterLink></li>
                <li class="active"><RouterLink to="/terms-and-conditions">Terms & Conditions</RouterLink></li>
                <li><RouterLink to="/policies">All Event Policies</RouterLink></li>
                <li><RouterLink to="/pricing">Trucks & Pricing</RouterLink></li>
                <li><RouterLink to="/contact">Contact Support</RouterLink></li>
              </ul>

              <div class="sidebar-cta">
                <h4>Have questions on terms?</h4>
                <p>Our event coordination team is available to assist.</p>
                <RouterLink to="/contact" class="sidebar-cta-btn">
                  <span>CONTACT COORDINATOR</span>
                  <ChevronRight :size="16" />
                </RouterLink>
              </div>
            </div>
          </aside>

        </div>
      </div>
    </main>

  </div>
</template>

<style scoped>
.legal-page {
  background-color: #000000;
  color: #ffffff;
  min-height: 100vh;
  padding-top: 5rem;
  padding-bottom: 6rem;
}

.legal-hero {
  padding: 3rem 0 3.5rem;
  border-bottom: 1px solid rgba(255, 255, 255, 0.08);
  background: radial-gradient(circle at 50% 0%, rgba(255, 0, 43, 0.12) 0%, transparent 70%);
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
  font-size: 1.1rem;
  color: rgba(255, 255, 255, 0.75);
  max-width: 780px;
  margin: 0 auto;
  line-height: 1.6;
}

.legal-body {
  padding-top: 3.5rem;
}

.legal-layout-grid {
  display: grid;
  grid-template-columns: 1fr 300px;
  gap: 3.5rem;
  align-items: flex-start;
}

@media (max-width: 900px) {
  .legal-layout-grid {
    grid-template-columns: 1fr;
  }
}

.legal-content {
  display: flex;
  flex-direction: column;
  gap: 2.5rem;
}

.legal-block {
  background: linear-gradient(180deg, rgba(14, 14, 22, 0.95) 0%, rgba(8, 8, 12, 0.98) 100%);
  border: 1px solid rgba(255, 255, 255, 0.09);
  border-radius: 8px;
  padding: 2.2rem;
}

.block-title-row {
  display: flex;
  align-items: center;
  gap: 0.8rem;
  margin-bottom: 1.2rem;
  padding-bottom: 0.8rem;
  border-bottom: 1px solid rgba(255, 255, 255, 0.08);
}

.block-title-row h2 {
  font-family: var(--font-heading);
  font-size: 1.3rem;
  font-weight: 900;
  color: #ffffff;
  letter-spacing: 0.02em;
}

.legal-block p {
  font-size: 0.95rem;
  line-height: 1.7;
  color: rgba(255, 255, 255, 0.8);
  margin-bottom: 1rem;
}

.legal-block ul {
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
  margin-bottom: 1rem;
}

.legal-block li {
  font-size: 0.92rem;
  line-height: 1.6;
  color: rgba(255, 255, 255, 0.78);
  padding-left: 1.4rem;
  position: relative;
}

.legal-block li::before {
  content: '✦';
  position: absolute;
  left: 0;
  color: #ff002b;
  font-size: 0.75rem;
  top: 0.15rem;
}

/* Sidebar */
.sidebar-box {
  background: linear-gradient(180deg, rgba(16, 14, 24, 0.95) 0%, rgba(10, 8, 14, 0.98) 100%);
  border: 1px solid rgba(255, 0, 43, 0.3);
  border-radius: 8px;
  padding: 2rem 1.6rem;
  position: sticky;
  top: 6rem;
}

.sidebar-eyebrow {
  display: block;
  font-family: var(--font-heading);
  font-size: 0.65rem;
  font-weight: 900;
  letter-spacing: 0.15em;
  color: #ff002b;
  margin-bottom: 1.2rem;
  padding-bottom: 0.6rem;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
}

.sidebar-links {
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
  margin-bottom: 2rem;
}

.sidebar-links a {
  color: rgba(255, 255, 255, 0.7);
  font-size: 0.9rem;
  text-decoration: none;
  transition: all 0.2s ease;
}

.sidebar-links li.active a,
.sidebar-links a:hover {
  color: #ff002b;
  padding-left: 4px;
}

.sidebar-cta {
  background: rgba(255, 0, 43, 0.08);
  border: 1px solid rgba(255, 0, 43, 0.3);
  padding: 1.2rem;
  border-radius: 6px;
  text-align: center;
}

.sidebar-cta h4 {
  font-family: var(--font-heading);
  font-size: 0.95rem;
  font-weight: 900;
  color: #ffffff;
  margin-bottom: 0.4rem;
}

.sidebar-cta p {
  font-size: 0.78rem;
  color: rgba(255, 255, 255, 0.6);
  margin-bottom: 1rem;
}

.sidebar-cta-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  width: 100%;
  background: #ff002b;
  color: #ffffff;
  font-family: var(--font-heading);
  font-size: 0.75rem;
  font-weight: 900;
  letter-spacing: 0.1em;
  padding: 0.7rem;
  border-radius: 4px;
  text-decoration: none;
  transition: all 0.25s ease;
}

.sidebar-cta-btn:hover {
  background: #d60024;
  box-shadow: 0 0 16px rgba(255, 0, 43, 0.7);
}
</style>
