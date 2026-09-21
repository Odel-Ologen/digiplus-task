<script setup lang="ts">
import SectionHeading from './SectionHeading.vue'
import { experience } from '../data/portfolio'
</script>

<template>
  <section
    id="experience"
    class="border-t border-line-soft py-20 sm:py-28"
    aria-labelledby="experience-heading"
  >
    <div class="mx-auto max-w-6xl px-6">
      <SectionHeading v-reveal id="experience-heading" eyebrow="Experience" title="Where I've worked">
        Two years building and maintaining production web applications on a multi-developer team.
      </SectionHeading>

      <ol class="mt-12 space-y-8">
        <li
          v-for="role in experience"
          :key="`${role.company}-${role.period}`"
          v-reveal
          class="relative pl-8 sm:pl-10"
        >
          <!-- Timeline rail + node -->
          <span
            class="absolute left-0 top-2 h-full w-px bg-line last:hidden"
            aria-hidden="true"
          />
          <span
            class="absolute left-0 top-2 size-2 -translate-x-1/2 rounded-full bg-accent-solid ring-4 ring-page"
            aria-hidden="true"
          />

          <div class="rounded-2xl bg-surface p-6 ring-1 ring-line sm:p-8">
            <div class="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
              <h3 class="text-xl font-semibold text-strong">{{ role.title }}</h3>
              <p class="text-sm text-muted">{{ role.period }}</p>
            </div>
            <p class="mt-1 text-sm font-medium text-body">
              {{ role.company }}
              <span class="text-muted">· {{ role.location }}</span>
            </p>

            <p class="mt-4 text-sm leading-relaxed text-body">{{ role.summary }}</p>

            <ul class="mt-5 space-y-2.5">
              <li
                v-for="item in role.highlights"
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
          </div>
        </li>
      </ol>
    </div>
  </section>
</template>
