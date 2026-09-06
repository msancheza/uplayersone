import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import PricingView from '../views/PricingView.vue'
import PoliciesView from '../views/PoliciesView.vue'
import ContactView from '../views/ContactView.vue'
import PrivacyPolicyView from '../views/PrivacyPolicyView.vue'
import TermsConditionsView from '../views/TermsConditionsView.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/pricing',
    name: 'pricing',
    component: PricingView
  },
  {
    path: '/policies',
    name: 'policies',
    component: PoliciesView
  },
  {
    path: '/contact',
    name: 'contact',
    component: ContactView
  },
  {
    path: '/privacy-policy',
    name: 'privacy-policy',
    component: PrivacyPolicyView
  },
  {
    path: '/privacy',
    redirect: '/privacy-policy'
  },
  {
    path: '/terms-and-conditions',
    name: 'terms-and-conditions',
    component: TermsConditionsView
  },
  {
    path: '/terms',
    redirect: '/terms-and-conditions'
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (to.hash) {
      return {
        el: to.hash,
        behavior: 'smooth'
      }
    }
    return { top: 0, left: 0, behavior: 'instant' }
  }
})

export default router
