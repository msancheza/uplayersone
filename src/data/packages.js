/**
 * Canonical fleet + pricing catalogue.
 *
 * Single source of truth for the gaming units: the pricing page renders
 * straight from this array and the Offer / hasOfferCatalog structured data
 * is generated from the same records, so a price shown to a visitor can
 * never disagree with the price sent to search engines.
 */
export const packages = [
  {
    id: 1,
    name: 'Standard Gaming Truck',
    num: '01',
    basePrice: 450,
    baseDuration: 'First 2 Hours',
    extraHourPrice: 130,
    tvs: '4 Inside · 2 Outside',
    tvCount: 6,
    features: ['A/C Units', 'Stadium Seating', 'Surround System', 'LED Lights'],
    consoles: [
      '2× Nintendo Switch',
      '1× PlayStation 4',
      '1× PlayStation 5',
      '1× Xbox One S',
      '1× Xbox Series X'
    ],
    popular: false,
    tag: 'OUTDOOR & INDOOR',
    capacity: 'Up to 20 players'
  },
  {
    id: 2,
    name: 'Deluxe Gaming Truck',
    num: '02',
    basePrice: 450,
    baseDuration: 'First 2 Hours',
    extraHourPrice: 130,
    tvs: '6 TVs All Inside',
    tvCount: 6,
    features: ['A/C Units', 'Stadium Seating', 'Surround System', 'LED Lights'],
    consoles: [
      '2× Nintendo Switch',
      '1× PlayStation 4',
      '1× PlayStation 5',
      '1× Xbox One S',
      '1× Xbox Series X'
    ],
    popular: true,
    tag: 'MOST POPULAR',
    capacity: 'Up to 20 players'
  },
  {
    id: 3,
    name: 'Gaming Bus',
    num: '03',
    basePrice: 450,
    baseDuration: 'First 2 Hours',
    extraHourPrice: 130,
    tvs: '6 TVs All Inside',
    tvCount: 6,
    features: ['Stadium Seating'],
    consoles: [
      '2× Nintendo Switch',
      '1× PlayStation 4',
      '1× PlayStation 5',
      '1× Xbox',
      '1× Xbox Series X'
    ],
    popular: false,
    tag: 'MOBILE BUS',
    capacity: 'Up to 24 players'
  },
  {
    id: 4,
    name: 'Elite Gaming Truck',
    num: '04',
    basePrice: 500,
    baseDuration: 'First 2 Hours',
    extraHourPrice: 130,
    tvs: '10 TVs All Inside',
    tvCount: 10,
    features: ['A/C Units', 'Stadium Seating', 'Surround System', 'LED Lights'],
    consoles: [
      '2× Nintendo Switch',
      '3× PlayStation 4',
      '1× PlayStation 5',
      '3× Xbox One S',
      '1× Xbox Series X'
    ],
    popular: false,
    tag: 'ULTIMATE 10 TVS',
    capacity: 'Up to 30 players'
  }
]

/** Optional add-ons offered on top of any package. */
export const addOns = [
  {
    name: 'Oculus Quest 2 Virtual Reality Experience',
    description:
      'Immersive VR stations added to any gaming truck or bus package, with full coaching assistance and sanitized VR headsets.',
    price: 100,
    extraHourPrice: 50,
    duration: 'First 2 Hours'
  }
]

export default packages
