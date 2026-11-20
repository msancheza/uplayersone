<script setup>
/**
 * HiBlik icon.
 *
 * Adapted from the official flat logo (rounded black tile + lime "Hib"
 * wordmark). The header icons are monochrome glyphs inside the social
 * circles, so the tile is dropped and the wordmark is redrawn as a
 * `currentColor` stroke — that way it inherits the same white-at-rest /
 * white-on-red-on-hover behaviour as the rest of the social row.
 *
 * Geometry: the original glyph is scaled from its 100×100 artboard into a
 * 24×24 viewBox, keeping the 6-unit stroke weight of the source design
 * (→ 2.625 after scaling) and centring the wordmark on both axes.
 */
defineProps({
  size: { type: [Number, String], default: 22 },
  title: { type: String, default: 'HiBlik' }
})
</script>

<template>
  <svg
    :width="size"
    :height="size"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    stroke-width="2.625"
    stroke-linecap="butt"
    stroke-linejoin="miter"
    role="img"
    :aria-label="title"
    class="hiblik-icon"
  >
    <g transform="translate(-9.875 -9.656) scale(0.4375)">
      <path d="M29 38V61" />
      <path d="M42 38V61" />
      <path d="M29 49.5H42" />
      <path d="M50.5 45V61" />
      <path d="M59 38V61" />
      <path d="M59 38H65.25A5.75 5.75 0 0 1 65.25 49.5H59" />
      <path d="M59 49.5H65.25A5.75 5.75 0 0 1 65.25 61H59" />
      <circle cx="50.5" cy="39.5" r="3" fill="currentColor" stroke="none" />
    </g>
  </svg>
</template>

<style scoped>
.hiblik-icon {
  display: block;
  overflow: visible;
}
</style>
