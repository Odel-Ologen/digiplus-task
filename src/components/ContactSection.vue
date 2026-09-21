<script setup lang="ts">
import ContactForm from './ContactForm.vue'
</script>

<template>
  <section
    id="contact"
    class="border-t border-line-soft py-20 sm:py-28"
    aria-labelledby="contact-heading"
  >
    <div class="mx-auto max-w-6xl px-6">
      <div
        v-reveal
        class="relative overflow-hidden rounded-2xl bg-surface px-6 py-14 text-center ring-1 ring-line sm:px-14"
      >
        <div
          class="pointer-events-none absolute left-1/2 top-0 size-80 -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent-solid/10 blur-[80px]"
          aria-hidden="true"
        />
        <h2 id="contact-heading" class="text-3xl font-semibold tracking-tight text-strong sm:text-4xl">
          Open to frontend roles
        </h2>
        <p class="mx-auto mt-4 max-w-lg text-base leading-relaxed text-body">
          Looking for my next frontend developer position, ideally working with Vue and TypeScript.
        </p>

        <div class="mx-auto max-w-xl">
          <ContactForm />
        </div>
      </div>
    </div>
  </section>
</template>
