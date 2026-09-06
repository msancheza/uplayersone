<script setup>
import { 
  ArrowLeft, 
  Lock, 
  ShieldCheck, 
  Eye, 
  Camera, 
  Users, 
  Database, 
  Phone, 
  Sparkles,
  ChevronRight,
  Mail,
  FileText
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
          <Lock :size="14" class="text-red" />
          <span>LEGAL & COMPLIANCE</span>
        </div>

        <h1 class="hero-title">
          PRIVACY <span class="text-red-glow">POLICY</span>
        </h1>

        <p class="hero-lead">
          Last Updated: March 2026. This Privacy Policy describes how Ultimate Players collects, 
          uses, and protects your personal information when you use our website and mobile gaming entertainment services.
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
                <ShieldCheck :size="20" class="text-red flex-shrink-0" />
                <h2>1. Introduction & Commitment</h2>
              </div>
              <p>
                Ultimate Players Inc. ("Ultimate Players", "we", "our", or "us") is dedicated to protecting the privacy of our website visitors, event hosts, parents, and guests. We provide premier luxury mobile video game trucks, gaming buses, and esports entertainment throughout Los Angeles and Southern California.
              </p>
              <p>
                We do not sell, rent, or trade your personal identifiable information to third-party marketing brokers under any circumstances.
              </p>
            </section>

            <section class="legal-block">
              <div class="block-title-row">
                <Database :size="20" class="text-red flex-shrink-0" />
                <h2>2. Information We Collect</h2>
              </div>
              <p>We collect information necessary to prepare event quotes, manage bookings, and coordinate route dispatching:</p>
              <ul>
                <li><strong>Contact Information:</strong> Full name, telephone number, email address, and event street address or zip code.</li>
                <li><strong>Event Details:</strong> Requested dates, preferred time frames, estimated guest count, occasion type, and vehicle preferences.</li>
                <li><strong>Payment Information:</strong> Credit card or payment details are collected through PCI-DSS compliant payment gateways to process deposits and balances securely. We do not store raw credit card numbers on our local servers.</li>
                <li><strong>Technical & Usage Data:</strong> Browser type, operating system, IP address, and interaction metrics collected automatically via cookies to improve website performance and responsiveness.</li>
              </ul>
            </section>

            <section class="legal-block">
              <div class="block-title-row">
                <Eye :size="20" class="text-red flex-shrink-0" />
                <h2>3. How We Use Your Information</h2>
              </div>
              <p>The information we collect is utilized strictly for legitimate business and service delivery purposes:</p>
              <ul>
                <li>Verifying fleet availability and calculating precise travel and service quotes.</li>
                <li>Executing contracts, confirming reservations, and sending event dispatch updates.</li>
                <li>Direct communication between your assigned Game Coach and host on the day of the event.</li>
                <li>Complying with applicable legal, tax, and insurance reporting standards.</li>
              </ul>
            </section>

            <section class="legal-block">
              <div class="block-title-row">
                <Camera :size="20" class="text-red flex-shrink-0" />
                <h2>4. Photography & Media Capture Policy</h2>
              </div>
              <p>
                During parties and events, our certified Game Coaches frequently capture candid photos and short video clips of the mobile gaming setup, high scores, and celebration highlights from inside and immediately outside the trailer.
              </p>
              <div class="highlight-box">
                <strong>Opt-Out Protocol:</strong>
                <p>
                  Photos may occasionally be featured on our official Instagram, Facebook, or promotional galleries so hosts and families can view and download party memories. If you do not wish for photos or videos of your event to be captured or posted, please notify your coordinator at the time of booking or directly inform your Game Coach prior to the start of the event.
                </p>
              </div>
            </section>

            <section class="legal-block">
              <div class="block-title-row">
                <Users :size="20" class="text-red flex-shrink-0" />
                <h2>5. Children's Privacy (COPPA Compliance)</h2>
              </div>
              <p>
                While our gaming trucks are designed to provide unforgettable entertainment for children, teenagers, and families, our online booking platform and website are directed strictly to adults, parents, and legal guardians aged 18 and older.
              </p>
              <p>
                We do not knowingly collect personal contact information online directly from children under 13 years old. All bookings, contracts, and communications must be authorized and conducted by an adult host or legal guardian.
              </p>
            </section>

            <section class="legal-block">
              <div class="block-title-row">
                <Lock :size="20" class="text-red flex-shrink-0" />
                <h2>6. Data Security & Storage</h2>
              </div>
              <p>
                We implement modern industry-standard physical, electronic, and procedural safeguards to protect your personal information against unauthorized access, loss, or alteration. All web communications are encrypted via SSL/TLS protocol.
              </p>
            </section>

            <section class="legal-block">
              <div class="block-title-row">
                <Mail :size="20" class="text-red flex-shrink-0" />
                <h2>7. Contact Us Regarding Your Privacy</h2>
              </div>
              <p>
                If you have any questions, requests to review your data, or requests to delete your contact information from our booking database, please contact our privacy compliance team:
              </p>
              <div class="contact-pill-card">
                <p><strong>Ultimate Players Inc.</strong></p>
                <p>Email: <a :href="'mailto:' + siteConfig.email">{{ siteConfig.email }}</a></p>
                <p>Phone: <a :href="siteConfig.phoneTel">{{ siteConfig.phone }}</a></p>
                <p>Address: {{ siteConfig.address }}</p>
              </div>
            </section>

          </article>

          <!-- Sticky Quick Links Sidebar -->
          <aside class="legal-sidebar">
            <div class="sidebar-box">
              <span class="sidebar-eyebrow">LEGAL NAVIGATION</span>
              <ul class="sidebar-links">
                <li class="active"><RouterLink to="/privacy-policy">Privacy Policy</RouterLink></li>
                <li><RouterLink to="/terms-and-conditions">Terms & Conditions</RouterLink></li>
                <li><RouterLink to="/policies">All Event Policies</RouterLink></li>
                <li><RouterLink to="/pricing">Trucks & Pricing</RouterLink></li>
                <li><RouterLink to="/contact">Contact Support</RouterLink></li>
              </ul>

              <div class="sidebar-cta">
                <h4>Ready to plan your party?</h4>
                <p>Configure your truck setup and get an instant custom quote.</p>
                <RouterLink to="/contact" class="sidebar-cta-btn">
                  <span>GET A QUOTE</span>
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

.highlight-box {
  background: rgba(255, 0, 43, 0.08);
  border-left: 3px solid #ff002b;
  padding: 1rem 1.3rem;
  border-radius: 0 6px 6px 0;
  margin-top: 1rem;
}

.highlight-box strong {
  display: block;
  color: #ffffff;
  font-size: 0.95rem;
  margin-bottom: 0.3rem;
}

.highlight-box p {
  margin-bottom: 0;
  color: rgba(255, 255, 255, 0.85);
}

.contact-pill-card {
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.1);
  padding: 1.2rem;
  border-radius: 6px;
}

.contact-pill-card p {
  margin-bottom: 0.4rem;
}

.contact-pill-card a {
  color: #ff002b;
  text-decoration: none;
  font-weight: 700;
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
