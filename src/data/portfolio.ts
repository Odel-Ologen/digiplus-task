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
  company: string
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
  company: string
  kind: string
  summary: string
  stack: string[]
}

export interface SkillGroup {
  group: string
  items: string[]
}

const EMPLOYER = 'DigiPlus Interactive Corp.'

export const profile: Profile = {
  name: 'Rodel Ologen',
  role: 'Frontend Developer',
  email: 'rodelogen95@gmail.com',
  tagline:
    'Vue developer with two years of professional experience at DigiPlus Interactive Corp., building production web apps across their product portfolio — admin CMS tooling, customer-facing sites, real-time games, and mobile web running inside native apps.',
  links: [
    { label: 'GitHub', href: 'https://github.com/REPLACE_ME', external: true },
    { label: 'LinkedIn', href: 'https://www.linkedin.com/in/REPLACE_ME', external: true },
    { label: 'Download CV', href: '/cv.pdf', external: false },
  ],
  highlights: [
    { value: '2 yrs', label: 'Professional experience' },
    { value: '7', label: 'Production projects' },
    { value: 'Vue 2 & 3', label: 'Both in production' },
    { value: 'TypeScript', label: 'Day-to-day language' },
  ],
}

export const projects: Project[] = [
  {
    id: 'cms',
    name: 'ArenaPlus CMS',
    company: EMPLOYER,
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
    name: 'ArenaPlus Web',
    company: EMPLOYER,
    kind: 'Customer-facing web app (SSG)',
    period: 'Oct 2025 — Aug 2026',
    role: 'Frontend Developer — navigation, discovery and wallet screens',
    context: 'Existing multi-developer codebase, feature branches with code review',
    summary:
      'Customer-facing web app for the same platform, statically generated with vite-ssg. I worked on the navigation layer and the deposit and withdrawal screens. The main challenge was the sidebar: it had grown into a single large component where adding a menu entry meant editing template logic. I split it into composables for menu state and routing, with separate components for the regular, submenu and collapsed cases, so menu entries became configuration.',
    contributions: [
      'Refactored the sidebar into composables for menu state and routing, with focused components for each menu variant.',
      'Built the discovery page and kept its search state consistent between the router and a third-party sportsbook SDK.',
      'Implemented deposit, withdrawal and wallet-linking screens, including bonus previews that recalculate as the user edits the amount.',
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
      'Sentry',
    ],
  },
  {
    id: 'mobile',
    name: 'LaroPlus Mobile',
    company: EMPLOYER,
    kind: 'Mobile web app in native webview',
    period: 'Apr 2026 — Aug 2026',
    role: 'Frontend Developer — onboarding walkthrough feature',
    context:
      'Legacy Vue 2.7 codebase, shipped into native iOS and Android shells maintained by another team',
    summary:
      'Mobile web app embedded in native iOS and Android shells. I was responsible for the new-user onboarding walkthrough. Rather than script a single flow, I built a reusable tour module — runner, state, tooltip positioning and typed step definitions — so more than one onboarding flow could share the implementation. Two flows now run on it.',
    contributions: [
      'Built a reusable guided-tour module and delivered two onboarding flows on top of it, each with its own triggers and visibility rules.',
      'Added version checks so tours only run on native builds that support them, since the web layer and native app ship on separate release cycles.',
      'Instrumented step completion and skips, and persisted tour progress through a backend API.',
      'Fixed integration defects in the third-party sportsbook, including a wallet balance that failed to refresh after a bet was placed.',
      'Worked within native-app constraints — disabling web redirects inside the shell, and converting image assets to WebP.',
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
    name: 'Legal-Store',
    company: EMPLOYER,
    kind: 'Vue 2 → Vue 3 migration',
    summary:
      'Migrated a legacy storefront from Vue 2 to Vue 3. Converted components to the Composition API, replaced Element UI with Element Plus, and updated Vue Router to the v4 API — working through the breaking changes in each without losing existing behaviour.',
    stack: ['Vue 2', 'Vue 3', 'Composition API', 'Element Plus', 'Vue Router'],
  },
  {
    id: 'e-bingo',
    name: 'E-Bingo',
    company: EMPLOYER,
    kind: 'Real-time game app',
    summary:
      'Digital bingo app for mobile and web with a dynamic game lobby. Integrated WebSocket communication for live chat, ball drawing and instant winner announcements, keeping the interface in sync with a live game where state changes every few seconds.',
    stack: ['Vue', 'WebSockets', 'Real-time state', 'Responsive UI'],
  },
  {
    id: 'agent',
    name: 'Agent Project',
    company: EMPLOYER,
    kind: 'Internal promotions tooling',
    summary:
      'Promotional plan management: all activity plans listed by default, with fuzzy search by name and filtering across activity type, creation time, approval time, activity status and approval status. Supports several plan types, and the feature was reused across the ArenaPlus, BingoPlus and GamePlus codebases.',
    stack: ['Vue', 'Fuzzy search', 'Advanced filtering', 'Reused across 3 repos'],
  },
  {
    id: 'ordering',
    name: 'Ordering App',
    company: EMPLOYER,
    kind: 'E-commerce web app',
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
    group: 'Styling',
    items: [
      'Tailwind CSS',
      'Element Plus',
      'Element UI',
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
      'Third-party SDKs',
      'Native webviews',
      'Legacy migrations',
    ],
  },
  {
    group: 'Practices',
    items: ['Git feature branches', 'Code review', 'Staged releases', 'Incremental refactoring'],
  },
  {
    group: 'AI-assisted development',
    items: ['Cursor', 'Claude Code', 'Reviewing generated code', 'Prompting for refactors'],
  },
]
