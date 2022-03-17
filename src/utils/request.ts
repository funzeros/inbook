import axios from 'axios'
import { set } from 'lodash-unified'
import qs from 'qs'
import { inbMessage } from '~/composables'
import { userStorage, UserStorageKey } from '~/stores/user'
import { between } from './common'

const REQUEST_TIMEOUT = 10000
const REQUEST_BASE_URL = process.env.VITE_REQ_BASE_URL
const VALIDATE_STATUS: [number, number] = [200, 600]
const SAFE_HTTP_CODE: [number, number] = [200, 299]

const request = axios.create({
  timeout: REQUEST_TIMEOUT,
  baseURL: REQUEST_BASE_URL,
  withCredentials: false,
  validateStatus: (status: number) => {
    return between(Number(status), ...VALIDATE_STATUS)
  },
})

request.interceptors.request.use(
  (config) => {
    set(config, 'headers.token', userStorage.get(UserStorageKey.token))
    if (config.method?.toLocaleLowerCase() === 'get') {
      config.paramsSerializer = function (params: Record<string, never>) {
        return qs.stringify(params, { arrayFormat: 'brackets' })
      }
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

const httpCodeText: Record<number, string> = Object.freeze({
  400: '这样不行哦~',
  401: '还未登录或登录失效啦！',
  403: '禁止访问哦~',
  404: '数据迷路啦！',
})

const DEFAULT_ERROR_TEXT = '出错啦！'

const httpErrorCapture = (status: number) => {
  const message = httpCodeText[status] || DEFAULT_ERROR_TEXT
  inbMessage.error(message)
  return {}
}

request.interceptors.response.use(
  (result) => {
    const { data, status } = result
    if (!between(Number(status), ...SAFE_HTTP_CODE)) return httpErrorCapture(status)
    return data
  },
  (error) => {
    return Promise.reject(new Error(error))
  }
)

export default request
