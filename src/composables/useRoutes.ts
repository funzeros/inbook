import { useRoute, useRouter } from 'vue-router'
import type { RouteQueryAndHash } from 'vue-router'
import { computed } from 'vue'

export const ROUTE_PATH_STORE = '/'
export const ROUTE_PATH_INDEX = '/'

export const useRoutes = () => {
  const route = useRoute()
  const router = useRouter()
  const routePathList = computed(() => {
    return route.path.split('/')
  })
  const mergeQuery = (newQuery: Record<string, string>) => {
    router.replace({
      query: {
        ...route.query,
        ...newQuery,
      },
    })
  }

  const relaTo = (path: string, otp?: RouteQueryAndHash) => {
    router.push({
      path: `${route.path}/${path}`,
      ...otp,
    })
  }
  return {
    routePathList,
    route,
    router,
    mergeQuery,
    relaTo,
  }
}
