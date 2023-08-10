// 只需要考虑单一职责，这块只封装axios
import axios from 'axios'

/* 实例化请求配置 */
export const instance = axios.create({
  headers: {
    'Content-Type': 'application/json;charset=UTF-8',
    'Access-Control-Allow-Origin-Type': '*',
  },
  // 请求时长
  timeout: 1000 * 10,
})

// 响应拦截器
instance.interceptors.response.use(
  (response) => {
    // 请求成功
    return response.status === 200 ? response : Promise.reject(response)
  },
  (error) => {
    const { response, message, config } = error
    if (message.includes('timeout of')) {
      // 超时重新请求
      // 全局的请求次数,请求的间隙
      const [RETRY_COUNT, RETRY_DELAY] = [3, 1000]

      if (config && RETRY_COUNT) {
        // 设置用于跟踪重试计数的变量
        config.__retryCount = config.__retryCount || 1
        // 检查是否已经把重试的总数用完
        if (config.__retryCount >= RETRY_COUNT)
          return Promise.reject(response || { message })

        // 增加重试计数
        config.__retryCount++
        // 创造新的Promise来处理指数后退
        const backoff = new Promise<void>((resolve) => {
          setTimeout(() => {
            resolve()
          }, RETRY_DELAY || 1)
        })
        // instance重试请求的Promise
        return backoff.then(() => {
          return instance(config)
        })
      }
    }
    else {
      // 处理断网的情况
      // eg:请求超时或断网时，更新state的network状态
      // network状态在app.vue中控制着一个全局的断网提示组件的显示隐藏
      // 后续增加断网情况下做的一些操作
      if (message.includes('Network Error'))
        console.log('networkState', message)
    }
    return Promise.reject(error)
  },
)
