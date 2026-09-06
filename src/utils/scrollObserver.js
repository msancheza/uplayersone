/**
 * Pure Scroll Reveal & Parallax Utility.
 * Triggers entrance animations when elements enter viewport on scroll down.
 */

export function initScrollObserver() {
  if (typeof window === 'undefined') return

  // 1. Intersection Observer for Scroll Reveals
  const observerOptions = {
    root: null,
    rootMargin: '0px 0px -40px 0px',
    threshold: 0.08
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible')
        entry.target.setAttribute('data-visible', 'true')
      }
    })
  }, observerOptions)

  // Observe all elements with .scroll-reveal or [data-reveal]
  const revealElements = document.querySelectorAll('.scroll-reveal, [data-reveal]')
  revealElements.forEach((el) => {
    const parent = el.parentElement
    if (parent && parent.childElementCount > 1) {
      const idx = Array.from(parent.children).indexOf(el)
      el.style.setProperty('--stagger', idx)
    }
    observer.observe(el)
  })

  // 2. Parallax Scroll Effect on Elements with [data-parallax]
  let ticking = false
  const parallaxElements = document.querySelectorAll('[data-parallax]')

  const handleScroll = () => {
    if (!ticking) {
      window.requestAnimationFrame(() => {
        const windowHeight = window.innerHeight

        parallaxElements.forEach((el) => {
          const speed = parseFloat(el.getAttribute('data-parallax')) || 0.15
          const rect = el.getBoundingClientRect()
          const elementCenter = rect.top + rect.height / 2
          
          if (rect.top < windowHeight && rect.bottom > 0) {
            const yOffset = (elementCenter - windowHeight / 2) * speed
            el.style.transform = `translate3d(0, ${yOffset.toFixed(2)}px, 0)`
          }
        })

        ticking = false
      })
      ticking = true
    }
  }

  window.addEventListener('scroll', handleScroll, { passive: true })
  handleScroll()
}
