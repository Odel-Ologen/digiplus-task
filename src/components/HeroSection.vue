<script setup lang="ts">
import { profile } from '../data/portfolio'
</script>

<template>
  <section id="top" class="relative overflow-hidden pt-32 pb-20 sm:pt-40 sm:pb-28">
    <div class="pointer-events-none absolute inset-0 -z-10" aria-hidden="true">
      <div
        class="absolute left-1/2 top-[-12rem] size-[36rem] -translate-x-1/2 rounded-full bg-accent-500/10 blur-[100px]"
      />
      <div
        class="absolute inset-0 opacity-[0.14]"
        style="
          background-image:
            linear-gradient(to right, rgba(255, 255, 255, 0.5) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(255, 255, 255, 0.5) 1px, transparent 1px);
          background-size: 64px 64px;
          mask-image: radial-gradient(ellipse 70% 55% at 50% 0%, black, transparent);
        "
      />
    </div>

    <div class="mx-auto max-w-6xl px-6">
      <h1 class="max-w-3xl text-4xl font-semibold tracking-tight text-white sm:text-6xl">
        {{ profile.name }}
        <span class="block text-slate-400">{{ profile.role }}</span>
      </h1>

      <p class="mt-6 max-w-2xl text-lg leading-relaxed text-slate-300">
        {{ profile.tagline }}
      </p>

      <div class="mt-9 flex flex-wrap items-center gap-3">
        <a
          href="#work"
          class="rounded-xl bg-accent-500 px-5 py-2.5 text-sm font-semibold text-ink-950 transition hover:bg-accent-400"
        >
          View my work
        </a>
        <a
          v-for="link in profile.links"
          :key="link.href"
          :href="link.href"
          :target="link.external ? '_blank' : undefined"
          :rel="link.external ? 'noopener noreferrer' : undefined"
          class="rounded-xl px-5 py-2.5 text-sm font-semibold text-slate-200 ring-1 ring-white/15 transition hover:bg-white/5"
        >
          {{ link.label }}
        </a>
      </div>

      <dl class="mt-16 grid grid-cols-2 gap-px overflow-hidden rounded-2xl bg-white/10 sm:grid-cols-4">
        <div v-for="item in profile.highlights" :key="item.label" class="bg-ink-900 px-5 py-6">
          <dt class="text-xs uppercase tracking-wider text-slate-400">{{ item.label }}</dt>
          <dd class="mt-1.5 text-xl font-semibold text-white sm:text-2xl">{{ item.value }}</dd>
        </div>
      </dl>
    </div>
  </section>
</template>
