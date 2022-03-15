<script setup lang="ts" name="InbHeaderLogin">
import { useFocus, useToggle } from '@vueuse/core'
import { onMounted, ref, unref, watchEffect } from 'vue'
import { useI18n } from 'vue-i18n'
import { UserSignForm } from '~/stores/user.dto'
import type { FormInstance } from '~/components/common/form/form'
import type { InbInputInstance } from '~/components/common/input/input'
import { useRules } from './headerLogin'
import { userLoginReq, userRegisterReq } from '~/apis/user'
import { useUserStore } from '~/stores/user'
import { useSubmit, inbMessage } from '~/composables'

const userStore = useUserStore()

const { t } = useI18n()

const [isLogin, toggleIsLogin] = useToggle(true)

const readyClickClass = 'text-base-300 cursor-pointer hover:underline'

const form = ref(new UserSignForm())

const formRef = ref<FormInstance>()

const { rules } = useRules(isLogin)

const [submitLoading, handleSubmit] = useSubmit(async (isLoginReq: boolean) => {
  const validateReturn = await unref(formRef)?.validate()
  if (!validateReturn) return
  const request = isLoginReq ? userLoginReq : userRegisterReq
  const { data, message } = await request(UserSignForm.encrypt(form.value))
  data && userStore.setUserInfo(data)
  inbMessage.success(message)
})

// 密码输入框聚焦动画切换
const [isFocusPassword, toggleIsFocusPassword] = useToggle(false)

const inputPasswordRef = ref<InbInputInstance>()

onMounted(() => {
  const { focused } = useFocus({
    target: unref(inputPasswordRef)?.inputRef,
  })
  watchEffect(() => toggleIsFocusPassword(unref(focused)))
})
</script>
<template>
  <InbModal>
    <template #trigger>
      <div class="btn btn-ghost">
        {{ t('button.log-in') }}
      </div>
    </template>
    <template #default>
      <h2 class="text-center text-2xl font-bold select-none">
        <span :class="isLogin || readyClickClass" @click="toggleIsLogin(true)">
          {{ t('title.log-in') }}
        </span>
        /
        <span :class="isLogin && readyClickClass" @click="toggleIsLogin(false)">
          {{ t('title.sign-up') }}
        </span>
      </h2>
      <div class="flex select-none">
        <InbForm class="w-80" ref="formRef" :form="form" :rules="rules">
          <InbFormItem
            :label="isLogin ? t('form.username-mix-email') : t('form.username')"
            name="username"
            required
          >
            <InbInput
              v-model.trim="form.username"
              :placeholder="
                isLogin ? t('placeholder.username-mix-email') : t('placeholder.username')
              "
            />
          </InbFormItem>
          <InbFormItem :label="t('form.password')" name="password" required>
            <InbInput
              ref="inputPasswordRef"
              v-model.trim="form.password"
              :placeholder="t('placeholder.password')"
              type="password"
            />
          </InbFormItem>
          <InbFormItem :label="t('form.email')" v-if="!isLogin" name="email">
            <InbInput
              v-model.trim="form.email"
              :placeholder="t('placeholder.email')"
              type="email"
            />
          </InbFormItem>
          <button
            class="mt-8 btn btn-block btn-accent text-center"
            :class="{ loading: submitLoading }"
            @click="handleSubmit(isLogin)"
            type="button"
          >
            {{ isLogin ? t('button.log-in') : t('button.sign-up') }}
          </button>
        </InbForm>
        <div class="flex-1 self-center text-9xl">
          {{ isFocusPassword ? '🙈' : '🙉' }}
        </div>
      </div>
    </template>
  </InbModal>
</template>
