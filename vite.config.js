import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import siteConfig from './src/config/siteConfig.js'

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

const buildRobots = () =>
  [
    'User-agent: *',
    'Allow: /',
    '',
    '# Block anything that is not a real, indexable page.',
    'Disallow: /policies',
    'Disallow: /privacy',
    'Disallow: /terms',
    '',
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
  plugins: [vue(), seoStaticFiles()]
})
