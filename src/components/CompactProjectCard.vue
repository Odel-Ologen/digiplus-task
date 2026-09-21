<script setup lang="ts">
import type { CompactProject } from '../data/portfolio'
import TechChip from './TechChip.vue'

defineProps<{ project: CompactProject }>()
</script>

<template>
  <article
    class="flex h-full flex-col rounded-2xl bg-surface p-6 ring-1 ring-line transition hover:ring-line-strong"
  >
    <p class="text-xs font-medium uppercase tracking-wider text-accent">{{ project.kind }}</p>
    <h3 class="mt-2 text-lg font-semibold text-strong">{{ project.name }}</h3>
    <p v-if="project.context" class="mt-1 text-xs text-muted">{{ project.context }}</p>

    <p class="mt-4 flex-1 text-sm leading-relaxed text-body">{{ project.summary }}</p>

    <ul class="mt-5 flex flex-wrap gap-1.5 border-t border-line-soft pt-5">
      <TechChip v-for="tech in project.stack" :key="tech" :label="tech" />
    </ul>
  </article>
</template>
