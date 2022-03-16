import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { useRoute } from 'vue-router'
import { MenuItem } from '~/components/common/menu/menu'

export const ROUTE_PATH_WORKBENCH = '/workbench'

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
  const { t } = useI18n()
  const workbenchMenu = computed<MenuItem[]>(() => {
    return [
      {
        label: t('menu.commodity-manage'),
        prop: 'commodityManage',
      },
      {
        label: t('menu.category-manage'),
        prop: 'categoryManage',
      },
      {
        label: t('menu.order-manage'),
        prop: 'orderManage',
      },
    ]
  })
  return {
    workbenchMenu,
  }
}
