<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { X, Sparkles, DollarSign, HelpCircle, Mail, ChevronRight, Instagram, Facebook, Youtube, Gamepad2, Tag, FileText, Camera, Phone } from 'lucide-vue-next'
import siteConfig from '../config/siteConfig.js'

const router = useRouter()
const route = useRoute()

const isCurtainOpen = ref(false)
const isScrolled = ref(false)

const menuItems = [
  { id: 'hero', name: 'Home', subtitle: 'Main Showcase', icon: Sparkles, type: 'hash', hash: 'hero', num: '01' },
  { id: 'pricing-page', name: 'Prices', subtitle: 'Official Rates & Add-ons', icon: DollarSign, type: 'route', path: '/pricing', num: '02' },
  { id: 'faq', name: 'FAQ', subtitle: 'Frequently Asked Questions', icon: HelpCircle, type: 'hash', hash: 'faq', num: '03' },
  { id: 'policies-page', name: 'Our Policies', subtitle: 'Cancellation & Guidelines', icon: FileText, type: 'route', path: '/policies', num: '04' },
  { id: 'prices', name: 'Our Fleet', subtitle: 'Gaming Trucks', icon: Sparkles, type: 'hash', hash: 'prices', num: '05' },
  { id: 'gallery', name: 'Live Gallery', subtitle: 'Real Party Photos', icon: Camera, type: 'hash', hash: 'gallery', num: '06' },
  { id: 'contact-page', name: 'Contact Us', subtitle: 'Direct Dispatch & Custom Quotes', icon: Mail, type: 'route', path: '/contact', num: '07' },
]

const handleScroll = () => {
  isScrolled.value = window.scrollY > 60
}

const toggleCurtain = () => {
  isCurtainOpen.value = !isCurtainOpen.value
  if (isCurtainOpen.value) {
    document.body.style.overflow = 'hidden'
  } else {
    document.body.style.overflow = ''
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
  if (isCurtainOpen.value) toggleCurtain()
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
  document.body.style.overflow = ''
})
</script>

<template>
  <header class="navbar-top-bar">
    <div class="top-bar-content">
      <!-- Left Slot: Desktop = Start Your Request CTA | Mobile = Brand Logo -->
      <div class="header-left">
        <!-- Desktop CTA -->
        <button class="btn-tech-red desktop-only" @click="navigateToContact">
          <span>START YOUR REQUEST</span>
          <ChevronRight :size="14" class="btn-icon" />
        </button>

        <!-- Mobile Brand Logo (Left aligned, clean inside navbar) -->
        <a href="/" class="mobile-brand-logo mobile-only" @click="navigateHome" aria-label="Home">
          <img src="/logo.png" alt="ULTIMATE PLAYERS" class="mobile-logo-img" />
        </a>
      </div>

      <!-- Center Slot: Desktop Logo Image + Subtext inside trapezoid notch -->
      <div class="header-center desktop-only">
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

      <!-- Right Slot: Desktop (Social Icons + Phone) | Mobile & Desktop (Hamburger Menu Trigger) -->
      <div class="header-right">
        <div class="social-icons-bar desktop-only">
          <a :href="siteConfig.socials.instagram" target="_blank" rel="noopener" class="social-circle" title="Instagram"><Instagram :size="22" /></a>
          <a :href="siteConfig.socials.facebook" target="_blank" rel="noopener" class="social-circle" title="Facebook"><Facebook :size="22" /></a>
          <a :href="siteConfig.socials.tiktok" target="_blank" rel="noopener" class="social-circle" title="TikTok">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
              <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 1 1-5.2-1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V5.86a6.37 6.37 0 0 0-1-.08A6.34 6.34 0 1 0 15.82 12V8.9a8.28 8.28 0 0 0 4.77 1.52V7a4.81 4.81 0 0 1-1-.31z"/>
            </svg>
          </a>
          <a :href="siteConfig.socials.youtube" target="_blank" rel="noopener" class="social-circle" title="YouTube"><Youtube :size="22" /></a>
        </div>

        <div class="header-divider desktop-only"></div>

        <a :href="siteConfig.phoneTel" class="phone-link desktop-only">
          <Phone :size="20" class="phone-icon text-red" />
          <span class="phone-number">{{ siteConfig.phone }}</span>
        </a>

        <!-- Hamburger button (visible on all breakpoints) -->
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

    <!-- Drawer Overlay -->
    <transition name="drawer-slide">
      <div v-if="isCurtainOpen" class="drawer-overlay" @click.self="toggleCurtain">
        <!-- Drawer Panel sliding from right -->
        <div class="drawer-panel">
          <!-- Subtle grid texture -->
          <div class="cyber-grid-pattern"></div>

          <!-- Close button: top-right inside panel -->
          <button class="close-drawer-btn" @click="toggleCurtain" aria-label="Close menu">
            <X :size="20" />
          </button>

          <!-- Brand -->
          <div class="drawer-brand">
            <img src="/logo.png" alt="ULTIMATE PLAYERS" class="drawer-logo" />
          </div>

          <!-- Vertical numbered menu list -->
          <nav class="drawer-nav">
            <div class="drawer-rule"></div>

            <a
              v-for="(item, index) in menuItems"
              :key="item.id"
              href="javascript:void(0)"
              class="drawer-link"
              :style="{ '--delay': `${index * 0.06}s` }"
              @click="navigateToItem(item)"
            >
              <span class="link-idx">{{ item.num }}</span>
              <div class="link-body">
                <span class="link-name">{{ item.name }}</span>
                <span class="link-sub">{{ item.subtitle }}</span>
              </div>
              <span class="link-chevron">›</span>
            </a>
          </nav>

          <!-- Divider -->
          <div class="drawer-divider"></div>

          <!-- Call or Text CTA -->
          <div class="drawer-cta-section">
            <a :href="siteConfig.phoneTel" class="drawer-call-btn">
              <Phone :size="18" />
              <div class="drawer-call-text">
                <span class="call-label">CALL OR TEXT</span>
                <span class="call-number">{{ siteConfig.phone }}</span>
              </div>
            </a>
            <button class="drawer-request-btn" @click="navigateToContact">
              START YOUR REQUEST →
            </button>
          </div>

          <!-- Social Links -->
          <div class="drawer-socials">
            <a :href="siteConfig.socials.instagram" target="_blank" rel="noopener" class="drawer-social" title="Instagram"><Instagram :size="18" /></a>
            <a :href="siteConfig.socials.facebook" target="_blank" rel="noopener" class="drawer-social" title="Facebook"><Facebook :size="18" /></a>
            <a :href="siteConfig.socials.tiktok" target="_blank" rel="noopener" class="drawer-social" title="TikTok">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 1 1-5.2-1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V5.86a6.37 6.37 0 0 0-1-.08A6.34 6.34 0 1 0 15.82 12V8.9a8.28 8.28 0 0 0 4.77 1.52V7a4.81 4.81 0 0 1-1-.31z"/>
              </svg>
            </a>
            <a :href="siteConfig.socials.youtube" target="_blank" rel="noopener" class="drawer-social" title="YouTube"><Youtube :size="18" /></a>
          </div>

          <!-- Bottom status -->
          <div class="drawer-status">
            <span class="pulse-dot"></span>
            <span>SYSTEM ONLINE</span>
          </div>
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

/* ── Desktop CTA ── */
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

/* ── Mobile Call Button ── */
.mobile-call-btn {
  display: none;
  align-items: center;
  gap: 0.4rem;
  font-family: var(--font-heading);
  font-weight: 900;
  font-size: 0.8rem;
  letter-spacing: 0.12em;
  color: #ffffff;
  background: rgba(255, 0, 43, 0.15);
  border: 1.5px solid rgba(255, 0, 43, 0.55);
  padding: 0.45rem 0.9rem;
  border-radius: 4px;
  text-decoration: none;
  transition: all 0.25s ease;
}

.mobile-call-btn:hover {
  background: #ff002b;
  border-color: #ff002b;
  box-shadow: 0 0 16px rgba(255, 0, 43, 0.7);
}

/* ── Center Logo ── */
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

/* ── Right Section ── */
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
  gap: 0.85rem;
}

.social-circle {
  width: 44px;
  height: 44px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.08);
  border: 1.5px solid rgba(255, 255, 255, 0.55);
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
  box-shadow: 0 0 18px rgba(255, 0, 43, 0.85);
  transform: translateY(-2px);
}

.header-divider {
  width: 1px;
  height: 24px;
  background-color: rgba(255, 255, 255, 0.3);
  margin: 0 0.5rem;
}

.phone-link {
  display: inline-flex;
  align-items: center;
  gap: 0.6rem;
  text-decoration: none;
  font-family: var(--font-heading);
  font-weight: 900;
  font-size: 1.15rem;
  letter-spacing: 0.04em;
  color: #ffffff;
  background: rgba(255, 0, 43, 0.12);
  border: 1.5px solid rgba(255, 0, 43, 0.45);
  padding: 0.45rem 1rem;
  border-radius: 4px;
  box-shadow: 0 0 16px rgba(255, 0, 43, 0.25);
  transition: all 0.25s ease;
}

.phone-link:hover {
  background: #ff002b;
  border-color: #ff002b;
  color: #ffffff;
  box-shadow: 0 0 24px rgba(255, 0, 43, 0.75);
  transform: translateY(-1px);
}

.phone-icon {
  color: #ff002b;
  fill: #ff002b;
  transition: all 0.25s ease;
}

.phone-link:hover .phone-icon {
  color: #ffffff;
  fill: #ffffff;
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
   DRAWER OVERLAY — App-like slide from right
   ============================================================ */
.drawer-slide-enter-active,
.drawer-slide-leave-active {
  transition: opacity 0.3s ease;
}

.drawer-slide-enter-from,
.drawer-slide-leave-to {
  opacity: 0;
}

.drawer-slide-enter-active .drawer-panel,
.drawer-slide-leave-active .drawer-panel {
  transition: transform 0.32s cubic-bezier(0.16, 1, 0.3, 1);
}

.drawer-slide-enter-from .drawer-panel,
.drawer-slide-leave-to .drawer-panel {
  transform: translateX(100%);
}

/* Full-screen dimmed backdrop */
.drawer-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.65);
  z-index: 9998;
  display: flex;
  justify-content: flex-end;
}

/* The actual panel */
.drawer-panel {
  position: relative;
  width: min(420px, 90vw);
  height: 100%;
  background: #060608;
  border-left: 1px solid rgba(255, 0, 43, 0.35);
  display: flex;
  flex-direction: column;
  overflow-y: auto;
  -webkit-overflow-scrolling: touch;
  padding: 5rem 0 2rem;
  z-index: 9999;
  box-shadow: -20px 0 60px rgba(0, 0, 0, 0.95);
}

/* Subtle grid texture */
.cyber-grid-pattern {
  position: fixed;
  inset: 0;
  background-image:
    linear-gradient(rgba(255, 255, 255, 0.02) 1px, transparent 1px),
    linear-gradient(90deg, rgba(255, 255, 255, 0.02) 1px, transparent 1px);
  background-size: 60px 60px;
  pointer-events: none;
  z-index: 0;
}

/* Close button — top-right corner inside panel */
.close-drawer-btn {
  position: absolute;
  top: 1.4rem;
  right: 1.4rem;
  z-index: 10;
  background: rgba(255, 255, 255, 0.06);
  border: 1px solid rgba(255, 255, 255, 0.18);
  color: #ffffff;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s ease;
}

.close-drawer-btn:hover {
  border-color: #ff002b;
  color: #ff002b;
  background: rgba(255, 0, 43, 0.12);
  transform: rotate(90deg);
}

/* Drawer brand logo */
.drawer-brand {
  display: flex;
  justify-content: center;
  padding: 0 1.5rem 1.2rem;
  position: relative;
  z-index: 2;
}

.drawer-logo {
  height: 70px;
  width: auto;
  object-fit: contain;
}

/* Navigation container */
.drawer-nav {
  position: relative;
  z-index: 2;
  display: flex;
  flex-direction: column;
  padding: 0 1.8rem;
  gap: 0;
  flex-grow: 1;
}

/* Left vertical red rule */
.drawer-rule {
  position: absolute;
  left: 1.35rem;
  top: 0;
  bottom: 0;
  width: 2px;
  background: linear-gradient(180deg, transparent 0%, #ff002b 20%, #ff002b 80%, transparent 100%);
  opacity: 0.4;
}

/* Each menu row */
.drawer-link {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: clamp(0.7rem, 1.5vh, 1rem) 0;
  border-bottom: 1px solid rgba(255, 255, 255, 0.05);
  text-decoration: none;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  transition: padding-left 0.3s ease;
  animation: link-slide-in 0.4s ease both;
  animation-delay: var(--delay, 0s);
}

@keyframes link-slide-in {
  from { opacity: 0; transform: translateX(30px); }
  to   { opacity: 1; transform: translateX(0); }
}

.drawer-link::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  width: 0;
  height: 1.5px;
  background: #ff002b;
  transition: width 0.35s ease;
}

.drawer-link:hover::after {
  width: 100%;
}

.drawer-link:hover {
  padding-left: 0.5rem;
}

/* Number */
.link-idx {
  font-family: var(--font-heading);
  font-size: 1rem;
  font-weight: 900;
  color: rgba(255, 0, 43, 0.5);
  letter-spacing: 0.06em;
  min-width: 2rem;
  transition: color 0.25s ease;
  flex-shrink: 0;
}

.drawer-link:hover .link-idx {
  color: #ff002b;
  text-shadow: 0 0 12px rgba(255, 0, 43, 0.6);
}

/* Main text body */
.link-body {
  display: flex;
  flex-direction: column;
  gap: 0.05rem;
  flex-grow: 1;
}

.link-name {
  font-family: var(--font-heading);
  font-size: clamp(1.1rem, 4vw, 1.5rem);
  font-weight: 900;
  color: #ffffff;
  line-height: 1.1;
  letter-spacing: 0.02em;
  text-transform: uppercase;
  transition: color 0.25s ease;
}

.link-sub {
  font-family: var(--font-body);
  font-size: 0.65rem;
  font-weight: 600;
  letter-spacing: 0.12em;
  color: rgba(255, 255, 255, 0.3);
  text-transform: uppercase;
  transition: color 0.25s ease;
}

.drawer-link:hover .link-sub {
  color: rgba(255, 0, 43, 0.65);
}

/* Chevron arrow */
.link-chevron {
  font-size: 1.8rem;
  color: rgba(255, 255, 255, 0.1);
  font-style: normal;
  flex-shrink: 0;
  transform: translateX(-6px);
  opacity: 0;
  transition: all 0.3s ease;
  align-self: center;
  line-height: 1;
}

.drawer-link:hover .link-chevron {
  opacity: 1;
  transform: translateX(0);
  color: #ff002b;
}

/* Drawer divider */
.drawer-divider {
  height: 1px;
  background: rgba(255, 255, 255, 0.08);
  margin: 1rem 1.8rem;
  position: relative;
  z-index: 2;
}

/* CTA Section */
.drawer-cta-section {
  padding: 0 1.8rem;
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
  position: relative;
  z-index: 2;
}

.drawer-call-btn {
  display: flex;
  align-items: center;
  gap: 0.85rem;
  background: rgba(255, 0, 43, 0.1);
  border: 1.5px solid rgba(255, 0, 43, 0.4);
  border-radius: 6px;
  padding: 0.85rem 1.1rem;
  text-decoration: none;
  transition: all 0.25s ease;
  color: #ffffff;
}

.drawer-call-btn:hover {
  background: rgba(255, 0, 43, 0.2);
  border-color: #ff002b;
  box-shadow: 0 0 20px rgba(255, 0, 43, 0.4);
}

.drawer-call-text {
  display: flex;
  flex-direction: column;
  gap: 0.1rem;
}

.call-label {
  font-family: var(--font-heading);
  font-size: 0.65rem;
  font-weight: 900;
  letter-spacing: 0.2em;
  color: #ff002b;
}

.call-number {
  font-family: var(--font-heading);
  font-size: 1.1rem;
  font-weight: 900;
  letter-spacing: 0.04em;
  color: #ffffff;
}

.drawer-request-btn {
  font-family: var(--font-heading);
  font-weight: 900;
  font-size: 0.82rem;
  letter-spacing: 0.1em;
  padding: 1rem 1.4rem;
  background: #ff002b;
  color: #ffffff;
  border: none;
  cursor: pointer;
  transition: all 0.25s ease;
  clip-path: polygon(7px 0, 100% 0, 100% calc(100% - 7px), calc(100% - 7px) 100%, 0 100%, 0 7px);
}

.drawer-request-btn:hover {
  background: #d60024;
  box-shadow: 0 0 25px rgba(255, 0, 43, 0.7);
  transform: translateY(-2px);
}

/* Social Links */
.drawer-socials {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 1rem 1.8rem 0;
  position: relative;
  z-index: 2;
}

.drawer-social {
  width: 38px;
  height: 38px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.12);
  display: flex;
  align-items: center;
  justify-content: center;
  color: #ffffff;
  text-decoration: none;
  transition: all 0.25s ease;
}

.drawer-social:hover {
  background: #ff002b;
  border-color: #ff002b;
  box-shadow: 0 0 14px rgba(255, 0, 43, 0.6);
  transform: translateY(-2px);
}

/* Bottom status */
.drawer-status {
  display: flex;
  align-items: center;
  gap: 0.6rem;
  padding: 1rem 1.8rem 0;
  font-family: var(--font-heading);
  font-size: 0.6rem;
  font-weight: 700;
  letter-spacing: 0.2em;
  color: rgba(255, 0, 43, 0.55);
  position: relative;
  z-index: 2;
}

.pulse-dot {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: #ff002b;
  animation: pulse-dot 1.6s ease-in-out infinite;
  display: inline-block;
  flex-shrink: 0;
}

@keyframes pulse-dot {
  0%, 100% { opacity: 1; box-shadow: 0 0 0 0 rgba(255,0,43,0.4); }
  50%       { opacity: 0.7; box-shadow: 0 0 0 5px rgba(255,0,43,0); }
}

/* ============================================================
   RESPONSIVE HELPERS
   ============================================================ */
/* ============================================================
   RESPONSIVE HELPERS & MOBILE FIXED TOOLBAR
   ============================================================ */
.desktop-only {
  display: flex;
}

.mobile-only {
  display: none !important; /* !important needed so component-level .mobile-brand-logo
                              { display:flex } doesn't override the desktop hide */
}

/* Mobile Brand Logo in header-left */
.mobile-brand-logo {
  display: flex;
  align-items: center;
  text-decoration: none;
  max-height: 42px;
}

.mobile-logo-img {
  height: 38px;
  max-height: 38px;
  width: auto;
  object-fit: contain;
  filter: drop-shadow(0 0 8px rgba(255, 0, 43, 0.3));
  transition: transform 0.2s ease;
}

.mobile-brand-logo:active .mobile-logo-img {
  transform: scale(0.96);
}

/* Base header-left / header-right z-indexes */
.header-left {
  position: relative;
  z-index: 25;
}

.header-right {
  position: relative;
  z-index: 25;
}

/* Tablet (≤992px) */
@media (max-width: 992px) {
  .desktop-only {
    display: none !important;
  }
  
  .mobile-only {
    display: flex !important;
  }
  
  .top-bar-content {
    padding: 0 1.2rem;
    height: 66px;
    justify-content: space-between;
  }
  
  .header-left {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: flex-start;
  }

  .header-right {
    flex: 0 0 auto;
    display: flex;
    align-items: center;
    justify-content: flex-end;
  }

  .mobile-logo-img {
    height: 48px;
    max-height: 50px;
    width: auto;
    object-fit: contain;
  }
  
  .hamburger-trigger {
    width: 44px;
    height: 44px;
    background: rgba(18, 18, 24, 0.9);
    border: 1.5px solid rgba(255, 0, 43, 0.7);
    box-shadow: 0 0 14px rgba(255, 0, 43, 0.35);
    border-radius: 6px;
    display: flex !important;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
  }
  
  .hamburger-lines {
    width: 22px;
    height: 16px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }

  .line {
    height: 2.5px;
    width: 100%;
    background-color: #ffffff;
    border-radius: 2px;
    display: block;
    flex-shrink: 0;
  }
}

/* Mobile (≤768px): Left prominent logo (48px) + Right glowing hamburger button */
@media (max-width: 768px) {
  .desktop-only {
    display: none !important;
  }

  .mobile-only {
    display: flex !important;
  }
  
  .top-bar-content {
    height: 66px;
    padding: 0 1rem;
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
  }
  
  .header-left {
    flex: 1 1 auto;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    min-width: 0;
    z-index: 30;
  }
  
  .header-right {
    flex: 0 0 auto;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    z-index: 30;
    margin-left: 0.5rem;
  }
  
  .mobile-brand-logo {
    display: inline-flex;
    align-items: center;
    text-decoration: none;
    max-height: 52px;
  }

  .mobile-logo-img {
    height: 48px;
    max-height: 50px;
    width: auto;
    object-fit: contain;
    filter: drop-shadow(0 0 10px rgba(255, 0, 43, 0.45));
  }
  
  .hamburger-trigger {
    width: 44px;
    height: 44px;
    background: rgba(18, 18, 24, 0.95);
    border: 1.5px solid rgba(255, 0, 43, 0.75);
    border-radius: 6px;
    box-shadow: 0 0 14px rgba(255, 0, 43, 0.4);
    display: flex !important;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
    cursor: pointer;
  }
  
  .hamburger-trigger:active {
    background: rgba(255, 0, 43, 0.3);
    border-color: #ff002b;
    box-shadow: 0 0 20px rgba(255, 0, 43, 0.8);
    transform: scale(0.96);
  }
  
  .hamburger-lines {
    width: 22px;
    height: 16px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }

  .line {
    height: 2.5px;
    width: 100%;
    background-color: #ffffff;
    border-radius: 2px;
    display: block;
    flex-shrink: 0;
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  }

  .hamburger-trigger.active .line-1 {
    transform: translateY(6.5px) rotate(45deg);
    background-color: #ff002b;
  }

  .hamburger-trigger.active .line-2 {
    opacity: 0;
    transform: scaleX(0);
  }

  .hamburger-trigger.active .line-3 {
    transform: translateY(-6.5px) rotate(-45deg);
    background-color: #ff002b;
  }
}
</style>
