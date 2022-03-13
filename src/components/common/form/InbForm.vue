<script setup lang="ts" name="InbForm">
import { provide, reactive, toRefs } from 'vue'
import { formContextKey, FormItemContext, formProps } from './form'

const props = defineProps(formProps)

const fields = new Set<FormItemContext>()

const validate = () =>
  new Promise((resolve) => {
    let count = 0
    let flag = true
    fields.forEach(async (item, _, arr) => {
      const result = await item.validateField()
      ++count
      result || (flag = false)
      arr.size === count && resolve(flag)
    })
  })

provide(
  formContextKey,
  reactive({
    ...toRefs(props),
    fields,
  })
)
defineExpose({
  validate,
})
</script>
<template>
  <form>
    <slot></slot>
  </form>
</template>
