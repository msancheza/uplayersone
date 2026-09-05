<script setup>
import { ShieldAlert, FileText, CheckCircle2, Lock } from 'lucide-vue-next'

const policies = [
  {
    icon: ShieldAlert,
    title: 'Fair Play & Equipment Safety Policy',
    desc: 'All players must treat gaming gear with respect. Cheating, intentional hardware damage, or food/drinks near console rigs are strictly prohibited.'
  },
  {
    icon: Lock,
    title: 'Reservation Deposit & Cancellation',
    desc: 'A non-refundable deposit holds your event slot. Rescheduling is permitted up to 7 days prior to event date with zero penalty.'
  },
  {
    icon: FileText,
    title: 'Punctuality & Driveway Access',
    desc: 'Our truck arrives 20-30 minutes early for initial setup. Please ensure the designated driveway or street parking space is clear upon arrival.'
  },
  {
    icon: CheckCircle2,
    title: 'Game Coach & Adult Supervision',
    desc: 'A certified ULTIMATE PLAYERS Game Coach remains on site throughout the event. For guests under 8, an adult chaperone is recommended.'
  }
]
</script>

<template>
  <section id="policies" class="policies-section">
    <div class="container">
      <div class="section-header">
        <div class="badge">Official Guidelines</div>
        <h2>OUR <span class="text-gradient-red">POLICIES</span></h2>
        <p>We guarantee a safe, seamless, and unforgettable gaming truck event for all guests.</p>
      </div>

      <div class="policies-grid">
        <div v-for="(policy, idx) in policies" :key="idx" class="glass-card policy-card">
          <div class="policy-icon-box">
            <component :is="policy.icon" :size="24" />
          </div>
          <h3 class="policy-title">{{ policy.title }}</h3>
          <p class="policy-desc">{{ policy.desc }}</p>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.policies-section {
  padding: 6rem 0;
  position: relative;
}

.section-header {
  text-align: center;
  max-width: 680px;
  margin: 0 auto 3.5rem auto;
}

.section-header h2 {
  font-size: 2.8rem;
  font-weight: 900;
  margin: 0.8rem 0;
}

.section-header p {
  color: var(--text-muted);
  font-size: 1.1rem;
}

.policies-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 1.8rem;
}

.policy-card {
  padding: 2.2rem;
  background: rgba(14, 14, 20, 0.85);
  border: 1px solid rgba(255, 255, 255, 0.08);
}

.policy-card:hover {
  border-color: var(--border-red);
}

.policy-icon-box {
  width: 48px;
  height: 48px;
  border-radius: 12px;
  background: rgba(255, 0, 43, 0.15);
  color: var(--primary-red);
  border: 1px solid var(--border-red);
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 1.2rem;
}

.policy-title {
  font-size: 1.25rem;
  font-weight: 800;
  color: #fff;
  margin-bottom: 0.8rem;
}

.policy-desc {
  color: var(--text-muted);
  font-size: 0.92rem;
  line-height: 1.6;
}
</style>
