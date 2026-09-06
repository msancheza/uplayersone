<script setup>
import Navbar from './components/Navbar.vue'
import FooterSection from './components/FooterSection.vue'
import MobileAppDock from './components/MobileAppDock.vue'
</script>

<template>
  <div class="app-container">
    <Navbar />
    <router-view />
    <FooterSection />
    <MobileAppDock />
  </div>
</template>

<style scoped>
.app-container {
  min-height: 100vh;
  background-color: #000000;
  color: #ffffff;
}

@media (max-width: 768px) {
  .app-container {
    padding-top: 66px;
    padding-bottom: calc(90px + env(safe-area-inset-bottom, 0px));
  }
}
</style>
