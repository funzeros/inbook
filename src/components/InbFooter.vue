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
      'Advertisement',
    ],
  },
  {
    title: 'Company',
    links: ['About us', 'Contact', 'Jobs', 'Press kit'],
  },
  {
    title: 'Legal',
    links: ['Terms of use', 'Privacy policy', 'Cookie policy'],
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
        Anonymous Open Source Organization.
        <br />Providing reliable tech since 2022
      </p>
    </div>
    <div class="md:place-self-center md:justify-self-end">
      <div class="grid grid-flow-col gap-4">
        <a>
          <carbon-logo-github class="text-3xl" />
        </a>
        <a>
          <carbon-logo-wechat class="text-3xl" />
        </a>
        <a>
          <carbon-logo-skype class="text-3xl" />
        </a>
      </div>
    </div>
  </footer>
</template>
