<script setup lang="ts" name="InbHeader">
import { useI18n } from 'vue-i18n'
import { useRouter } from 'vue-router'
import { isDark, toggleDark, ROUTE_PATH_INDEX } from '~/composables'
import { useUserStore } from '~/stores/user'

const { t, availableLocales, locale } = useI18n()

const toggleLocales = () => {
  const locales = availableLocales
  locale.value = locales[(locales.indexOf(locale.value) + 1) % locales.length]
}
const userStore = useUserStore()
const router = useRouter()
const handleGotoIndex = () => {
  router.replace(ROUTE_PATH_INDEX)
}
</script>
<template>
  <header class="sticky top-0 z-20">
    <div class="navbar shadow-sm shadow-base-300 bg-opacity-90 backdrop-blur">
      <div class="flex-1">
        <a class="btn btn-ghost normal-case text-xl" @click="handleGotoIndex">{{
          t('intro.websit-name')
        }}</a>
      </div>
      <a
        class="btn btn-ghost btn-circle"
        :title="t('button.toggle_dark')"
        @click="toggleDark()"
      >
        <carbon-moon v-if="isDark" class="text-xl" />
        <carbon-sun v-else class="text-xl" />
      </a>
      <a
        class="btn btn-ghost btn-circle"
        :title="t('button.toggle_langs')"
        @click="toggleLocales"
      >
        <carbon-language class="text-xl" />
      </a>
      <div class="flex-none">
        <InbDropdown>
          <template #trigger>
            <label tabindex="0" class="btn btn-ghost btn-circle">
              <div class="indicator">
                <carbon-shopping-cart class="text-xl" />
                <span class="badge badge-sm indicator-item">8</span>
              </div>
            </label>
          </template>
          <div
            tabindex="0"
            class="mt-3 card card-compact dropdown-content w-52 bg-base-100 shadow"
          >
            <div class="card-body">
              <span class="font-bold text-lg">8 Items</span>
              <span class="text-info">Subtotal: $999</span>
              <div class="card-actions">
                <button class="btn btn-primary btn-block">View cart</button>
              </div>
            </div>
          </div>
        </InbDropdown>
        <InbHeaderUser v-if="userStore.userToken" />
        <InbHeaderLogin v-else />
      </div>
    </div>
  </header>
</template>
