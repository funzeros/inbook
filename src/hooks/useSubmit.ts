import { useToggle } from '@vueuse/core'
import { requestCatch } from '~/utils/catch'

export const useSubmit = <T extends (...rest: never[]) => Promise<unknown>>(
  submitCallback: T
) => {
  const [submitLoading, toggleSubmitLoading] = useToggle(false)
  const submitAction = async (...rest: Parameters<T>) => {
    toggleSubmitLoading(true)
    await submitCallback(...rest).catch(requestCatch)
    toggleSubmitLoading(false)
  }
  return [submitLoading, submitAction] as [typeof submitLoading, typeof submitAction]
}
