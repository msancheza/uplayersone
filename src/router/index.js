import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import PricingView from '../views/PricingView.vue'
import PoliciesView from '../views/PoliciesView.vue'
import ContactView from '../views/ContactView.vue'
import PrivacyPolicyView from '../views/PrivacyPolicyView.vue'
import TermsConditionsView from '../views/TermsConditionsView.vue'
import PartyEssentialsView from '../views/PartyEssentialsView.vue'
import GalleryView from '../views/GalleryView.vue'

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
    path: '/our-policies',
    name: 'policies',
    component: PoliciesView
  },
  {
    // Legacy path kept as a redirect so old links / bookmarks still work.
    path: '/policies',
    redirect: '/our-policies'
  },
  {
    path: '/contact',
    name: 'contact',
    component: ContactView
  },
  {
    path: '/party-essentials',
    name: 'party-essentials',
    component: PartyEssentialsView
  },
  {
    path: '/gallery',
    name: 'gallery',
    component: GalleryView
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
  },
  {
    // Catch-all — any unknown path (e.g. the retired /invitations route)
    // redirects back to the home page instead of showing a blank screen.
    path: '/:pathMatch(.*)*',
    name: 'not-found',
    redirect: '/'
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
