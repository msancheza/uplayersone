<script setup>
import Navbar from './components/Navbar.vue'
import FooterSection from './components/FooterSection.vue'
</script>

<template>
  <div class="app-container">
    <Navbar />
    <router-view />
    <FooterSection />
  </div>
</template>

<style scoped>
.app-container {
  min-height: 100vh;
  background-color: #000000;
  color: #ffffff;
}
</style>
