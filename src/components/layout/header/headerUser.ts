import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { useRouter } from 'vue-router'
import { MenuItem } from '~/components/common/menu/menu'
import { ROUTE_PATH_WORKBENCH, useWorkbench } from '~/composables'
import { useUserStore } from '~/stores/user'

export const useUserMenu = () => {
  const { t } = useI18n()
  const userStore = useUserStore()
  const router = useRouter()
  const { isWorkBench } = useWorkbench()
  const userMenu = computed<MenuItem[]>(() => [
    {
      label: t('button.profile'),
      prop: 'profile',
    },
    {
      label: t('button.workbench'),
      prop: 'workbench',
      hidden: () => !(userStore.isAdmin && !isWorkBench.value),
      onClick() {
        router.push(ROUTE_PATH_WORKBENCH)
      },
    },
    {
      label: t('button.log-out'),
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
