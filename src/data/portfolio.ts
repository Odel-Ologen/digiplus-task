/**
 * ─────────────────────────────────────────────────────────────────────────────
 *  ⚠️  BEFORE YOU DEPLOY — replace every value marked REPLACE_ME below.
 *
 *  1. `email`  → a PERSONAL address. Do not ship a work email; you are
 *                applying to other companies and your employer's domain
 *                is both unprofessional here and possibly monitored.
 *  2. `links`  → your real GitHub / LinkedIn URLs, and add your CV PDF to
 *                /public so `/cv.pdf` resolves.
 *
 *  Note on the project entries: internal repository names, file names and
 *  commit counts have been deliberately removed. The work is described by
 *  domain and outcome so nothing identifiable from a private codebase is
 *  published. Keep it that way.
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
  kind: string
  period: string
  role: string
  context: string
  summary: string
  contributions: string[]
  stack: string[]
}

export interface SkillGroup {
  group: string
  items: string[]
}

export const profile: Profile = {
  name: 'Rodel Ologen',
  role: 'Frontend Developer',
  email: 'REPLACE_ME@example.com',
  tagline:
    'Vue 3 developer with two years of professional experience building production web apps — admin CMS tooling, customer-facing sites, and mobile web running inside native apps.',
  links: [
    { label: 'GitHub', href: 'https://github.com/REPLACE_ME', external: true },
    { label: 'LinkedIn', href: 'https://www.linkedin.com/in/REPLACE_ME', external: true },
    { label: 'Download CV', href: '/cv.pdf', external: false },
  ],
  highlights: [
    { value: '2 yrs', label: 'Professional experience' },
    { value: '3', label: 'Production apps' },
    { value: 'Vue 3', label: 'Primary framework' },
    { value: 'TypeScript', label: 'Day-to-day language' },
  ],
}

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
    name: 'Gaming Platform Web App',
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
    name: 'Mobile Sportsbook (H5)',
    kind: 'Mobile web app in native webview',
    period: 'Apr 2026 — Aug 2026',
    role: 'Frontend Developer — onboarding walkthrough feature',
    context: 'Shipped into native iOS and Android shells maintained by another team',
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
      'Vue 3',
      'TypeScript',
      'Rsbuild',
      'Pinia',
      'TanStack Query',
      'SCSS',
      'Sentry',
      'Native bridges',
    ],
  },
]

export const skills: SkillGroup[] = [
  {
    group: 'Core',
    items: ['Vue 3', 'Composition API', 'TypeScript', 'JavaScript', 'HTML', 'CSS / SCSS'],
  },
  {
    group: 'Build tooling',
    items: ['Vite', 'vite-ssg', 'Rsbuild', 'ESLint', 'Prettier'],
  },
  {
    group: 'Styling',
    items: ['Tailwind CSS', 'Element Plus', 'Responsive layout', 'Dark / light theming'],
  },
  {
    group: 'State & data',
    items: ['Pinia', 'TanStack Query', 'Axios', 'REST APIs', 'vee-validate + Zod'],
  },
  {
    group: 'Working with',
    items: ['Loading & error states', 'Form validation', 'Third-party SDKs', 'Sentry', 'Native webviews'],
  },
  {
    group: 'Practices',
    items: ['Git feature branches', 'Code review', 'Staged releases', 'Incremental refactoring'],
  },
]
