<script setup lang="ts">
import SiteHeader from './components/SiteHeader.vue'
import HeroSection from './components/HeroSection.vue'
import ExperienceSection from './components/ExperienceSection.vue'
import WorkSection from './components/WorkSection.vue'
import SkillsSection from './components/SkillsSection.vue'
import ContactSection from './components/ContactSection.vue'
import { defineAsyncComponent } from 'vue'
import ChatWidget from './components/ChatWidget.vue'
import { useTour } from './tour/useTour'
import { profile } from './data/portfolio'

/*
  The tour overlay is a separate chunk, fetched only when someone starts the
  tour. Pairing defineAsyncComponent with `v-if` is what makes that work — an
  async component that is always rendered downloads immediately anyway.
*/
const TourOverlay = defineAsyncComponent(() => import('./components/TourOverlay.vue'))

const { active: tourActive } = useTour()

const year = new Date().getFullYear()
</script>

<template>
  <a
    href="#experience"
    class="sr-only focus:not-sr-only focus:fixed focus:left-6 focus:top-4 focus:z-[60] focus:rounded-lg focus:bg-accent-solid focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-accent-on"
  >
    Skip to content
  </a>

  <SiteHeader />
  <ChatWidget />
  <TourOverlay v-if="tourActive" />

  <main>
    <HeroSection />
    <ExperienceSection />
    <WorkSection />
    <SkillsSection />
    <ContactSection />
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
