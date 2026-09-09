<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue'

interface NavLink {
  href: string
  label: string
}

const links: NavLink[] = [
  { href: '#work', label: 'Work' },
  { href: '#skills', label: 'Skills' },
  { href: '#contact', label: 'Contact' },
]

const scrolled = ref(false)
const open = ref(false)
const activeId = ref('')

let observer: IntersectionObserver | null = null

const onScroll = (): void => {
  scrolled.value = window.scrollY > 24
}

const onKeydown = (event: KeyboardEvent): void => {
  if (event.key === 'Escape') open.value = false
}

onMounted(() => {
  onScroll()
  window.addEventListener('scroll', onScroll, { passive: true })
  window.addEventListener('keydown', onKeydown)

  // Scroll-spy: highlight the nav entry for the section in view.
  observer = new IntersectionObserver(
    (entries) => {
      const visible = entries.find((entry) => entry.isIntersecting)
      if (visible) activeId.value = visible.target.id
    },
    { rootMargin: '-45% 0px -50% 0px' },
  )

  for (const link of links) {
    const section = document.querySelector(link.href)
    if (section) observer.observe(section)
  }
})

onUnmounted(() => {
  window.removeEventListener('scroll', onScroll)
  window.removeEventListener('keydown', onKeydown)
  observer?.disconnect()
})
</script>

<template>
  <header
    class="fixed inset-x-0 top-0 z-50 transition-colors duration-300"
    :class="
      scrolled
        ? 'border-b border-white/10 bg-ink-950/80 backdrop-blur-xl'
        : 'border-b border-transparent'
    "
  >
    <div class="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
      <a href="#top" class="flex items-center gap-2.5">
        <span
          class="grid size-8 place-items-center rounded-lg bg-accent-500/15 text-sm font-semibold text-accent-400 ring-1 ring-accent-500/30"
          aria-hidden="true"
        >
          RO
        </span>
        <span class="text-sm font-medium text-white">Rodel Ologen</span>
      </a>

      <nav class="hidden items-center gap-1 md:flex" aria-label="Sections">
        <a
          v-for="link in links"
          :key="link.href"
          :href="link.href"
          class="rounded-lg px-3 py-2 text-sm transition hover:bg-white/5 hover:text-white"
          :class="activeId === link.href.slice(1) ? 'text-white' : 'text-slate-400'"
          :aria-current="activeId === link.href.slice(1) ? 'true' : undefined"
        >
          {{ link.label }}
        </a>
      </nav>

      <button
        type="button"
        class="grid size-9 place-items-center rounded-lg text-slate-300 ring-1 ring-white/10 transition hover:bg-white/5 md:hidden"
        :aria-expanded="open"
        aria-controls="mobile-nav"
        aria-label="Toggle navigation"
        @click="open = !open"
      >
        <svg
          class="size-4"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          aria-hidden="true"
        >
          <path v-if="!open" d="M4 7h16M4 12h16M4 17h16" stroke-linecap="round" />
          <path v-else d="M6 6l12 12M18 6L6 18" stroke-linecap="round" />
        </svg>
      </button>
    </div>

    <Transition
      enter-active-class="transition duration-200 ease-out"
      enter-from-class="-translate-y-2 opacity-0"
      leave-active-class="transition duration-150 ease-in"
      leave-to-class="-translate-y-2 opacity-0"
    >
      <nav
        v-if="open"
        id="mobile-nav"
        class="border-t border-white/10 bg-ink-950/95 px-6 py-3 backdrop-blur-xl md:hidden"
        aria-label="Sections"
      >
        <a
          v-for="link in links"
          :key="link.href"
          :href="link.href"
          class="block rounded-lg px-3 py-2.5 text-sm text-slate-300 transition hover:bg-white/5 hover:text-white"
          @click="open = false"
        >
          {{ link.label }}
        </a>
      </nav>
    </Transition>
  </header>
</template>
