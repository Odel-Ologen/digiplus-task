<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue'
import { useTheme } from '../composables/useTheme'
import { useTour } from '../tour/useTour'

const { theme, toggle: toggleTheme } = useTheme()
const { start: startTour } = useTour()

interface NavLink {
  href: string
  label: string
}

const links: NavLink[] = [
  { href: '#experience', label: 'Experience' },
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
        ? 'border-b border-line bg-page/80 backdrop-blur-xl'
        : 'border-b border-transparent'
    "
  >
    <div class="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
      <a href="#top" class="flex items-center gap-2.5">
        <span
          class="grid size-8 place-items-center rounded-lg bg-accent-soft text-sm font-semibold text-accent ring-1 ring-accent/25"
          aria-hidden="true"
        >
          RO
        </span>
        <span class="text-sm font-medium text-strong">Rodel Ologen</span>
      </a>

      <nav class="hidden items-center gap-1 md:flex" aria-label="Sections">
        <a
          v-for="link in links"
          :key="link.href"
          :href="link.href"
          class="rounded-lg px-3 py-2 text-sm transition hover:bg-raised hover:text-strong"
          :class="activeId === link.href.slice(1) ? 'text-strong' : 'text-muted'"
          :aria-current="activeId === link.href.slice(1) ? 'true' : undefined"
        >
          {{ link.label }}
        </a>
      </nav>

      <div class="flex items-center gap-2">
        <button
          type="button"
          class="hidden rounded-lg px-3 py-2 text-sm text-muted ring-1 ring-line transition hover:bg-raised hover:text-strong sm:block"
          @click="startTour"
        >
          Take a tour
        </button>

        <button
          type="button"
          class="grid size-9 place-items-center rounded-lg text-muted ring-1 ring-line transition hover:bg-raised hover:text-strong"
          :aria-label="theme === 'dark' ? 'Switch to light theme' : 'Switch to dark theme'"
          @click="toggleTheme"
        >
          <!-- Sun while dark (click for light), moon while light -->
          <svg
            v-if="theme === 'dark'"
            class="size-4"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            aria-hidden="true"
          >
            <circle cx="12" cy="12" r="4" />
            <path
              d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"
              stroke-linecap="round"
            />
          </svg>
          <svg
            v-else
            class="size-4"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            aria-hidden="true"
          >
            <path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z" stroke-linejoin="round" />
          </svg>
        </button>

        <button
          type="button"
          class="grid size-9 place-items-center rounded-lg text-body ring-1 ring-line transition hover:bg-raised md:hidden"
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
        class="border-t border-line bg-page/95 px-6 py-3 backdrop-blur-xl md:hidden"
        aria-label="Sections"
      >
        <a
          v-for="link in links"
          :key="link.href"
          :href="link.href"
          class="block rounded-lg px-3 py-2.5 text-sm text-body transition hover:bg-raised hover:text-strong"
          @click="open = false"
        >
          {{ link.label }}
        </a>
      </nav>
    </Transition>
  </header>
</template>
