<script setup lang="ts" name="InbHeaderLogin">
import { useI18n } from 'vue-i18n'

const { t } = useI18n()
</script>
<template>
  <InbModal>
    <template #trigger>
      <div class="btn btn-ghost">
        {{ t('button.login') }}
      </div>
    </template>
    <template #default="{ toggleVisible }">
      <h3 class="font-bold text-lg">Congratulations random Interner user!</h3>
      <p class="py-4">
        You've been selected for a chance to get one year of subscription to use Wikipedia
        for free!
      </p>
      <div class="btn" @click="toggleVisible(false)">关闭</div>
    </template>
  </InbModal>
</template>
