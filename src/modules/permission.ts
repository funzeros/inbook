import { ROUTE_PATH_INDEX } from '~/composables'
import { userStorage, UserStorageKey } from '~/stores/user'
import type { UserModule } from '~/types'

export const install: UserModule = ({ isClient, router }) => {
  if (isClient) {
    router.beforeEach((to, from, next) => {
      if (to.meta.requiresAuth) {
        const token = userStorage.get(UserStorageKey.token)
        if (!token) return next(ROUTE_PATH_INDEX)
      }
      next()
    })
  }
}
