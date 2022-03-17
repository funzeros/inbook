<script setup lang="ts" name="InbTreeMenu">
import { isEqual } from 'lodash-unified'
import { inject, onMounted, provide, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { MenuList, useRoutes } from '~/composables'
import { menuLevelKey } from './menu'
const props = withDefaults(
  defineProps<{
    menu: MenuList
  }>(),
  {}
)
const { router, route } = useRoutes()
const { t } = useI18n()

const handleClick = (path: string) => {
  router.push(path)
}
const activeMenu = ref(new Set())
const toggleMenu = (path: string) => {
  activeMenu.value.has(path) ? activeMenu.value.delete(path) : activeMenu.value.add(path)
}

const emit = defineEmits(['setActiveMenu'])
const setActiveMenu = (p: string) => {
  if (props.menu.map(({ path }) => path).includes(p)) {
    toggleMenu(p)
    emit('setActiveMenu', p.split('/').slice(0, -1).join('/'))
  }
}
onMounted(() => {
  setActiveMenu(route.path)
})

const menuLevel = inject(menuLevelKey, 0)
provide(menuLevelKey, menuLevel + 1)
</script>
<template>
  <ul class="menu bg-base-100 w-52">
    <template v-for="item of menu" :key="item.name">
      <template v-if="item.children && item.children.length">
        <li class="hover-bordered" @click="toggleMenu(item.path)">
          <a>
            <span :style="`padding-left:${menuLevel * 10}px`">
              {{ t(`menu.${item.name}`) }}
            </span>
            <mi-chevron-down v-if="activeMenu.has(item.path)" />
            <mi-chevron-right v-else />
          </a>
        </li>
        <InbTreeMenu
          class="overflow-hidden"
          :class="{ 'h-0': !activeMenu.has(item.path) }"
          :menu="item.children"
          @set-active-menu="setActiveMenu"
        ></InbTreeMenu>
      </template>
      <li v-else class="hover-bordered" @click="handleClick(item.path)">
        <a
          class="justify-between"
          :class="{
            active: isEqual(item.path, route.path),
          }"
        >
          <span :style="`padding-left:${menuLevel * 10}px`">{{
            t(`menu.${item.name}`)
          }}</span>
        </a>
      </li>
    </template>
  </ul>
</template>
