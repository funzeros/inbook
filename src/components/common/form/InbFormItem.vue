<script setup lang="ts" name="InbFormItem">
import {
  inject,
  onMounted,
  onUnmounted,
  provide,
  reactive,
  ref,
  toRefs,
  unref,
} from 'vue'
import {
  formContextKey,
  FormItemContext,
  formItemContextKey,
  ValidateField,
} from './form'
import type { RuleItem, ValidatorCallback } from './form'
import { isArray, isEmpty, isNumber, isBoolean } from 'lodash-unified'
import { isMin, isMax } from '~/utils/common'
const props = withDefaults(
  defineProps<{
    label: string
    labelAlt?: string
    name: string
    required?: boolean
  }>(),
  { labelAlt: '', required: false }
)

const formContext = inject(formContextKey)

if (!formContext) throw new Error('InbFormItem need formContext')

const formItemRef = ref<HTMLDivElement>()

const errorMessage = ref('')
const enum FormItemStatus {
  default,
  validating,
  success,
  error,
}
const formItemStatus = ref(FormItemStatus.default)
const setErrorMessage = (value: string) => {
  errorMessage.value = value
}
const setFormItemStatus = (value: FormItemStatus) => {
  formItemStatus.value = value
}

const validateField: ValidateField = (triggerEvent) => {
  return new Promise((resolve) => {
    setErrorMessage('')
    setFormItemStatus(FormItemStatus.validating)
    const { rules: formRules, form } = formContext
    const { name } = props
    if (formRules && name && Reflect.has(formRules, name)) {
      const ruleItem = formRules[name as keyof typeof formRules]
      const ruleItems: RuleItem<{}, never>[] = isArray(ruleItem) ? ruleItem : [ruleItem]
      const callback: ValidatorCallback = (error) => {
        if (error) {
          setErrorMessage(error.message)
          setFormItemStatus(FormItemStatus.error)
          resolve(false)
        }
      }
      const validValue = form[name]
      const items = triggerEvent
        ? ruleItems.filter(({ trigger = [] }) => {
            return (isArray(trigger) ? trigger : [trigger]).includes(triggerEvent)
          })
        : ruleItems

      for (const {
        message = `${name} error`,
        required,
        min,
        max,
        validator,
        pattern,
      } of items) {
        if (isBoolean(required) && !required && isEmpty(validValue)) break
        required && isEmpty(validValue) && callback(new Error(message))
        pattern && !pattern.test(validValue) && callback(new Error(message))
        isNumber(min) && isMin(validValue, min) && callback(new Error(message))
        isNumber(max) && isMax(validValue, max) && callback(new Error(message))
        validator && validator(validValue as never, form, callback)
        if (unref(formItemStatus) === FormItemStatus.error) return
      }
    }
    setFormItemStatus(FormItemStatus.success)
    resolve(true)
  })
}

const context: FormItemContext = reactive({
  ...toRefs(props),
  $el: formItemRef,
  validateField,
})

provide(formItemContextKey, context)

onMounted(() => {
  if (props.name) {
    formContext.fields.add(context)
  }
})
onUnmounted(() => {
  formContext.fields.delete(context)
})
</script>
<template>
  <div ref="formItemRef">
    <label class="label">
      <span class="label-text">
        <span v-if="required" class="text-red-500">*</span>
        {{ label }}
      </span>
      <span class="label-text-alt" v-if="labelAlt">{{ labelAlt }}</span>
    </label>
    <slot></slot>
    <label class="label">
      <span class="label-text-alt text-red-500">{{ errorMessage }}</span>
    </label>
  </div>
</template>
