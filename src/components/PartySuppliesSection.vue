<script setup>
import { Package, ShoppingCart, Star } from 'lucide-vue-next'

const supplies = [
  {
    title: 'RED ARENA PARTY PACK',
    category: 'LAN Party Decor',
    price: '$89.99',
    badge: 'Popular',
    desc: 'Includes ULTIMATE PLAYERS red & black banners, 10 LED glow wristbands, gamer posters, and table runners for your party.',
    rating: 4.9
  },
  {
    title: 'GAMER ENERGY REFUEL KIT',
    category: 'Drinks & Snacks',
    price: '$45.00',
    badge: 'Limited',
    desc: 'Pack of 12 sugar-free gamer energy drinks, custom acrylic party cups, and insulated thermal water bottles in matte black.',
    rating: 4.8
  },
  {
    title: 'CHAMPIONSHIP TROPHY SET',
    category: 'Trophies & Medals',
    price: '$120.00',
    badge: 'Exclusive',
    desc: 'Custom engraved tempered glass trophy with laser-etched name, plus heavy die-cast metal medals for 1st, 2nd, and 3rd place.',
    rating: 5.0
  }
]
</script>

<template>
  <section id="supplies" class="supplies-section">
    <div class="container">
      <div class="section-header">
        <div class="badge">Party Accessories</div>
        <h2>PARTY <span class="text-gradient-red">SUPPLIES</span></h2>
        <p>Official party kits, trophies, and gamer merch to make your event unforgettable.</p>
      </div>

      <div class="supplies-grid">
        <div v-for="item in supplies" :key="item.title" class="glass-card supply-card">
          <div class="card-badge-top">{{ item.badge }}</div>

          <div class="supply-icon-box">
            <Package :size="32" class="text-red" />
          </div>

          <span class="supply-category">{{ item.category }}</span>
          <h3 class="supply-title">{{ item.title }}</h3>
          <p class="supply-desc">{{ item.desc }}</p>

          <div class="supply-footer">
            <div class="price-rating">
              <span class="supply-price">{{ item.price }}</span>
              <span class="supply-rating">
                <Star :size="14" fill="var(--primary-red)" class="text-red" />
                {{ item.rating }}
              </span>
            </div>
            <button class="btn btn-primary btn-sm">
              <ShoppingCart :size="15" />
              <span>Order</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.supplies-section {
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

.supplies-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(310px, 1fr));
  gap: 2rem;
}

.supply-card {
  padding: 2.2rem;
  display: flex;
  flex-direction: column;
  background: rgba(14, 14, 20, 0.85);
  border: 1px solid rgba(255, 255, 255, 0.08);
  position: relative;
}

.supply-card:hover {
  border-color: var(--border-red);
  transform: translateY(-4px);
}

.card-badge-top {
  position: absolute;
  top: 1.5rem;
  right: 1.5rem;
  font-size: 0.7rem;
  font-weight: 900;
  text-transform: uppercase;
  padding: 0.25rem 0.6rem;
  border-radius: var(--radius-sm);
  background: rgba(255, 0, 43, 0.15);
  color: var(--primary-red);
  border: 1px solid var(--border-red);
}

.supply-icon-box {
  width: 58px;
  height: 58px;
  border-radius: 14px;
  background: rgba(255, 0, 43, 0.12);
  border: 1px solid var(--border-red);
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 1.2rem;
}

.supply-category {
  font-size: 0.75rem;
  font-weight: 800;
  text-transform: uppercase;
  color: var(--text-muted);
  margin-bottom: 0.3rem;
}

.supply-title {
  font-size: 1.3rem;
  font-weight: 900;
  color: #fff;
  margin-bottom: 0.8rem;
}

.supply-desc {
  font-size: 0.9rem;
  color: var(--text-muted);
  line-height: 1.6;
  margin-bottom: 1.8rem;
  flex-grow: 1;
}

.supply-footer {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-top: 1.2rem;
  border-top: 1px solid rgba(255, 255, 255, 0.08);
}

.price-rating {
  display: flex;
  flex-direction: column;
}

.supply-price {
  font-family: var(--font-heading);
  font-size: 1.4rem;
  font-weight: 900;
  color: #fff;
}

.supply-rating {
  display: flex;
  align-items: center;
  gap: 0.3rem;
  font-size: 0.78rem;
  font-weight: 800;
  color: var(--text-muted);
}

.btn-sm {
  padding: 0.6rem 1.2rem;
  font-size: 0.85rem;
}

.text-red { color: var(--primary-red); }
</style>
