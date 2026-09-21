export interface TourStep {
  /** CSS selector for the element to spotlight. Skipped if it is not on the page. */
  target: string
  title: string
  body: string
  /** Preferred side. Flips automatically when there is not enough room. */
  side?: 'top' | 'bottom'
}

export interface Placement {
  /** Spotlight box, in viewport coordinates. */
  top: number
  left: number
  width: number
  height: number
  /** Where the tooltip ended up after flipping and clamping. */
  tooltipTop: number
  tooltipLeft: number
  side: 'top' | 'bottom'
}
