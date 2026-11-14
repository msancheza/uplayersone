import siteConfig from '../config/siteConfig.js'
import { packages, addOns } from './packages.js'
import { commonFaqs } from './faqData.js'
import { partyServices } from './partyServices.js'

/**
 * Answer-engine ready content.
 *
 * Generative engines quote short, self-contained factual statements. This
 * module holds those statements as atomic units so the same facts can be
 * published in three places without drifting: the visible "At a glance"
 * panel, the llms.txt / Markdown builds, and the structured data.
 *
 * Every value here is traceable to something the business actually
 * publishes — the pricing table, the FAQ, the fleet sheet or the gallery.
 * Nothing in this file may be a guess.
 */

/** Headline facts, phrased so they can be quoted verbatim. */
export const quickFacts = [
  {
    label: 'SERVICE',
    value: 'Mobile gaming truck and gaming bus rental in Los Angeles, California',
    spoken: 'Ultimate Players is a mobile gaming truck and gaming bus rental company based in Los Angeles, California.'
  },
  {
    label: 'PHONE',
    value: '(626) 503-1189',
    spoken: `Call or text Ultimate Players at ${siteConfig.phone} to check availability.`
  },
  {
    label: 'HOURS',
    value: 'Monday to Sunday, 8:00 AM to 10:00 PM',
    spoken: 'Ultimate Players books events seven days a week, from 8 in the morning until 10 at night.'
  },
  {
    label: 'PRICING',
    value: `From $${packages[0].basePrice} for the first 2 hours`,
    spoken: `Gaming truck packages start at $${packages[0].basePrice} for the first two hours, with additional hours at $${packages[0].extraHourPrice}.`
  },
  {
    label: 'PAYMENT',
    value: 'Deposit to lock the date, balance due on arrival',
    spoken:
      'No full prepayment is required. A deposit locks in the date and time, and the remaining balance is paid on the day of the event.'
  },
  {
    label: 'CONSOLES',
    value: 'PlayStation 5, Xbox Series X, Nintendo Switch',
    spoken:
      'Every unit carries PlayStation 5, Xbox Series X and Nintendo Switch stations with stadium seating, air conditioning and surround sound.'
  },
  {
    label: 'SETUP',
    value: 'Arrives 15 to 20 minutes before your start time',
    spoken:
      'The crew arrives 15 to 20 minutes early to set up the generator, test the consoles and level the unit before the party starts.'
  },
  {
    label: 'SERVICE AREA',
    value: `Los Angeles, Pasadena, Burbank, Glendale and ${siteConfig.serviceArea.length - 4} more cities`,
    spoken: `Ultimate Players serves ${siteConfig.serviceArea.length} cities across Los Angeles County, the San Gabriel Valley, Orange County and the Inland Empire.`
  }
]

/**
 * Conversational questions — re-exported from the FAQ source so the LLM
 * builders and the visible accordion can never drift apart.
 */
export const conversationalFaqs = commonFaqs

/**
 * Service definitions — each one a term an assistant can look up.
 */
export const serviceDefinitions = [
  {
    term: 'Mobile gaming truck rental',
    definition:
      'Renting a truck or bus that is converted into a mobile video game arcade and driven to the customer’s street for a private event. The rental includes the vehicle, the consoles, the displays, a professional game coach and full setup and teardown.',
    url: '/pricing'
  },
  {
    term: 'Nerf Wars rental',
    definition:
      'A live-action dart combat setup delivered to the event, including blasters, soft-dart ammo, safety gear, a scored field and referee supervision, run alongside the gaming truck.',
    url: '/party-essentials'
  },
  {
    term: 'Water gun party rental',
    definition:
      'Pressurized water guns, refill stations, protective eyewear and a marked play zone that turn the street or backyard into a supervised splash battle.',
    url: '/party-essentials'
  },
  {
    term: 'Water slide jumper rental',
    definition:
      'An inflatable water slide combined with a bounce house, sized for all ages and delivered with setup and breakdown included.',
    url: '/party-essentials'
  },
  {
    term: 'Party tables and chairs rental',
    definition:
      'Folding tables, folding chairs, linens, tablecloths, centerpieces and party decor delivered, placed and collected alongside a gaming truck reservation.',
    url: '/party-essentials'
  },
  ...packages.map((pkg) => ({
    term: pkg.name,
    definition: `${pkg.tvCount} TVs (${pkg.tvs}). Consoles: ${pkg.consoles.join(', ')}. Features: ${pkg.features.join(', ')}. ${pkg.capacity}. Priced at $${pkg.basePrice} for the first 2 hours, $${pkg.extraHourPrice} per additional hour.`,
    url: '/pricing'
  })),
  ...partyServices.map((svc) => ({
    term: svc.title.toLowerCase().replace(/^[a-z]/, (c) => c.toUpperCase()),
    definition: svc.description,
    url: '/party-essentials'
  }))
]

/** One-line answer to "what is this business", used in llms.txt and schema. */
export const oneLiner =
  'Ultimate Players is a Los Angeles mobile gaming truck and gaming bus rental company. The trucks and buses are driven to the customer’s street for birthdays, school events, corporate activations and tournaments, with PlayStation 5, Xbox Series X and Nintendo Switch stations, a professional game coach, and add-ons including Nerf Wars, water guns, water slide jumpers, inflatable jumpers, party tables, chairs, décor and balloon setups.'

export default { quickFacts, conversationalFaqs, serviceDefinitions, oneLiner }
