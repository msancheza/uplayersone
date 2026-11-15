// Global Site Configuration & Contact Info
export const siteConfig = {
  name: 'ULTIMATE PLAYERS',
  legalName: 'Ultimate Players',
  tagline: '360 Gaming Truck & Esports Services',
  location: 'LOS ANGELES, CA',
  serviceType: 'GAMING TRUCK SERVICES',

  // Canonical production origin. Every SEO artifact (canonical links,
  // sitemap.xml, robots.txt, OG urls, JSON-LD @id) is derived from this
  // single value so the domain is changed in exactly one place.
  url: 'https://www.ultimateplayersone.com',

  // Short descriptor reused across meta descriptions and JSON-LD.
  shortDescription:
    'Mobile gaming truck rental in Los Angeles. PS5, Xbox Series X and Nintendo Switch, professional game coaches, Nerf Wars, water guns, jumpers, water slides, tables and chairs.',

  // Primary keyword set — used for the meta keywords tag and the
  // `keywords` field of the WebSite / Organization schema.
  keywords: [
    'gaming truck rental Los Angeles',
    'mobile gaming truck rental',
    'video game truck rental',
    'gaming bus rental',
    'party truck rental Los Angeles',
    'Nerf Wars rental',
    'water gun party rental',
    'water slide jumper rental',
    'bounce house rental Los Angeles',
    'party rental supplies',
    'PS5 party truck',
    'esports party rental',
    'birthday gaming truck',
    'corporate gaming truck rental'
  ],

  // Primary service type and the concrete offering list.
  services: [
    'Mobile Gaming Truck Rental',
    'Gaming Bus Rental',
    'Video Game Rental Service',
    'Nerf Wars Arena Rental',
    'Water Gun Party Rental',
    'Water Slide Jumper Rental',
    'Inflatable Jumper & Bounce House Rental',
    'Party Tables & Chairs Rental',
    'Party Decor & Balloon Setup'
  ],

  // Cities covered. Used for `areaServed` in the Service schema and for
  // the visible coverage copy — no street address is published anywhere
  // because the trucks travel to the customer's location.
  serviceArea: [
    'Los Angeles',
    'Alhambra',
    'Pasadena',
    'Glendale',
    'Burbank',
    'Long Beach',
    'Santa Monica',
    'Arcadia',
    'Monrovia',
    'Covina',
    'Whittier',
    'Irvine',
    'Anaheim',
    'Torrance',
    'Santa Clarita',
    'San Gabriel Valley'
  ],

  // Contact Details
  phone: '(626) 503 1189',
  // E.164 international format with US country code +1, no spaces or
  // punctuation — this is what mobile dialers reliably parse for both
  // the <a href="tel:…"> click-to-call and SMS links.
  phoneRaw: '+16265031189',
  phoneTel: 'tel:+16265031189',
  email: 'info@ultimateplayersone.com',
  address: 'Los Angeles, CA & Surrounding Areas',
  workingHours: 'Mon - Sun: 8:00 AM - 10:00 PM',

  // Social Media Links
  socials: {
    instagram: 'https://instagram.com/UltimatePlayersOne',
    facebook: 'https://www.facebook.com/UltimatePlayersOne/',
    tiktok: 'https://tiktok.com/@ultimateplayersone',
    youtube: 'https://youtube.com/@uplayersone',
    yelp: 'https://www.yelp.com/biz/ultimate-players-alhambra-3'
  },

  // Absolute URLs for social preview images. Resolved against `url`.
  images: {
    logo: '/logo.png',
    ogDefault: '/og-image.jpg',
    truckFleet: '/galleries/01.jpg'
  }
}

export default siteConfig
