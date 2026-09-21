import { computed, ref } from 'vue'
import { portfolioTour } from './steps'
import type { Placement, TourStep } from './types'

/**
 * The tour runner.
 *
 * Module-scoped state on purpose: the launch button and the overlay live in
 * different components but must share one tour. Same reason the production
 * version keeps its state outside the component tree.
 */

const SEEN_KEY = 'portfolio-tour-seen'
const GAP = 12
const MARGIN = 16
const TOOLTIP_WIDTH = 320

const active = ref(false)
const index = ref(0)
const placement = ref<Placement | null>(null)

/** Steps whose target is actually on the page — a missing node is skipped, not fatal. */
const steps = ref<TourStep[]>([])

const current = computed<TourStep | undefined>(() => steps.value[index.value])
const total = computed(() => steps.value.length)
const isLast = computed(() => index.value === steps.value.length - 1)
const isFirst = computed(() => index.value === 0)

const prefersReducedMotion = (): boolean =>
  window.matchMedia('(prefers-reduced-motion: reduce)').matches

const markSeen = (): void => {
  try {
    localStorage.setItem(SEEN_KEY, '1')
  } catch {
    // Private browsing — the tour still works, it just will not be remembered.
  }
}

export const hasSeenTour = (): boolean => {
  try {
    return localStorage.getItem(SEEN_KEY) === '1'
  } catch {
    return false
  }
}

/** Measures the current target and works out where the tooltip fits. */
const measure = (): void => {
  const step = current.value
  if (!step) return

  const el = document.querySelector(step.target)
  if (!(el instanceof HTMLElement)) {
    placement.value = null
    return
  }

  const rect = el.getBoundingClientRect()
  const vh = window.innerHeight
  const vw = window.innerWidth

  // Tall sections would leave no room for the tooltip, so cap the spotlight.
  const height = Math.min(rect.height, vh - 220)
  const top = Math.max(rect.top, MARGIN)

  // Flip to whichever side has room, preferring the step's choice.
  const roomBelow = vh - (top + height)
  const roomAbove = top
  const wants = step.side ?? 'bottom'
  const side: 'top' | 'bottom' =
    wants === 'bottom' ? (roomBelow > 200 ? 'bottom' : 'top') : roomAbove > 200 ? 'top' : 'bottom'

  const tooltipTop = side === 'bottom' ? top + height + GAP : top - GAP

  // Centre on the target, then clamp so it never leaves the viewport.
  const centred = rect.left + rect.width / 2 - TOOLTIP_WIDTH / 2
  const tooltipLeft = Math.min(Math.max(centred, MARGIN), vw - TOOLTIP_WIDTH - MARGIN)

  placement.value = {
    top,
    left: Math.max(rect.left, MARGIN),
    width: Math.min(rect.width, vw - MARGIN * 2),
    height,
    tooltipTop,
    tooltipLeft,
    side,
  }
}

const scrollToCurrent = (): void => {
  const step = current.value
  if (!step) return
  const el = document.querySelector(step.target)
  if (!(el instanceof HTMLElement)) return

  el.scrollIntoView({
    block: 'center',
    behavior: prefersReducedMotion() ? 'auto' : 'smooth',
  })
}

/*
  Scroll fires far faster than the screen repaints, and measure() calls
  getBoundingClientRect() — a forced layout. Coalescing into one rAF means at
  most one measurement per frame instead of one per event.
*/
let frame = 0

const onViewportChange = (): void => {
  if (frame) return
  frame = requestAnimationFrame(() => {
    frame = 0
    measure()
  })
}

const attachListeners = (): void => {
  window.addEventListener('scroll', onViewportChange, { passive: true })
  window.addEventListener('resize', onViewportChange)
}

const detachListeners = (): void => {
  window.removeEventListener('scroll', onViewportChange)
  window.removeEventListener('resize', onViewportChange)
  if (frame) {
    cancelAnimationFrame(frame)
    frame = 0
  }
}

const goTo = (next: number): void => {
  index.value = next
  scrollToCurrent()
  // Measure after the scroll has had a frame to apply.
  requestAnimationFrame(() => requestAnimationFrame(measure))
}

export function useTour() {
  const start = (): void => {
    steps.value = portfolioTour.filter((step) => document.querySelector(step.target) !== null)
    if (steps.value.length === 0) return

    active.value = true
    attachListeners()
    goTo(0)
  }

  const stop = (): void => {
    active.value = false
    placement.value = null
    detachListeners()
    markSeen()
  }

  const next = (): void => {
    if (isLast.value) stop()
    else goTo(index.value + 1)
  }

  const back = (): void => {
    if (!isFirst.value) goTo(index.value - 1)
  }

  return {
    active,
    current,
    placement,
    index,
    total,
    isFirst,
    isLast,
    start,
    stop,
    next,
    back,
  }
}
