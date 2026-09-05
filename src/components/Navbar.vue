<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { X, Sparkles, DollarSign, HelpCircle, Mail, ChevronRight, Instagram, Facebook, Youtube, Gamepad2, Tag } from 'lucide-vue-next'
import siteConfig from '../config/siteConfig.js'

const router = useRouter()
const route = useRoute()

const isCurtainOpen = ref(false)
const isScrolled = ref(false)

const menuItems = [
  { id: 'hero', name: 'Home', subtitle: 'Main Showcase', icon: Sparkles, type: 'hash', hash: 'hero' },
  { id: 'pricing-page', name: 'Pricing & Packages', subtitle: 'Official Rates & Add-ons', icon: DollarSign, type: 'route', path: '/pricing' },
  { id: 'prices', name: 'Our Fleet', subtitle: 'Gaming Trucks', icon: Sparkles, type: 'hash', hash: 'prices' },
  { id: 'events', name: 'Events We Host', subtitle: 'Birthdays & Special Occasions', icon: Sparkles, type: 'hash', hash: 'events' },
  { id: 'games', name: 'Our Games', subtitle: 'Fortnite, Racing, Sports & FPS', icon: Gamepad2, type: 'hash', hash: 'games' },
  { id: 'faq', name: 'FAQ', subtitle: 'Frequently Asked Questions', icon: HelpCircle, type: 'hash', hash: 'faq' },
  { id: 'contact', name: 'Contact Us', subtitle: 'Book Your Truck', icon: Mail, type: 'hash', hash: 'contact' },
]

const handleScroll = () => {
  isScrolled.value = window.scrollY > 60
}

const toggleCurtain = () => {
  isCurtainOpen.value = !isCurtainOpen.value
  if (isCurtainOpen.value) {
    document.body.style.overflow = 'hidden'
  } else {
    document.body.style.overflow = 'auto'
  }
}

const navigateToItem = (item) => {
  if (isCurtainOpen.value) {
    toggleCurtain()
  }

  if (item.type === 'route') {
    router.push(item.path)
    return
  }

  if (route.path !== '/') {
    router.push({ path: '/', hash: `#${item.hash}` })
  } else {
    const el = document.getElementById(item.hash)
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' })
    }
  }
}

const navigateToContact = () => {
  if (route.path !== '/') {
    router.push({ path: '/', hash: '#contact' })
  } else {
    const el = document.getElementById('contact')
    if (el) el.scrollIntoView({ behavior: 'smooth' })
  }
}

const navigateHome = (e) => {
  e.preventDefault()
  if (route.path !== '/') {
    router.push('/')
  } else {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll, { passive: true })
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})
</script>

<template>
  <header class="navbar-top-bar">
    <div class="top-bar-content">
      <!-- Left Slot: INQUIRE NOW > Button -->
      <div class="header-left">
        <button class="btn-tech-red" @click="navigateToContact">
          <span>INQUIRE NOW</span>
          <ChevronRight :size="14" class="btn-icon" />
        </button>
      </div>

      <!-- Center Slot: Logo Image + Subtext inside trapezoid notch -->
      <div class="header-center">
        <div class="center-hud-notch">
          <a href="/" class="brand-logo-group" @click="navigateHome">
            <img src="/logo.png" alt="ULTIMATE PLAYERS Logo" class="logo-center-img" />
            <div class="logo-subtext-group" :class="{ hidden: isScrolled || route.path !== '/' }">
              <span class="subtext-location">{{ siteConfig.location }}</span>
              <span class="subtext-service">{{ siteConfig.serviceType }}</span>
            </div>
          </a>
        </div>
      </div>

      <!-- Right Slot: Social Icons + Separator + Phone + Hamburger Icon -->
      <div class="header-right">
        <div class="social-icons-bar desktop-only">
          <a :href="siteConfig.socials.instagram" target="_blank" rel="noopener" class="social-circle" title="Instagram"><Instagram :size="20" /></a>
          <a :href="siteConfig.socials.facebook" target="_blank" rel="noopener" class="social-circle" title="Facebook"><Facebook :size="20" /></a>
          <a :href="siteConfig.socials.tiktok" target="_blank" rel="noopener" class="social-circle" title="TikTok">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
              <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 1 1-5.2-1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V5.86a6.37 6.37 0 0 0-1-.08A6.34 6.34 0 1 0 15.82 12V8.9a8.28 8.28 0 0 0 4.77 1.52V7a4.81 4.81 0 0 1-1-.31z"/>
            </svg>
          </a>
          <a :href="siteConfig.socials.youtube" target="_blank" rel="noopener" class="social-circle" title="YouTube"><Youtube :size="20" /></a>
        </div>

        <div class="header-divider desktop-only"></div>

        <a :href="siteConfig.phoneTel" class="phone-link desktop-only">
          <Phone :size="16" class="phone-icon text-red" />
          <span class="phone-number">{{ siteConfig.phone }}</span>
        </a>

        <button 
          class="hamburger-trigger"
          :class="{ active: isCurtainOpen }"
          @click="toggleCurtain"
          aria-label="Toggle Navigation Menu"
        >
          <div class="hamburger-lines">
            <span class="line line-1"></span>
            <span class="line line-2"></span>
            <span class="line line-3"></span>
          </div>
        </button>
      </div>
    </div>

    <!-- Fullscreen Curtain Overlay -->
    <transition name="curtain-slide">
      <div v-if="isCurtainOpen" class="curtain-overlay">
        <!-- Subtle cyber grid -->
        <div class="cyber-grid-pattern"></div>

        <!-- Single close button: top-right corner -->
        <button class="close-curtain-btn" @click="toggleCurtain" aria-label="Close menu">
          <X :size="22" />
        </button>

        <!-- Vertical numbered menu list -->
        <nav class="curtain-nav">
          <!-- Vertical red left rule -->
          <div class="curtain-rule"></div>

          <a
            v-for="(item, index) in menuItems"
            :key="item.id"
            href="javascript:void(0)"
            class="curtain-link"
            :style="{ '--delay': `${index * 0.07}s` }"
            @click="navigateToItem(item)"
          >
            <span class="link-idx">{{ String(index + 1).padStart(2, '0') }}</span>
            <div class="link-body">
              <span class="link-name">{{ item.name }}</span>
              <span class="link-sub">{{ item.subtitle }}</span>
            </div>
            <span class="link-chevron">&#8250;</span>
          </a>
        </nav>

        <!-- Bottom status bar -->
        <div class="curtain-status">
          <span class="status-brand">ULTIMATE PLAYERS</span>
          <span class="status-sep">—</span>
          <span class="status-live"><span class="pulse-dot"></span>SYSTEM ONLINE</span>
        </div>
      </div>
    </transition>
  </header>
</template>

<style scoped>
.navbar-top-bar {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  background-color: #000000;
  z-index: 1000;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
}

.top-bar-content {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 1.5rem;
  width: 100%;
  height: 80px;
  position: relative;
}

.header-left {
  display: flex;
  align-items: center;
  flex: 1;
}

.btn-tech-red {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  font-family: var(--font-heading);
  font-weight: 800;
  font-size: 0.85rem;
  letter-spacing: 0.08em;
  padding: 0.6rem 1.3rem;
  background: #000000;
  color: #ffffff;
  border: 1.5px solid #ff002b;
  box-shadow: 0 0 14px rgba(255, 0, 43, 0.45);
  cursor: pointer;
  transition: all 0.3s ease;
  clip-path: polygon(7px 0, 100% 0, 100% calc(100% - 7px), calc(100% - 7px) 100%, 0 100%, 0 7px);
}

.btn-tech-red .btn-icon {
  color: #ff002b;
  transition: transform 0.2s ease;
}

.btn-tech-red:hover {
  background: #ff002b;
  box-shadow: 0 0 22px rgba(255, 0, 43, 0.85);
}

.btn-tech-red:hover .btn-icon {
  color: #ffffff;
  transform: translateX(3px);
}

.header-center {
  display: flex;
  align-items: flex-start;
  justify-content: center;
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  top: 0;
  z-index: 10;
}

.center-hud-notch {
  background: #000000;
  padding: 0.6rem 3.8rem 1rem 3.8rem;
  clip-path: polygon(0 0, 100% 0, calc(100% - 24px) 100%, 24px 100%);
  border-bottom: 2px solid rgba(255, 0, 43, 0.75);
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.98), 0 0 20px rgba(255, 0, 43, 0.3);
}

.brand-logo-group {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-decoration: none;
}

.logo-center-img {
  height: 105px;
  width: auto;
  object-fit: contain;
  transition: transform 0.3s ease;
  image-rendering: -webkit-optimize-contrast;
}

.curtain-logo {
  height: 120px;
}

.brand-logo-group:hover .logo-center-img {
  transform: scale(1.06);
}

.subtext-location {
  font-size: 0.85rem;
  font-weight: 900;
  letter-spacing: 0.22em;
  color: #ffffff;
  line-height: 1.1;
}

.subtext-service {
  font-size: 0.68rem;
  font-weight: 700;
  letter-spacing: 0.2em;
  color: #b0b0bb;
  line-height: 1.1;
  margin-top: 3px;
}

/* Subtext hide on scroll — smooth fade + collapse */
.logo-subtext-group {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 0.3rem;
  font-family: var(--font-heading);
  max-height: 40px;
  opacity: 1;
  overflow: hidden;
  transition:
    max-height 0.35s cubic-bezier(0.4, 0, 0.2, 1),
    opacity 0.25s ease,
    margin-top 0.35s ease;
}

.logo-subtext-group.hidden {
  max-height: 0;
  opacity: 0;
  margin-top: 0;
  pointer-events: none;
}

.header-right {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 1.2rem;
  flex: 1;
}

.social-icons-bar {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.social-circle {
  width: 38px;
  height: 38px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.05);
  border: 1.5px solid rgba(255, 255, 255, 0.45);
  display: flex;
  align-items: center;
  justify-content: center;
  color: #ffffff;
  text-decoration: none;
  transition: all 0.25s ease;
}

.social-circle:hover {
  background: #ff002b;
  border-color: #ff002b;
  box-shadow: 0 0 14px rgba(255, 0, 43, 0.75);
  transform: translateY(-2px);
}

.header-divider {
  width: 1px;
  height: 18px;
  background-color: rgba(255, 255, 255, 0.25);
  margin: 0 0.3rem;
}

.phone-link {
  display: flex;
  align-items: center;
  gap: 0.4rem;
  text-decoration: none;
  font-family: var(--font-heading);
  font-weight: 800;
  font-size: 0.88rem;
  color: #ffffff;
  transition: color 0.2s ease;
}

.phone-link:hover {
  color: #ff002b;
}

.phone-icon {
  color: #ff002b;
  fill: #ff002b;
}

.hamburger-trigger {
  background: none;
  border: none;
  cursor: pointer;
  padding: 0.4rem;
  display: flex;
  align-items: center;
  justify-content: center;
}

.hamburger-lines {
  display: flex;
  flex-direction: column;
  gap: 4px;
  width: 26px;
}

.line {
  height: 2px;
  background-color: #ffffff;
  border-radius: 2px;
  transition: all 0.3s ease;
}

.line-1 { width: 100%; }
.line-2 { width: 100%; }
.line-3 { width: 100%; }

.hamburger-trigger:hover .line {
  background-color: #ff002b;
}

.hamburger-trigger.active .line-1 {
  transform: translateY(7px) rotate(45deg);
}

.hamburger-trigger.active .line-2 {
  opacity: 0;
}

.hamburger-trigger.active .line-3 {
  transform: translateY(-7px) rotate(-45deg);
}

/* ============================================================
   CURTAIN OVERLAY — GAMER FULLSCREEN MENU
   ============================================================ */
.curtain-overlay {
  position: fixed;
  inset: 0;
  width: 100vw;
  height: 100vh;
  background: #000000;
  z-index: 9999;
  display: flex;
  flex-direction: column;
  justify-content: center;
  overflow: hidden;
}

/* Subtle grid texture */
.cyber-grid-pattern {
  position: absolute;
  inset: 0;
  background-image:
    linear-gradient(rgba(255, 255, 255, 0.025) 1px, transparent 1px),
    linear-gradient(90deg, rgba(255, 255, 255, 0.025) 1px, transparent 1px);
  background-size: 60px 60px;
  pointer-events: none;
  z-index: 0;
}

/* Close button — fixed top-right */
.close-curtain-btn {
  position: absolute;
  top: 2rem;
  right: 2.2rem;
  z-index: 10;
  background: transparent;
  border: 1.5px solid rgba(255, 255, 255, 0.2);
  color: #ffffff;
  width: 44px;
  height: 44px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s ease;
}

.close-curtain-btn:hover {
  border-color: #ff002b;
  color: #ff002b;
  background: rgba(255, 0, 43, 0.1);
  box-shadow: 0 0 20px rgba(255, 0, 43, 0.4);
  transform: rotate(90deg);
}

/* Navigation container */
.curtain-nav {
  position: relative;
  z-index: 2;
  display: flex;
  flex-direction: column;
  padding: 0 8vw;
  gap: 0;
}

/* Left vertical red rule */
.curtain-rule {
  position: absolute;
  left: 6.5vw;
  top: 0;
  bottom: 0;
  width: 2px;
  background: linear-gradient(180deg, transparent 0%, #ff002b 20%, #ff002b 80%, transparent 100%);
  opacity: 0.5;
}

/* Each menu row */
.curtain-link {
  display: flex;
  align-items: baseline;
  gap: 2rem;
  padding: 1.1rem 0;
  border-bottom: 1px solid rgba(255, 255, 255, 0.06);
  text-decoration: none;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  transition: padding-left 0.3s ease;

  /* Stagger-in animation */
  animation: link-slide-in 0.5s ease both;
  animation-delay: var(--delay, 0s);
}

@keyframes link-slide-in {
  from {
    opacity: 0;
    transform: translateX(-40px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

/* Red underline sweep on hover */
.curtain-link::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  width: 0;
  height: 1.5px;
  background: #ff002b;
  transition: width 0.35s ease;
}

.curtain-link:hover::after {
  width: 100%;
}

.curtain-link:hover {
  padding-left: 0.6rem;
}

/* Number  —  big, faded red */
.link-idx {
  font-family: var(--font-heading);
  font-size: clamp(1rem, 2vw, 1.3rem);
  font-weight: 900;
  color: rgba(255, 0, 43, 0.55);
  letter-spacing: 0.08em;
  min-width: 3rem;
  transition: color 0.25s ease;
  flex-shrink: 0;
}

.curtain-link:hover .link-idx {
  color: #ff002b;
  text-shadow: 0 0 12px rgba(255, 0, 43, 0.6);
}

/* Main text body */
.link-body {
  display: flex;
  flex-direction: column;
  gap: 0.1rem;
  flex-grow: 1;
}

/* Section name — HUGE */
.link-name {
  font-family: var(--font-heading);
  font-size: clamp(2rem, 5vw, 3.8rem);
  font-weight: 900;
  color: #ffffff;
  line-height: 1;
  letter-spacing: -0.02em;
  text-transform: uppercase;
  transition: color 0.25s ease, text-shadow 0.25s ease;
}

.curtain-link:hover .link-name {
  color: #ffffff;
  text-shadow: 0 0 40px rgba(255, 255, 255, 0.12);
}

/* Subtitle */
.link-sub {
  font-family: var(--font-body);
  font-size: 0.7rem;
  font-weight: 600;
  letter-spacing: 0.2em;
  color: rgba(255, 255, 255, 0.3);
  text-transform: uppercase;
  transition: color 0.25s ease;
}

.curtain-link:hover .link-sub {
  color: rgba(255, 0, 43, 0.75);
}

/* Chevron arrow */
.link-chevron {
  font-size: 2rem;
  color: rgba(255, 255, 255, 0.12);
  font-style: normal;
  flex-shrink: 0;
  transform: translateX(-8px);
  opacity: 0;
  transition: all 0.3s ease;
  align-self: center;
}

.curtain-link:hover .link-chevron {
  opacity: 1;
  transform: translateX(0);
  color: #ff002b;
}

/* Bottom status bar */
.curtain-status {
  position: absolute;
  bottom: 1.8rem;
  left: 8vw;
  right: 8vw;
  z-index: 2;
  display: flex;
  align-items: center;
  gap: 1rem;
  font-family: var(--font-heading);
  font-size: 0.65rem;
  font-weight: 700;
  letter-spacing: 0.2em;
  color: rgba(255, 255, 255, 0.22);
}

.status-sep {
  color: rgba(255, 0, 43, 0.4);
}

.status-live {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: rgba(255, 0, 43, 0.65);
}

.pulse-dot {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: #ff002b;
  animation: pulse-dot 1.6s ease-in-out infinite;
  display: inline-block;
}

@keyframes pulse-dot {
  0%, 100% { opacity: 1; box-shadow: 0 0 0 0 rgba(255,0,43,0.4); }
  50%       { opacity: 0.7; box-shadow: 0 0 0 5px rgba(255,0,43,0); }
}

/* Desktop-only elements */
.desktop-only {
  display: flex;
}

@media (max-width: 992px) {
  .desktop-only {
    display: none;
  }
  .top-bar-content {
    padding: 0.6rem 1rem;
  }
}
</style>
