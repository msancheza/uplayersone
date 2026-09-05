<script setup>
import { Ticket, Send, Copy, Check } from 'lucide-vue-next'
import { ref } from 'vue'

const copied = ref(false)
const inviteCode = ref('ULTIMATE-RED-PASS-2026')

const copyCode = () => {
  navigator.clipboard.writeText(inviteCode.value)
  copied.value = true
  setTimeout(() => { copied.value = false }, 2000)
}
</script>

<template>
  <section id="invitations" class="invitations-section">
    <div class="container">
      <div class="glass-panel invitations-box">
        <div class="invitation-badge">
          <Ticket :size="16" />
          <span>DIGITAL EVENT PASS</span>
        </div>

        <h2 class="invitation-title">
          DIGITAL <span class="text-gradient-red">INVITATIONS & VIP PASSES</span>
        </h2>

        <p class="invitation-desc">
          Do you have a VIP pass code for a private gaming truck party? Enter your code below or share your customized digital invitation pass with your squad.
        </p>

        <!-- Pass Card Graphic -->
        <div class="pass-card-container">
          <div class="pass-card glass-card">
            <div class="pass-left">
              <div class="pass-logo">ULTIMATE PASS</div>
              <span class="pass-status">VIP GAMER ACCESS GRANTED</span>
            </div>
            <div class="pass-right">
              <div class="code-box">
                <code>{{ inviteCode }}</code>
                <button class="copy-btn" @click="copyCode">
                  <Check v-if="copied" :size="16" class="text-red" />
                  <Copy v-else :size="16" />
                </button>
              </div>
            </div>
          </div>
        </div>

        <div class="invite-form">
          <input type="text" placeholder="Enter your invitation code here..." class="invite-input" />
          <button class="btn btn-primary">
            <span>Validate Pass</span>
            <Send :size="16" />
          </button>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.invitations-section {
  padding: 6rem 0;
  position: relative;
}

.invitations-box {
  padding: 4.5rem 2rem;
  text-align: center;
  background: rgba(14, 14, 20, 0.9);
  border: 1px solid var(--border-red);
  box-shadow: var(--shadow-red-glow);
  max-width: 900px;
  margin: 0 auto;
}

.invitation-badge {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.78rem;
  font-weight: 900;
  padding: 0.35rem 1rem;
  border-radius: var(--radius-full);
  background: rgba(255, 0, 43, 0.15);
  color: var(--primary-red);
  border: 1px solid var(--border-red);
  margin-bottom: 1.2rem;
}

.invitation-title {
  font-size: 2.8rem;
  font-weight: 900;
  margin-bottom: 1rem;
  color: #fff;
}

.invitation-desc {
  font-size: 1.1rem;
  color: var(--text-muted);
  max-width: 640px;
  margin: 0 auto 2.5rem auto;
}

.pass-card-container {
  max-width: 580px;
  margin: 0 auto 2.5rem auto;
}

.pass-card {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1.5rem 2rem;
  background: linear-gradient(135deg, rgba(255, 0, 43, 0.15) 0%, rgba(10, 10, 15, 0.95) 100%);
  border: 1px solid var(--border-red);
}

.pass-logo {
  font-family: var(--font-heading);
  font-weight: 900;
  font-size: 1.2rem;
  color: #fff;
}

.pass-status {
  font-size: 0.72rem;
  color: var(--primary-red);
  font-weight: 800;
}

.code-box {
  display: flex;
  align-items: center;
  gap: 0.6rem;
  background: rgba(0, 0, 0, 0.6);
  padding: 0.5rem 0.9rem;
  border-radius: var(--radius-sm);
  border: 1px dashed var(--border-red);
}

code {
  font-family: monospace;
  font-size: 0.9rem;
  color: #ffffff;
  font-weight: bold;
}

.copy-btn {
  background: none;
  border: none;
  color: var(--text-muted);
  cursor: pointer;
}

.invite-form {
  display: flex;
  gap: 0.8rem;
  max-width: 480px;
  margin: 0 auto;
}

.invite-input {
  flex-grow: 1;
  padding: 0.85rem 1.2rem;
  border-radius: var(--radius-sm);
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.15);
  color: #fff;
  font-family: var(--font-body);
  outline: none;
}

.invite-input:focus {
  border-color: var(--primary-red);
}

.text-red { color: var(--primary-red); }

@media (max-width: 600px) {
  .pass-card {
    flex-direction: column;
    gap: 1rem;
  }
  .invite-form {
    flex-direction: column;
  }
}
</style>
