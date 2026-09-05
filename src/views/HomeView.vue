<script setup>
import HeroSection from '../components/HeroSection.vue'
import PricesSection from '../components/PricesSection.vue'
import EventsSection from '../components/EventsSection.vue'
import GamesSection from '../components/GamesSection.vue'
import FAQSection from '../components/FAQSection.vue'
import ContactSection from '../components/ContactSection.vue'
import ScrollNav from '../components/ScrollNav.vue'
</script>

<template>
  <div>
    <ScrollNav />
    <main>
      <HeroSection id="hero" />
      <PricesSection id="prices" />
      <EventsSection id="events" />
      <GamesSection id="games" />
      <FAQSection id="faq" />
      <ContactSection id="contact" />
    </main>
  </div>
</template>
