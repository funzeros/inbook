import { useDark, useToggle } from '@vueuse/core'
import { unref } from 'vue'

export const isDark = useDark()

const DataTheme = 'data-theme'

const enum Theme {
  Dark = 'dark',
  Light = 'light',
}
const justToggleDark = useToggle(isDark)

const daisyUIToggleDark = () => {
  document.documentElement.setAttribute(
    DataTheme,
    unref(isDark) ? Theme.Dark : Theme.Light
  )
}
daisyUIToggleDark()
export const toggleDark = () => {
  justToggleDark()
  daisyUIToggleDark()
}
