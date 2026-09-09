# Portfolio — Rodel Ologen

Personal portfolio site. Frontend developer working with Vue 3 and TypeScript.

**Live:** _add your deployed URL here_

## Stack

- **Vue 3** — Composition API, `<script setup>`, single-file components
- **TypeScript** — strict mode, including `noUncheckedIndexedAccess`
- **Tailwind CSS 4** — CSS-first configuration via `@theme`, no `tailwind.config.js`
- **Vite 7** — dev server and production build

## Getting started

```bash
npm install
npm run dev          # dev server on http://localhost:5173
```

## Scripts

| Script               | Description                                      |
| -------------------- | ------------------------------------------------ |
| `npm run dev`        | Start the dev server                             |
| `npm run type-check` | Type-check with `vue-tsc` (no emit)              |
| `npm run build`      | Type-check, then build to `dist/`                |
| `npm run preview`    | Serve the production build locally               |

`build` runs `type-check` first, so a type error fails the build.

## Structure

```
src/
├── App.vue                  # page layout and sections
├── main.ts                  # app entry
├── style.css                # Tailwind import + design tokens
├── components/
│   ├── SiteHeader.vue       # sticky nav, scroll-spy via IntersectionObserver
│   ├── HeroSection.vue      # intro and links
│   └── ProjectCard.vue      # expandable project card
└── data/
    └── portfolio.ts         # all site content, typed
```

Content is separated from presentation: everything shown on the page lives in
`src/data/portfolio.ts` behind exported interfaces, so copy changes never touch
a component.

## Accessibility

Built to WCAG 2.1 AA for the basics:

- All body and secondary text meets the 4.5:1 contrast minimum
- Semantic heading order, with sections labelled via `aria-labelledby`
- Skip link, and a visible `:focus-visible` outline on every interactive element
- Disclosure buttons wired with `aria-expanded` / `aria-controls`
- `prefers-reduced-motion` respected; mobile menu closes on <kbd>Esc</kbd>

## Notes

The projects described on the site are commercial applications under NDA, so the
site describes the work rather than linking to source.
