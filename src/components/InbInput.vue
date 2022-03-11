<script setup lang="ts" name="InbInput">
withDefaults(
  defineProps<{
    modelValue: string
    label: string
    labelAlt?: string
    placeholder?: string
    type?: string
  }>(),
  { type: 'text', labelAlt: '', placeholder: '' }
)
</script>
<template>
  <label class="label">
    <span class="label-text">{{ label }}</span>
    <span class="label-text-alt" v-if="labelAlt">{{ labelAlt }}</span>
  </label>
  <input
    :type="type"
    :placeholder="placeholder"
    class="input input-bordered w-full max-w-xs"
  />
</template>
