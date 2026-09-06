<script setup>
import { Instagram, Facebook, Youtube, Heart, Phone } from 'lucide-vue-next'
import siteConfig from '../config/siteConfig.js'

const currentYear = new Date().getFullYear()
</script>

<template>
  <footer id="footer" class="footer-wrapper">
    <div class="container">
      <div class="footer-top">
        <!-- Brand Info Column -->
        <div class="footer-brand">
          <a href="#" class="brand-logo">
            <img src="/logo.png" alt="ULTIMATE PLAYERS Logo" class="brand-logo-img" />
          </a>
          <p class="brand-desc">
            The premiere 360 luxury mobile gaming truck & esports party experience delivered directly to your door in {{ siteConfig.address }}.
          </p>
          <div class="social-links">
            <a :href="siteConfig.socials.instagram" target="_blank" rel="noopener" class="social-btn" title="Instagram"><Instagram :size="18" /></a>
            <a :href="siteConfig.socials.facebook" target="_blank" rel="noopener" class="social-btn" title="Facebook"><Facebook :size="18" /></a>
            <a :href="siteConfig.socials.tiktok" target="_blank" rel="noopener" class="social-btn" title="TikTok">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 1 1-5.2-1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V5.86a6.37 6.37 0 0 0-1-.08A6.34 6.34 0 1 0 15.82 12V8.9a8.28 8.28 0 0 0 4.77 1.52V7a4.81 4.81 0 0 1-1-.31z"/>
              </svg>
            </a>
            <a :href="siteConfig.socials.youtube" target="_blank" rel="noopener" class="social-btn" title="YouTube"><Youtube :size="18" /></a>
          </div>
        </div>

        <!-- Links Columns -->
        <div class="footer-links-grid">
          <div class="link-column">
            <h4>Navigation</h4>
            <a href="/#hero">Home</a>
            <RouterLink to="/pricing">Trucks & Pricing</RouterLink>
            <a href="/#gallery">Live Gallery</a>
            <RouterLink to="/contact">Contact Us</RouterLink>
            <a href="/#faq">FAQ</a>
          </div>

          <div class="link-column">
            <h4>Explore</h4>
            <a href="/#games">Our Games</a>
            <a href="/#events">Events We Host</a>
            <RouterLink to="/contact">Book Your Unit</RouterLink>
            <a :href="siteConfig.phoneTel">{{ siteConfig.phone }}</a>
          </div>

          <div class="link-column">
            <h4>Support & Legal</h4>
            <RouterLink to="/policies">Cancellation Policy</RouterLink>
            <RouterLink to="/terms-and-conditions">Terms & Conditions</RouterLink>
            <RouterLink to="/privacy-policy">Privacy Policy</RouterLink>
            <RouterLink to="/contact">Contact Support</RouterLink>
          </div>
        </div>
      </div>

      <!-- Footer Bottom -->
      <div class="footer-bottom">
        <p>© 2018 ULTIMATEPLAYERSONE. All rights reserved.</p>
        <p class="built-with">
          Designed with <Heart :size="14" class="heart-icon" /> for gamers worldwide.
        </p>
      </div>
    </div>
  </footer>
</template>

<style scoped>
.footer-wrapper {
  background: #04040a;
  border-top: 1px solid rgba(255, 0, 43, 0.25);
  padding: 5rem 0 2.5rem 0;
  color: #c8c8d8;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

.footer-top {
  display: grid;
  grid-template-columns: 1fr 2fr;
  gap: 4rem;
  padding-bottom: 3.5rem;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
}

/* Brand column */
.footer-brand {
  display: flex;
  flex-direction: column;
  gap: 1.4rem;
}

.brand-logo {
  display: flex;
  align-items: center;
  text-decoration: none;
}

.brand-logo-img {
  height: 64px;
  width: auto;
  object-fit: contain;
  filter: drop-shadow(0 0 14px rgba(255, 0, 43, 0.75));
  transition: transform 0.3s ease;
}

.brand-logo:hover .brand-logo-img {
  transform: scale(1.06);
}

.brand-desc {
  font-family: var(--font-body);
  font-size: 1rem;
  font-weight: 500;
  line-height: 1.75;
  color: #d4d4e0;
  max-width: 320px;
  letter-spacing: 0.01em;
}

/* Social icons */
.social-links {
  display: flex;
  gap: 0.75rem;
}

.social-btn {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.06);
  border: 1px solid rgba(255, 255, 255, 0.14);
  display: flex;
  align-items: center;
  justify-content: center;
  color: #d4d4e0;
  text-decoration: none;
  transition: all 0.25s ease;
}

.social-btn:hover {
  background: var(--primary-red);
  color: #fff;
  border-color: var(--primary-red);
  transform: translateY(-3px);
  box-shadow: 0 0 18px rgba(255, 0, 43, 0.65);
}

/* Nav link columns */
.footer-links-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 2.5rem;
}

.link-column {
  display: flex;
  flex-direction: column;
  gap: 0.9rem;
}

.link-column h4 {
  font-family: var(--font-heading);
  font-size: 0.78rem;
  font-weight: 900;
  letter-spacing: 0.18em;
  color: #ffffff;
  text-transform: uppercase;
  margin-bottom: 0.5rem;
  padding-bottom: 0.6rem;
  border-bottom: 1px solid rgba(255, 0, 43, 0.35);
}

.link-column a {
  font-family: var(--font-body);
  color: #c0c0d0;
  font-size: 0.95rem;
  font-weight: 500;
  text-decoration: none;
  letter-spacing: 0.01em;
  transition: color 0.2s ease, letter-spacing 0.2s ease;
}

.link-column a:hover {
  color: #ffffff;
  letter-spacing: 0.04em;
}

/* Footer bottom bar */
.footer-bottom {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-top: 2.2rem;
  font-family: var(--font-body);
  font-size: 0.9rem;
  font-weight: 500;
  color: #9898b0;
  letter-spacing: 0.01em;
}

.built-with {
  display: flex;
  align-items: center;
  gap: 0.4rem;
  color: #9898b0;
}

.heart-icon {
  color: var(--primary-red);
  filter: drop-shadow(0 0 5px rgba(255, 0, 43, 0.7));
}

@media (max-width: 850px) {
  .footer-top {
    grid-template-columns: 1fr;
    gap: 3rem;
  }
  .footer-links-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 500px) {
  .footer-links-grid {
    grid-template-columns: 1fr;
  }
  .footer-bottom {
    flex-direction: column;
    gap: 0.8rem;
    text-align: center;
  }
}
</style>
