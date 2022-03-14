import { jointPrefix } from '../basicConfig'

export const prefix = '/user'

export const api = jointPrefix(prefix, {
  register: '/register',
  login: '/login',
  token: '/token',
})
