<template>
  <main class="bg-base-200 background-dot bg-top">
    <InbHeader />
    <router-view />
    <InbFooter />
  </main>
</template>
<style>
.background-dot {
  background-image: radial-gradient(
    hsla(var(--bc) / 0.2) 0.5px,
    hsla(var(--b2) / 1) 0.5px
  );
  background-size: 5px 5px;
}
</style>
