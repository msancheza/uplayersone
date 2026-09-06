<script setup>
import { onMounted, nextTick } from 'vue'
import HeroSection from '../components/HeroSection.vue'
import PricesSection from '../components/PricesSection.vue'
import EventsSection from '../components/EventsSection.vue'
import GallerySection from '../components/GallerySection.vue'
import GamesSection from '../components/GamesSection.vue'
import VideoSection from '../components/VideoSection.vue'
import FAQSection from '../components/FAQSection.vue'
import ContactSection from '../components/ContactSection.vue'
import ScrollNav from '../components/ScrollNav.vue'
import { initScrollObserver } from '../utils/scrollObserver.js'

onMounted(() => {
  if (!window.location.hash) {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' })
  }
  nextTick(() => {
    initScrollObserver()
  })
})
</script>

<template>
  <div>
    <ScrollNav />
    <main>
      <HeroSection id="hero" />
      <PricesSection id="prices" />
      <EventsSection id="events" />
      <GallerySection id="gallery" />
      <GamesSection id="games" />
      <VideoSection />
      <FAQSection id="faq" />
      <ContactSection id="contact" />
    </main>
  </div>
</template>
