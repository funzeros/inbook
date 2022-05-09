<script setup lang="ts" name="HotSaleCarousel">
import { onMounted } from 'vue'
import { getHotSalePageReq } from '~/apis/commodity'
import { usePage } from '~/composables'
class QueryParams {}
const { pageData, loadPage } = usePage({
  api: getHotSalePageReq,
  params: new QueryParams(),
})
onMounted(() => {
  loadPage()
})
</script>
<template>
  <section>
    <Carousel3D :data="pageData">
      <template #default="{ row }">{{ row }}</template>
    </Carousel3D>
  </section>
</template>
