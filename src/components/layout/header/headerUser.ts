import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { MenuItem } from '~/components/common/menu/menu'
import { useUserStore } from '~/stores/user'

export const useUserMenu = () => {
  const { t } = useI18n()
  const userStore = useUserStore()
  const userMenu = computed<MenuItem[]>(() => [
    {
      label: t('button.profile'),
      prop: 'profile',
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
