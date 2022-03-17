<script setup lang="ts">
import { useWorkbenchMenu } from '~/composables'

const { workbenchMenu } = useWorkbenchMenu()
</script>
<template>
  <main class="bg-base-200 h-screen flex flex-col">
    <InbHeader />
    <section class="h-full flex-1 flex bg-base-200 overflow-hidden">
      <InbSideMenu :menu="workbenchMenu"></InbSideMenu>
      <section class="flex-1">
        <router-view />
      </section>
    </section>
  </main>
</template>
