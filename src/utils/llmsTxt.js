import siteConfig from '../config/siteConfig.js'
import { packages, addOns } from '../data/packages.js'
import { partyServices } from '../data/partyServices.js'
import { catalog } from '../data/partyCatalog.js'
import { faqs } from '../data/faqData.js'
import galleryData from '../data/gallery.json' with { type: 'json' }
import {
  quickFacts,
  conversationalFaqs,
  serviceDefinitions,
  oneLiner
} from '../data/geoContent.js'

/**
 * Builds the LLM-facing surfaces of the site:
 *
 *   /llms.txt          curated index (llms.txt v2 format)
 *   /llms-full.txt     the full text of the site in one document
 *   /<route>.md        a clean Markdown version of each page
 *
 * The v2 spec (August 2026) expects markdown versions to be discoverable
 * through `rel="alternate" type="text/markdown"` and the covering llms.txt
 * through `rel="describedby"`.
 */

const ORIGIN = siteConfig.url.replace(/\/+$/, '')
export const abs = (p = '/') =>
  `${ORIGIN}${p.startsWith('/') ? p : `/${p}`}`

const stripMd = (s = '') => String(s).replace(/[*_`]/g, '').trim()

/* ------------------------------------------------------------------ */
/* Markdown page bodies                                                */
/* ------------------------------------------------------------------ */

function homeMarkdown() {
  const lines = [
    `# ${siteConfig.name} — Gaming Truck Rental Los Angeles`,
    '',
    oneLiner,
    '',
    '## Quick facts',
    '',
    ...quickFacts.map((f) => `- **${f.label}:** ${stripMd(f.value)}`),
    '',
    '## Contact',
    '',
    `- Phone: ${siteConfig.phone}`,
    `- Hours: ${siteConfig.workingHours}`,
    `- Service area: ${siteConfig.serviceArea.join(', ')}`,
    '- Request a quote: https://www.ultimateplayersone.com/contact',
    '',
    '## Gaming units and pricing',
    '',
    '| Package | TVs | Consoles | Price (first 2 hours) | Extra hour |',
    '| --- | --- | --- | --- | --- |',
    ...packages.map(
      (p) =>
        `| ${p.name} | ${p.tvCount} (${p.tvs}) | ${p.consoles.join(', ')} | $${p.basePrice} | $${p.extraHourPrice} |`
    ),
    '',
    `Add-on: ${addOns[0].name} — $${addOns[0].price} for the first 2 hours, $${addOns[0].extraHourPrice} per additional hour.`,
    '',
    '## Party supplies and add-on services',
    '',
    ...partyServices.map(
      (s) => `- **${s.title}** — ${stripMd(s.description)} Features: ${s.features.join(', ')}.`
    ),
    '',
    `The party essentials catalogue lists ${catalog.length} items including balloon décor, themed backdrops, table décor, inflatable jumpers, water slides, splash pads and combo packages.`,
    '',
    '## Events served',
    '',
    '- Birthdays, graduations and milestone celebrations',
    '- Block parties and community events',
    '- School functions, reward days, carnivals and STEM events',
    '- Gaming tournaments and esports competitions',
    '- Corporate activations, team building and private VIP events',
    '- Fundraisers, church functions and youth groups',
    '',
    '## Frequently asked questions',
    '',
    ...faqs.map(
      (f) =>
        `### ${f.question}\n\n${f.answer}${
          f.highlights?.length
            ? '\n\n' + f.highlights.map((h) => `- **${h.title}:** ${h.desc}`).join('\n')
            : ''
        }${f.policyNotice ? `\n\n**Policy:** ${f.policyNotice}` : ''}\n`
    ),
    '## Frequently asked questions (conversational)',
    '',
    ...conversationalFaqs.map((f) => `### ${f.q}\n\n${f.a}\n`),
    '',
    '## Page index',
    '',
    '- [Pricing and packages](https://www.ultimateplayersone.com/pricing.md)',
    '- [Party essentials and rentals](https://www.ultimateplayersone.com/party-essentials.md)',
    '- [Live event gallery](https://www.ultimateplayersone.com/gallery.md)',
    '- [Contact and booking](https://www.ultimateplayersone.com/contact.md)',
    '- [Our policies](https://www.ultimateplayersone.com/our-policies.md)',
    '- [Terms and conditions](https://www.ultimateplayersone.com/terms-and-conditions.md)',
    '- [Privacy policy](https://www.ultimateplayersone.com/privacy-policy.md)'
  ]
  return lines.join('\n')
}

function pricingMarkdown() {
  const lines = [
    '# Gaming Truck Prices & Packages — Ultimate Players',
    '',
    `Official gaming truck rental prices in Los Angeles. Packages start at $${packages[0].basePrice} for the first 2 hours. No full prepayment is required — a deposit locks the date and the balance is due on the day of the event.`,
    '',
    '## Packages',
    '',
    ...packages.flatMap((p) => [
      `### ${p.name} — $${p.basePrice} (first 2 hours)`,
      '',
      `- Displays: ${p.tvCount} (${p.tvs})`,
      `- Consoles: ${p.consoles.join(', ')}`,
      `- Features: ${p.features.join(', ')}`,
      `- Capacity: ${p.capacity}`,
      `- Additional hours: $${p.extraHourPrice} per hour`,
      `- Tag: ${p.tag}`,
      ''
    ]),
    `## Add-on: ${addOns[0].name}`,
    '',
    `${addOns[0].description} Price: $${addOns[0].price} for the first 2 hours, $${addOns[0].extraHourPrice} per additional hour.`,
    '',
    '## Booking and payment',
    '',
    '- A deposit secures the date and time; the balance is paid on arrival.',
    '- Major credit and debit cards are accepted through encrypted payment processing.',
    '- The crew arrives 15 to 20 minutes before the scheduled start time.',
    '- Roughly 50 to 60 feet of curbside space is required on a reasonably level street.',
    '',
    '## Contact',
    '',
    `Call or text ${siteConfig.phone} or send an event request at https://www.ultimateplayersone.com/contact`,
    ''
  ]
  return lines.join('\n')
}

function partyEssentialsMarkdown() {
  const byCategory = catalog.reduce((acc, item) => {
    acc[item.category] = acc[item.category] || []
    acc[item.category].push(item)
    return acc
  }, {})

  const lines = [
    '# Party Essentials & Rentals — Ultimate Players',
    '',
    'Party rental essentials in Los Angeles, delivered with any gaming truck or gaming bus booking: Nerf Wars arenas, water guns, water slide jumpers, inflatable jumpers, party tables, chairs, décor and balloon setups.',
    '',
    '## Add-on services',
    '',
    ...partyServices.flatMap((s) => [
      `### ${s.title}`,
      '',
      s.description,
      '',
      `- Includes: ${s.features.join(', ')}`,
      ''
    ]),
    '## Catalogue',
    ''
  ]

  for (const [category, items] of Object.entries(byCategory)) {
    lines.push(`### ${category} (${items.length} items)`, '')
    items.forEach((i) => {
      lines.push(`- **${i.title}** — ${i.subtitle} (${i.price})`)
    })
    lines.push('')
  }

  lines.push(
    '## Bundle it with a gaming truck',
    '',
    'Party essentials can be combined with any gaming truck or gaming bus package as one order, one delivery window and one invoice.',
    '',
    '## Contact',
    '',
    `Call or text ${siteConfig.phone} or send an event request at https://www.ultimateplayersone.com/contact`,
    ''
  )
  return lines.join('\n')
}

function galleryMarkdown() {
  const counts = galleryData.categories
    .map((c) => {
      const n =
        c.id === 'all'
          ? galleryData.photos.length
          : galleryData.photos.filter((p) => p.category === c.id).length
      return `- ${c.name}: ${n} photos`
    })
    .join('\n')

  const locations = [...new Set(galleryData.photos.map((p) => p.location))].sort()

  return [
    '# Live Event Gallery — Ultimate Players',
    '',
    `Real photography from ${galleryData.photos.length} Ultimate Players events across Los Angeles — gaming truck birthdays, tournaments, corporate activations and community parties. Each photo opens full screen.`,
    '',
    '## Categories',
    '',
    counts,
    '',
    '## Locations photographed',
    '',
    ...locations.map((l) => `- ${l}`),
    '',
    '## Recent events',
    '',
    ...galleryData.photos
      .slice(0, 12)
      .map(
        (p) =>
          `- **${p.tag}** — ${p.description} Location: ${p.location}. ${p.specs || ''}`.trim()
      ),
    '',
    '## Book the same experience',
    '',
    `Call or text ${siteConfig.phone} or send an event request at https://www.ultimateplayersone.com/contact`,
    ''
  ].join('\n')
}

function contactMarkdown() {
  return [
    '# Contact & Book a Gaming Truck — Ultimate Players',
    '',
    `Book a mobile gaming truck or gaming bus in Los Angeles. The fastest way to get a custom proposal is the event request form — there is no upfront payment and the team replies with availability and a quote.`,
    '',
    '## Contact details',
    '',
    `- Phone: ${siteConfig.phone}`,
    `- Hours: ${siteConfig.workingHours}`,
    `- Email: ${siteConfig.email}`,
    '- Event request form: https://www.ultimateplayersone.com/contact',
    '',
    '## Service area',
    '',
    `${siteConfig.serviceArea.join(', ')}`,
    '',
    '## What happens next',
    '',
    '1. Send an event request with your date, location, guest count and occasion.',
    '2. The team replies with availability and a custom proposal.',
    '3. A deposit locks the date; the balance is due on the day of the event.',
    '',
    '## Before the truck arrives',
    '',
    '- Clear roughly 50 to 60 feet of curbside space on a reasonably level street.',
    '- The truck parks curbside only — not in driveways, alleys, backyards or lawns.',
    '- The crew arrives 15 to 20 minutes early to set up and test the equipment.',
    '',
    '## Common questions',
    '',
    ...conversationalFaqs.slice(0, 5).map((f) => `### ${f.q}\n\n${f.a}\n`),
    ''
  ].join('\n')
}

function policiesMarkdown() {
  return [
    '# Our Policies — Ultimate Players',
    '',
    'Deposit, cancellation, rescheduling, parking, supervision, damage and weather policies for Ultimate Players mobile gaming truck and gaming bus rentals in Los Angeles.',
    '',
    '## Key points',
    '',
    '- A deposit is required to lock in the date and time; the remaining balance is due on the day of the event.',
    '- The units park curbside on public streets or designated commercial lots. They do not park in driveways, alleys, backyards, lawns or residential parking structures.',
    '- Roughly 50 to 60 feet of curbside space is required on a reasonably level street with adequate overhead clearance.',
    '- Full policy text is published on this page for review before booking.',
    '',
    '## Full policy',
    '',
    'Read the complete policy at https://www.ultimateplayersone.com/our-policies',
    '',
    '## Related',
    '',
    '- [Terms and conditions](https://www.ultimateplayersone.com/terms-and-conditions.md)',
    '- [Privacy policy](https://www.ultimateplayersone.com/privacy-policy.md)',
    ''
  ].join('\n')
}

function privacyMarkdown() {
  return [
    '# Privacy Policy — Ultimate Players',
    '',
    'How Ultimate Players collects, uses and protects personal information, including children’s privacy (COPPA), photography and media capture at events, data security and storage.',
    '',
    '## Key points',
    '',
    '- Personal information is collected only to deliver and coordinate the booked event.',
    '- Photography and media capture policies apply at all events; ask the crew before filming.',
    '- Children’s information is handled under COPPA-compliant practices.',
    '',
    '## Full policy',
    '',
    'Read the complete policy at https://www.ultimateplayersone.com/privacy-policy',
    ''
  ].join('\n')
}

function termsMarkdown() {
  return [
    '# Terms & Conditions — Ultimate Players',
    '',
    'Booking, deposit, cancellation, vehicle access, parking, adult supervision, food and alcohol, damage, liability, weather, permits and special request terms for Ultimate Players mobile gaming truck and gaming bus rentals in Los Angeles.',
    '',
    '## Key points',
    '',
    '- Booking is confirmed once the deposit is received.',
    '- The units park curbside only; driveways, alleys, backyards and residential parking structures are not used.',
    '- An adult must supervise children at all times during the event.',
    '- The balance of the payment is due on the day of the event before gameplay begins.',
    '',
    '## Full terms',
    '',
    'Read the complete terms at https://www.ultimateplayersone.com/terms-and-conditions',
    ''
  ].join('\n')
}

export const markdownPages = {
  '/index.md': homeMarkdown,
  '/pricing.md': pricingMarkdown,
  '/party-essentials.md': partyEssentialsMarkdown,
  '/gallery.md': galleryMarkdown,
  '/contact.md': contactMarkdown,
  '/our-policies.md': policiesMarkdown,
  '/privacy-policy.md': privacyMarkdown,
  '/terms-and-conditions.md': termsMarkdown
}

/* ------------------------------------------------------------------ */
/* llms.txt                                                            */
/* ------------------------------------------------------------------ */

/**
 * The curated index. Small enough to fit comfortably in a context window;
 * the detail lives behind the links.
 */
export function buildLlmsTxt() {
  return [
    `# ${siteConfig.name}`,
    '',
    `> ${oneLiner}`,
    '',
    'Ultimate Players rents mobile gaming trucks and gaming buses across Los Angeles and nearby cities. The units are driven to the customer’s street for a private event and include the consoles, the displays, a professional game coach and full setup and teardown. A deposit locks the date; the balance is paid on the day of the event.',
    '',
    'Key facts:',
    '',
    ...quickFacts.map((f) => `- **${f.label}:** ${stripMd(f.value)}`),
    '',
    'Contact:',
    '',
    `- Phone: ${siteConfig.phone}`,
    `- Hours: ${siteConfig.workingHours}`,
    `- Email: ${siteConfig.email}`,
    `- Service area: ${siteConfig.serviceArea.join(', ')}`,
    '',
    '## Services',
    '',
    ...serviceDefinitions.map(
      (s) => `- **${s.term}:** ${stripMd(s.definition)}`
    ),
    '',
    '## Pages',
    '',
    '- [Gaming truck rental Los Angeles](https://www.ultimateplayersone.com/index.md): What the business is, quick facts, fleet, pricing, add-ons and full FAQ',
    '- [Gaming truck prices and packages](https://www.ultimateplayersone.com/pricing.md): Package-by-package pricing, console lists, display counts and booking terms',
    '- [Party essentials and rentals](https://www.ultimateplayersone.com/party-essentials.md): Nerf Wars, water guns, water slide jumpers, jumpers, tables, chairs, décor and balloons',
    '- [Live event gallery](https://www.ultimateplayersone.com/gallery.md): 40 real event photos with categories and locations',
    '- [Contact and booking](https://www.ultimateplayersone.com/contact.md): Phone, hours, service area and how the booking process works',
    '',
    '## Policies',
    '',
    '- [Our policies](https://www.ultimateplayersone.com/our-policies.md): Deposit, cancellation, rescheduling and safety policies',
    '- [Terms and conditions](https://www.ultimateplayersone.com/terms-and-conditions.md): Booking, parking, supervision, damage and weather terms',
    '- [Privacy policy](https://www.ultimateplayersone.com/privacy-policy.md): Data collection, children’s privacy and photography policies',
    '',
    '## Optional',
    '',
    '- [Complete site text in one document](https://www.ultimateplayersone.com/llms-full.txt): Every page concatenated, for agents that prefer one fetch',
    '- [XML sitemap](https://www.ultimateplayersone.com/sitemap.xml): Canonical URLs for every indexable page',
    ''
  ].join('\n')
}

/**
 * The whole site in one document.
 */
export function buildLlmsFullTxt() {
  const sections = [
    ['Home', homeMarkdown()],
    ['Pricing', pricingMarkdown()],
    ['Party Essentials', partyEssentialsMarkdown()],
    ['Gallery', galleryMarkdown()],
    ['Contact', contactMarkdown()],
    ['Our Policies', policiesMarkdown()],
    ['Privacy Policy', privacyMarkdown()],
    ['Terms & Conditions', termsMarkdown()]
  ]

  return [
    `# ${siteConfig.name} — complete site text`,
    '',
    `> ${oneLiner}`,
    '',
    `Canonical origin: ${ORIGIN}`,
    '',
    ...sections.flatMap(([title, body]) => [
      '---',
      '',
      body.trim(),
      ''
    ])
  ].join('\n')
}

export default buildLlmsTxt
