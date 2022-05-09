<script setup lang="ts" name="Carousel3D">
withDefaults(defineProps<{ data: IObj[]; keyId?: string }>(), { keyId: 'id' })
</script>
<template>
  <section>
    <div v-for="(item, $index) of data" :key="(item[keyId] as strnum)">
      <slot :row="item" :$index="$index"></slot>
    </div>
  </section>
</template>
