<script setup>
import { computed } from 'vue'
import { useSeo } from '../composables/useSeo.js'
import { buildSchemaGraph } from '../data/structuredData.js'

/**
 * Declarative SEO for a route.
 *
 * Renders nothing visible — it writes the title, description, canonical,
 * Open Graph / Twitter tags and the JSON-LD graph into `<head>`, and
 * cleans up its own structured data when the route unmounts.
 */
const props = defineProps({
  /** Full document title, ideally under 60 characters. */
  title: { type: String, required: true },
  /** Meta description, ideally 150-160 characters. */
  description: { type: String, required: true },
  /** Site-relative path — drives the canonical URL. */
  path: { type: String, required: true },
  /** Site-relative or absolute social preview image. */
  image: { type: String, default: '' },
  /** Open Graph type. */
  type: { type: String, default: 'website' },
  /** Extra keywords for this route. Falls back to the site-wide set. */
  keywords: { type: Array, default: () => [] },
  /** Ask engines to skip this route. */
  noindex: { type: Boolean, default: false },
  /** Breadcrumb trail, e.g. [{ name: 'Pricing', path: '/pricing' }]. */
  breadcrumb: { type: Array, default: () => [] },
  /** Emit the FAQPage schema for this route. */
  faq: { type: Boolean, default: false },
  /** Pre-built ItemList node (or a list of them). */
  itemList: { type: [Object, Array], default: null },
  /** Pre-built ImageGallery node (or a list of them). */
  imageGallery: { type: [Object, Array], default: null },
  /** Any additional schema nodes for this route. */
  extraSchema: { type: Array, default: () => [] },
  /** Pre-built JSON-LD graph. Overrides the graph built from the props. */
  schema: { type: Object, default: null },
  /** Include the site-wide organization / service nodes. */
  includeCore: { type: Boolean, default: true }
})

const graph = computed(() =>
  props.schema ||
  buildSchemaGraph({
    path: props.path,
    title: props.title,
    description: props.description,
    image: props.image,
    breadcrumb: props.breadcrumb,
    faq: props.faq,
    itemList: props.itemList,
    imageGallery: props.imageGallery,
    extraSchema: props.extraSchema,
    includeCore: props.includeCore
  })
)

useSeo(
  computed(() => ({
    title: props.title,
    description: props.description,
    path: props.path,
    image: props.image || undefined,
    type: props.type,
    keywords: props.keywords.length ? props.keywords : undefined,
    noindex: props.noindex,
    jsonLd: graph.value
  }))
)
</script>

<template>
  <span class="seo-head" aria-hidden="true" />
</template>

<style scoped>
.seo-head {
  display: none;
}
</style>
