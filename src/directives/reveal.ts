import type { Directive } from 'vue'

/**
 * v-reveal — fades an element up as it scrolls into view.
 *
 *   <div v-reveal>…</div>          reveal immediately on intersect
 *   <div v-reveal="120">…</div>    stagger by 120ms
 *
 * Two deliberate safety properties:
 *
 * 1. The hiding class is added by JS, never in the template. If the script
 *    fails to run the content is simply visible — content must never depend
 *    on JavaScript to become readable.
 * 2. Nothing happens at all when the OS asks for reduced motion.
 *
 * One shared IntersectionObserver handles every element rather than one per
 * node, and each element is unobserved once revealed so it never fires twice.
 */

const REVEAL_CLASS = 'reveal'
const VISIBLE_CLASS = 'is-revealed'

let observer: IntersectionObserver | null = null

const getObserver = (): IntersectionObserver => {
  observer ??= new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue
        entry.target.classList.add(VISIBLE_CLASS)
        // One-shot: revealing again on every scroll past is distracting.
        observer?.unobserve(entry.target)
      }
    },
    // Wait until the element is a little way into the viewport, so it animates
    // as the reader arrives at it rather than while it is still off-screen.
    { threshold: 0.1, rootMargin: '0px 0px -8% 0px' },
  )
  return observer
}

export const vReveal: Directive<HTMLElement, number | undefined> = {
  mounted(el, binding) {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    el.classList.add(REVEAL_CLASS)
    if (binding.value) el.style.transitionDelay = `${binding.value}ms`
    getObserver().observe(el)
  },

  unmounted(el) {
    observer?.unobserve(el)
  },
}
