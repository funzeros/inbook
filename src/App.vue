<script setup lang="ts">
import { useHead } from '@vueuse/head'
useHead({
  title: 'Inbook',
  meta: [{ name: 'description', content: 'Online Bookstore' }],
})
</script>

<template>
  <router-view />
</template>
