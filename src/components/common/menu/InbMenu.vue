<script setup lang="ts" name="InbMenu">
import { useI18n } from 'vue-i18n'
import { MenuItem, useMenuContext } from './menu'

const props = withDefaults(
  defineProps<{
    menu: MenuItem[]
  }>(),
  {}
)

const { menuRenderList } = useMenuContext(props.menu)
const { t } = useI18n()
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
        {{ t(item.label) }}
        <span class="badge" v-if="item.badge">{{ t(item.badge) }}</span>
      </a>
    </li>
  </ul>
</template>
