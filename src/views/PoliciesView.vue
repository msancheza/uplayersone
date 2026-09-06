<script setup>
import { 
  ArrowLeft, 
  ShieldAlert, 
  FileText, 
  Users, 
  CloudRain, 
  UtensilsCrossed, 
  Lock, 
  Camera, 
  Truck, 
  PartyPopper, 
  Sparkles,
  Phone,
  ChevronRight,
  AlertTriangle
} from 'lucide-vue-next'
import { useRouter } from 'vue-router'
import siteConfig from '../config/siteConfig.js'

const router = useRouter()

const goHome = () => {
  router.push('/')
}

const goToBooking = () => {
  router.push('/#contact')
}

const policyCategories = [
  {
    id: 'cancellation',
    title: 'Refund & Cancellation Policy',
    icon: ShieldAlert,
    tag: 'DEPOSITS & FEES',
    items: [
      { label: 'Deposits', text: 'Non-refundable once the date and time are locked. No exceptions are made, including COVID-19 situations, rain, or shine.' },
      { label: 'Changes', text: 'No rescheduling of dates, times, or addresses.' },
      { label: 'Cancellation Fee', text: 'A fee of $200 per gaming trailer/bus and per service (including jumpers, activity, balloon décor, flower décor, nerf battle, popcorn machine, etc.) applies per day if canceled.' },
      { label: 'Payment', text: 'A valid credit or debit card is required to guarantee and pay for your reservation.' }
    ]
  },
  {
    id: 'events-orgs',
    title: 'Additional Policies for Organizations',
    icon: FileText,
    tag: 'SCHOOLS, CHURCHES & CORPS',
    notice: 'Applies to Schools, Churches, Fairs, Community Events, Tournaments, Businesses & Corporations',
    items: [
      { label: 'Deposits', text: 'Non-refundable under any circumstance.' },
      { label: 'Cancellation Fee', text: '$200 per gaming trailer or gaming bus if canceled by a representative or client.' },
      { label: 'Rescheduling', text: 'No rescheduling permitted (no exceptions).' }
    ]
  },
  {
    id: 'damage',
    title: 'Damage & Injury',
    icon: AlertTriangle,
    tag: 'LIABILITY & SAFETY',
    items: [
      { label: 'Property Damage', text: 'Ultimate Players and its employees are not responsible for any property damage (above ground or below ground) resulting from client requests to position the vehicle in a specific location.' },
      { label: 'Equipment Damage', text: 'Ultimate Players reserves the right to charge the client\'s credit card for any damage to the trailer or equipment caused by careless or willful behavior from guests.' },
      { label: 'Injuries', text: 'Ultimate Players assumes no responsibility for injuries sustained on the client’s property or designated location. All liability rests solely on the client/host.' }
    ]
  },
  {
    id: 'children',
    title: 'Supervised Children',
    icon: Users,
    tag: 'ADULT SUPERVISION',
    items: [
      { label: 'Adult Presence', text: 'A parent or responsible adult must be present inside or just outside the trailer at all times.' },
      { label: 'Children 5 & Under', text: 'Must be accompanied by a parent or legal guardian at all times inside the gaming trailer or bus.' }
    ]
  },
  {
    id: 'weather',
    title: 'Bad Weather Policy',
    icon: CloudRain,
    tag: 'ALL-WEATHER READY',
    items: [
      { label: 'Design', text: 'Trailers are climate-controlled (heating and A/C) and insulated for all weather conditions.' },
      { label: 'Severe Weather', text: 'In cases of severe weather (lightning, high winds, flooding, extremely heavy rain, snow, or ice), Ultimate Players reserves the right to reschedule to guarantee safety.' }
    ]
  },
  {
    id: 'food-alcohol',
    title: 'Food, Drinks, Alcohol & Drugs',
    icon: UtensilsCrossed,
    tag: 'STRICT PROHIBITION',
    items: [
      { label: 'Food & Drinks', text: 'Strictly prohibited inside the video game trailer. Please consume all food, candy, and drinks outside prior to entering.' },
      { label: 'Alcohol & Drugs', text: 'Not allowed or tolerated in or around the gaming trailer/equipment. Ultimate Players reserves the right to refuse, cancel, or cut short any event if alcohol or drugs are present or distributed.' }
    ]
  },
  {
    id: 'privacy',
    title: 'Privacy Policy',
    icon: Lock,
    tag: 'DATA PROTECTION',
    items: [
      { label: 'Data Usage', text: 'Information collected on the site is used solely to facilitate bookings and enhance customer experience.' },
      { label: 'Data Sharing', text: 'We do not sell, trade, or rent your personal information to third parties.' }
    ]
  },
  {
    id: 'media',
    title: 'Pictures & Video',
    icon: Camera,
    tag: 'MEDIA CAPTURE',
    items: [
      { label: 'Media Capture', text: 'A game coach will take photos/videos during the party from inside and outside the trailer.' },
      { label: 'Social Media', text: 'Photos may be posted to Facebook or Instagram, where you can view and save them.' },
      { label: 'Opt-Out', text: 'If you do not wish to have photos/videos taken or posted, you must notify a representative at the time of booking.' }
    ]
  },
  {
    id: 'parking',
    title: 'Truck, Trailer & Parking',
    icon: Truck,
    tag: 'VEHICLE ACCESS',
    items: [
      { label: 'Parking Location', text: 'We attempt to park in the most flat, level, and logical spot (usually directly in front of the residence). We may need to block your driveway.' },
      { label: 'Coach Discretion', text: 'The game coach has final authority on parking. They will not park anywhere that poses a danger to persons, property, or equipment.' },
      { label: 'Truck Attachment', text: 'The truck will never be disconnected from the trailer during an event.' },
      { label: 'Restricted Areas', text: 'Ultimate Players does not park in driveways, alleys, backyards, or residential parking structures.' }
    ]
  },
  {
    id: 'events',
    title: 'Birthday Parties & Events',
    icon: PartyPopper,
    tag: 'EVENT PROTOCOL',
    items: [
      { label: 'Arrival', text: 'We arrive 10 to 15 minutes early to set up.' },
      { label: 'Space Requirements', text: 'Clients must ensure enough space is clear to park the truck and trailer (typically the length of 4 cars).' },
      { label: 'Time Policy', text: 'Party time will not be extended to compensate for time lost clearing parking spots or moving cars.' }
    ]
  },
  {
    id: 'special-requests',
    title: 'Special Requests & Additional Fees',
    icon: Sparkles,
    tag: 'EXTRA COSTS APPLY',
    notice: 'The following requests incur additional fees (other restrictions may apply):',
    list: [
      'Parking in a driveway or inside private property.',
      'Parking inside a business or business parking structure.',
      'Parking inside a park.',
      'Specific or extra game requests.',
      'Certificate of Insurance (COI) requests.',
      'Online games setup.'
    ]
  }
]
</script>

<template>
  <div class="policies-page">
    
    <!-- Hero Banner -->
    <header class="policies-hero">
      <div class="container">
        
        <button class="back-link" @click="goHome">
          <ArrowLeft :size="16" />
          <span>Back to Home</span>
        </button>

        <div class="hero-badge">
          <Sparkles :size="14" class="text-red" />
          <span>TERMS & GUIDELINES</span>
        </div>

        <h1 class="hero-title">
          OUR <span class="text-red-glow">POLICIES</span>
        </h1>

        <p class="hero-lead">
          Please review our terms, safety guidelines, and event policies below to ensure a smooth, 
          safe, and unforgettable gaming experience.
        </p>

      </div>
    </header>

    <main class="policies-body">
      <div class="container">

        <!-- Grid of Policies -->
        <div class="policies-grid">
          <div 
            v-for="policy in policyCategories" 
            :key="policy.id"
            class="policy-card"
          >
            <div class="card-header">
              <div class="icon-box">
                <component :is="policy.icon" :size="22" />
              </div>
              <div>
                <span class="card-tag">{{ policy.tag }}</span>
                <h3 class="card-title">{{ policy.title }}</h3>
              </div>
            </div>

            <p v-if="policy.notice" class="policy-notice">
              {{ policy.notice }}
            </p>

            <ul v-if="policy.items" class="policy-items-list">
              <li v-for="(item, idx) in policy.items" :key="idx" class="policy-item">
                <strong class="item-label">{{ item.label }}:</strong>
                <span class="item-text">{{ item.text }}</span>
              </li>
            </ul>

            <ul v-if="policy.list" class="policy-bullet-list">
              <li v-for="(bullet, bIdx) in policy.list" :key="bIdx">
                {{ bullet }}
              </li>
            </ul>
          </div>
        </div>

        <!-- Contact CTA Footer Bar -->
        <div class="policies-cta-footer">
          <div class="cta-left">
            <h3>HAVE QUESTIONS ABOUT OUR POLICIES?</h3>
            <p>Our team is available to help clarify any details prior to your reservation.</p>
          </div>
          <div class="cta-right">
            <a :href="siteConfig.phoneTel" class="cta-phone-btn">
              <Phone :size="18" />
              <span>{{ siteConfig.phone }}</span>
            </a>
            <button class="cta-online-btn" @click="goToBooking">
              <span>BOOK NOW</span>
              <ChevronRight :size="16" />
            </button>
          </div>
        </div>

      </div>
    </main>

  </div>
</template>

<style scoped>
/* ============================================================
   POLICIES PAGE WRAPPER
   ============================================================ */
.policies-page {
  background-color: #000000;
  color: #ffffff;
  min-height: 100vh;
  padding-top: 5rem;
  padding-bottom: 6rem;
  position: relative;
}

/* ============================================================
   HERO BANNER
   ============================================================ */
.policies-hero {
  padding: 3rem 0 3.5rem;
  border-bottom: 1px solid rgba(255, 255, 255, 0.08);
  background: radial-gradient(circle at 50% 0%, rgba(255, 0, 43, 0.12) 0%, transparent 70%);
  text-align: center;
}

.back-link {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  background: transparent;
  border: none;
  color: rgba(255, 255, 255, 0.6);
  font-family: var(--font-heading);
  font-size: 0.72rem;
  font-weight: 800;
  letter-spacing: 0.1em;
  cursor: pointer;
  margin-bottom: 1.6rem;
  transition: color 0.2s ease, transform 0.2s ease;
}

.back-link:hover {
  color: #ff002b;
  transform: translateX(-4px);
}

.hero-badge {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  font-family: var(--font-heading);
  font-size: 0.68rem;
  font-weight: 900;
  letter-spacing: 0.25em;
  color: #ff002b;
  background: rgba(255, 0, 43, 0.1);
  border: 1px solid rgba(255, 0, 43, 0.3);
  padding: 0.4rem 1.1rem;
  border-radius: 4px;
  margin-bottom: 1.2rem;
}

.hero-title {
  font-family: var(--font-heading);
  font-size: clamp(2.4rem, 4.5vw, 3.8rem);
  font-weight: 900;
  color: #ffffff;
  line-height: 1.05;
  margin-bottom: 1.2rem;
  letter-spacing: 0.02em;
}

.text-red-glow {
  color: #ff002b;
  text-shadow: 0 0 25px rgba(255, 0, 43, 0.6);
}

.text-red {
  color: #ff002b;
}

.hero-lead {
  font-family: var(--font-body);
  font-size: 1.15rem;
  color: rgba(255, 255, 255, 0.7);
  max-width: 780px;
  margin: 0 auto;
  line-height: 1.6;
}

/* ============================================================
   POLICIES BODY & CARDS GRID
   ============================================================ */
.policies-body {
  padding-top: 3.5rem;
}

.policies-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1.8rem;
  margin-bottom: 5rem;
}

@media (max-width: 900px) {
  .policies-grid {
    grid-template-columns: 1fr;
  }
}

.policy-card {
  background: linear-gradient(180deg, rgba(14, 14, 22, 0.95) 0%, rgba(8, 8, 12, 0.98) 100%);
  border: 1px solid rgba(255, 255, 255, 0.09);
  border-radius: 8px;
  padding: 2.2rem 2rem;
  display: flex;
  flex-direction: column;
  transition: all 0.3s ease;
  position: relative;
}

.policy-card:hover {
  border-color: rgba(255, 0, 43, 0.4);
  box-shadow: 0 0 30px rgba(255, 0, 43, 0.12);
}

.card-header {
  display: flex;
  align-items: center;
  gap: 1.2rem;
  margin-bottom: 1.4rem;
  padding-bottom: 1.2rem;
  border-bottom: 1px solid rgba(255, 255, 255, 0.08);
}

.icon-box {
  width: 48px;
  height: 48px;
  border-radius: 6px;
  background: rgba(255, 0, 43, 0.12);
  border: 1px solid rgba(255, 0, 43, 0.4);
  color: #ff002b;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.card-tag {
  display: block;
  font-family: var(--font-heading);
  font-size: 0.58rem;
  font-weight: 900;
  letter-spacing: 0.2em;
  color: #ff002b;
  margin-bottom: 0.25rem;
}

.card-title {
  font-family: var(--font-heading);
  font-size: 1.25rem;
  font-weight: 900;
  color: #ffffff;
  line-height: 1.2;
}

.policy-notice {
  font-size: 0.9rem;
  color: rgba(255, 255, 255, 0.7);
  font-style: italic;
  margin-bottom: 1.2rem;
  background: rgba(255, 255, 255, 0.03);
  padding: 0.6rem 1rem;
  border-left: 3px solid #ff002b;
  border-radius: 0 4px 4px 0;
}

.policy-items-list {
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.policy-item {
  font-size: 0.95rem;
  line-height: 1.6;
  color: rgba(255, 255, 255, 0.82);
}

.item-label {
  color: #ffffff;
  font-weight: 800;
  margin-right: 0.35rem;
}

.item-text {
  color: rgba(255, 255, 255, 0.82);
}

.policy-bullet-list {
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 0.6rem;
}

.policy-bullet-list li {
  font-size: 0.95rem;
  color: rgba(255, 255, 255, 0.82);
  padding-left: 1.4rem;
  position: relative;
  line-height: 1.5;
}

.policy-bullet-list li::before {
  content: '✦';
  position: absolute;
  left: 0;
  color: #ff002b;
  font-size: 0.75rem;
  top: 0.1rem;
}

/* ============================================================
   BOTTOM CTA BAR
   ============================================================ */
.policies-cta-footer {
  background: linear-gradient(135deg, rgba(20, 15, 20, 0.95) 0%, rgba(10, 8, 12, 0.98) 100%);
  border: 1px solid rgba(255, 0, 43, 0.3);
  box-shadow: 0 0 35px rgba(255, 0, 43, 0.15);
  border-radius: 8px;
  padding: 2.5rem 3rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 2rem;
}

@media (max-width: 850px) {
  .policies-cta-footer {
    flex-direction: column;
    text-align: center;
    padding: 2rem;
  }
}

.cta-left h3 {
  font-family: var(--font-heading);
  font-size: 1.4rem;
  font-weight: 900;
  color: #ffffff;
  margin-bottom: 0.4rem;
  letter-spacing: 0.03em;
}

.cta-left p {
  font-size: 0.95rem;
  color: rgba(255, 255, 255, 0.7);
}

.cta-right {
  display: flex;
  align-items: center;
  gap: 1rem;
  flex-shrink: 0;
}

@media (max-width: 500px) {
  .cta-right {
    flex-direction: column;
    width: 100%;
  }
  .cta-phone-btn, .cta-online-btn {
    width: 100%;
    justify-content: center;
  }
}

.cta-phone-btn {
  display: inline-flex;
  align-items: center;
  gap: 0.6rem;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.15);
  padding: 0.85rem 1.4rem;
  border-radius: 4px;
  color: #ffffff;
  font-family: var(--font-heading);
  font-size: 0.82rem;
  font-weight: 800;
  letter-spacing: 0.05em;
  text-decoration: none;
  transition: all 0.25s ease;
}

.cta-phone-btn:hover {
  background: rgba(255, 255, 255, 0.12);
  border-color: #ffffff;
  color: #ffffff;
}

.cta-online-btn {
  display: inline-flex;
  align-items: center;
  gap: 0.6rem;
  background: #ff002b;
  border: 1px solid #ff002b;
  padding: 0.85rem 1.5rem;
  border-radius: 4px;
  color: #ffffff;
  font-family: var(--font-heading);
  font-size: 0.82rem;
  font-weight: 900;
  letter-spacing: 0.08em;
  cursor: pointer;
  box-shadow: 0 0 20px rgba(255, 0, 43, 0.4);
  transition: all 0.25s ease;
}

.cta-online-btn:hover {
  background: #d40024;
  box-shadow: 0 0 30px rgba(255, 0, 43, 0.7);
  transform: translateY(-2px);
}
</style>
