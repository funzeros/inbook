import axios from 'axios'
import qs from 'qs'
import { between } from './common'

const REQUEST_TIMEOUT = 10000
const REQUEST_BASE_URL = '/api'
const VALIDATE_STATUS: [number, number] = [200, 600]

const SAFE_HTTP_CODE: [number, number] = [200, 300]

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

const httpErrorCapture = () => {
  return {}
}

request.interceptors.response.use(
  (result) => {
    const { data, status } = result
    if (!between(Number(status), ...SAFE_HTTP_CODE)) return httpErrorCapture()
    return data
  },
  (error) => {
    return Promise.reject(new Error(error))
  }
)

export default request
