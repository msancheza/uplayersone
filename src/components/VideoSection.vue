<template>
  <section class="video-section scroll-reveal">
    <div class="video-wrapper">
      <video
        class="video-section__player"
        src="/vid01.mp4"
        autoplay
        muted
        loop
        playsinline
        preload="auto"
        data-parallax="0.08"
      ></video>
      <div class="video-blend-overlay"></div>
    </div>
  </section>
</template>

<style scoped>
.video-section {
  width: 100%;
  background: #000000;
  overflow: hidden;
  position: relative;
}

.video-wrapper {
  position: relative;
  width: 100%;
  line-height: 0;
}

.video-section__player {
  display: block;
  width: 100%;
  height: auto;
  max-height: 80vh;
  object-fit: cover;
  filter: brightness(0.92) contrast(1.1);
}

.video-blend-overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(
    180deg, 
    #000000 0%, 
    rgba(0, 0, 0, 0.3) 12%, 
    transparent 28%, 
    transparent 72%, 
    rgba(0, 0, 0, 0.4) 88%, 
    #000000 100%
  );
  pointer-events: none;
}

@media (max-width: 768px) {
  .video-section__player {
    max-height: 55vw;
    min-height: 220px;
  }
}
</style>
