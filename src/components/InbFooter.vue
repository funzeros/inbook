<script setup lang="ts" name="InbFooter">
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

const footerLinkListGroup = computed(() => [
  {
    title: t('footer.services'),
    links: [
      t('footer.branding'),
      t('footer.design'),
      t('footer.marketing'),
      t('footer.advertisement'),
    ],
  },
  {
    title: t('footer.company'),
    links: [
      t('footer.about-us'),
      t('footer.contact'),
      t('footer.jobs'),
      t('footer.press-kit'),
    ],
  },
  {
    title: t('footer.legal'),
    links: [
      t('footer.terms-of-use'),
      t('footer.privacy-policy'),
      t('footer.cookie-policy'),
    ],
  },
])
</script>
<template>
  <footer class="footer p-10 bg-base-200 text-base-content border-t border-base-300">
    <div v-for="(item, itemIndex) of footerLinkListGroup" :key="itemIndex">
      <span class="footer-title">{{ item.title }}</span>
      <a
        class="link link-hover"
        v-for="(link, linkIndex) of item.links"
        :key="linkIndex"
        >{{ link }}</a
      >
    </div>
  </footer>
  <footer
    class="footer px-10 py-4 border-t bg-base-200 text-base-content border-base-300"
  >
    <div class="items-center grid-flow-col">
      <carbon-tropical-storm-tracks class="text-3xl" />
      <p>
        {{ t('footer.org.desc') }}
        <br />{{ t('footer.org.tech') }}
      </p>
    </div>
    <div class="md:place-self-center md:justify-self-end">
      <div class="grid grid-flow-col gap-4">
        <carbon-logo-github class="icon-btn text-3xl" />
        <carbon-logo-wechat class="icon-btn text-3xl" />
        <carbon-logo-skype class="icon-btn text-3xl" />
      </div>
    </div>
  </footer>
</template>
