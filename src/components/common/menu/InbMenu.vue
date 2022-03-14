<script setup lang="ts" name="InbMenu">
import { MenuItem, useMenuContext } from './menu'

const props = withDefaults(
  defineProps<{
    menu: MenuItem[]
  }>(),
  {}
)

const { menuRenderList } = useMenuContext(props.menu)
</script>
<template>
  <ul
    tabindex="0"
    class="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52"
  >
    <li v-for="item of menuRenderList" :key="item.prop">
      <a
        class="justify-between"
        :class="{ disabled: item.disabled }"
        @click="item.onClick"
      >
        {{ item.label }}
        <span class="badge" v-if="item.badge">{{ item.badge }}</span>
      </a>
    </li>
  </ul>
</template>
