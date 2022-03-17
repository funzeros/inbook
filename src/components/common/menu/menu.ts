import { isFunction, isBoolean } from 'lodash-unified'
import { computed, InjectionKey } from 'vue'

type MenuPropWithFn<T> = T | (() => T)
export type MenuClick = (payload: MouseEvent) => void
export interface MenuItem {
  label: string
  prop: string
  icon?: string
  badge?: MenuPropWithFn<string | number>
  disabled?: MenuPropWithFn<boolean>
  hidden?: MenuPropWithFn<boolean>
  onClick?: MenuClick
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

export const menuLevelKey: InjectionKey<number> = Symbol('menuLevelKey')
