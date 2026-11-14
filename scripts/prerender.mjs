/**
 * Static prerenderer for the SEO + LLM surfaces of the site.
 *
 * Social scrapers (Facebook, WhatsApp, X, LinkedIn, Slack…) and most
 * crawlers fetch the raw HTML and never execute JavaScript, so a purely
 * client-rendered SPA shows them a blank card and an empty description.
 *
 * This plugin runs as part of `vite build` and writes:
 *
 *   dist/<route>/index.html   one static document per route, with the
 *                              route's title, description, canonical, OG
 *                              tags and JSON-LD graph already in the markup
 *   dist/404.html             the home document for static hosts
 *   dist/llms.txt             curated index for LLM agents (llms.txt v2)
 *   dist/llms-full.txt        the whole site as one plain-text document
 *   dist/<route>.md           a clean Markdown version of each page
 *
 * It reads the same `src/data/seoRoutes.js` the application uses, so the
 * prerendered markup and the runtime markup can never disagree.
 */
import { readFileSync, writeFileSync, mkdirSync, existsSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

import { routeSeo, buildRouteGraph } from '../src/data/seoRoutes.js'
import { catalog } from '../src/data/partyCatalog.js'
import { partyServices } from '../src/data/partyServices.js'
import siteConfig from '../src/config/siteConfig.js'
import { buildLlmsTxt, buildLlmsFullTxt, markdownPages } from '../src/utils/llmsTxt.js'

const __dirname = dirname(fileURLToPath(import.meta.url))
const ROOT = join(__dirname, '..')

const ORIGIN = siteConfig.url.replace(/\/+$/, '')
const abs = (p) => `${ORIGIN}${p.startsWith('/') ? p : `/${p}`}`

const START_MARK = '<!--seo:start-->'
const END_MARK = '<!--seo:end-->'

const escapeHtml = (s = '') =>
  String(s)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')

/** Render the SEO head block for a route. */
function renderHead({ title, description, path, image, graph }) {
  const canonical = abs(path)
  const ogImage = abs(image || siteConfig.images.ogDefault)
  const keywords = siteConfig.keywords.join(', ')
  // llms.txt v2: `alternate` points at the Markdown version of this page,
  // `describedby` points at the llms.txt file that covers it.
  const markdownUrl = abs(path === '/' ? '/index.md' : `${path}.md`)

  return [
    START_MARK,
    `    <title>${escapeHtml(title)}</title>`,
    `    <meta name="description" content="${escapeHtml(description)}" />`,
    `    <meta name="keywords" content="${escapeHtml(keywords)}" />`,
    `    <meta name="author" content="${escapeHtml(siteConfig.legalName)}" />`,
    `    <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />`,
    `    <link rel="canonical" href="${canonical}" />`,
    `    <link rel="alternate" type="text/markdown" href="${markdownUrl}" />`,
    `    <link rel="describedby" href="${abs('/llms.txt')}" />`,
    ``,
    `    <meta property="og:type" content="website" />`,
    `    <meta property="og:site_name" content="${escapeHtml(siteConfig.name)}" />`,
    `    <meta property="og:locale" content="en_US" />`,
    `    <meta property="og:title" content="${escapeHtml(title)}" />`,
    `    <meta property="og:description" content="${escapeHtml(description)}" />`,
    `    <meta property="og:url" content="${canonical}" />`,
    `    <meta property="og:image" content="${ogImage}" />`,
    `    <meta property="og:image:type" content="image/jpeg" />`,
    `    <meta property="og:image:width" content="1200" />`,
    `    <meta property="og:image:height" content="630" />`,
    `    <meta property="og:image:alt" content="${escapeHtml(`${siteConfig.name} — ${siteConfig.tagline}`)}" />`,
    ``,
    `    <meta name="twitter:card" content="summary_large_image" />`,
    `    <meta name="twitter:title" content="${escapeHtml(title)}" />`,
    `    <meta name="twitter:description" content="${escapeHtml(description)}" />`,
    `    <meta name="twitter:image" content="${ogImage}" />`,
    `    <meta name="twitter:image:alt" content="${escapeHtml(`${siteConfig.name} — ${siteConfig.tagline}`)}" />`,
    `    <script type="application/ld+json" data-seo-jsonld="prerender">${JSON.stringify(graph).replace(/</g, '\\u003c')}</script>`,
    END_MARK
  ].join('\n')
}

/** Routes to prerender, with the data each one needs. */
const PLAN = [
  { key: 'home', dir: '' },
  { key: 'pricing', dir: 'pricing' },
  { key: 'partyEssentials', dir: 'party-essentials', deps: { catalog, services: partyServices } },
  {
    key: 'gallery',
    dir: 'gallery',
    deps: { photos: JSON.parse(readFileSync(join(ROOT, 'src/data/gallery.json'), 'utf8')).photos }
  },
  { key: 'contact', dir: 'contact' },
  { key: 'policies', dir: 'our-policies' },
  { key: 'privacy', dir: 'privacy-policy' },
  { key: 'terms', dir: 'terms-and-conditions' }
]

/**
 * Vite plugin: emits the LLM-facing text files as bundle assets and
 * writes the per-route static documents once the bundle is on disk.
 */
export function prerenderPlugin() {
  let outDir = 'dist'
  let root = process.cwd()

  return {
    name: 'seo-prerender',
    configResolved(config) {
      outDir = config.build.outDir
      root = config.root
    },
    generateBundle() {
      this.emitFile({ type: 'asset', fileName: 'llms.txt', source: buildLlmsTxt() })
      this.emitFile({ type: 'asset', fileName: 'llms-full.txt', source: buildLlmsFullTxt() })
      for (const [file, builder] of Object.entries(markdownPages)) {
        this.emitFile({ type: 'asset', fileName: file.replace(/^\//, ''), source: builder() })
      }
    },
    closeBundle() {
      const dist = join(root, outDir)
      const indexPath = join(dist, 'index.html')
      if (!existsSync(indexPath)) return

      const template = readFileSync(indexPath, 'utf8')
      if (!template.includes(START_MARK) || !template.includes(END_MARK)) {
        this.warn('[prerender] SEO markers missing from index.html — skipped.')
        return
      }

      let written = 0
      for (const { key, dir, deps = {} } of PLAN) {
        const cfg = routeSeo[key]
        const graph = buildRouteGraph(key, deps)
        const head = renderHead({
          title: cfg.title,
          description: cfg.description,
          path: cfg.path,
          image: siteConfig.images.ogDefault,
          graph
        })

        const html = template.replace(
          new RegExp(`${START_MARK}[\\s\\S]*?${END_MARK}`),
          () => head
        )

        const outDirPath = dir ? join(dist, dir) : dist
        if (dir) mkdirSync(outDirPath, { recursive: true })
        writeFileSync(join(outDirPath, 'index.html'), html)
        written++
      }

      // Static hosts serve 404.html for unmatched paths; the catch-all
      // route redirects to home, so serve the home document there.
      writeFileSync(join(dist, '404.html'), readFileSync(indexPath, 'utf8'))

      this.info?.(
        `[prerender] ${written} routes + 404.html + llms.txt, llms-full.txt and ${Object.keys(markdownPages).length} markdown pages`
      )
    }
  }
}

export default prerenderPlugin
