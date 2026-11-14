import { watchEffect, onScopeDispose, getCurrentScope } from 'vue'
import siteConfig from '../config/siteConfig.js'

/**
 * SEO head manager.
 *
 * Every tag written here is tagged with `data-seo` so the manager can find,
 * update and remove them without touching tags that belong to the app
 * (fonts, favicon, etc.). It is intentionally imperative: a client-rendered
 * SPA has to write to `document.head` anyway, and doing it from one place
 * keeps the tag set consistent and prevents duplicates between routes.
 */

const MANAGED_ATTR = 'data-seo'

/** Build an absolute URL from a site-relative path. */
export function absoluteUrl(path = '/') {
  if (!path) return siteConfig.url
  if (/^https?:\/\//i.test(path)) return path
  const base = siteConfig.url.replace(/\/+$/, '')
  const suffix = path.startsWith('/') ? path : `/${path}`
  return `${base}${suffix}`
}

function upsertMeta(attr, key, content) {
  if (!content) return
  // Adopt a tag that was already prerendered into the HTML instead of
  // creating a second one — duplicate OG tags confuse crawlers.
  let el = document.head.querySelector(`meta[${attr}="${key}"]`)
  if (!el) {
    el = document.createElement('meta')
    el.setAttribute(attr, key)
    document.head.appendChild(el)
  }
  el.setAttribute('content', content)
  el.setAttribute(MANAGED_ATTR, '')
}

function upsertLink(rel, href, extra = {}) {
  if (!href) return
  let el = document.head.querySelector(`link[rel="${rel}"]`)
  if (!el) {
    el = document.createElement('link')
    el.setAttribute('rel', rel)
    document.head.appendChild(el)
  }
  el.setAttribute('href', href)
  el.setAttribute(MANAGED_ATTR, '')
  Object.entries(extra).forEach(([k, v]) => el.setAttribute(k, v))
}

function upsertJsonLd(id, payload) {
  if (!payload) return
  const selector = `script[data-seo-jsonld="${id}"]`
  let el = document.head.querySelector(selector)
  if (!el) {
    el = document.createElement('script')
    el.setAttribute('type', 'application/ld+json')
    el.setAttribute(MANAGED_ATTR, '')
    el.setAttribute('data-seo-jsonld', id)
    document.head.appendChild(el)
  }
  // `</script>` inside a JSON string would terminate the tag early.
  el.textContent = JSON.stringify(payload).replace(/</g, '\\u003c')
}

/** Remove every managed tag (used when a view unmounts). */
export function clearManagedHead() {
  document.head.querySelectorAll(`[${MANAGED_ATTR}]`).forEach((el) => el.remove())
}

/** Counter used to give every `useSeo` instance its own JSON-LD namespace. */
let scopeCounter = 0

/**
 * Write a full SEO payload into `<head>`.
 *
 * @param {object} seo
 * @param {string} seo.title          Document title (already templated).
 * @param {string} seo.description    Meta description, 150-160 chars.
 * @param {string} seo.path           Site-relative path used for canonical.
 * @param {string} seo.image          Site-relative or absolute OG image.
 * @param {string} seo.type           Open Graph type (website|article|profile).
 * @param {string[]} seo.keywords     Keyword list.
 * @param {boolean} seo.noindex       Set true to ask engines to skip the page.
 * @param {object|object[]} seo.jsonLd  One schema graph or a list of them.
 */
export function applySeo(seo = {}, jsonLdScope = 'route') {
  const {
    title,
    description = siteConfig.shortDescription,
    path = '/',
    image = siteConfig.images.ogDefault,
    type = 'website',
    keywords = siteConfig.keywords,
    noindex = false,
    jsonLd = null,
    locale = 'en_US',
    markdown = null,
    publishedTime = null,
    authors = null
  } = seo

  const canonical = absoluteUrl(path)
  const ogImage = absoluteUrl(image)

  document.title = title || siteConfig.name

  upsertMeta('name', 'description', description)
  upsertMeta('name', 'keywords', Array.isArray(keywords) ? keywords.join(', ') : keywords)
  upsertMeta('name', 'robots', noindex ? 'noindex, nofollow' : 'index, follow, max-image-preview:large, max-snippet:-1')
  upsertMeta('name', 'author', siteConfig.legalName)

  upsertLink('canonical', canonical)

  // llms.txt v2 link relations: `alternate` points at the Markdown version
  // of this page, `describedby` at the llms.txt file that covers it.
  upsertLink('alternate', absoluteUrl(markdown || (path === '/' ? '/index.md' : `${path}.md`)), {
    type: 'text/markdown'
  })
  upsertLink('describedby', absoluteUrl('/llms.txt'))

  // Open Graph
  upsertMeta('property', 'og:type', type)
  upsertMeta('property', 'og:site_name', siteConfig.name)
  upsertMeta('property', 'og:title', title || siteConfig.name)
  upsertMeta('property', 'og:description', description)
  upsertMeta('property', 'og:url', canonical)
  upsertMeta('property', 'og:image', ogImage)
  upsertMeta('property', 'og:image:alt', `${siteConfig.name} — ${siteConfig.tagline}`)
  upsertMeta('property', 'og:locale', locale)

  // Twitter / X card
  upsertMeta('name', 'twitter:card', 'summary_large_image')
  upsertMeta('name', 'twitter:title', title || siteConfig.name)
  upsertMeta('name', 'twitter:description', description)
  upsertMeta('name', 'twitter:image', ogImage)

  if (publishedTime) upsertMeta('property', 'article:published_time', publishedTime)
  if (authors) upsertMeta('property', 'article:author', authors)

  // Structured data
  if (jsonLd) {
    const blocks = Array.isArray(jsonLd) ? jsonLd : [jsonLd]
    // Drop blocks that belong to a previous route (or to the prerendered
    // HTML) so a route never ships two competing graphs.
    document.head
      .querySelectorAll('script[data-seo-jsonld]')
      .forEach((el) => {
        const id = el.getAttribute('data-seo-jsonld') || ''
        if (!id.startsWith(`${jsonLdScope}-`)) el.remove()
      })
    blocks.filter(Boolean).forEach((block, i) => upsertJsonLd(`${jsonLdScope}-${i}`, block))
  }
}

/**
 * Reactive SEO binding for views.
 *
 * @param {object|import('vue').Ref|import('vue').ComputedRef} seo
 * @returns {{ update: (patch: object) => void }}
 */
export function useSeo(seo) {
  let last = {}
  let stopped = false
  const jsonLdScope = `s${++scopeCounter}`

  const run = (source) => {
    const resolved = typeof source === 'function' ? source() : source?.value ?? source
    if (!resolved || stopped) return
    // Merge with the previous payload so partial updates (e.g. only the
    // active gallery photo changes) never drop unrelated tags.
    last = { ...last, ...resolved }
    applySeo(last, jsonLdScope)
  }

  const stop = watchEffect(() => run(seo))

  if (getCurrentScope()) {
    onScopeDispose(() => {
      stopped = true
      stop()
      // Drop this scope's JSON-LD blocks so a route that ships fewer
      // schemas never inherits the previous route's leftovers.
      document.head
        .querySelectorAll(`script[data-seo-jsonld^="${jsonLdScope}-"]`)
        .forEach((el) => el.remove())
    })
  }

  return {
    update(patch) {
      run(patch)
    }
  }
}

export default useSeo
