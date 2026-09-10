/**
 * Knowledge base for the portfolio chat widget.
 *
 * Deliberately NOT an LLM. Answers are derived from `portfolio.ts`, so the bot
 * can only ever say things the site already says — it cannot invent experience,
 * there is no API key to leak, and it costs nothing to run on static hosting.
 */

import { additionalProjects, profile, projects, skills } from './portfolio'

export interface Intent {
  id: string
  /** Lower-case substrings to look for in the visitor's message. */
  patterns: string[]
  answer: string
  followUps?: string[]
}

export interface Match {
  text: string
  followUps: string[]
}

const bullet = (lines: string[]): string => lines.map((line) => `• ${line}`).join('\n')

/** One intent per project, built from the real project data. */
const projectKeywords: Record<string, string[]> = {
  cms: ['cms', 'admin', 'dashboard', 'back office', 'backoffice', 'compliance', 'data table', 'table'],
  web: ['web app', 'website', 'desktop', 'sidebar', 'navigation', 'wallet', 'deposit', 'withdraw', 'ssg'],
  mobile: ['mobile', 'h5', 'native', 'webview', 'walkthrough', 'tour', 'onboarding'],
}

const projectIntents: Intent[] = projects.map((project) => ({
  id: `project-${project.id}`,
  patterns: [project.name.toLowerCase(), ...(projectKeywords[project.id] ?? [])],
  answer: `**${project.name}** — ${project.period}\n${project.role}\n\n${project.summary}\n\nHighlights:\n${bullet(
    project.contributions.slice(0, 3),
  )}\n\nBuilt with: ${project.stack.join(', ')}`,
  followUps: ['What else have you built?', 'What technologies do you use?'],
}))

const compactKeywords: Record<string, string[]> = {
  'legal-store': [
    'legal store',
    'vue 2 to vue 3',
    'vue2 to vue3',
    'migration',
    'migrating',
    'migrate',
    'upgrade',
    'element ui',
    'storefront',
  ],
  'e-bingo': ['bingo', 'e bingo', 'websocket', 'web socket', 'real time', 'realtime', 'live chat', 'game lobby'],
  agent: ['agent', 'promotion', 'promotional', 'activity plan', 'fuzzy search', 'filtering'],
  ordering: ['ordering', 'order', 'ecommerce', 'e commerce', 'cart', 'checkout', 'shop'],
}

const compactIntents: Intent[] = additionalProjects.map((project) => ({
  id: `compact-${project.id}`,
  patterns: [project.name.toLowerCase(), ...(compactKeywords[project.id] ?? [])],
  answer: `**${project.name}** — ${project.kind}\n${project.company}\n\n${project.summary}\n\nBuilt with: ${project.stack.join(', ')}`,
  followUps: ['What else have you built?', 'What technologies do you use?'],
}))

export const intents: Intent[] = [
  {
    id: 'greeting',
    patterns: ['hello', 'hi ', 'hey', 'good morning', 'good afternoon', 'kumusta'],
    answer: `Hi! I'm a small bot built into this site. Ask me about ${profile.name.split(' ')[0]}'s experience, the projects, or how to get in touch.`,
    followUps: ['What experience do you have?', 'What technologies do you use?'],
  },
  {
    id: 'experience',
    patterns: ['experience', 'how long', 'years', 'background', 'seniority', 'level', 'about you', 'yourself'],
    answer: `${profile.name} is a ${profile.role.toLowerCase()} with around two years of professional experience, all at DigiPlus Interactive Corp., working mainly with Vue and TypeScript.\n\nThat covers seven production projects across their product portfolio — an internal admin CMS, customer-facing web apps, a real-time bingo game, an e-commerce ordering app, a Vue 2 to Vue 3 migration, and mobile web running inside native iOS and Android shells.`,
    followUps: ['What projects have you built?', 'What technologies do you use?'],
  },
  {
    id: 'projects',
    patterns: [
      'project',
      'what have you built',
      'what did you build',
      'what else',
      'work on',
      'portfolio',
      'apps',
    ],
    answer: `Seven production projects over two years, all at DigiPlus Interactive Corp.\n\nMain three:\n${bullet(
      projects.map((p) => `**${p.name}** — ${p.kind.toLowerCase()} (${p.period})`),
    )}\n\nAlso built:\n${bullet(
      additionalProjects.map((p) => `**${p.name}** — ${p.kind.toLowerCase()}`),
    )}\n\nAsk me about any one of them for detail.`,
    followUps: [
      'Tell me about the Vue 2 to Vue 3 migration',
      'Tell me about E-Bingo',
      'Tell me about the CMS',
    ],
  },
  {
    id: 'skills',
    patterns: ['tech', 'technolog', 'stack', 'skill', 'tools', 'framework', 'language', 'know'],
    answer: `Day-to-day toolkit:\n\n${skills
      .map((group) => `**${group.group}**\n${group.items.join(', ')}`)
      .join('\n\n')}`,
    followUps: ['Do you use TypeScript?', 'What projects have you built?'],
  },
  {
    id: 'typescript',
    patterns: ['typescript', ' ts ', 'types', 'typed'],
    answer: `Yes — TypeScript is used day to day across all three production projects, and this portfolio site is written in it too.\n\nIt runs in strict mode with \`noUncheckedIndexedAccess\` enabled, and \`npm run build\` type-checks first, so a type error fails the build.`,
    followUps: ['What technologies do you use?', 'Can I see the code?'],
  },
  {
    id: 'vue',
    patterns: ['vue', 'composition api', 'options api', 'pinia', 'vuex', 'nuxt', 'vue 2', 'vue 3'],
    answer: `Both Vue 3 and Vue 2, in production.\n\nThe CMS and the customer-facing web app are Vue 3 — Composition API with \`<script setup>\`, Pinia and Vue Router 4. The mobile app is a legacy Vue 2.7 codebase with Vuex and Vue Router 3, so day-to-day work moves between the two.\n\nA good example is the sidebar refactor on the web app: it had grown into one large component, and splitting it into composables for menu state and routing meant adding a menu entry became configuration rather than code.`,
    followUps: ['Tell me about the web app', 'What technologies do you use?'],
  },
  {
    id: 'code',
    patterns: ['code', 'github', 'source', 'repo', 'repository', 'see your work'],
    answer: `The three projects are commercial applications under NDA, so the source isn't public — the site describes the work instead, and it's all happy to walk through in an interview.\n\nThis portfolio site itself is open source though, and the GitHub link is at the top of the page.`,
    followUps: ['How can I contact you?', 'What projects have you built?'],
  },
  {
    id: 'accessibility',
    patterns: ['accessib', 'a11y', 'wcag', 'screen reader', 'contrast'],
    answer: `This site was built to WCAG 2.1 AA for the fundamentals:\n\n${bullet([
      'All text meets the 4.5:1 contrast minimum',
      'Semantic heading order, with sections labelled via aria-labelledby',
      'Skip link and visible focus outlines on every interactive element',
      'prefers-reduced-motion respected throughout',
      'This chat works entirely by keyboard — Esc closes it',
    ])}`,
    followUps: ['Can I see the code?', 'What technologies do you use?'],
  },
  {
    id: 'availability',
    patterns: ['available', 'hiring', 'job', 'role', 'position', 'open to', 'looking for', 'notice'],
    answer: `Yes — currently looking for the next frontend developer position, ideally working with Vue and TypeScript.\n\nThe fastest way to start a conversation is email: ${profile.email}`,
    followUps: ['How can I contact you?', 'What experience do you have?'],
  },
  {
    id: 'contact',
    patterns: ['contact', 'email', 'reach', 'hire', 'linkedin', 'get in touch', 'message'],
    answer: `Email is best: ${profile.email}\n\nThe GitHub, LinkedIn and CV links are all in the header at the top of this page.`,
    followUps: ['Are you available for work?', 'What experience do you have?'],
  },
  {
    id: 'location',
    patterns: ['where', 'located', 'location', 'remote', 'onsite', 'based', 'timezone', 'relocat'],
    answer: `That's best answered directly — drop a line to ${profile.email} and you'll get a straight answer on location, remote working and availability.`,
    followUps: ['Are you available for work?'],
  },
  {
    id: 'bot',
    patterns: [
      'are you ai',
      'are you claude',
      'are you chatgpt',
      'chatgpt',
      'llm',
      'robot',
      'bot',
      'real person',
      'human',
      'how do you work',
    ],
    answer: `Not AI — I'm about 150 lines of TypeScript. Your message is matched against a set of keyword patterns, and the answers are generated from the same data that renders this site.\n\nThat means no API key, no server, no monthly cost, and I can't invent experience that isn't real. The trade-off is that I only know what's on this page.`,
    followUps: ['Can I see the code?', 'What technologies do you use?'],
  },
  {
    id: 'ai-tools',
    // ' ai ' is space-padded so it matches the whole word only.
    patterns: [
      'cursor',
      'claude',
      'copilot',
      ' ai ',
      'ai tool',
      'ai assisted',
      'ai coding',
      'artificial intelligence',
    ],
    answer: `Cursor and Claude Code are part of the daily workflow — mostly for scaffolding new components, refactoring across several files at once, and getting up to speed in unfamiliar parts of a codebase.\n\nGenerated code goes through the same bar as anything else: read it, understand why it works, check it against the types and the linter, and rewrite it when it's wrong. It speeds up the typing, not the thinking.`,
    followUps: ['What technologies do you use?', 'Can I see the code?'],
  },
  {
    id: 'thanks',
    patterns: ['thank', 'thanks', 'cheers', 'appreciate', 'salamat'],
    answer: `You're welcome. If anything else comes up, ${profile.email} is the place to ask.`,
    followUps: ['Are you available for work?'],
  },
  ...projectIntents,
  ...compactIntents,
]

export const greeting: Match = {
  text: `Hi — I'm a small bot built into this site. I can answer questions about ${profile.name.split(' ')[0]}'s experience, the projects here, or how to get in touch.`,
  followUps: [
    'What experience do you have?',
    'What projects have you built?',
    'What technologies do you use?',
    'Are you available for work?',
  ],
}

const fallback: Match = {
  text: `I don't have an answer for that one — I only know what's on this page.\n\nFor anything else, email ${profile.email} and you'll get a proper reply.`,
  followUps: [
    'What experience do you have?',
    'What projects have you built?',
    'How can I contact you?',
  ],
}

/**
 * Scores every intent against the message and returns the best one.
 * Longer pattern matches score higher, so "tell me about the cms" beats a
 * bare "about" match.
 */
/** Punctuation becomes whitespace, so "AI?" and "Vue-3." still match. */
const normalise = (text: string): string =>
  text
    .toLowerCase()
    .replace(/[^a-z0-9+#]+/g, ' ')
    .trim()

/**
 * Patterns get the same treatment as messages — otherwise a pattern written as
 * "legal-store" could never match, because the hyphen is stripped from the
 * input but not from the pattern. Leading/trailing spaces are preserved, since
 * a pattern like " ai " relies on them to match a whole word rather than the
 * "ai" inside "email", "available" and "detail".
 */
const normalisePattern = (pattern: string): string =>
  (pattern.startsWith(' ') ? ' ' : '') + normalise(pattern) + (pattern.endsWith(' ') ? ' ' : '')

const searchable = intents.map((intent) => ({
  intent,
  patterns: intent.patterns.map(normalisePattern),
}))

export function findAnswer(input: string): Match {
  const message = ` ${normalise(input)} `
  let best: Intent | undefined
  let bestScore = 0

  for (const { intent, patterns } of searchable) {
    let score = 0
    for (const pattern of patterns) {
      if (message.includes(pattern)) score += pattern.length
    }
    if (score > bestScore) {
      bestScore = score
      best = intent
    }
  }

  if (!best) return fallback

  return {
    text: best.answer,
    followUps: best.followUps ?? fallback.followUps,
  }
}
