<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { useWorkbenchMenu, workbenchRoute } from '~/composables'
import type { MenuItem, MenuList, MenuOriginItem } from '~/composables'
const { workbenchMenu } = useWorkbenchMenu()
const route = useRoute()

const findMenuByPath = (menu: MenuList, l: MenuOriginItem[] = []): MenuOriginItem[] => {
  const item = menu.find(({ path }) => route.path.indexOf(path) > -1)
  if (item) {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { children: _, ...noChildItem } = item
    return findMenuByPath(item.children, [...l, noChildItem])
  }
  return l
}
const breadcrumbs = computed(() => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { children: _, ...defaultBreadcrumbs } = (workbenchRoute || {}) as MenuItem
  return [
    ...(workbenchRoute ? [defaultBreadcrumbs] : []),
    ...findMenuByPath(workbenchMenu.value),
  ]
})
</script>
<template>
  <main class="bg-base-200 h-screen flex flex-col">
    <InbHeader />
    <section class="h-full flex-1 flex bg-base-200 overflow-hidden">
      <InbSideMenu class="z-10" :menu="workbenchMenu"></InbSideMenu>
      <section class="flex-1 flex flex-col bg-opacity-20 bg-base-300">
        <InbBreadcrumbs :model-value="breadcrumbs"></InbBreadcrumbs>
        <section class="flex-1 px-2 pb-2">
          <router-view v-slot="{ Component }">
            <transition name="workbench-transition" mode="out-in" type="transition">
              <component :is="Component" />
            </transition>
          </router-view>
        </section>
      </section>
    </section>
  </main>
</template>
<style>
.workbench-transition-enter-from,
.workbench-transition-leave-to {
  transform: translate3d(-120%, 0, 0);
}
.workbench-transition-leave-from,
.workbench-transition-enter-to {
  transform: translate3d(0, 0, 0);
}
.workbench-transition-enter-active,
.workbench-transition-leave-active {
  transition-property: opacity, transform;
  transition-duration: 0.3s;
  transition-timing-function: ease-in-out;
}
</style>
