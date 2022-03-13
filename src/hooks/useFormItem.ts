import { inject } from 'vue'
import { formContextKey, formItemContextKey } from '~/components/common/form/form'

export const useFormItem = () => {
  const formContext = inject(formContextKey)
  const formItemContext = inject(formItemContextKey)

  return { formItem: formItemContext, form: formContext }
}
