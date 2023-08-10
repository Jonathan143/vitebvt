import type { AxiosRequestConfig, Method } from 'axios'
import { instance } from './axios'
import type {
  PendingType,
  RequestParams,
} from './types'

let pendingList: Array<PendingType> = []
/**
 * 移除重复请求
 */
function removePending({
  api,
  method,
  requestData,
}: { api: string; method: Method; requestData: string }, isRequest = true) {
  const requestIndex = pendingList.findIndex((item) => {
    return (
      item.api === api && item.method === method && item.data === requestData
    )
  })

  if (requestIndex !== -1) {
    isRequest && pendingList[requestIndex]?.abort()
    // 从数组中移除记录
    pendingList.splice(requestIndex, 1)
  }
}
/**
 * 清空请求列表
 */
export function clearRequest() {
  pendingList.forEach((item) => {
    item.abort()
  })
  pendingList = []
}

/**
 * 通用接口请求方法
 * @param {string} api 接口名
 * @param {string} method 请求方法，默认 post
 * @param {object} params 接口入参
 * @param {boolean} showLoading 是否显示 loading toast 默认 false
 * @param {AxiosRequestConfig} config axios配置
 */
export async function request<T = any>({
  api,
  method = 'post',
  params = {},
  config = {},
}: RequestParams) {
  const requestData = JSON.stringify(params)
  /**
   * 发起请求前判断是否有重复请求 有则取消原请求
   * 向请求队列中插入请求
   */
  removePending({ api, method, requestData })
  const controller = new AbortController()
  config.signal = controller.signal
  pendingList.push({
    api,
    method,
    data: requestData,
    abort: () => controller.abort(),
  })

  const requestParams: AxiosRequestConfig = {
    url: api.startsWith('http') ? api : `${import.meta.env.VITE_API_BASE_URL}/${api}`,
    method,
    ...config,
  }
  const dataKey = method === 'get' ? 'params' : 'data'
  requestParams[dataKey] = params

  try {
    const res = await instance.request<T>(requestParams)
    return res.data
  }
  catch (error) {
    return Promise.reject(error)
  }
  finally {
    removePending({ api, method, requestData }, false)
  }
}
