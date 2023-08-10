import type { AxiosRequestConfig, Method } from 'axios'

export interface PendingType {
  api?: string
  method?: Method
  data: any
  abort: () => void
}

export interface RequestParams {
  api: string
  params?: Record<string, any>
  method?: Method
  config?: AxiosRequestConfig
  showLoading?: boolean
}

export interface CallApiParams extends RequestParams {
  prefix?: string
  readonly?: boolean
  async?: boolean
  mock?: boolean
  showError?: boolean
}

export interface ResponseData<T> {
  data: T
  ret: { code: string; msg: string }
}
