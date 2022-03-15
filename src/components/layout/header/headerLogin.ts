import { computed, Ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { FormRules } from '~/components/common/form/form'
import type { UserSignForm } from '~/stores/user.dto'
import { regexp } from '~/utils/regexp'

export const useRules = (isLogin: Ref<boolean>) => {
  const { t } = useI18n()
  const MIN_USERNAME_LENGTH = 4
  const MAX_USERNAME_LENGTH = 16
  const MIN_PASSWORD_LENGTH = 6
  const MAX_PASSWORD_LENGTH = 32
  const rules = computed<FormRules<UserSignForm>>(() => ({
    username: [
      { required: true, message: t('placeholder.username'), trigger: ['blur', 'change'] },
      {
        max: isLogin.value ? void 0 : MAX_USERNAME_LENGTH,
        min: MIN_USERNAME_LENGTH,
        message: t('valid-tip.username', {
          min: MIN_USERNAME_LENGTH,
          max: MAX_USERNAME_LENGTH,
        }),
        trigger: ['blur', 'change'],
      },
    ],
    password: [
      { required: true, message: t('placeholder.password'), trigger: ['blur', 'change'] },
      {
        max: MAX_PASSWORD_LENGTH,
        min: MIN_PASSWORD_LENGTH,
        message: t('valid-tip.password', {
          min: MIN_PASSWORD_LENGTH,
          max: MAX_PASSWORD_LENGTH,
        }),
        trigger: ['blur', 'change'],
      },
    ],
    email: [
      {
        required: false,
        pattern: regexp.email,
        message: t('valid-tip.email'),
        trigger: ['blur', 'change'],
      },
    ],
  }))
  return { rules }
}
