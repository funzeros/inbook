<script setup lang="ts" name="InbBreadCrumbs">
import { useI18n } from 'vue-i18n'
import { useRouter } from 'vue-router'
import type { MenuOriginItem } from '~/composables'

withDefaults(defineProps<{ modelValue: MenuOriginItem[] }>(), {})
const { t } = useI18n()
const router = useRouter()
</script>
<template>
  <div class="pl-2 text-sm breadcrumbs select-none">
    <ul>
      <li v-for="(item, i) of modelValue" :key="item.name">
        <a
          :class="{ 'pointer-events-none': i === modelValue.length - 1 }"
          @click="router.replace(item.path)"
          >{{ t(`menu.${item.name}`) }}</a
        >
      </li>
    </ul>
  </div>
</template>
