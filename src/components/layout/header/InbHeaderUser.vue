<script setup lang="ts" name="InbHeaderUser">
import { useUserMenu } from './headerUser'

const { userMenu } = useUserMenu()
</script>
<template>
  <InbDropdown>
    <template #trigger>
      <label tabindex="0" class="btn btn-ghost btn-circle avatar">
        <div class="w-10 rounded-full">
          <img src="https://api.lorem.space/image/face?hash=33791" />
        </div>
      </label>
    </template>
    <InbMenu :menu="userMenu"></InbMenu>
  </InbDropdown>
</template>
