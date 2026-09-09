<script setup lang="ts">
import { computed, ref } from 'vue'
import type { Project } from '../data/portfolio'

const props = withDefaults(
  defineProps<{
    project: Project
    index?: number
  }>(),
  { index: 0 },
)

const expanded = ref(props.index === 0)
const panelId = computed(() => `project-${props.project.id}-detail`)
</script>

<template>
  <article
    class="relative overflow-hidden rounded-2xl bg-ink-900 ring-1 ring-white/10 transition hover:ring-white/20"
  >
    <div
      class="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-accent-500/40 to-transparent"
      aria-hidden="true"
    />

    <div class="p-6 sm:p-8">
      <p class="flex flex-wrap items-center gap-x-2.5 gap-y-1 text-xs">
        <span class="font-medium uppercase tracking-wider text-accent-400">
          {{ project.kind }}
        </span>
        <span class="text-slate-400" aria-hidden="true">•</span>
        <span class="text-slate-400">{{ project.period }}</span>
      </p>

      <h3 class="mt-2 text-2xl font-semibold text-white">{{ project.name }}</h3>

      <p class="mt-4 text-sm font-medium text-slate-200">{{ project.role }}</p>
      <p class="mt-1 text-xs text-slate-400">{{ project.context }}</p>

      <p class="mt-4 text-sm leading-relaxed text-slate-300">{{ project.summary }}</p>

      <button
        type="button"
        class="mt-5 inline-flex items-center gap-1.5 rounded text-sm font-medium text-accent-400 transition hover:text-accent-300"
        :aria-expanded="expanded"
        :aria-controls="panelId"
        @click="expanded = !expanded"
      >
        {{ expanded ? 'Hide' : 'Show' }} what I worked on
        <svg
          class="size-4 transition-transform duration-200"
          :class="expanded && 'rotate-180'"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          aria-hidden="true"
        >
          <path d="M6 9l6 6 6-6" stroke-linecap="round" stroke-linejoin="round" />
        </svg>
      </button>

      <!-- grid-rows 0fr→1fr animates to the content's real height, so there is
           no hardcoded max-height to clip longer lists. -->
      <div
        :id="panelId"
        class="grid transition-all duration-300 ease-out motion-reduce:transition-none"
        :class="expanded ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'"
      >
        <ul class="min-h-0 space-y-2.5 overflow-hidden" :aria-hidden="!expanded">
          <li
            v-for="(item, i) in project.contributions"
            :key="item"
            class="flex gap-3 text-sm leading-relaxed text-slate-300"
            :class="i === 0 && 'mt-5'"
          >
            <svg
              class="mt-1 size-3.5 shrink-0 text-accent-500"
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
      </div>

      <div class="mt-6 flex flex-wrap gap-1.5 border-t border-white/5 pt-6">
        <span
          v-for="tech in project.stack"
          :key="tech"
          class="rounded-md bg-white/5 px-2 py-1 text-xs text-slate-300"
        >
          {{ tech }}
        </span>
      </div>
    </div>
  </article>
</template>
