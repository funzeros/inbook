<script setup lang="ts" name="InbHeaderLogin">
import { useToggle } from '@vueuse/core'
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { UserSignForm } from '~/stores/user.dto'

const { t } = useI18n()
const [isLogin, toggleIsLogin] = useToggle(true)

const readyClickClass = 'text-base-300 cursor-pointer hover:underline'

const form = ref(new UserSignForm())
</script>
<template>
  <InbModal>
    <template #trigger>
      <div class="btn btn-ghost">
        {{ t('button.login') }}
      </div>
    </template>
    <template #default>
      <h2 class="text-center text-2xl font-bold select-none">
        <span :class="isLogin || readyClickClass" @click="toggleIsLogin(true)">
          {{ t('title.login') }}
        </span>
        /
        <span :class="isLogin && readyClickClass" @click="toggleIsLogin(false)">
          {{ t('title.sign-up') }}
        </span>
      </h2>
      <InbInput
        v-model="form.username"
        :label="t('form.username')"
        :placeholder="t('placeholder.username')"
      />
      <InbInput
        v-model="form.password"
        :label="t('form.password')"
        :placeholder="t('placeholder.password')"
      />
      <InbInput
        v-if="!isLogin"
        v-model="form.email"
        :label="t('form.email')"
        :placeholder="t('placeholder.email')"
      />
    </template>
  </InbModal>
</template>
