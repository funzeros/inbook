import { api } from './config'
import r from '~/utils/request'
import { HotSalePageItemVO } from '~/types/commodity/vo'

export const getHotSalePageReq = (params: PageParams) =>
  r.request<R<PageResult<HotSalePageItemVO>>>({
    url: api.hotSalePage,
    method: 'GET',
    params,
  })
