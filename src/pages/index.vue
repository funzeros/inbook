<script setup lang="ts" name="IndexPage">
import { useI18n } from 'vue-i18n'

const { t } = useI18n()
</script>
<template>
  <section class="min-h-screen">
    {{ t('intro.desc') }}
  </section>
</template>
<route lang="yaml">
meta:
  layout: store
</route>
