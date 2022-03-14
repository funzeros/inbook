import { isFunction, isBoolean } from 'lodash-unified'
import { computed } from 'vue'

type MenuPropWithFn<T> = T | (() => T)

export interface MenuItem {
  label: string
  prop: string | symbol
  badge?: MenuPropWithFn<string | number>
  disabled?: MenuPropWithFn<boolean>
  hidden?: MenuPropWithFn<boolean>
  onClick?: (payload: MouseEvent) => void
}

const unfnProp = <T>(prop: T): T extends MenuPropWithFn<infer U> ? U : never =>
  isFunction(prop) ? prop() : prop

const menuPropMap = ({ badge, disabled, hidden, onClick, ...rest }: MenuItem) => {
  return {
    ...rest,
    badge: unfnProp(badge),
    disabled: unfnProp(disabled),
    hidden: unfnProp(hidden),
    onClick: onClick || (() => void 0),
  }
}

const menuPropFilter = ({ hidden }: { hidden?: boolean }) =>
  isBoolean(hidden) ? !hidden : true

const getMenuRenderList = (menuSource: MenuItem[]) => {
  return menuSource.map(menuPropMap).filter(menuPropFilter)
}

export const useMenuContext = (menuSource: MenuItem[]) => {
  const menuRenderList = computed(() => getMenuRenderList(menuSource))
  return {
    menuRenderList,
  }
}