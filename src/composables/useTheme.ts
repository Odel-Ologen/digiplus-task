import { onMounted, onUnmounted, ref } from 'vue'

export type Theme = 'light' | 'dark'

const STORAGE_KEY = 'theme'

/** Reads the stored choice, ignoring anything unexpected in localStorage. */
const storedTheme = (): Theme | null => {
  try {
    const value = localStorage.getItem(STORAGE_KEY)
    return value === 'light' || value === 'dark' ? value : null
  } catch {
    // Private browsing can throw on localStorage access.
    return null
  }
}

const systemTheme = (): Theme =>
  window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'

/**
 * Current theme, plus a toggle that persists the choice.
 *
 * Until the visitor picks one, no `data-theme` attribute is set at all, so the
 * CSS `prefers-color-scheme` block stays in charge and the page follows the OS
 * — including if the OS flips while the page is open.
 */
export function useTheme() {
  const theme = ref<Theme>('dark')
  const hasChosen = ref(false)

  const query = window.matchMedia('(prefers-color-scheme: dark)')

  const onSystemChange = (event: MediaQueryListEvent): void => {
    if (!hasChosen.value) theme.value = event.matches ? 'dark' : 'light'
  }

  const setTheme = (next: Theme): void => {
    theme.value = next
    hasChosen.value = true
    document.documentElement.dataset.theme = next
    try {
      localStorage.setItem(STORAGE_KEY, next)
    } catch {
      // Nothing to do — the theme still applies for this page view.
    }
  }

  const toggle = (): void => setTheme(theme.value === 'dark' ? 'light' : 'dark')

  onMounted(() => {
    const saved = storedTheme()
    hasChosen.value = saved !== null
    theme.value = saved ?? systemTheme()
    query.addEventListener('change', onSystemChange)
  })

  onUnmounted(() => query.removeEventListener('change', onSystemChange))

  return { theme, toggle }
}
