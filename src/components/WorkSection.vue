<script setup lang="ts">
import SectionHeading from './SectionHeading.vue'
import ProjectCard from './ProjectCard.vue'
import CompactProjectCard from './CompactProjectCard.vue'
import { additionalProjects, projects } from '../data/portfolio'
</script>

<template>
  <section id="work" class="border-t border-line-soft py-20 sm:py-28" aria-labelledby="work-heading">
    <div class="mx-auto max-w-6xl px-6">
      <SectionHeading v-reveal id="work-heading" eyebrow="Selected work" title="Seven production projects">
        An internal admin CMS, customer-facing sites, real-time games and mobile web inside native
        shells. These are commercial applications, so I've described the work rather than shared the
        source — happy to walk through any of it in an interview.
      </SectionHeading>

      <div class="mt-12 grid gap-6">
        <ProjectCard
          v-for="(project, i) in projects"
          :key="project.id"
          v-reveal="i * 80"
          :project="project"
        />
      </div>

      <h3 v-reveal class="mt-16 text-lg font-semibold text-strong">Also built</h3>
      <div class="mt-6 grid gap-6 sm:grid-cols-2">
        <CompactProjectCard
          v-for="(project, i) in additionalProjects"
          :key="project.id"
          v-reveal="i * 80"
          :project="project"
        />
      </div>
    </div>
  </section>
</template>
