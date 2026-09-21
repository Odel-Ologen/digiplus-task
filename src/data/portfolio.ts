/**
 * ─────────────────────────────────────────────────────────────────────────────
 *  ⚠️  BEFORE YOU DEPLOY
 *
 *  1. `links` → replace the two REPLACE_ME values with your real GitHub and
 *     LinkedIn URLs, and drop your CV at /public/cv.pdf so `/cv.pdf` resolves.
 *
 *  2. Check the project NAMES below are public-facing. Employer and consumer
 *     brand names are fine to publish — they are advertised. Internal
 *     repository names, file names and commit counts are not, and have been
 *     deliberately left out. If any name here is internal-only, rename it.
 * ─────────────────────────────────────────────────────────────────────────────
 */

export interface ProfileLink {
  /** Rendered as `link-<id>` so the guided tour can target it. */
  id: string
  label: string
  href: string
  external: boolean
}

export interface Profile {
  name: string
  role: string
  email: string
  tagline: string
  links: ProfileLink[]
  highlights: { value: string; label: string }[]
}

export interface Project {
  id: string
  name: string
  kind: string
  period: string
  role: string
  context: string
  summary: string
  contributions: string[]
  stack: string[]
}

/** Shorter entries for the "Also built" grid. */
export interface CompactProject {
  id: string
  name: string
  kind: string
  /** Optional qualifier, e.g. work completed during the traineeship. */
  context?: string
  summary: string
  stack: string[]
}

export interface SkillGroup {
  group: string
  items: string[]
}

/** An employment record, shown in the Experience timeline. */
export interface Role {
  title: string
  company: string
  period: string
  location: string
  summary: string
  highlights: string[]
}

const EMPLOYER = 'DigiPlus Interactive Corp.'

export const profile: Profile = {
  name: 'Rodel Ologen',
  role: 'Frontend Developer',
  email: 'rodelogen95@gmail.com',
  tagline:
    'Vue developer with two years of professional experience at DigiPlus Interactive Corp., building production web apps across their product portfolio — admin CMS tooling, customer-facing sites, real-time games, and mobile web running inside native apps.',
  links: [
    { id: 'github', label: 'GitHub', href: 'https://github.com/Odel-Ologen', external: true },
    {
      id: 'linkedin',
      label: 'LinkedIn',
      href: 'https://www.linkedin.com/in/REPLACE_ME',
      external: true,
    },
    // BASE_URL (always trailing-slashed) keeps this correct whether the site is
    // served from the domain root or from /<repo>/ on GitHub Pages.
    {
      id: 'cv',
      label: 'Download CV',
      href: `${import.meta.env.BASE_URL}cv.pdf`,
      external: false,
    },
  ],
  highlights: [
    { value: '2 yrs', label: 'Professional experience' },
    { value: '7', label: 'Production projects' },
    { value: 'Vue 2 & 3', label: 'Both in production' },
    { value: 'TypeScript', label: 'Day-to-day language' },
  ],
}

/*
  ⚠️ CONFIRM BEFORE SHARING: `period` and `title` below are my best estimate —
  roughly two years' experience as of Sep 2026, and the job title you gave me.
  Set them to exactly what your CV and LinkedIn say. Recruiters cross-check,
  and a mismatch costs more than an imprecise date ever would.
*/
export const experience: Role[] = [
  {
    title: 'Frontend Developer',
    // The employer is named here and nowhere else. Individual projects are
    // described generically, so no specific product is tied to a specific build.
    company: EMPLOYER,
    period: '2024 — Present',
    location: 'Philippines',
    summary:
      'Frontend developer on the team behind DigiPlus’ gaming platforms, working across seven production applications — an internal admin CMS, customer-facing web apps, a real-time bingo game and mobile web embedded in native iOS and Android shells.',
    highlights: [
      'Ship features in both Vue 3 and legacy Vue 2 codebases, moving between Composition API with Pinia and Options API with Vuex depending on the project.',
      'Build reusable components rather than one-off screens — a shared admin data-table used across ~20 modules, and a guided-tour module that two onboarding flows run on.',
      'Integrate REST APIs and third-party SDKs, covering loading and empty states, server-side validation errors, and real-time updates over WebSockets.',
      'Migrate legacy applications, including a Vue 2 to Vue 3 upgrade with the Composition API and an Element UI to Element Plus replacement.',
      'Work within an established multi-developer codebase using feature branches, code review and staged releases, alongside backend teams in other regions.',
    ],
  },
]

export const projects: Project[] = [
  {
    id: 'cms',
    name: 'Gaming Platform CMS',
    kind: 'Internal admin platform',
    period: 'Nov 2025 — Jul 2026',
    role: 'Frontend Developer — admin modules and shared table/form components',
    context: 'Established Vue 3 codebase, worked alongside the platform frontend team',
    summary:
      'Internal CMS used by operations and marketing teams to manage content for a live gaming platform. I worked on the admin modules and on the shared components those modules are built from. The main challenge was that screens had grown independently, each with its own table and form code — consolidating them into shared components meant supporting pagination, sorting, filtering and column configuration in one place without breaking existing modules. New admin screens are now assembled from those components instead of written from scratch.',
    contributions: [
      'Built CRUD screens for four compliance reference-data modules, including create/edit dialogs and typed validation with vee-validate and Zod.',
      'Built and maintained the shared data-table component used across admin screens, covering pagination, sorting, filtering and column configuration.',
      'Implemented casino content management — game lists and categories, thumbnails, providers and banners — including drag-and-drop ordering so non-technical staff can reorder the lobby without a developer.',
      'Integrated admin screens with REST APIs, handling loading and empty states, server-side validation errors and confirmation flows.',
      'Contributed to an ongoing refactor of the banner and content-type modules, removing duplicated code as shared components landed.',
    ],
    stack: [
      'Vue 3',
      'TypeScript',
      'Vite',
      'Tailwind CSS',
      'Element Plus',
      'Pinia',
      'vee-validate',
      'Zod',
      'REST APIs',
    ],
  },
  {
    id: 'web',
    name: 'Sports & Casino Web App',
    kind: 'Customer-facing web & mobile (SSG)',
    period: 'Oct 2025 — Aug 2026',
    role: 'Frontend Developer — navigation, discovery and wallet screens',
    context: 'Existing multi-developer codebase, feature branches with code review',
    summary:
      'Customer-facing app for the same platform across two versions, statically generated with vite-ssg and built responsively for both mobile and desktop. I worked on the navigation layer and the deposit and withdrawal screens, building screens from Figma designs. The main challenge was the sidebar: it had grown into a single large component where adding a menu entry meant editing template logic. I split it into composables for menu state and routing, with separate components for the regular, submenu and collapsed cases, so menu entries became configuration.',
    contributions: [
      'Refactored the sidebar into composables for menu state and routing, with focused components for each menu variant.',
      'Built the discovery page and kept its search state consistent between the router and a third-party sportsbook SDK.',
      'Implemented deposit, withdrawal and wallet-linking screens, including bonus previews that recalculate as the user edits the amount.',
      'Added a withdrawal walkthrough with driver.js, lazy-loading the library on first use and storing “seen” state against the player’s profile through the API as well as locally, so it does not repeat when they sign in on another device.',
      'Connected the site to CMS-published content — banners, help centre articles and announcements — so content changes ship without a release.',
      'Fixed rendering issues found on real devices, including skeleton flashes between route changes.',
    ],
    stack: [
      'Vue 3',
      'TypeScript',
      'vite-ssg',
      'Tailwind CSS',
      'Pinia',
      'TanStack Query',
      'Vue Router',
      'Figma to code',
      'Responsive design',
    ],
  },
  {
    id: 'mobile',
    name: 'Mobile Sportsbook (H5)',
    kind: 'Mobile web app in native webview',
    period: 'Apr 2026 — Aug 2026',
    role: 'Frontend Developer — onboarding walkthrough feature',
    context:
      'Legacy Vue 2.7 codebase, shipped into native iOS and Android shells maintained by another team',
    summary:
      'Mobile web app embedded in native iOS and Android shells. I was responsible for the new-user onboarding walkthrough. Rather than script a single flow, I built a reusable tour module — runner, state, tooltip positioning and typed step definitions — so more than one onboarding flow could share the implementation. Two flows now run on it.',
    contributions: [
      'Built the sports betting onboarding as a reusable tour module — runner, state, tooltip positioning and typed step definitions — so any other page can add a walkthrough by writing a step definition rather than new tour code. Two flows run on it today.',
      'Made the walkthrough span three routes, carrying its position from the home screen through the sports lobby to the bet-assistant highlight, and re-resolving a step’s target if it had not rendered yet.',
      'Integrated the account preferences API so the “already seen” state lives on the account rather than in local storage, which stops the walkthrough repeating when the user signs in on another device.',
      'Instrumented every exit point with Google Analytics events recording which step the user skipped at, so drop-off can be measured per step rather than only as a total.',
      'Added version checks so tours only run on native builds that support them — the web layer and native app ship on separate release cycles — and handled shell constraints like disabling web redirects inside the app.',
      'Fixed integration defects in the third-party sportsbook, including a wallet balance that failed to refresh after a bet was placed.',
    ],
    stack: [
      'Vue 2.7',
      'TypeScript',
      'Rsbuild',
      'Pinia',
      'Vuex',
      'TanStack Query',
      'SCSS',
      'Native bridges',
    ],
  },
]

export const additionalProjects: CompactProject[] = [
  {
    id: 'legal-store',
    name: 'Legacy Storefront Migration',
    kind: 'Vue 2 → Vue 3 migration',
    summary:
      'Migrated a legacy storefront from Vue 2 to Vue 3. Converted components to the Composition API, replaced Element UI with Element Plus, and updated Vue Router to the v4 API — working through the breaking changes in each without losing existing behaviour.',
    stack: ['Vue 2', 'Vue 3', 'Composition API', 'Element Plus', 'Vue Router'],
  },
  {
    id: 'e-bingo',
    name: 'Real-Time Bingo App',
    kind: 'Real-time game app',
    context: 'Built during my traineeship',
    summary:
      'Digital bingo app for mobile and web with a dynamic game lobby. Integrated WebSocket communication for live chat, ball drawing and instant winner announcements, keeping the interface in sync with a live game where state changes every few seconds.',
    stack: ['Vue', 'WebSockets', 'Real-time state', 'Responsive UI'],
  },
  {
    id: 'agent',
    name: 'Promotions Management Tool',
    kind: 'Internal promotions tooling',
    summary:
      'Promotional plan management: all activity plans listed by default, with fuzzy search by name and filtering across activity type, creation time, approval time, activity status and approval status. Supports several plan types, and the feature was reused across three of the company’s product codebases.',
    stack: ['Vue', 'Fuzzy search', 'Advanced filtering', 'Reused across 3 repos'],
  },
  {
    id: 'ordering',
    name: 'E-Commerce Ordering App',
    kind: 'E-commerce web app',
    context: 'Built during my traineeship',
    summary:
      'Product listing with search filters and pagination, cart and checkout flows, and account management covering registration, login and profile. Added order notifications with timeout handling for pending orders.',
    stack: ['Vue', 'Cart & checkout', 'Auth flows', 'Search & pagination'],
  },
]

export const skills: SkillGroup[] = [
  {
    group: 'Core',
    items: [
      'Vue 3',
      'Vue 2',
      'Composition API',
      'Options API',
      'TypeScript',
      'JavaScript',
      'HTML',
      'CSS / SCSS',
    ],
  },
  {
    group: 'Build tooling',
    items: ['Vite', 'vite-ssg', 'Rsbuild', 'ESLint', 'Prettier'],
  },
  {
    group: 'Styling & design handoff',
    items: [
      'Tailwind CSS',
      'Element Plus',
      'Element UI',
      'Figma to code',
      'Responsive layout',
      'Dark / light theming',
    ],
  },
  {
    group: 'State & data',
    items: [
      'Pinia',
      'Vuex',
      'TanStack Query',
      'Axios',
      'REST APIs',
      'WebSockets',
      'vee-validate + Zod',
    ],
  },
  {
    group: 'Working with',
    items: [
      'Loading & error states',
      'Form validation',
      'Real-time updates',
      'Google Analytics (GA4)',
      'Third-party SDKs',
      'Native webviews',
      'Legacy migrations',
    ],
  },
  {
    // Kept at six groups so the grid divides exactly by both 2 and 3 columns —
    // a seventh leaves an empty cell showing the divider colour as a grey slab.
    group: 'Practices',
    items: [
      'Git feature branches',
      'Code review',
      'Staged releases',
      'Incremental refactoring',
      'AI-assisted development (Cursor, Claude Code)',
      'Reviewing generated code',
    ],
  },
]
