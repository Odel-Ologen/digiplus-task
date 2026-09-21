<script setup lang="ts">
import { nextTick, onMounted, onUnmounted, useTemplateRef } from 'vue'
import { useTour } from '../tour/useTour'

const { current, placement, index, total, isFirst, isLast, stop, next, back } = useTour()

const tooltip = useTemplateRef<HTMLDivElement>('tooltip')

/** Element that had focus before the tour opened, so it can be restored. */
let returnFocusTo: HTMLElement | null = null

const onKeydown = (event: KeyboardEvent): void => {
  switch (event.key) {
    case 'Escape':
      event.preventDefault()
      stop()
      break
    case 'ArrowRight':
      event.preventDefault()
      next()
      break
    case 'ArrowLeft':
      event.preventDefault()
      back()
      break
  }
}

/*
  This component is only mounted while the tour is running — App.vue renders it
  behind `v-if`, and it is an async chunk, so none of it is downloaded until
  someone actually starts the tour. Setup therefore belongs in the lifecycle
  hooks rather than a watcher on `active`: by the time we mount, it is already
  true and a non-immediate watcher would never fire.

  Deliberately NOT locking body scroll. `overflow: hidden` on <body> propagates
  to the viewport, which both shifted the centred page right as the scrollbar
  disappeared, and blocked the tour's own scrollIntoView. The runner re-measures
  on scroll, so the spotlight tracks its target if the visitor scrolls anyway.
*/
onMounted(async () => {
  returnFocusTo = document.activeElement instanceof HTMLElement ? document.activeElement : null
  window.addEventListener('keydown', onKeydown)
  await nextTick()
  tooltip.value?.focus()
})

onUnmounted(() => {
  window.removeEventListener('keydown', onKeydown)
  returnFocusTo?.focus()
  returnFocusTo = null
})
</script>

<template>
  <Teleport to="body">
    <Transition
      enter-active-class="transition-opacity duration-200 motion-reduce:transition-none"
      enter-from-class="opacity-0"
      leave-active-class="transition-opacity duration-150 motion-reduce:transition-none"
      leave-to-class="opacity-0"
    >
      <div v-if="placement && current" class="fixed inset-0 z-[100]">
        <!--
          The spotlight is one box with an enormous outward shadow: everything
          outside the box is dimmed, the box itself stays clear. Cheaper and
          far simpler than compositing four separate overlay panels.
        -->
        <div
          class="pointer-events-none absolute rounded-xl transition-all duration-300 ease-out motion-reduce:transition-none"
          :style="{
            top: `${placement.top}px`,
            left: `${placement.left}px`,
            width: `${placement.width}px`,
            height: `${placement.height}px`,
            /*
              Two shadows: an accent ring, then the dim.
              The ring does the real work — on a near-black page, dimming with
              black barely separates anything, so the highlight has to be drawn
              rather than implied. --tour-dim is theme-aware for the same reason.
            */
            boxShadow: '0 0 0 3px var(--accent), 0 0 0 9999px var(--tour-dim)',
          }"
          aria-hidden="true"
        />

        <!-- Click-off-to-exit, behind the tooltip -->
        <button
          type="button"
          class="absolute inset-0 -z-10 cursor-default"
          tabindex="-1"
          aria-hidden="true"
          @click="stop"
        />

        <div
          ref="tooltip"
          role="dialog"
          aria-modal="true"
          :aria-label="`Site tour, step ${index + 1} of ${total}`"
          tabindex="-1"
          class="absolute w-80 rounded-2xl bg-surface p-5 shadow-2xl ring-1 ring-line transition-all duration-300 ease-out focus:outline-none motion-reduce:transition-none"
          :style="{
            top: `${placement.tooltipTop}px`,
            left: `${placement.tooltipLeft}px`,
            transform: placement.side === 'top' ? 'translateY(-100%)' : undefined,
          }"
        >
          <p class="text-xs font-semibold uppercase tracking-wider text-accent">
            Step {{ index + 1 }} of {{ total }}
          </p>
          <h2 class="mt-1.5 text-lg font-semibold text-strong">{{ current.title }}</h2>
          <p class="mt-2 text-sm leading-relaxed text-body">{{ current.body }}</p>

          <!-- Progress -->
          <div class="mt-4 h-1 overflow-hidden rounded-full bg-raised" aria-hidden="true">
            <div
              class="h-full rounded-full bg-accent-solid transition-all duration-300 motion-reduce:transition-none"
              :style="{ width: `${((index + 1) / total) * 100}%` }"
            />
          </div>

          <div class="mt-4 flex items-center justify-between gap-3">
            <button
              type="button"
              class="rounded-lg px-2 py-1.5 text-sm text-muted transition hover:text-strong"
              @click="stop"
            >
              Skip
            </button>

            <div class="flex items-center gap-2">
              <button
                v-if="!isFirst"
                type="button"
                class="rounded-lg px-3 py-1.5 text-sm font-medium text-body ring-1 ring-line transition hover:bg-raised"
                @click="back"
              >
                Back
              </button>
              <button
                type="button"
                class="rounded-lg bg-accent-solid px-4 py-1.5 text-sm font-semibold text-accent-on transition hover:bg-accent-hover"
                @click="next"
              >
                {{ isLast ? 'Done' : 'Next' }}
              </button>
            </div>
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>
