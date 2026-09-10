<script setup lang="ts">
import { profile } from '../data/portfolio'
</script>

<template>
  <section id="top" class="relative overflow-hidden pt-32 pb-20 sm:pt-40 sm:pb-28">
    <div class="pointer-events-none absolute inset-0 -z-10" aria-hidden="true">
      <div
        class="absolute left-1/2 top-[-12rem] size-[36rem] -translate-x-1/2 rounded-full bg-accent-solid/10 blur-[100px]"
      />
      <div
        class="absolute inset-0 opacity-[0.14]"
        style="
          background-image:
            linear-gradient(to right, var(--grid-line) 1px, transparent 1px),
            linear-gradient(to bottom, var(--grid-line) 1px, transparent 1px);
          background-size: 64px 64px;
          mask-image: radial-gradient(ellipse 70% 55% at 50% 0%, black, transparent);
        "
      />
    </div>

    <div class="mx-auto max-w-6xl px-6">
      <h1 class="max-w-3xl text-4xl font-semibold tracking-tight text-strong sm:text-6xl">
        {{ profile.name }}
        <span class="block text-muted">{{ profile.role }}</span>
      </h1>

      <p class="mt-6 max-w-2xl text-lg leading-relaxed text-body">
        {{ profile.tagline }}
      </p>

      <div class="mt-9 flex flex-wrap items-center gap-3">
        <a
          href="#work"
          class="rounded-xl bg-accent-solid px-5 py-2.5 text-sm font-semibold text-accent-on transition hover:bg-accent-hover"
        >
          View my work
        </a>
        <a
          v-for="link in profile.links"
          :key="link.href"
          :href="link.href"
          :target="link.external ? '_blank' : undefined"
          :rel="link.external ? 'noopener noreferrer' : undefined"
          class="rounded-xl px-5 py-2.5 text-sm font-semibold text-body ring-1 ring-line transition hover:bg-raised"
        >
          {{ link.label }}
        </a>
      </div>

      <dl class="mt-16 grid grid-cols-2 gap-px overflow-hidden rounded-2xl bg-line sm:grid-cols-4">
        <div v-for="item in profile.highlights" :key="item.label" class="bg-surface px-5 py-6">
          <dt class="text-xs uppercase tracking-wider text-muted">{{ item.label }}</dt>
          <dd class="mt-1.5 text-xl font-semibold text-strong sm:text-2xl">{{ item.value }}</dd>
        </div>
      </dl>
    </div>
  </section>
</template>
