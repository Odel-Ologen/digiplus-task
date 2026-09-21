import type { TourStep } from './types'

/**
 * Step definitions are data, not code — the same shape used on the production
 * walkthrough this demonstrates. Adding a step means adding an object here,
 * never touching the runner.
 *
 * Deliberately short. The page already explains the work; the tour only points
 * at the three things a recruiter needs to act on — check the profile, take the
 * CV, make contact. Ordered down the page so it never scrolls backwards.
 */
export const portfolioTour: TourStep[] = [
  {
    target: '#link-linkedin',
    title: 'Start here',
    body: 'My LinkedIn — the full work history, and the easiest place to connect or check anything on this page against my profile.',
    side: 'bottom',
  },
  {
    target: '#link-cv',
    title: 'Take the CV with you',
    body: 'A one-page PDF covering the same experience in a format you can forward to a hiring manager.',
    side: 'bottom',
  },
  {
    target: '#contact',
    title: 'Get in touch',
    body: 'The form sends straight to my inbox — or use the chat button in the corner to ask about anything on this page first. Thanks for looking.',
    side: 'top',
  },
]
