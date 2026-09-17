<script setup lang="ts">
import { computed, ref } from 'vue'
import { profile } from '../data/portfolio'

type Field = 'name' | 'email' | 'message'
type Status = 'idle' | 'submitting' | 'success' | 'error'

const ENDPOINT = 'https://api.web3forms.com/submit'
/** Public by design — Web3Forms keys are meant to be visible in client code. */
const ACCESS_KEY = import.meta.env['VITE_WEB3FORMS_KEY'] ?? ''

const form = ref<Record<Field, string>>({ name: '', email: '', message: '' })
/** Honeypot: real users never see it, bots fill it in. */
const botcheck = ref('')
const errors = ref<Partial<Record<Field, string>>>({})
const status = ref<Status>('idle')
const serverError = ref('')

const configured = computed(() => ACCESS_KEY.length > 0)

const validate = (): boolean => {
  const next: Partial<Record<Field, string>> = {}
  const { name, email, message } = form.value

  if (!name.trim()) next.name = 'Please enter your name.'

  if (!email.trim()) next.email = 'Please enter your email.'
  // Deliberately loose: the only real check is whether a reply arrives.
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email.trim()))
    next.email = 'That does not look like a valid email address.'

  if (!message.trim()) next.message = 'Please enter a message.'
  else if (message.trim().length < 10) next.message = 'A little more detail, please (10+ characters).'

  errors.value = next
  return Object.keys(next).length === 0
}

const focusFirstError = (): void => {
  const first = (['name', 'email', 'message'] as Field[]).find((f) => errors.value[f])
  if (first) document.getElementById(`contact-${first}`)?.focus()
}

const submit = async (): Promise<void> => {
  if (status.value === 'submitting') return
  serverError.value = ''

  if (!validate()) {
    focusFirstError()
    return
  }

  // Silently succeed for bots so they do not retry.
  if (botcheck.value) {
    status.value = 'success'
    return
  }

  status.value = 'submitting'

  try {

    const body = new FormData()
    body.append('access_key', ACCESS_KEY)
    body.append('subject', `Portfolio enquiry from ${form.value.name}`)
    body.append('from_name', 'Portfolio contact form')
    body.append('name', form.value.name)
    body.append('email', form.value.email)
    body.append('message', form.value.message)

    const response = await fetch(ENDPOINT, { method: 'POST', body })

    const result: unknown = await response.json().catch(() => null)
    const ok =
      response.ok &&
      typeof result === 'object' &&
      result !== null &&
      (result as { success?: boolean }).success === true

    if (!ok) {
      const message =
        typeof result === 'object' && result !== null
          ? (result as { message?: string }).message
          : undefined
      throw new Error(message ?? `Request failed (${response.status})`)
    }

    status.value = 'success'
    form.value = { name: '', email: '', message: '' }
    errors.value = {}
  } catch (error) {
    status.value = 'error'
    serverError.value =
      error instanceof TypeError
        ? 'the mail service could not be reached — this is usually a network block or a browser extension.'
        : error instanceof Error
          ? error.message
          : 'an unexpected error occurred.'
  }
}

const fieldClass = (field: Field): string =>
  [
    'w-full rounded-xl bg-raised px-3.5 py-2.5 text-sm text-strong ring-1 transition',
    'placeholder:text-muted focus:outline-none',
    errors.value[field] ? 'ring-red-500' : 'ring-line focus:ring-accent',
  ].join(' ')
</script>

<template>
  <form class="mt-10 text-left" novalidate @submit.prevent="submit">
    <!-- Honeypot -->
    <input
      v-model="botcheck"
      type="checkbox"
      name="botcheck"
      class="hidden"
      tabindex="-1"
      autocomplete="off"
      aria-hidden="true"
    />

    <div class="grid gap-4 sm:grid-cols-2">
      <div>
        <label for="contact-name" class="mb-1.5 block text-sm font-medium text-body">Name</label>
        <input
          id="contact-name"
          v-model="form.name"
          type="text"
          autocomplete="name"
          placeholder="Your name"
          :class="fieldClass('name')"
          :aria-invalid="Boolean(errors.name)"
          :aria-describedby="errors.name ? 'contact-name-error' : undefined"
        />
        <p v-if="errors.name" id="contact-name-error" class="mt-1.5 text-xs text-red-400">
          {{ errors.name }}
        </p>
      </div>

      <div>
        <label for="contact-email" class="mb-1.5 block text-sm font-medium text-body">Email</label>
        <input
          id="contact-email"
          v-model="form.email"
          type="email"
          autocomplete="email"
          placeholder="you@company.com"
          :class="fieldClass('email')"
          :aria-invalid="Boolean(errors.email)"
          :aria-describedby="errors.email ? 'contact-email-error' : undefined"
        />
        <p v-if="errors.email" id="contact-email-error" class="mt-1.5 text-xs text-red-400">
          {{ errors.email }}
        </p>
      </div>
    </div>

    <div class="mt-4">
      <label for="contact-message" class="mb-1.5 block text-sm font-medium text-body">Message</label>
      <textarea
        id="contact-message"
        v-model="form.message"
        rows="4"
        placeholder="What would you like to talk about?"
        :class="fieldClass('message')"
        :aria-invalid="Boolean(errors.message)"
        :aria-describedby="errors.message ? 'contact-message-error' : undefined"
      />
      <p v-if="errors.message" id="contact-message-error" class="mt-1.5 text-xs text-red-400">
        {{ errors.message }}
      </p>
    </div>

    <div class="mt-5 flex flex-wrap items-center gap-3">
      <button
        type="submit"
        class="rounded-xl bg-accent-solid px-6 py-2.5 text-sm font-semibold text-accent-on transition hover:bg-accent-hover disabled:cursor-not-allowed disabled:opacity-50"
        :disabled="status === 'submitting' || !configured"
      >
        {{ status === 'submitting' ? 'Sending…' : 'Send message' }}
      </button>

      <a
        :href="`mailto:${profile.email}`"
        class="text-sm text-muted underline underline-offset-4 transition hover:text-strong"
      >
        or email directly
      </a>
    </div>

    <!-- Status region: announced to screen readers without stealing focus -->
    <p
      v-if="status === 'success' || status === 'error' || !configured"
      class="mt-4 text-sm"
      :class="status === 'success' ? 'text-accent' : 'text-red-400'"
      role="status"
      aria-live="polite"
    >
      <template v-if="!configured">
        Form not configured yet — set VITE_WEB3FORMS_KEY in .env.local. Email still works.
      </template>
      <template v-else-if="status === 'success'">
        Thanks — your message was sent. I'll reply to the address you gave.
      </template>
      <template v-else> Could not send: {{ serverError }} Please email directly instead. </template>
    </p>
  </form>
</template>
