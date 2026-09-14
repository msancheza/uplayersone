<script setup>
import { Package, ChevronRight } from 'lucide-vue-next'
</script>

<template>
  <router-link to="/party-essentials" class="party-supplies-cta scroll-reveal">
    <div class="cta-corner top-left"></div>
    <div class="cta-corner top-right"></div>
    <div class="cta-corner bottom-left"></div>
    <div class="cta-corner bottom-right"></div>

    <div class="cta-icon-box">
      <Package :size="18" class="text-red" />
    </div>

    <div class="cta-text">
      <span class="cta-eyebrow">NEW SERVICE</span>
      <span class="cta-title">PARTY SUPPLIES & DECOR</span>
    </div>

    <div class="cta-action">
      <span class="cta-cta-text">EXPLORE</span>
      <ChevronRight :size="16" class="cta-arrow" />
    </div>
  </router-link>
</template>

<style scoped>
.party-supplies-cta {
  position: relative;
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 0.9rem 1.2rem;
  margin: 2.2rem auto 0;
  max-width: 520px;
  background: rgba(14, 14, 22, 0.85);
  border: 1px solid rgba(255, 0, 43, 0.35);
  border-radius: 6px;
  text-decoration: none;
  color: inherit;
  transition: all 0.25s ease;
  overflow: hidden;
}

.party-supplies-cta::before {
  /* subtle red glow that intensifies on hover */
  content: '';
  position: absolute;
  inset: 0;
  background: radial-gradient(
    ellipse at center,
    rgba(255, 0, 43, 0.08) 0%,
    transparent 70%
  );
  pointer-events: none;
  transition: opacity 0.25s ease;
  opacity: 0.7;
}

.party-supplies-cta:hover {
  border-color: #ff002b;
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(255, 0, 43, 0.25);
}

.party-supplies-cta:hover::before {
  opacity: 1;
}

.cta-corner {
  position: absolute;
  width: 8px;
  height: 8px;
  border-color: #ff002b;
  border-style: solid;
  border-width: 0;
  pointer-events: none;
  transition: all 0.25s ease;
}
.cta-corner.top-left {
  top: -1px;
  left: -1px;
  border-width: 1.5px 0 0 1.5px;
}
.cta-corner.top-right {
  top: -1px;
  right: -1px;
  border-width: 1.5px 1.5px 0 0;
}
.cta-corner.bottom-left {
  bottom: -1px;
  left: -1px;
  border-width: 0 0 1.5px 1.5px;
}
.cta-corner.bottom-right {
  bottom: -1px;
  right: -1px;
  border-width: 0 1.5px 1.5px 0;
}

.cta-icon-box {
  width: 36px;
  height: 36px;
  border-radius: 5px;
  background: rgba(255, 0, 43, 0.12);
  border: 1px solid rgba(255, 0, 43, 0.35);
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  position: relative;
  z-index: 1;
}

.text-red {
  color: #ff002b;
}

.cta-text {
  display: flex;
  flex-direction: column;
  gap: 0.15rem;
  flex: 1;
  min-width: 0;
  position: relative;
  z-index: 1;
}

.cta-eyebrow {
  font-family: var(--font-heading);
  font-size: 0.58rem;
  font-weight: 800;
  letter-spacing: 0.2em;
  color: rgba(255, 0, 43, 0.85);
  line-height: 1;
}

.cta-title {
  font-family: var(--font-heading);
  font-size: 0.82rem;
  font-weight: 900;
  letter-spacing: 0.06em;
  color: #ffffff;
  line-height: 1;
}

.cta-action {
  display: flex;
  align-items: center;
  gap: 0.3rem;
  flex-shrink: 0;
  position: relative;
  z-index: 1;
}

.cta-cta-text {
  font-family: var(--font-heading);
  font-size: 0.7rem;
  font-weight: 900;
  letter-spacing: 0.14em;
  color: rgba(255, 255, 255, 0.7);
}

.cta-arrow {
  color: #ff002b;
  transition: transform 0.25s ease;
}

.party-supplies-cta:hover .cta-arrow {
  transform: translateX(3px);
}

.party-supplies-cta:hover .cta-cta-text {
  color: #ff002b;
}

/* Mobile */
@media (max-width: 600px) {
  .party-supplies-cta {
    margin: 1.6rem 0.5rem 0;
    padding: 0.8rem 1rem;
    gap: 0.7rem;
  }
  .cta-icon-box {
    width: 32px;
    height: 32px;
  }
  .cta-eyebrow {
    font-size: 0.55rem;
    letter-spacing: 0.16em;
  }
  .cta-title {
    font-size: 0.74rem;
  }
  .cta-cta-text {
    font-size: 0.62rem;
  }
}
</style>
