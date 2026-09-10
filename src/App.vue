<script setup lang="ts">
import SiteHeader from './components/SiteHeader.vue'
import HeroSection from './components/HeroSection.vue'
import ProjectCard from './components/ProjectCard.vue'
import ChatWidget from './components/ChatWidget.vue'
import CompactProjectCard from './components/CompactProjectCard.vue'
import { additionalProjects, profile, projects, skills } from './data/portfolio'

const year = 2026
</script>

<template>
  <a
    href="#work"
    class="sr-only focus:not-sr-only focus:fixed focus:left-6 focus:top-4 focus:z-[60] focus:rounded-lg focus:bg-accent-solid focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-accent-on"
  >
    Skip to content
  </a>

  <SiteHeader />
  <ChatWidget />

  <main>
    <HeroSection />

    <!-- Work -->
    <section id="work" class="border-t border-line-soft py-20 sm:py-28" aria-labelledby="work-heading">
      <div class="mx-auto max-w-6xl px-6">
        <header class="max-w-2xl">
          <p class="text-xs font-semibold uppercase tracking-widest text-accent">
            Professional experience
          </p>
          <h2
            id="work-heading"
            class="mt-3 text-3xl font-semibold tracking-tight text-strong sm:text-4xl"
          >
            Three production apps, one platform
          </h2>
          <p class="mt-4 text-base leading-relaxed text-body">
            Two years at DigiPlus Interactive Corp., working across their product portfolio: an
            internal admin CMS, customer-facing sites, real-time games and mobile web inside native
            shells. These are commercial applications, so I've described the work rather than shared
            the source — happy to walk through any of it in an interview.
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

        <h3 class="mt-16 text-lg font-semibold text-strong">Also built</h3>
        <div class="mt-6 grid gap-6 sm:grid-cols-2">
          <CompactProjectCard
            v-for="project in additionalProjects"
            :key="project.id"
            :project="project"
          />
        </div>
      </div>
    </section>

    <!-- Skills -->
    <section
      id="skills"
      class="border-t border-line-soft py-20 sm:py-28"
      aria-labelledby="skills-heading"
    >
      <div class="mx-auto max-w-6xl px-6">
        <header class="max-w-2xl">
          <p class="text-xs font-semibold uppercase tracking-widest text-accent">Toolkit</p>
          <h2
            id="skills-heading"
            class="mt-3 text-3xl font-semibold tracking-tight text-strong sm:text-4xl"
          >
            What I work with day to day
          </h2>
        </header>

        <div
          class="mt-12 grid gap-px overflow-hidden rounded-2xl bg-line sm:grid-cols-2 lg:grid-cols-3"
        >
          <div v-for="group in skills" :key="group.group" class="bg-surface p-6">
            <h3 class="text-sm font-semibold text-strong">{{ group.group }}</h3>
            <ul class="mt-4 flex flex-wrap gap-1.5">
              <li
                v-for="item in group.items"
                :key="item"
                class="rounded-md bg-raised px-2 py-1 text-xs text-body"
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
      class="border-t border-line-soft py-20 sm:py-28"
      aria-labelledby="contact-heading"
    >
      <div class="mx-auto max-w-6xl px-6">
        <div
          class="relative overflow-hidden rounded-2xl bg-surface px-6 py-14 text-center ring-1 ring-line sm:px-14"
        >
          <div
            class="pointer-events-none absolute left-1/2 top-0 size-80 -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent-solid/10 blur-[80px]"
            aria-hidden="true"
          />
          <h2
            id="contact-heading"
            class="text-3xl font-semibold tracking-tight text-strong sm:text-4xl"
          >
            Open to frontend roles
          </h2>
          <p class="mx-auto mt-4 max-w-lg text-base leading-relaxed text-body">
            Looking for my next frontend developer position, ideally working with Vue and TypeScript.
          </p>
          <a
            :href="`mailto:${profile.email}`"
            class="mt-8 inline-block rounded-xl bg-accent-solid px-6 py-3 text-sm font-semibold text-accent-on transition hover:bg-accent-hover"
          >
            {{ profile.email }}
          </a>
        </div>
      </div>
    </section>
  </main>

  <footer class="border-t border-line-soft py-10">
    <div
      class="mx-auto flex max-w-6xl flex-col items-center justify-between gap-3 px-6 text-xs text-muted sm:flex-row"
    >
      <p>© {{ year }} {{ profile.name }}</p>
      <p>Built with Vue 3, TypeScript and Tailwind CSS</p>
    </div>
  </footer>
</template>
