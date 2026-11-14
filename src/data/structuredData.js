import siteConfig from '../config/siteConfig.js'
import { allFaqs } from './faqData.js'
import { packages, addOns } from './packages.js'
import {
  quickFacts,
  serviceDefinitions,
  oneLiner
} from './geoContent.js'

/**
 * Schema.org graph builders.
 *
 * Every node references the others through stable `@id` values derived
 * from the canonical origin, so search engines can resolve the graph
 * (organization → service → offers → page) instead of reading a pile of
 * disconnected blobs.
 */

const ORIGIN = siteConfig.url.replace(/\/+$/, '')

/** Absolute URL helper. */
export const abs = (path = '/') => {
  if (!path) return ORIGIN
  if (/^https?:\/\//i.test(path)) return path
  return `${ORIGIN}${path.startsWith('/') ? path : `/${path}`}`
}

const ORG_ID = `${ORIGIN}/#organization`
const WEBSITE_ID = `${ORIGIN}/#website`
const SERVICE_ID = `${ORIGIN}/#service`

const sameAsList = () => Object.values(siteConfig.socials)

const cityList = () => siteConfig.serviceArea.map((name) => ({ '@type': 'City', name }))

/* ------------------------------------------------------------------ */
/* Core entities                                                       */
/* ------------------------------------------------------------------ */

/**
 * The business itself.
 *
 * Deliberately published without a street address: the trucks travel to
 * the customer's location, so there is no walk-in address to claim.
 * Reachability is expressed through `contactPoint` and `areaServed`.
 */
export function organizationSchema() {
  return {
    '@type': 'Organization',
    '@id': ORG_ID,
    name: siteConfig.name,
    legalName: siteConfig.legalName,
    url: ORIGIN,
    description: siteConfig.shortDescription,
    slogan: siteConfig.tagline,
    logo: {
      '@type': 'ImageObject',
      url: abs(siteConfig.images.logo),
      width: 600,
      height: 338
    },
    image: abs(siteConfig.images.ogDefault),
    email: siteConfig.email,
    telephone: siteConfig.phoneRaw,
    knowsAbout: siteConfig.services,
    areaServed: cityList(),
    contactPoint: [
      {
        '@type': 'ContactPoint',
        contactType: 'customer service',
        telephone: siteConfig.phoneRaw,
        email: siteConfig.email,
        areaServed: 'US-CA',
        availableLanguage: ['English', 'Spanish']
      }
    ],
    sameAs: sameAsList()
  }
}

/** The website itself. */
export function webSiteSchema() {
  return {
    '@type': 'WebSite',
    '@id': WEBSITE_ID,
    url: ORIGIN,
    name: siteConfig.name,
    description: siteConfig.shortDescription,
    publisher: { '@id': ORG_ID },
    inLanguage: 'en-US'
  }
}

/**
 * The primary offering: mobile gaming truck rental.
 *
 * Uses `Service` rather than `LocalBusiness` because the business has no
 * public walk-in premises — the unit travels to the customer.
 */
export function serviceSchema() {
  const offerItems = packages.map((pkg) => ({
    '@type': 'Offer',
    name: `${pkg.name} — ${pkg.baseDuration}`,
    description: `${pkg.name} with ${pkg.tvCount} TVs (${pkg.tvs}). Consoles: ${pkg.consoles.join(', ')}. Includes ${pkg.features.join(', ')}.`,
    url: abs('/pricing'),
    price: String(pkg.basePrice),
    priceCurrency: 'USD',
    availability: 'https://schema.org/InStock',
    validFrom: '2024-01-01',
    priceSpecification: {
      '@type': 'UnitPriceSpecification',
      price: String(pkg.basePrice),
      priceCurrency: 'USD',
      unitText: pkg.baseDuration,
      referenceQuantity: {
        '@type': 'QuantitativeValue',
        value: 2,
        unitText: 'HOUR'
      }
    }
  }))

  return {
    '@type': 'Service',
    '@id': SERVICE_ID,
    url: abs('/pricing'),
    name: 'Ultimate Players Gaming Truck Rental',
    alternateName: [
      'Mobile Gaming Truck Rental',
      'Gaming Bus Rental',
      'Video Game Party Truck Rental'
    ],
    serviceType: 'Mobile Gaming Truck Rental',
    description:
      'Ultimate Players brings a fully equipped mobile gaming truck or bus to your street across Los Angeles and surrounding cities. Every unit carries PS5, Xbox Series X and Nintendo Switch stations, stadium seating, air conditioning and a professional game coach. Nerf Wars, water gun battles, water slide jumpers, party tables, chairs, decor and balloon setups are available as add-ons.',
    provider: { '@id': ORG_ID },
    areaServed: cityList(),
    audience: {
      '@type': 'Audience',
      audienceType:
        'Birthday parties, school functions, block parties, graduation celebrations, corporate events, tournaments, fundraisers and church functions'
    },
    availableChannel: {
      '@type': 'ServiceChannel',
      serviceUrl: abs('/contact'),
      servicePhone: {
        '@type': 'ContactPoint',
        telephone: siteConfig.phoneRaw,
        contactType: 'reservations'
      }
    },
    termsOfService: abs('/terms-and-conditions'),
    offers: {
      '@type': 'AggregateOffer',
      priceCurrency: 'USD',
      lowPrice: String(Math.min(...packages.map((p) => p.basePrice))),
      highPrice: String(Math.max(...packages.map((p) => p.basePrice))),
      offerCount: packages.length,
      offers: offerItems
    },
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Gaming Truck Packages',
      itemListElement: [
        ...packages.map((pkg, i) => ({
          '@type': 'Offer',
          position: i + 1,
          itemOffered: {
            '@type': 'Service',
            name: pkg.name,
            description: `${pkg.tvCount} TVs — ${pkg.tvs}. Consoles: ${pkg.consoles.join(', ')}. Features: ${pkg.features.join(', ')}. ${pkg.capacity}.`,
            serviceType: pkg.tag,
            provider: { '@id': ORG_ID }
          },
          price: String(pkg.basePrice),
          priceCurrency: 'USD'
        })),
        ...addOns.map((addon, i) => ({
          '@type': 'Offer',
          position: packages.length + i + 1,
          itemOffered: {
            '@type': 'Service',
            name: addon.name,
            description: addon.description,
            serviceType: 'Add-on',
            provider: { '@id': ORG_ID }
          },
          price: String(addon.price),
          priceCurrency: 'USD'
        }))
      ]
    }
  }
}

/* ------------------------------------------------------------------ */
/* Page-level helpers                                                  */
/* ------------------------------------------------------------------ */

/** Breadcrumb trail. `items` = [{ name, path }] without the home entry. */
export function breadcrumbSchema(items = []) {
  const trail = [{ name: 'Home', path: '/' }, ...items]
  return {
    '@type': 'BreadcrumbList',
    '@id': `${abs(items[0]?.path || '/')}#breadcrumb`,
    url: abs(items[0]?.path || '/'),
    itemListElement: trail.map((item, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: item.name,
      item: abs(item.path)
    }))
  }
}

/**
 * The page node, bound to the organization / service / breadcrumb.
 */
export function webPageSchema({ path = '/', title, description, image, datePublished, dateModified, hasBreadcrumb = false, speakable = null }) {
  const page = {
    '@type': 'WebPage',
    '@id': `${abs(path)}#webpage`,
    url: abs(path),
    name: title,
    description,
    isPartOf: { '@id': WEBSITE_ID },
    about: { '@id': SERVICE_ID },
    inLanguage: 'en-US',
    primaryImageOfPage: {
      '@type': 'ImageObject',
      url: abs(image || siteConfig.images.ogDefault)
    }
  }

  // Voice assistants read the speakable region first.
  if (speakable) {
    page.speakable = {
      '@type': 'SpeakableSpecification',
      cssSelector: speakable
    }
  }

  // Only reference a breadcrumb when one is actually published — a
  // dangling @id is a structured-data error.
  if (hasBreadcrumb) page.breadcrumb = { '@id': `${abs(path)}#breadcrumb` }

  if (datePublished) page.datePublished = datePublished
  if (dateModified) page.dateModified = dateModified

  return page
}

/**
 * FAQPage node.
 *
 * The accepted answer is flattened to plain text that includes the
 * supporting highlights, so the markup answers the question completely
 * instead of shipping a one-line teaser.
 *
 * `allFaqs` is the single accordion rendered on the page: the operational
 * questions plus the conversational phrasings of the same topics. Every
 * question here is visible on the page, so the markup never claims
 * content a visitor cannot read.
 */
export function faqPageSchema() {
  const buildAnswer = (faq) => {
    const parts = [faq.answer]
    if (faq.policyNotice) parts.push(faq.policyNotice)
    if (faq.options?.length) {
      parts.push(faq.options.map((o) => `${o.label}: ${o.text}`).join(' '))
    }
    if (faq.highlights?.length) {
      parts.push(faq.highlights.map((h) => `${h.title}: ${h.desc}`).join(' '))
    }
    if (faq.policyLinks?.length) {
      parts.push(faq.policyLinks.map((p) => `${p.label}: ${p.desc}`).join(' '))
    }
    return parts.filter(Boolean).join(' ')
  }

  return {
    '@type': 'FAQPage',
    '@id': `${ORIGIN}/#faq`,
    mainEntity: allFaqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: buildAnswer(faq)
      }
    }))
  }
}

/**
 * DefinedTermSet — the vocabulary an assistant needs to map a question
 * ("do you do Nerf Wars?") onto something this business actually sells.
 */
export function definedTermSetSchema() {
  return {
    '@type': 'DefinedTermSet',
    '@id': `${ORIGIN}/#terms`,
    name: 'Ultimate Players service definitions',
    url: abs('/pricing'),
    hasDefinedTerm: serviceDefinitions.map((def) => ({
      '@type': 'DefinedTerm',
      name: def.term,
      description: def.definition,
      inDefinedTermSet: { '@id': `${ORIGIN}/#terms` },
      url: abs(def.url)
    }))
  }
}

/**
 * The fact sheet — the atomic statements a generative engine quotes.
 */
export function factSheetSchema() {
  return {
    '@type': 'ItemList',
    '@id': `${ORIGIN}/#facts`,
    name: 'Ultimate Players at a glance',
    description: oneLiner,
    numberOfItems: quickFacts.length,
    itemListElement: quickFacts.map((fact, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: fact.label,
      item: {
        '@type': 'PropertyValue',
        name: fact.label,
        value: fact.value,
        description: fact.spoken
      }
    }))
  }
}

/**
 * ItemList for a catalogue of rentable services (party supplies).
 */
export function serviceListSchema({ name, description, items, path }) {
  return {
    '@type': 'ItemList',
    '@id': `${abs(path)}#itemlist`,
    name,
    description,
    numberOfItems: items.length,
    itemListElement: items.map((item, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      item: {
        '@type': 'Service',
        name: item.title,
        description: item.subtitle,
        image: abs(item.image),
        serviceType: item.category,
        provider: { '@id': ORG_ID },
        url: abs(`${path}#${item.id}`)
      }
    }))
  }
}

/**
 * ItemList for the additive services (Nerf Wars, water guns, seating).
 */
export function additiveServiceSchema({ name, description, services, path }) {
  return {
    '@type': 'ItemList',
    '@id': `${abs(path)}#addon-services`,
    name,
    description,
    numberOfItems: services.length,
    itemListElement: services.map((svc, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      item: {
        '@type': 'Service',
        name: svc.title,
        description: svc.description,
        serviceType: svc.tagline,
        provider: { '@id': ORG_ID },
        areaServed: cityList(),
        url: abs(`${path}#${svc.id}`)
      }
    }))
  }
}

/**
 * ImageGallery for the event photo archive.
 */
export function imageGallerySchema({ name, description, photos, path }) {
  return {
    '@type': 'ImageGallery',
    '@id': `${abs(path)}#gallery`,
    url: abs(path),
    name,
    description,
    numberOfItems: photos.length,
    image: photos.map((p) => ({
      '@type': 'ImageObject',
      url: abs(p.url),
      caption: p.title,
      contentUrl: abs(p.url)
    }))
  }
}

/**
 * The graph injected on every route.
 *
 * `route` nodes are merged with the site-wide entities so a single
 * `<script type="application/ld+json">` can be shipped instead of several
 * disconnected ones.
 */
export function buildSchemaGraph(route = {}) {
  const {
    path = '/',
    title,
    description = siteConfig.shortDescription,
    image = siteConfig.images.ogDefault,
    breadcrumb = [],
    faq = false,
    itemList = null,
    imageGallery = null,
    extraSchema = [],
    speakable = null,
    datePublished = null,
    dateModified = null,
    includeCore = true
  } = route

  const graph = []

  if (includeCore) {
    graph.push(organizationSchema(), webSiteSchema(), serviceSchema())
  }

  const hasBreadcrumb = breadcrumb.length > 0

  graph.push(
    webPageSchema({
      path,
      title,
      description,
      image,
      hasBreadcrumb,
      speakable,
      datePublished,
      dateModified
    })
  )

  if (hasBreadcrumb) graph.push(breadcrumbSchema(breadcrumb))
  if (faq) graph.push(faqPageSchema())
  if (itemList) graph.push(...[].concat(itemList))
  if (imageGallery) graph.push(...[].concat(imageGallery))
  if (extraSchema.length) graph.push(...[].concat(extraSchema))

  return {
    '@context': 'https://schema.org',
    '@graph': graph
  }
}

export default buildSchemaGraph
