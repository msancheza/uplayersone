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
import SEOHead from '../components/SEOHead.vue'
import { routeSeo } from '../data/seoRoutes.js'
import { initScrollObserver } from '../utils/scrollObserver.js'

const seo = routeSeo.home

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
    <SEOHead
      :title="seo.title"
      :description="seo.description"
      :path="seo.path"
      :breadcrumb="seo.breadcrumb"
      :faq="seo.faq"
    />
    <ScrollNav />
    <main>
      <HeroSection id="hero" />
      <PricesSection id="prices" />
      <VideoSection />
      <EventsSection id="events" />
      <GallerySection id="gallery" />
      <GamesSection id="games" />
      <FAQSection id="faq" />
      <ContactSection id="contact" />
    </main>
  </div>
</template>
