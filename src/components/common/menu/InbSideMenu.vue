<script setup lang="ts" name="InbSideMenu">
import { snakeCase } from 'lodash-unified'
import { onMounted, watch } from 'vue'
import { useRoutes } from '~/composables'
import { MenuClick, MenuItem, useMenuContext } from './menu'

const props = withDefaults(
  defineProps<{
    menu: MenuItem[]
  }>(),
  {}
)

const { relaTo, routePathList, router } = useRoutes()

const { menuRenderList } = useMenuContext(props.menu)

const BASE_ROUTE_MATCHED_LEVEL = 2

const initMenuValue = () => {
  if (routePathList.value.length > BASE_ROUTE_MATCHED_LEVEL) return
  const url = snakeCase(menuRenderList.value?.[0]?.prop)
  url && relaTo(url)
}

const propInPath = (prop: string) => {
  return routePathList.value.includes(snakeCase(prop))
}

const handleClickMenu = (prop: string, onClick: MenuClick, event: MouseEvent) => {
  router.push(snakeCase(prop))
  onClick(event)
}

onMounted(() => {
  initMenuValue()
})

watch(() => menuRenderList.value, initMenuValue)
</script>
<template>
  <aside class="bg-base-100 h-full shadow-md">
    <ul tabindex="0" class="menu menu-compact dropdown-content mt-3 p-2 bg-base-100 w-52">
      <li v-for="item of menuRenderList" :key="item.prop">
        <a
          class="justify-between"
          :class="{
            disabled: item.disabled,
            'menu-active': propInPath(item.prop),
          }"
          @click="handleClickMenu(item.prop, item.onClick, $event)"
        >
          {{ item.label }}
          <span class="badge" v-if="item.badge">{{ item.badge }}</span>
        </a>
      </li>
    </ul>
  </aside>
</template>
<style scoped>
.menu-active {
  --tw-bg-opacity: 1;
  background-color: hsl(var(--p) / var(--tw-bg-opacity));
  --tw-text-opacity: 1;
  color: hsl(var(--pc) / var(--tw-text-opacity));
}
</style>
