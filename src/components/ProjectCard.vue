<script setup lang="ts">
import type { Project } from '../data/portfolio'
import TechChip from './TechChip.vue'

defineProps<{ project: Project }>()
</script>

<template>
  <article
    class="relative overflow-hidden rounded-2xl bg-surface ring-1 ring-line transition hover:ring-line-strong"
  >
    <div
      class="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-accent-solid/40 to-transparent"
      aria-hidden="true"
    />

    <div class="p-6 sm:p-8">
      <p class="flex flex-wrap items-center gap-x-2.5 gap-y-1 text-xs">
        <span class="font-medium uppercase tracking-wider text-accent">{{ project.kind }}</span>
        <span class="text-muted" aria-hidden="true">•</span>
        <span class="text-muted">{{ project.period }}</span>
      </p>

      <h3 class="mt-2 text-2xl font-semibold text-strong">{{ project.name }}</h3>

      <p class="mt-4 text-sm font-medium text-body">{{ project.role }}</p>
      <p class="mt-1 text-xs text-muted">{{ project.context }}</p>

      <p class="mt-4 text-sm leading-relaxed text-body">{{ project.summary }}</p>

      <h4 class="mt-6 text-xs font-semibold uppercase tracking-wider text-muted">
        What I worked on
      </h4>
      <ul class="mt-3 space-y-2.5">
        <li
          v-for="item in project.contributions"
          :key="item"
          class="flex gap-3 text-sm leading-relaxed text-body"
        >
          <svg
            class="mt-1 size-3.5 shrink-0 text-accent"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2.5"
            aria-hidden="true"
          >
            <path d="M5 13l4 4L19 7" stroke-linecap="round" stroke-linejoin="round" />
          </svg>
          <span>{{ item }}</span>
        </li>
      </ul>

      <ul class="mt-6 flex flex-wrap gap-1.5 border-t border-line-soft pt-6">
        <TechChip v-for="tech in project.stack" :key="tech" :label="tech" />
      </ul>
    </div>
  </article>
</template>
