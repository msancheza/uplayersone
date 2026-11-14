import {
  Globe,
  Share2,
  Phone,
  MapPin,
  ShieldCheck,
  AlertTriangle,
  Gamepad2,
  Sparkles,
  Users,
  CreditCard,
  Clock,
  FileText,
  Truck
} from 'lucide-vue-next'
import siteConfig from '../config/siteConfig.js'

/**
 * Single source of truth for the FAQ content.
 *
 * The accordion UI (FAQSection.vue) and the FAQPage structured data
 * (data/structuredData.js) both read from here, so the visible copy and
 * the markup sent to search engines can never drift apart.
 */
export const faqs = [
  {
    id: 1,
    question: 'How does it work?',
    type: 'booking',
    icon: Globe,
    answer: 'Booking with Ultimate Players is quick and seamless. Choose any of our convenient reservation channels:',
    options: [
      {
        icon: Globe,
        label: 'Website Configurator',
        text: 'Fill out our fast request form to receive a customized proposal with zero upfront payment.',
        action: 'contact',
        btnText: 'Start Request →'
      },
      {
        icon: Share2,
        label: 'Social Media',
        text: 'Send us a direct message on Instagram or Facebook for fast answers to your questions.',
        link: siteConfig.socials.instagram,
        btnText: 'Message Us →'
      },
      {
        icon: Phone,
        label: 'Direct Phone',
        text: `Call or text our event coordinator directly at ${siteConfig.phone}.`,
        tel: siteConfig.phoneTel,
        btnText: 'Call Now →'
      }
    ]
  },
  {
    id: 2,
    question: 'How do I know the trailer can come to my house?',
    type: 'location',
    icon: MapPin,
    answer: 'We service all residential neighborhoods and event venues across Los Angeles and surrounding counties, provided the street is safe, reasonably level, and accessible.',
    highlights: [
      {
        icon: Truck,
        title: 'Street Requirements',
        desc: 'We require approximately 50–60 feet of curbside space (roughly 4–5 parallel car lengths) on a reasonably flat street.'
      },
      {
        icon: ShieldCheck,
        title: 'Clearance & Safety',
        desc: 'Streets must have adequate overhead clearance free of low-hanging tree limbs, power lines, or severe sharp hills.'
      },
      {
        icon: MapPin,
        title: 'Service Coverage',
        desc: 'Covering Los Angeles, San Gabriel Valley, Pasadena, Glendale, Burbank, Long Beach, Irvine, and neighboring cities.'
      }
    ]
  },
  {
    id: 3,
    question: 'Can the gaming trailer go into my driveway?',
    type: 'parking',
    icon: AlertTriangle,
    answer: 'No, our gaming trailers and buses are operated exclusively curbside on public residential streets or designated commercial parking lots.',
    policyNotice: 'Ultimate Players does not park in driveways, alleys, backyards, lawns, or residential parking structures to prevent property damage and ensure optimal hydraulic leveling.',
    highlights: [
      {
        icon: ShieldCheck,
        title: 'Curbside Alignment',
        desc: 'We park directly in front of your residence, level the unit with hydraulic stabilizers, and operate self-powered quiet generators.'
      },
      {
        icon: AlertTriangle,
        title: 'Driveway Blocking',
        desc: 'We may park across your own driveway to ensure the safest, most stable setup without blocking neighbors or traffic.'
      }
    ]
  },
  {
    id: 4,
    question: 'Will the kids know what to do?',
    type: 'coach',
    icon: ShieldCheck,
    answer: "Absolutely! Every party is fully staffed with dedicated, certified Game Coaches who handle everything from start to finish.",
    highlights: [
      {
        icon: Gamepad2,
        title: 'Dedicated Game Coach',
        desc: 'Our coaches guide players, switch game titles, troubleshoot, and keep all players engaged and excited.'
      },
      {
        icon: Sparkles,
        title: 'Tournaments & Minigames',
        desc: 'We organize head-to-head tournaments (Mario Kart, Super Smash Bros, Fortnite) and age-appropriate rotations.'
      },
      {
        icon: Users,
        title: 'Stress-Free For Parents',
        desc: 'Parents can sit back and relax while our staff keeps all guests entertained, safe, and supervised.'
      }
    ]
  },
  {
    id: 5,
    question: 'Do I have to pay for the party in advance?',
    type: 'payment',
    icon: CreditCard,
    answer: 'No full prepayment is required upfront. We offer a flexible and secure booking structure:',
    highlights: [
      {
        icon: CreditCard,
        title: 'Deposit To Lock Date',
        desc: 'A non-refundable deposit guarantees your exclusive vehicle and time slot on our calendar.'
      },
      {
        icon: Clock,
        title: 'Balance Due On Arrival',
        desc: 'The remaining balance is paid on the day of your party before the gameplay begins.'
      },
      {
        icon: ShieldCheck,
        title: 'Secure Payment Methods',
        desc: 'We accept major credit and debit cards securely through encrypted payment processing.'
      }
    ]
  },
  {
    id: 6,
    question: 'What time will you be arriving?',
    type: 'arrival',
    icon: Clock,
    answer: 'We arrive 15 to 20 minutes prior to your scheduled reservation time to complete full setup and equipment testing.',
    highlights: [
      {
        icon: Clock,
        title: 'Early Arrival Setup',
        desc: 'Our team starts generators, initializes all consoles, tests controllers, and calibrates climate control before start time.'
      },
      {
        icon: Sparkles,
        title: 'Full Gameplay Time',
        desc: 'Your booked party time begins exactly at your scheduled time—setup time is completely on us.'
      },
      {
        icon: Truck,
        title: 'Host Preparation Tip',
        desc: 'Please ensure curbside parking space is cleared prior to our arrival to prevent any setup delays.'
      }
    ]
  },
  {
    id: 7,
    question: 'Where can I view your official policies?',
    type: 'policies',
    icon: FileText,
    answer: 'You can review all our official terms, cancellation policies, and guidelines directly online:',
    policyLinks: [
      {
        label: 'Cancellation & Refund Policy',
        desc: 'Deposit terms, rescheduling rules, and organization policies.',
        to: '/our-policies'
      },
      {
        label: 'Terms & Conditions',
        desc: 'Safety guidelines, supervision requirements, and damage policies.',
        to: '/terms-and-conditions'
      },
      {
        label: 'Privacy Policy',
        desc: 'Data protection standards and photo/media capture guidelines.',
        to: '/privacy-policy'
      }
    ]
  }
]

export default faqs
