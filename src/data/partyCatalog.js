/**
 * Party Essentials catalogue.
 *
 * Sourced from the real photos in /public/supplies. Each card needs a real
 * photo, a friendly title, a category tag and a starting price label. We
 * only show "Starting at" where the price is real; everything else is a
 * custom quote so the page never advertises a number we cannot honour.
 *
 * Shared by the Party Essentials view and the structured data builder so
 * the visible catalogue and the markup sent to search engines cannot drift.
 */
export const catalog = [
  /* BALLOONS */
  { id: 'b1', category: 'balloons', badge: 'POPULAR', title: 'GAMING BALLOON GARLAND',  subtitle: 'Balloon Décor · Custom Colors',  image: '/supplies/balloon_decor/IMG_2893-1.jpg', webp: '/supplies/balloon_decor/IMG_2893-1.webp',  price: 'Starting at $___' },
  { id: 'b2', category: 'balloons', badge: '',        title: 'THEMED BALLOON ARCH',     subtitle: 'Entryway · Photo Backdrop',    image: '/supplies/balloon_decor/IMG_2929-1.jpg', webp: '/supplies/balloon_decor/IMG_2929-1.webp',  price: 'Custom Quote' },
  { id: 'b3', category: 'balloons', badge: 'NEW',     title: 'ORGANIC BALLOON CLOUD',   subtitle: 'Ceiling Install · Pastel',     image: '/supplies/balloon_decor/IMG_484028129.jpg', webp: '/supplies/balloon_decor/IMG_484028129.webp', price: 'Custom Quote' },
  { id: 'b4', category: 'balloons', badge: '',        title: 'NUMBER BALLOON SET',      subtitle: 'Ages 1–18 · Gold or Silver',   image: '/supplies/balloon_decor/IMG_4956-1.jpg', webp: '/supplies/balloon_decor/IMG_4956-1.webp',  price: 'Starting at $___' },
  { id: 'b5', category: 'balloons', badge: '',        title: 'CHARACTER BALLOON BOUQUET', subtitle: 'Custom Themes',               image: '/supplies/balloon_decor/IMG_4987.jpg', webp: '/supplies/balloon_decor/IMG_4987.webp',    price: 'Custom Quote' },
  { id: 'b6', category: 'balloons', badge: '',        title: 'BALLOON CENTERPIECES',    subtitle: 'Set of 6 · Themed',           image: '/supplies/balloon_decor/IMG_4993.jpg', webp: '/supplies/balloon_decor/IMG_4993.webp',    price: 'Starting at $___' },
  { id: 'b7', category: 'balloons', badge: '',        title: 'BIRTHDAY BALLOON WALL',    subtitle: 'Photo-worthy Backdrop',       image: '/supplies/balloon_decor/IMG_5222.jpg', webp: '/supplies/balloon_decor/IMG_5222.webp',    price: 'Custom Quote' },
  { id: 'b8', category: 'balloons', badge: 'SUMMER',  title: 'GAMING PARTY BALLOONS',    subtitle: 'Console-themed Setup',        image: '/supplies/balloon_decor/IMG_5503.jpg', webp: '/supplies/balloon_decor/IMG_5503.webp',    price: 'Starting at $___' },
  { id: 'b9', category: 'balloons', badge: '',        title: 'CUSTOM COLOR GARLAND',     subtitle: 'Any Palette · 6–10 ft',       image: '/supplies/balloon_decor/IMG_6614.jpg', webp: '/supplies/balloon_decor/IMG_6614.webp',    price: 'Custom Quote' },

  /* DÉCOR */
  { id: 'd1', category: 'decor', badge: 'POPULAR', title: 'GLOW NEON SIGN',           subtitle: 'Custom Name or Phrase',     image: '/supplies/decors/E3C6F680-_01-1.jpg', webp: '/supplies/decors/E3C6F680-_01-1.webp',  price: 'Starting at $___' },
  { id: 'd2', category: 'decor', badge: '',        title: 'PARTY BACKDROP KIT',       subtitle: 'Stand + Drapes + Custom',   image: '/supplies/decors/IMG_3754-1.jpg', webp: '/supplies/decors/IMG_3754-1.webp',     price: 'Starting at $___' },
  { id: 'd3', category: 'decor', badge: '',        title: 'TABLE DÉCOR SET',          subtitle: 'Plates · Napkins · Cutlery', image: '/supplies/decors/IMG_3755-1.jpg', webp: '/supplies/decors/IMG_3755-1.webp',     price: 'Starting at $___' },
  { id: 'd4', category: 'decor', badge: 'NEW',     title: 'CUSTOM PHOTO WALL',        subtitle: 'Printed Backdrop',          image: '/supplies/decors/IMG_4842-1.jpg', webp: '/supplies/decors/IMG_4842-1.webp',     price: 'Custom Quote' },
  { id: 'd5', category: 'decor', badge: '',        title: 'CENTERPIECE BUNDLE',       subtitle: '5 Themed Centerpieces',     image: '/supplies/decors/IMG_4849-1-1.jpg', webp: '/supplies/decors/IMG_4849-1-1.webp',   price: 'Starting at $___' },
  { id: 'd6', category: 'decor', badge: '',        title: 'DESSERT TABLE SETUP',      subtitle: 'Linens · Risers · Skirts',  image: '/supplies/decors/IMG_4849.jpg', webp: '/supplies/decors/IMG_4849.webp',       price: 'Custom Quote' },
  { id: 'd7', category: 'decor', badge: '',        title: 'LED UPLIGHT PACK',         subtitle: 'Set of 4 · Color Changing',  image: '/supplies/decors/IMG_4849_01-2.jpg', webp: '/supplies/decors/IMG_4849_01-2.webp',  price: 'Starting at $___' },
  { id: 'd8', category: 'decor', badge: '',        title: 'SIGNAGE + WAYFINDING',     subtitle: 'Custom Prints',             image: '/supplies/decors/IMG_5219-1.jpg', webp: '/supplies/decors/IMG_5219-1.webp',     price: 'Starting at $___' },
  { id: 'd9', category: 'decor', badge: '',        title: 'CONFETTI + BALLOON DROP',  subtitle: 'Surprise Moment',           image: '/supplies/decors/IMG_5219.jpg', webp: '/supplies/decors/IMG_5219.webp',       price: 'Custom Quote' },

  /* JUMPERS */
  { id: 'j1', category: 'jumpers', badge: 'POPULAR', title: 'CLASSIC CASTLE BOUNCE',   subtitle: '13×13 ft · Standard',     image: '/supplies/regular_jumpers/IMG_2030-1.jpg', webp: '/supplies/regular_jumpers/IMG_2030-1.webp',  price: 'Starting at $___' },
  { id: 'j2', category: 'jumpers', badge: '',        title: 'GAMING JUMPER',           subtitle: 'Console Theme · 15×15',   image: '/supplies/regular_jumpers/IMG_2245-1.jpg', webp: '/supplies/regular_jumpers/IMG_2245-1.webp',  price: 'Custom Quote' },
  { id: 'j3', category: 'jumpers', badge: '',        title: 'OBSTACLE COURSE',         subtitle: 'Dual Lane · 30 ft',       image: '/supplies/regular_jumpers/IMG_2530-1.jpg', webp: '/supplies/regular_jumpers/IMG_2530-1.webp',  price: 'Starting at $___' },
  { id: 'j4', category: 'jumpers', badge: 'NEW',     title: 'COMBO BOUNCE + SLIDE',    subtitle: 'All Ages · 18×18',        image: '/supplies/regular_jumpers/IMG_4114-1-1.jpg', webp: '/supplies/regular_jumpers/IMG_4114-1-1.webp', price: 'Starting at $___' },
  { id: 'j5', category: 'jumpers', badge: '',        title: 'SPORTS ARENA',            subtitle: 'Soccer · Basketball',      image: '/supplies/regular_jumpers/IMG_5006-1.jpg', webp: '/supplies/regular_jumpers/IMG_5006-1.webp',  price: 'Custom Quote' },
  { id: 'j6', category: 'jumpers', badge: '',        title: 'MINI JUMPER',             subtitle: 'Toddler Safe · Small',    image: '/supplies/regular_jumpers/IMG_5169-1.jpg', webp: '/supplies/regular_jumpers/IMG_5169-1.webp',  price: 'Starting at $___' },
  { id: 'j7', category: 'jumpers', badge: '',        title: 'WATER SLIDE COMBO',       subtitle: 'Wet + Dry · 22 ft',       image: '/supplies/regular_jumpers/IMG_6578-1-1.jpg', webp: '/supplies/regular_jumpers/IMG_6578-1-1.webp', price: 'Starting at $___' },
  { id: 'j8', category: 'jumpers', badge: 'SUMMER',  title: 'SPLASH PAD',              subtitle: 'Summer Cooler',           image: '/supplies/water_jumpers/IMG_7959-1.jpg', webp: '/supplies/water_jumpers/IMG_7959-1.webp',   price: 'Starting at $___' },
  { id: 'j9', category: 'jumpers', badge: '',        title: 'INTERACTIVE GAME JUMPER',  subtitle: 'Built-in Games',          image: '/supplies/activity_jumpers/IMG_1666_01-1.jpg', webp: '/supplies/activity_jumpers/IMG_1666_01-1.webp', price: 'Custom Quote' },
  { id: 'j10', category: 'jumpers', badge: '',       title: 'SPORT CHALLENGE',         subtitle: 'Inflatable Arena',        image: '/supplies/activity_jumpers/IMG_2232.jpg', webp: '/supplies/activity_jumpers/IMG_2232.webp',   price: 'Custom Quote' },

  /* PACKAGES — virtual cards (no separate photos in /public/supplies yet) */
  { id: 'p1', category: 'packages', badge: 'POPULAR', title: 'THE GAMER SETUP',         subtitle: 'Gaming truck + balloon décor',          image: '/supplies/balloon_decor/IMG_2893-1.jpg', webp: '/supplies/balloon_decor/IMG_2893-1.webp', price: 'Custom Quote', highlight: true },
  { id: 'p2', category: 'packages', badge: 'NEW',     title: 'THE ULTIMATE CELEBRATION', subtitle: 'Truck + décor + activity jumper',       image: '/supplies/decors/IMG_4849.jpg', webp: '/supplies/decors/IMG_4849.webp',       price: 'Custom Quote', highlight: true },
  { id: 'p3', category: 'packages', badge: 'SUMMER',  title: 'THE SPLASH PARTY',        subtitle: 'Water jumper + balloons + essentials', image: '/supplies/water_jumpers/IMG_7959.jpg', webp: '/supplies/water_jumpers/IMG_7959.webp',  price: 'Custom Quote' },
]

export default catalog
