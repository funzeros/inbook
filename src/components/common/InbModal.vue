<script setup lang="ts" name="InbModal">
import { useToggle } from '@vueuse/core'
import { v4 as uuidv4 } from 'uuid'
import { ref } from 'vue'

defineProps({ teleport: { type: String, default: 'body' } })
const modalId = uuidv4()
const visible = ref(false)
const toggleVisible = useToggle(visible)
</script>
<template>
  <label :for="modalId">
    <slot name="trigger"></slot>
  </label>
  <teleport :to="teleport">
    <input type="checkbox" v-model="visible" :id="modalId" class="modal-toggle" />
    <div class="modal">
      <div class="modal-box relative">
        <label :for="modalId" class="btn btn-sm btn-circle absolute right-2 top-2">
          ✕
        </label>
        <slot :modalId="modalId" :toggleVisible="toggleVisible"></slot>
      </div>
    </div>
  </teleport>
</template>
