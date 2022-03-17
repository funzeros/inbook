/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { computed } from 'vue'
import { RouteMeta, RouteRecordRaw, useRoute } from 'vue-router'
import routes from '~pages'

export const ROUTE_PATH_WORKBENCH = '/workbench'

interface MenuItemRaw {
  name: string
  path: string
  children: Map<string, MenuItemRaw>
  meta: RouteMeta
}

export type MenuList = (Omit<MenuItemRaw, 'children'> & { children: MenuList })[]

class LifePageRaw implements MenuItemRaw {
  public children: Map<string, LifePageRaw> = new Map()
  public name: string
  public path: string
  public meta: RouteMeta
  constructor(route: RouteRecordRaw) {
    this.name = route.name as string
    this.path = route.path
    this.meta = route.meta as RouteMeta
  }
  public toRaw(): MenuList {
    return Array.from(this.children, ([, v]) => {
      return {
        ...v,
        children: v.toRaw(),
      }
    })
  }
  static getWorkbenchPage = (routeRecords: RouteRecordRaw[], prefix: string) => {
    const filterPages = routeRecords.filter(({ path }) => path.startsWith(prefix))
    const routesMap: Map<string, LifePageRaw> = new Map()
    filterPages.forEach((raw) => {
      this.setRaw(raw, routesMap, raw.path.split('/'))
    })
    return routesMap
  }
  static setRaw(
    raw: RouteRecordRaw,
    routesMap: Map<string, LifePageRaw>,
    [, ...restPath]: string[]
  ) {
    restPath.reduce((acc, row, i, arr) => {
      if (i === arr.length - 1) acc.set(row, new LifePageRaw(raw))
      return acc.get(row)!.children
    }, routesMap)
  }
}

export const workbenchPage = LifePageRaw.getWorkbenchPage(routes, ROUTE_PATH_WORKBENCH)

export const workbenchMenuList = workbenchPage.get(ROUTE_PATH_WORKBENCH.slice(1))!.toRaw()

export const useWorkbench = () => {
  const route = useRoute()
  const isWorkBench = computed(() => {
    return route.path.startsWith(ROUTE_PATH_WORKBENCH)
  })
  return {
    isWorkBench,
  }
}

export const useWorkbenchMenu = () => {
  const workbenchMenu = computed<MenuList>(() => {
    return workbenchMenuList
  })
  return {
    workbenchMenu,
  }
}
