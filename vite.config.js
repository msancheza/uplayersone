import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import siteConfig from './src/config/siteConfig.js'
import { prerenderPlugin } from './scripts/prerender.mjs'

const ORIGIN = siteConfig.url.replace(/\/+$/, '')

/**
 * Routes exposed to search engines.
 *
 * Legacy redirect paths (`/policies`, `/privacy`, `/terms`) and the
 * catch-all are intentionally excluded — a redirect or a 404 should never
 * appear in the sitemap.
 */
const SITEMAP_ROUTES = [
  { path: '/', changefreq: 'weekly', priority: '1.0' },
  { path: '/pricing', changefreq: 'weekly', priority: '0.9' },
  { path: '/party-essentials', changefreq: 'weekly', priority: '0.9' },
  { path: '/gallery', changefreq: 'weekly', priority: '0.8' },
  { path: '/contact', changefreq: 'monthly', priority: '0.8' },
  { path: '/our-policies', changefreq: 'yearly', priority: '0.5' },
  { path: '/privacy-policy', changefreq: 'yearly', priority: '0.3' },
  { path: '/terms-and-conditions', changefreq: 'yearly', priority: '0.3' }
]

const buildSitemap = (lastmod) =>
  [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9 http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd">',
    ...SITEMAP_ROUTES.map(
      (route) =>
        `  <url>\n    <loc>${ORIGIN}${route.path}</loc>\n    <lastmod>${lastmod}</lastmod>\n    <changefreq>${route.changefreq}</changefreq>\n    <priority>${route.priority}</priority>\n  </url>`
    ),
    '</urlset>',
    ''
  ].join('\n')

/**
 * AI / answer-engine crawlers.
 *
 * Generative engines answer "gaming truck rental Los Angeles" by fetching
 * and quoting the pages they can reach, so these are allowed explicitly
 * rather than relying on the wildcard — it documents the intent and stops
 * a blanket rule from silently blocking them later.
 *
 * Sources: OpenAI (platform.openai.com/docs/bots), Anthropic
 * (support.anthropic.com), Perplexity (docs.perplexity.ai/guides/bots),
 * Google (developers.google.com/search/docs/crawling-indexing),
 * Microsoft (blogs.bing.com/webmaster) and Meta
 * (developers.facebook.com/docs/sharing/bot).
 */
const AI_CRAWLERS = [
  // OpenAI — ChatGPT search, ChatGPT user requests, model training
  'OAI-SearchBot',
  'ChatGPT-User',
  'GPTBot',
  // Anthropic — Claude search, Claude user requests, model training
  'Claude-SearchBot',
  'Claude-User',
  'ClaudeBot',
  // Perplexity
  'PerplexityBot',
  'Perplexity-User',
  // Google — Search, AI Overviews / Gemini grounding, Google-Extended
  'Googlebot',
  'Google-Extended',
  'Google-Other',
  'Google-Image',
  'Google-Video',
  'Googlebot-News',
  'Googlebot-Image',
  'Storebot-Google',
  // Microsoft — Bing index and Microsoft Copilot
  'Bingbot',
  // Meta — Meta AI (including agents that read shared links)
  'meta-externalagent',
  'facebookexternalhit',
  // Other AI and dataset crawlers
  'Amazonbot',
  'Applebot-Extended',
  'Bytespider',
  'CCBot',
  'cohere-ai',
  'cohere-training-data-crawler',
  'Diffbot',
  'DuckAssistBot',
  'Omgilibot',
  'Timpibot',
  'YouBot'
]

const buildRobots = () =>
  [
    'User-agent: *',
    'Allow: /',
    '',
    '# Legacy redirect paths — not indexable pages.',
    'Disallow: /policies',
    'Disallow: /privacy',
    'Disallow: /terms',
    '',
    '# Answer engines and AI assistants (Generative Engine Optimization).',
    ...AI_CRAWLERS.flatMap((bot) => [`User-agent: ${bot}`, 'Allow: /', '']),
    `Sitemap: ${ORIGIN}/sitemap.xml`,
    ''
  ].join('\n')

/**
 * Emits robots.txt and sitemap.xml from the canonical origin so the
 * domain stays defined in exactly one place (src/config/siteConfig.js).
 */
function seoStaticFiles() {
  let lastmod = new Date().toISOString().slice(0, 10)

  return {
    name: 'seo-static-files',
    configResolved() {
      lastmod = new Date().toISOString().slice(0, 10)
    },
    configureServer(server) {
      server.middlewares.use('/robots.txt', (req, res) => {
        res.setHeader('Content-Type', 'text/plain; charset=utf-8')
        res.end(buildRobots())
      })
      server.middlewares.use('/sitemap.xml', (req, res) => {
        res.setHeader('Content-Type', 'application/xml; charset=utf-8')
        res.end(buildSitemap(lastmod))
      })
    },
    generateBundle() {
      this.emitFile({ type: 'asset', fileName: 'robots.txt', source: buildRobots() })
      this.emitFile({ type: 'asset', fileName: 'sitemap.xml', source: buildSitemap(lastmod) })
    }
  }
}

export default defineConfig({
  plugins: [vue(), seoStaticFiles(), prerenderPlugin()]
})
