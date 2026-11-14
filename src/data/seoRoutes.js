import {
  buildSchemaGraph,
  imageGallerySchema,
  serviceListSchema,
  additiveServiceSchema,
  definedTermSetSchema,
  factSheetSchema
} from './structuredData.js'

/**
 * Per-route SEO definition.
 *
 * This is the single source of truth for every page's title, description,
 * canonical path and breadcrumb. The Vue views read it at runtime and the
 * build-time prerenderer (`scripts/prerender.mjs`) reads the exact same
 * file, so the HTML that search engines and social scrapers receive can
 * never drift from the app.
 */
export const routeSeo = {
  home: {
    path: '/',
    title: 'Gaming Truck Rental Los Angeles | Ultimate Players',
    description:
      'Mobile gaming truck rental in Los Angeles. PS5, Xbox Series X, Nintendo Switch, pro game coaches, Nerf Wars, water guns, jumpers, tables & chairs.',
    breadcrumb: [],
    faq: true
  },
  pricing: {
    path: '/pricing',
    title: 'Gaming Truck Prices & Packages | Ultimate Players',
    description:
      'Official gaming truck rental prices in Los Angeles. Standard, Deluxe, Gaming Bus and Elite 10-TV packages from $450, plus VR add-ons. No prepayment required.',
    breadcrumb: [{ name: 'Pricing', path: '/pricing' }]
  },
  contact: {
    path: '/contact',
    title: 'Contact & Book a Gaming Truck | Ultimate Players',
    description:
      'Book a mobile gaming truck in Los Angeles. Call or text (626) 503-1189, send your event request and get a custom proposal for your event.',
    breadcrumb: [{ name: 'Contact', path: '/contact' }]
  },
  gallery: {
    path: '/gallery',
    title: 'Live Event Gallery | Ultimate Players Gaming Trucks',
    description:
      'Real photos from Ultimate Players events — gaming truck birthdays, tournaments, corporate activations and parties across Los Angeles. Tap any photo full screen.',
    breadcrumb: [{ name: 'Gallery', path: '/gallery' }]
  },
  partyEssentials: {
    path: '/party-essentials',
    title: 'Party Essentials & Rentals | Ultimate Players',
    description:
      'Nerf Wars, water guns, water slide jumpers, inflatable jumpers, tables, chairs, décor and balloon setups in Los Angeles. Bundle with any gaming truck.',
    breadcrumb: [{ name: 'Party Essentials', path: '/party-essentials' }]
  },
  policies: {
    path: '/our-policies',
    title: 'Our Policies | Ultimate Players',
    description:
      'Deposit, cancellation, rescheduling and safety policies for Ultimate Players gaming truck rentals in Los Angeles. Read the terms before booking your event.',
    breadcrumb: [{ name: 'Our Policies', path: '/our-policies' }]
  },
  privacy: {
    path: '/privacy-policy',
    title: 'Privacy Policy | Ultimate Players',
    description:
      'How Ultimate Players collects, uses and protects your personal information, including children’s privacy and photography policies for our gaming truck events.',
    breadcrumb: [{ name: 'Privacy Policy', path: '/privacy-policy' }]
  },
  terms: {
    path: '/terms-and-conditions',
    title: 'Terms & Conditions | Ultimate Players',
    description:
      'Booking, deposit, parking, supervision, damage and weather terms for Ultimate Players mobile gaming truck and gaming bus rentals in Los Angeles.',
    breadcrumb: [{ name: 'Terms & Conditions', path: '/terms-and-conditions' }]
  }
}

/**
 * Build the complete JSON-LD graph for a route.
 *
 * @param {string} name  Key of `routeSeo`.
 * @param {object} deps  Route-specific data (gallery photos, catalogue…).
 */
export function buildRouteGraph(name, deps = {}) {
  const cfg = routeSeo[name]
  if (!cfg) throw new Error(`Unknown SEO route: ${name}`)

  const extraSchema = []

  if (name === 'home') {
    // The fact sheet and the term set are what an assistant reads to
    // describe the business and to map a question onto a real offering.
    extraSchema.push(factSheetSchema(), definedTermSetSchema())
  }

  if (name === 'gallery' && deps.photos) {
    extraSchema.push(
      imageGallerySchema({
        name: 'Ultimate Players Live Event Gallery',
        description:
          'Real event photography from Ultimate Players gaming truck and gaming bus rentals across Los Angeles — birthdays, tournaments, corporate activations and community parties.',
        photos: deps.photos,
        path: cfg.path
      })
    )
  }

  if (name === 'partyEssentials' && deps.catalog) {
    extraSchema.push(
      serviceListSchema({
        name: 'Ultimate Players Party Essentials Catalogue',
        description:
          'Party rental essentials in Los Angeles — Nerf Wars arenas, water guns, water slide jumpers, inflatable jumpers, party tables, chairs, décor and balloon setups.',
        items: deps.catalog,
        path: cfg.path
      })
    )
    if (deps.services) {
      extraSchema.push(
        additiveServiceSchema({
          name: 'Ultimate Players Add-On Services',
          description:
            'Add-on party services in Los Angeles — Nerf Wars arenas, water gun battles and party tables and chairs, delivered with any gaming truck or gaming bus booking.',
          services: deps.services,
          path: cfg.path
        })
      )
    }
  }

  return buildSchemaGraph({
    path: cfg.path,
    title: cfg.title,
    description: cfg.description,
    breadcrumb: cfg.breadcrumb,
    faq: cfg.faq,
    // Voice assistants read the FAQ answers aloud. The fact sheet stays in
    // the machine-readable layers only — the visible page keeps one FAQ.
    speakable:
      name === 'home'
        ? ['.answer-main']
        : null,
    extraSchema
  })
}

export default routeSeo
