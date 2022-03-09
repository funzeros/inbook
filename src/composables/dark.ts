import { useDark, useToggle } from '@vueuse/core'
import { unref } from 'vue'

export const isDark = useDark()

const DataTheme = 'data-theme'

const justToggleDark = useToggle(isDark)

const daisyUIToggleDark = () => {
  document.documentElement.setAttribute(DataTheme, unref(isDark) ? 'dark' : 'light')
}
daisyUIToggleDark()
export const toggleDark = () => {
  justToggleDark()
  daisyUIToggleDark()
}
