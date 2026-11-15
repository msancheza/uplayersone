import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import siteConfig from './src/config/siteConfig.js'
import { prerenderPlugin } from './scripts/prerender.mjs'
import { handleBookingSubmission } from './server/booking-email.js'

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

/**
 * Dev-only mirror of the Vercel function.
 *
 * In production `api/send-booking.js` answers POST /api/send-booking, but
 * `vite dev` has no serverless runtime — so the same shared handler is
 * mounted as middleware. Both paths read UPRESEND_API / EMAIL_NOTIFS from
 * the server environment; the browser never sees them.
 */
function bookingApiPlugin(env) {
  const handle = async (req, res) => {
    // GET → the public Turnstile site key (the secret stays server-side).
    if (req.method === 'GET') {
      res.statusCode = 200
      res.setHeader('Content-Type', 'application/json')
      res.end(JSON.stringify({ ok: true, siteKey: env.TURNSTILE_SITE_KEY || '' }))
      return
    }

    if (req.method !== 'POST') {
      res.statusCode = 405
      res.setHeader('Allow', 'GET, POST')
      res.setHeader('Content-Type', 'application/json')
      res.end(
        JSON.stringify({
          ok: false,
          code: 'method_not_allowed',
          message: 'This endpoint only accepts form submissions.'
        })
      )
      return
    }

    const chunks = []
    for await (const chunk of req) chunks.push(chunk)

    let body = {}
    try {
      body = JSON.parse(Buffer.concat(chunks).toString('utf8') || '{}')
    } catch {
      body = {}
    }

    try {
      const result = await handleBookingSubmission({
        body,
        env,
        ip: req.socket?.remoteAddress || ''
      })
      res.statusCode = result.status
      res.setHeader('Content-Type', 'application/json')
      res.end(JSON.stringify(result.body))
    } catch (error) {
      console.error('[booking] unexpected error', error)
      res.statusCode = 500
      res.setHeader('Content-Type', 'application/json')
      res.end(
        JSON.stringify({
          ok: false,
          code: 'server_error',
          message:
            'Something went wrong on our side. Please try again in a moment, or call us and we will set up your event personally.',
          // Dev only: the browser never reads this field.
          debug: String(error?.stack || error)
        })
      )
    }
  }

  return {
    name: 'booking-api-dev',
    apply: 'serve',
    configureServer(server) {
      server.middlewares.use('/api/send-booking', handle)
    },
    // `vite preview` serves the production build; mounting the same handler
    // there makes the local preview behave like the Vercel deployment.
    configurePreviewServer(server) {
      server.middlewares.use('/api/send-booking', handle)
    }
  }
}

export default defineConfig(({ mode }) => {
  // Loaded with an empty prefix on purpose: the booking credentials are
  // server-side only and must never be exposed to the client bundle.
  const serverEnv = loadEnv(mode, process.cwd(), '')

  return {
    plugins: [vue(), seoStaticFiles(), prerenderPlugin(), bookingApiPlugin(serverEnv)]
  }
})
