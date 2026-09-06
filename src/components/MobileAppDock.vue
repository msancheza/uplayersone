<script setup>
import { ChevronRight, Phone, Instagram, Facebook, Youtube } from 'lucide-vue-next'
import { useRouter, useRoute } from 'vue-router'
import siteConfig from '../config/siteConfig.js'

const router = useRouter()
const route = useRoute()

const navigateToContact = () => {
  if (route.path !== '/') {
    router.push({ path: '/', hash: '#contact' })
  } else {
    const el = document.getElementById('contact')
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' })
    } else {
      router.push('/contact')
    }
  }
}
</script>

<template>
  <aside class="mobile-app-dock" aria-label="Mobile quick action dock">
    <!-- Row 1: 50% START REQUEST | 50% CALL US -->
    <div class="dock-row-1">
      <button class="dock-btn request-btn" @click="navigateToContact">
        <span class="btn-text">START REQUEST</span>
        <ChevronRight :size="15" class="btn-arr" />
      </button>

      <a :href="siteConfig.phoneTel" class="dock-btn call-btn">
        <Phone :size="15" class="phone-icn" />
        <span class="btn-text">CALL US</span>
      </a>
    </div>

    <!-- Row 2: Networks (Social Media Icons) -->
    <div class="dock-row-2">
      <span class="dock-networks-label">FOLLOW US:</span>
      <div class="dock-networks-icons">
        <a :href="siteConfig.socials.instagram" target="_blank" rel="noopener" class="dock-social-item" title="Instagram">
          <Instagram :size="18" />
        </a>
        <a :href="siteConfig.socials.facebook" target="_blank" rel="noopener" class="dock-social-item" title="Facebook">
          <Facebook :size="18" />
        </a>
        <a :href="siteConfig.socials.tiktok" target="_blank" rel="noopener" class="dock-social-item" title="TikTok">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
            <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 1 1-5.2-1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V5.86a6.37 6.37 0 0 0-1-.08A6.34 6.34 0 1 0 15.82 12V8.9a8.28 8.28 0 0 0 4.77 1.52V7a4.81 4.81 0 0 1-1-.31z"/>
          </svg>
        </a>
        <a :href="siteConfig.socials.youtube" target="_blank" rel="noopener" class="dock-social-item" title="YouTube">
          <Youtube :size="18" />
        </a>
      </div>
    </div>
  </aside>
</template>

<style scoped>
/* Hidden on desktop / tablet */
.mobile-app-dock {
  display: none;
}

/* Mobile Fixed Action Dock (≤768px) */
@media (max-width: 768px) {
  .mobile-app-dock {
    display: flex;
    flex-direction: column;
    gap: 0.45rem;
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    width: 100%;
    max-width: 100%;
    box-sizing: border-box;
    z-index: 9999;
    background: rgba(6, 6, 10, 0.96);
    backdrop-filter: blur(24px);
    -webkit-backdrop-filter: blur(24px);
    border-top: 1.5px solid rgba(255, 0, 43, 0.55);
    box-shadow: 
      0 -8px 30px rgba(0, 0, 0, 0.98), 
      0 -2px 14px rgba(255, 0, 43, 0.3);
    padding: 0.55rem 0.75rem calc(0.55rem + env(safe-area-inset-bottom, 0px)) 0.75rem;
    pointer-events: auto;
  }

  /* Row 1: 50% / 50% buttons */
  .dock-row-1 {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    width: 100%;
    box-sizing: border-box;
  }

  .dock-btn {
    flex: 1 1 0;
    width: calc(50% - 0.25rem);
    max-width: calc(50% - 0.25rem);
    box-sizing: border-box;
    min-width: 0;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 0.35rem;
    padding: 0.72rem 0.35rem;
    font-family: var(--font-body);
    font-size: 0.76rem;
    font-weight: 900;
    letter-spacing: 0.04em;
    text-transform: uppercase;
    text-decoration: none;
    cursor: pointer;
    transition: all 0.2s ease;
    border-radius: 4px;
    overflow: hidden;
  }

  .dock-btn .btn-text {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .dock-btn.request-btn {
    background: #ff002b;
    color: #ffffff;
    border: none;
    clip-path: polygon(6px 0, 100% 0, 100% calc(100% - 6px), calc(100% - 6px) 100%, 0 100%, 0 6px);
    box-shadow: 0 0 14px rgba(255, 0, 43, 0.6);
  }

  .dock-btn.request-btn:active {
    background: #d40024;
    transform: scale(0.98);
  }

  .dock-btn.call-btn {
    background: rgba(255, 255, 255, 0.06);
    border: 1.5px solid rgba(255, 0, 43, 0.65);
    color: #ffffff;
  }

  .dock-btn.call-btn:active {
    background: rgba(255, 0, 43, 0.2);
    border-color: #ff002b;
    transform: scale(0.98);
  }

  .dock-btn .phone-icn {
    color: #ff002b;
    flex-shrink: 0;
  }

  .dock-btn .btn-arr {
    color: #ffffff;
    flex-shrink: 0;
  }

  /* Row 2: Networks */
  .dock-row-2 {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.9rem;
    padding-top: 0.35rem;
    border-top: 1px solid rgba(255, 255, 255, 0.08);
    width: 100%;
    box-sizing: border-box;
  }

  .dock-networks-label {
    font-family: var(--font-body);
    font-size: 0.62rem;
    font-weight: 800;
    letter-spacing: 0.14em;
    color: #9999aa;
    text-transform: uppercase;
  }

  .dock-networks-icons {
    display: flex;
    align-items: center;
    gap: 1.1rem;
  }

  .dock-social-item {
    color: #ffffff;
    opacity: 0.85;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    padding: 0.2rem;
    text-decoration: none;
    transition: all 0.2s ease;
  }

  .dock-social-item:active,
  .dock-social-item:hover {
    color: #ff002b;
    opacity: 1;
    transform: scale(1.15);
    filter: drop-shadow(0 0 6px rgba(255, 0, 43, 0.8));
  }
}

/* ============================================================
   NARROW SCREENS (≤380px) — Compact dock so both buttons
   stay readable without truncation.
   ============================================================ */
@media (max-width: 380px) {
  .mobile-app-dock {
    padding: 0.45rem 0.5rem calc(0.45rem + env(safe-area-inset-bottom, 0px)) 0.5rem;
    gap: 0.35rem;
  }

  .dock-row-1 {
    gap: 0.35rem;
  }

  .dock-btn {
    width: calc(50% - 0.175rem);
    max-width: calc(50% - 0.175rem);
    padding: 0.65rem 0.25rem;
    font-size: 0.7rem;
    letter-spacing: 0.02em;
    gap: 0.25rem;
  }

  .dock-row-2 {
    gap: 0.5rem;
    padding-top: 0.25rem;
  }

  .dock-networks-label {
    font-size: 0.55rem;
    letter-spacing: 0.1em;
  }

  .dock-networks-icons {
    gap: 0.7rem;
  }

  .dock-social-item {
    padding: 0.15rem;
  }
}
</style>
