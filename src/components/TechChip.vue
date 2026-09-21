<script setup lang="ts">
/** A single technology / keyword pill. Rendered as <li> inside a list. */
defineProps<{ label: string }>()
</script>

<template>
  <li class="rounded-md bg-raised px-2 py-1 text-xs text-body">{{ label }}</li>
</template>
