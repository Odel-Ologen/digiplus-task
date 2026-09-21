<script setup lang="ts">
import SectionHeading from './SectionHeading.vue'
import TechChip from './TechChip.vue'
import { skills } from '../data/portfolio'
</script>

<template>
  <section
    id="skills"
    class="border-t border-line-soft py-20 sm:py-28"
    aria-labelledby="skills-heading"
  >
    <div class="mx-auto max-w-6xl px-6">
      <SectionHeading v-reveal id="skills-heading" eyebrow="Toolkit" title="What I work with day to day" />

      <div
        class="mt-12 grid gap-px overflow-hidden rounded-2xl bg-line sm:grid-cols-2 lg:grid-cols-3"
      >
        <div v-for="(group, i) in skills" :key="group.group" v-reveal="i * 60" class="bg-surface p-6">
          <h3 class="text-sm font-semibold text-strong">{{ group.group }}</h3>
          <ul class="mt-4 flex flex-wrap gap-1.5">
            <TechChip v-for="item in group.items" :key="item" :label="item" />
          </ul>
        </div>
      </div>
    </div>
  </section>
</template>
