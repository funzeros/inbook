import type { ExtractPropTypes, InjectionKey, PropType } from 'vue'
import InbForm from './InbForm.vue'

export type ValidatorCallback = (error?: Error) => void
export type RuleTrigger = 'change' | 'blur'
export interface RuleItem<R extends object, K extends keyof R> {
  message?: string
  trigger?: RuleTrigger | RuleTrigger[]
  required?: boolean
  max?: number
  min?: number
  pattern?: RegExp
  validator?: (
    value: R[K],
    form: R,
    callback: ValidatorCallback
  ) => string | void | boolean
}
export type FormRules<R extends object = {}> = {
  [K in keyof R]: RuleItem<R, K> | RuleItem<R, K>[]
}

export const formProps = {
  form: {
    type: Object,
    required: true,
    default: () => ({}),
  },
  rules: {
    type: Object as PropType<FormRules>,
    default: () => ({}),
  },
}

export type FormProps = ExtractPropTypes<typeof formProps>

export type ValidateField = (triggerEvent?: RuleTrigger) => Promise<boolean>
export interface FormItemContext {
  $el: HTMLDivElement | undefined
  validateField: ValidateField
}

export type FormContext = FormProps & {
  fields: Set<FormItemContext>
}

export const formContextKey: InjectionKey<FormContext> = Symbol('formContextKey')
export const formItemContextKey: InjectionKey<FormItemContext> =
  Symbol('formItemContextKey')

export type FormInstance = InstanceType<typeof InbForm>
