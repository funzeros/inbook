<script setup lang="ts" name="InbSideMenu">
import { MenuList } from '~/composables'
withDefaults(
  defineProps<{
    menu: MenuList
  }>(),
  {}
)
</script>
<template>
  <aside
    class="bg-base-100 h-full shadow-md overflow-y-auto overflow-x-hidden scrollbar-w-0"
  >
    <InbTreeMenu :menu="menu"></InbTreeMenu>
  </aside>
</template>
