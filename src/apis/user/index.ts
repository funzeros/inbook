import { api } from './config'
import r from '~/utils/request'
import { UserResDTO, UserSignForm } from '~/stores/user.dto'
import { R } from '~/types'

export const userRegisterReq = (data: UserSignForm) =>
  r.request<R<UserResDTO>>({ url: api.register, method: 'POST', data })

export const userLoginReq = (data: UserSignForm) =>
  r.request<R<UserResDTO>>({ url: api.login, method: 'POST', data })
