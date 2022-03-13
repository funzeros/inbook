<script setup lang="ts" name="InbInput">
import { computed, shallowRef, useAttrs, watch } from 'vue'
import { isNil } from 'lodash-unified'
import { useFormItem } from '~/hooks'

const attrs = useAttrs()

const props = withDefaults(
  defineProps<{
    modelValue?: string
    placeholder?: string
    type?: string
    validateEvent?: boolean
  }>(),
  { modelValue: '', type: 'text', placeholder: '', validateEvent: true }
)
const emit = defineEmits(['input', 'change', 'blur', 'focus', 'update:modelValue'])

const { formItem } = useFormItem()

const inputRef = shallowRef<HTMLInputElement>()

const nativeInputValue = computed(() =>
  isNil(props.modelValue) ? '' : String(props.modelValue)
)
const setNativeInputValue = () => {
  const input = inputRef.value
  if (!input || input.value === nativeInputValue.value) return
  input.value = nativeInputValue.value
}

watch(nativeInputValue, () => setNativeInputValue())
watch(
  () => props.modelValue,
  () => {
    if (props.validateEvent) formItem?.validateField('change')
  }
)

const handleInput = (event: Event) => {
  const { value } = event.target as HTMLInputElement
  emit('update:modelValue', value)
  emit('input', value)
}
const handleBlur = () => {
  emit('blur')
  if (props.validateEvent) formItem?.validateField('blur')
}
defineExpose({
  inputRef,
})
</script>
<template>
  <input
    ref="inputRef"
    v-bind="attrs"
    :type="type"
    :placeholder="placeholder"
    @input="handleInput"
    @blur="handleBlur"
    class="input input-bordered w-full max-w-xs"
  />
</template>
