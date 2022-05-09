import { jointPrefix } from '../basicConfig'

export const prefix = '/commodity'

export const api = jointPrefix(prefix, {
  deleteById: (id: number) => `/del/${id}`,
  update: '/update',
  add: '/add',
  page: '/list',
  hotSalePage: '/hotSale',
})
