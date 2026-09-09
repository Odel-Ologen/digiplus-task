<script setup lang="ts">
import SiteHeader from './components/SiteHeader.vue'
import HeroSection from './components/HeroSection.vue'
import ProjectCard from './components/ProjectCard.vue'
import { profile, projects, skills } from './data/portfolio'

const year = 2026
</script>

<template>
  <a
    href="#work"
    class="sr-only focus:not-sr-only focus:fixed focus:left-6 focus:top-4 focus:z-[60] focus:rounded-lg focus:bg-accent-500 focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-ink-950"
  >
    Skip to content
  </a>

  <SiteHeader />

  <main>
    <HeroSection />

    <!-- Work -->
    <section id="work" class="border-t border-white/5 py-20 sm:py-28" aria-labelledby="work-heading">
      <div class="mx-auto max-w-6xl px-6">
        <header class="max-w-2xl">
          <p class="text-xs font-semibold uppercase tracking-widest text-accent-400">
            Professional experience
          </p>
          <h2
            id="work-heading"
            class="mt-3 text-3xl font-semibold tracking-tight text-white sm:text-4xl"
          >
            Three production apps, one platform
          </h2>
          <p class="mt-4 text-base leading-relaxed text-slate-300">
            An internal admin CMS, a statically-generated customer site, and a mobile web app running
            inside native shells. These are commercial applications under NDA, so I've described the
            work rather than shared the code — happy to walk through any of it in an interview.
          </p>
        </header>

        <div class="mt-12 grid gap-6">
          <ProjectCard
            v-for="(project, i) in projects"
            :key="project.id"
            :project="project"
            :index="i"
          />
        </div>
      </div>
    </section>

    <!-- Skills -->
    <section
      id="skills"
      class="border-t border-white/5 py-20 sm:py-28"
      aria-labelledby="skills-heading"
    >
      <div class="mx-auto max-w-6xl px-6">
        <header class="max-w-2xl">
          <p class="text-xs font-semibold uppercase tracking-widest text-accent-400">Toolkit</p>
          <h2
            id="skills-heading"
            class="mt-3 text-3xl font-semibold tracking-tight text-white sm:text-4xl"
          >
            What I work with day to day
          </h2>
        </header>

        <div
          class="mt-12 grid gap-px overflow-hidden rounded-2xl bg-white/10 sm:grid-cols-2 lg:grid-cols-3"
        >
          <div v-for="group in skills" :key="group.group" class="bg-ink-900 p-6">
            <h3 class="text-sm font-semibold text-white">{{ group.group }}</h3>
            <ul class="mt-4 flex flex-wrap gap-1.5">
              <li
                v-for="item in group.items"
                :key="item"
                class="rounded-md bg-white/5 px-2 py-1 text-xs text-slate-300"
              >
                {{ item }}
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>

    <!-- Contact -->
    <section
      id="contact"
      class="border-t border-white/5 py-20 sm:py-28"
      aria-labelledby="contact-heading"
    >
      <div class="mx-auto max-w-6xl px-6">
        <div
          class="relative overflow-hidden rounded-2xl bg-ink-900 px-6 py-14 text-center ring-1 ring-white/10 sm:px-14"
        >
          <div
            class="pointer-events-none absolute left-1/2 top-0 size-80 -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent-500/10 blur-[80px]"
            aria-hidden="true"
          />
          <h2
            id="contact-heading"
            class="text-3xl font-semibold tracking-tight text-white sm:text-4xl"
          >
            Open to frontend roles
          </h2>
          <p class="mx-auto mt-4 max-w-lg text-base leading-relaxed text-slate-300">
            Looking for my next frontend developer position, ideally working with Vue and TypeScript.
          </p>
          <a
            :href="`mailto:${profile.email}`"
            class="mt-8 inline-block rounded-xl bg-accent-500 px-6 py-3 text-sm font-semibold text-ink-950 transition hover:bg-accent-400"
          >
            {{ profile.email }}
          </a>
        </div>
      </div>
    </section>
  </main>

  <footer class="border-t border-white/5 py-10">
    <div
      class="mx-auto flex max-w-6xl flex-col items-center justify-between gap-3 px-6 text-xs text-slate-400 sm:flex-row"
    >
      <p>© {{ year }} {{ profile.name }}</p>
      <p>Built with Vue 3, TypeScript and Tailwind CSS</p>
    </div>
  </footer>
</template>
