<script setup lang="ts">
/**
 * The eyebrow / title / intro block every section shares.
 *
 * `id` is required because each section labels itself with aria-labelledby
 * pointing at this heading — that is what gives the section an accessible name.
 * The eyebrow is a <p>, not a heading: it is small but it is not the section
 * title, and screen-reader users navigate by the heading outline.
 */
defineProps<{
  id: string
  eyebrow: string
  title: string
}>()
</script>

<template>
  <header class="max-w-2xl">
    <p class="text-xs font-semibold uppercase tracking-widest text-accent">{{ eyebrow }}</p>
    <h2 :id="id" class="mt-3 text-3xl font-semibold tracking-tight text-strong sm:text-4xl">
      {{ title }}
    </h2>
    <p v-if="$slots.default" class="mt-4 text-base leading-relaxed text-body">
      <slot />
    </p>
  </header>
</template>
