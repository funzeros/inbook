import { computed } from 'vue'
import { useRouter } from 'vue-router'
import { MenuItem } from '~/components/common/menu/menu'
import { ROUTE_PATH_WORKBENCH, useWorkbench } from '~/composables'
import { useUserStore } from '~/stores/user'

export const useUserMenu = () => {
  const userStore = useUserStore()
  const router = useRouter()
  const { isWorkBench } = useWorkbench()
  const userMenu = computed<MenuItem[]>(() => [
    {
      label: 'button.profile',
      prop: 'profile',
    },
    {
      label: 'button.workbench',
      prop: 'workbench',
      hidden: () => !(userStore.isAdmin && !isWorkBench.value),
      onClick() {
        router.push(ROUTE_PATH_WORKBENCH)
      },
    },
    {
      label: 'button.log-out',
      prop: 'logout',
      onClick() {
        userStore.logout()
      },
    },
  ])
  return {
    userMenu,
  }
}
