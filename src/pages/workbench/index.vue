<script setup lang="ts" name="WorkBench">
import { useI18n } from 'vue-i18n'

const { t } = useI18n()
</script>
<template>
  <div class="flex justify-center items-center h-full">
    <h1 class="text-6xl font-serif font-bold text-center">
      {{ t('intro.workbench') }}
    </h1>
  </div>
</template>
<route lang="yaml">
name: workbench
meta:
  layout: workbench
  requiresAuth: true
  isMenu: true
</route>
