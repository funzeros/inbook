<script setup lang="ts" name="InbMessage">
import type { MessageTypeKey } from './message'
withDefaults(
  defineProps<{
    message: string
    type?: MessageTypeKey
  }>(),
  {
    type: 'info',
  }
)

const emit = defineEmits(['destroy'])

const classWithType: Record<MessageTypeKey, string> = {
  info: 'bg-gray-100 border-gray-200 text-gray-700',
  primary: 'bg-blue-100 border-blue-200 text-blue-700',
  success: 'bg-green-100 border-green-200 text-green-700',
}
</script>
<template>
  <div
    class="inline-block px-4 py-2 rounded-lg border pointer-events-auto inb-message_inner"
    :class="[classWithType[type]]"
    @animationend="() => emit('destroy')"
  >
    <span>{{ message }}</span>
  </div>
</template>

<style>
.inb-message_inner {
  animation: message-live 3s ease-out forwards;
}
@keyframes message-live {
  0% {
    transform: translateY(-100%);
  }
  5% {
    transform: translateY(0);
  }
  60% {
    opacity: 1;
  }
  100% {
    opacity: 0;
  }
}
</style>
