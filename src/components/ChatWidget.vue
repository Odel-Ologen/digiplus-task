<script setup lang="ts">
import { nextTick, onMounted, onUnmounted, ref, useTemplateRef } from 'vue'
import { findAnswer, greeting } from '../data/chatbot'

interface Message {
  id: number
  from: 'bot' | 'user'
  text: string
}

const open = ref(false)
const draft = ref('')
const thinking = ref(false)
const followUps = ref<string[]>(greeting.followUps)
const messages = ref<Message[]>([{ id: 0, from: 'bot', text: greeting.text }])

const input = useTemplateRef<HTMLInputElement>('input')
const toggle = useTemplateRef<HTMLButtonElement>('toggle')
const log = useTemplateRef<HTMLDivElement>('log')

let nextId = 1
let replyTimer: ReturnType<typeof setTimeout> | undefined

const scrollToLatest = async (): Promise<void> => {
  await nextTick()
  if (log.value) log.value.scrollTop = log.value.scrollHeight
}

const send = (raw: string): void => {
  const text = raw.trim()
  if (!text || thinking.value) return

  messages.value.push({ id: nextId++, from: 'user', text })
  draft.value = ''
  followUps.value = []
  thinking.value = true
  void scrollToLatest()

  // Small pause so the reply reads as a response rather than appearing instantly.
  replyTimer = setTimeout(() => {
    const match = findAnswer(text)
    messages.value.push({ id: nextId++, from: 'bot', text: match.text })
    followUps.value = match.followUps
    thinking.value = false
    void scrollToLatest()
  }, 450)
}

const openPanel = async (): Promise<void> => {
  open.value = true
  await nextTick()
  input.value?.focus()
  void scrollToLatest()
}

const closePanel = (): void => {
  open.value = false
  toggle.value?.focus()
}

const onKeydown = (event: KeyboardEvent): void => {
  if (event.key === 'Escape' && open.value) closePanel()
}

onMounted(() => window.addEventListener('keydown', onKeydown))
onUnmounted(() => {
  window.removeEventListener('keydown', onKeydown)
  clearTimeout(replyTimer)
})

/** Renders **bold** segments without pulling in a markdown dependency. */
const segments = (text: string): { bold: boolean; value: string }[] =>
  text.split(/(\*\*[^*]+\*\*)/g).flatMap((part) =>
    part
      ? [
          part.startsWith('**') && part.endsWith('**')
            ? { bold: true, value: part.slice(2, -2) }
            : { bold: false, value: part },
        ]
      : [],
  )
</script>

<template>
  <div class="fixed bottom-5 right-5 z-50 flex flex-col items-end gap-3 sm:bottom-6 sm:right-6">
    <!-- Panel -->
    <Transition
      enter-active-class="transition duration-200 ease-out motion-reduce:transition-none"
      enter-from-class="translate-y-3 scale-95 opacity-0"
      leave-active-class="transition duration-150 ease-in motion-reduce:transition-none"
      leave-to-class="translate-y-3 scale-95 opacity-0"
    >
      <div
        v-show="open"
        id="chat-panel"
        role="dialog"
        aria-label="Chat about this portfolio"
        class="flex h-[30rem] max-h-[calc(100vh-8rem)] w-[calc(100vw-2.5rem)] flex-col overflow-hidden rounded-2xl bg-surface shadow-2xl ring-1 ring-line sm:w-96"
      >
        <header class="flex items-center justify-between border-b border-line px-4 py-3">
          <div class="flex items-center gap-2.5">
            <span class="relative flex size-2" aria-hidden="true">
              <span class="absolute inline-flex size-full rounded-full bg-accent opacity-60" />
              <span class="relative inline-flex size-2 rounded-full bg-accent" />
            </span>
            <div>
              <p class="text-sm font-semibold text-strong">Ask about my work</p>
              <p class="text-xs text-muted">Answers come from this page</p>
            </div>
          </div>
          <button
            type="button"
            class="grid size-8 place-items-center rounded-lg text-muted transition hover:bg-raised hover:text-strong"
            aria-label="Close chat"
            @click="closePanel"
          >
            <svg
              class="size-4"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              aria-hidden="true"
            >
              <path d="M6 6l12 12M18 6L6 18" stroke-linecap="round" />
            </svg>
          </button>
        </header>

        <!-- Message log: aria-live so replies are announced to screen readers -->
        <div
          ref="log"
          class="flex-1 space-y-3 overflow-y-auto px-4 py-4"
          role="log"
          aria-live="polite"
          aria-label="Conversation"
        >
          <div
            v-for="message in messages"
            :key="message.id"
            class="flex"
            :class="message.from === 'user' ? 'justify-end' : 'justify-start'"
          >
            <p
              class="max-w-[85%] whitespace-pre-line rounded-2xl px-3.5 py-2.5 text-sm leading-relaxed"
              :class="
                message.from === 'user'
                  ? 'rounded-br-sm bg-accent-solid text-accent-on'
                  : 'rounded-bl-sm bg-raised text-body'
              "
            >
              <template v-for="(segment, i) in segments(message.text)" :key="i">
                <strong v-if="segment.bold" class="font-semibold text-strong">{{
                  segment.value
                }}</strong>
                <template v-else>{{ segment.value }}</template>
              </template>
            </p>
          </div>

          <div v-if="thinking" class="flex justify-start">
            <p class="rounded-2xl rounded-bl-sm bg-raised px-3.5 py-3" aria-label="Typing">
              <span class="flex gap-1">
                <span
                  v-for="dot in 3"
                  :key="dot"
                  class="size-1.5 animate-bounce rounded-full bg-muted"
                  :style="{ animationDelay: `${(dot - 1) * 120}ms` }"
                />
              </span>
            </p>
          </div>
        </div>

        <!-- Suggested questions -->
        <div v-if="followUps.length" class="flex flex-wrap gap-1.5 px-4 pb-3">
          <button
            v-for="suggestion in followUps"
            :key="suggestion"
            type="button"
            class="rounded-full bg-raised px-2.5 py-1 text-xs text-body ring-1 ring-line transition hover:bg-line hover:text-strong"
            @click="send(suggestion)"
          >
            {{ suggestion }}
          </button>
        </div>

        <form
          class="flex items-center gap-2 border-t border-line px-3 py-3"
          @submit.prevent="send(draft)"
        >
          <label for="chat-input" class="sr-only">Type your question</label>
          <input
            id="chat-input"
            ref="input"
            v-model="draft"
            type="text"
            autocomplete="off"
            placeholder="Ask a question…"
            class="min-w-0 flex-1 rounded-xl bg-raised px-3 py-2 text-sm text-strong placeholder:text-muted ring-1 ring-line focus:outline-none focus:ring-accent"
          />
          <button
            type="submit"
            class="grid size-9 shrink-0 place-items-center rounded-xl bg-accent-solid text-accent-on transition hover:bg-accent-hover disabled:opacity-40"
            :disabled="!draft.trim() || thinking"
            aria-label="Send message"
          >
            <svg
              class="size-4"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              aria-hidden="true"
            >
              <path d="M5 12h14M13 6l6 6-6 6" stroke-linecap="round" stroke-linejoin="round" />
            </svg>
          </button>
        </form>
      </div>
    </Transition>

    <!-- Launcher -->
    <button
      ref="toggle"
      type="button"
      class="grid size-13 place-items-center rounded-full bg-accent-solid text-accent-on shadow-lg shadow-accent-solid/20 transition hover:bg-accent-hover"
      :aria-expanded="open"
      aria-controls="chat-panel"
      :aria-label="open ? 'Close chat' : 'Open chat to ask about this portfolio'"
      @click="open ? closePanel() : openPanel()"
    >
      <svg
        class="size-5"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        aria-hidden="true"
      >
        <path
          v-if="!open"
          d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <path v-else d="M6 6l12 12M18 6L6 18" stroke-linecap="round" />
      </svg>
    </button>
  </div>
</template>
