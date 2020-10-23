/**
 * 封装axios 请求拦截和响应拦截
 */
import Axios, { AxiosError, AxiosInstance, AxiosResponse, AxiosPromise } from 'axios'
import { AxiosRequestConfigInterface, PendingType } from '@/types/axios'
import { Toast } from 'vant'
import Cookies from 'js-cookie'
import Config from '@/config/axios'
import consts from '@/config/consts'
import { isLogin } from '@/assets/scripts/utils/login'
import { responseStatusError } from './axiosErrorHandler'

// 取消重复请求
const pending: Array<PendingType> = []
const CancelToken = Axios.CancelToken
const { UIS_TOKEN: TOKEN_KEY } = consts

// 移除重复请求
const removePending = (config: AxiosRequestConfigInterface) => {
  for (const key in pending) {
    const item: number = +key
    const list: PendingType = pending[key]
    // 当前请求在数组中存在时执行函数体 判断条件是所有的参数、方法、地址都一样，如果加了随机参数，此处无作用
    if (list.url === config.url &&
      list.method === config.method &&
      JSON.stringify(list.params) === JSON.stringify(config.params) &&
      JSON.stringify(list.data) === JSON.stringify(config.data)
    ) {
      // 执行取消操作
      list.cancel('操作太频繁，请稍后再试')
      // 从数组中移除记录
      pending.splice(item, 1)
    }
  }
}

/**
 * axios 请求拦截
 * @param axiosRequestConfig
 */
const axiosRequestInterceptor = function(axiosRequestConfig: AxiosRequestConfigInterface): AxiosRequestConfigInterface {
  // 此处可以添加全局的loading
  Toast.loading({
    duration: 0, // 持续展示 toast
    forbidClick: true,
    message: '加载中...'
  })

  removePending(axiosRequestConfig)
  axiosRequestConfig.cancelToken = new CancelToken((c) => {
    pending.push({ url: axiosRequestConfig.url, method: axiosRequestConfig.method, params: axiosRequestConfig.params, data: axiosRequestConfig.data, cancel: c })
  })

  const token: string = Cookies.get(TOKEN_KEY) || ''

  // 携带登录信息
  if (token) {
    axiosRequestConfig.headers[TOKEN_KEY] = token
  }

  axiosRequestConfig.headers.sourceType = Config.sourceType

  return axiosRequestConfig
}

/**
 * axios 响应拦截
 * @param axiosResponse
 */
const axiosResponseInterceptor = function(axiosResponse: AxiosResponse): (AxiosResponse | Promise<AxiosResponse>) {
  return new Promise((resolve, reject) => {
    Toast.clear()
    const { data, config } = axiosResponse
    const code = data?.code
    const requestConfig: AxiosRequestConfigInterface = config as AxiosRequestConfigInterface
    removePending(requestConfig)
    if (requestConfig.showMessage) Toast.success(data.message)
    // 状态码验证
    if (!data || !code) {
      // TODO 业务范围异常状态处理
      requestConfig.showMessage && Toast.success(data.message)
      reject(axiosResponse)
      return false
    }
    if (code * 1 === 401) {
      // 登录异常状态处理
      // message.error('登录状态失效，请重新登录！')
      const cacheURI = Cookies.get(consts.CURRENT_URI)
      const url = cacheURI || '/'
      isLogin(url)
      return false
    } else if (code !== 200) {
      Toast.fail(data.message)
    } else {
      return resolve(data.result)
    }

    // 更新TOKEN
    if (axiosResponse.headers && axiosResponse.headers[TOKEN_KEY]) {
      Cookies.set(consts.UIS_TOKEN, axiosResponse.headers[TOKEN_KEY])
    }

    // 返回数据
    resolve(data.result)
    return false
  })
}

/**
 * axios response错误处理
 * @param error
 */
const axiosResponseErrorHandler = async function(error: AxiosError, axiosInstance: AxiosInstance): (Promise<AxiosResponse | AxiosError>) {
  Toast.clear()
  const response = error.response
  // 超时重新请求
  const config: AxiosRequestConfigInterface = error.config as AxiosRequestConfigInterface
  // 全局的请求次数,请求的间隙
  const [RETRY_COUNT, RETRY_DELAY] = [3, 1000]

  if (config && RETRY_COUNT) {
    // 设置用于跟踪重试计数的变量
    config.__retryCount = config.__retryCount || 0
    // 检查是否已经把重试的总数用完
    if (config.__retryCount >= RETRY_COUNT) {
      return Promise.reject(response || { message: error.message })
    }
    // 增加重试计数
    config.__retryCount++
    // 创造新的Promise来处理指数后退
    const backoff = function(): Promise<AxiosResponse|boolean> {
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve(true)
        }, RETRY_DELAY || 1)
      })
    }
    // instance重试请求的Promise
    return backoff().then((): AxiosPromise => {
      return axiosInstance(config)
    });
  }

  // 根据返回的http状态码做不同的处理
  return responseStatusError(error)
}

/**
 * axios 请求和响应拦截
 * @param AxiosInstance
 */
export const axiosInterceptor = function(AxiosInstance: AxiosInstance): AxiosInstance {
  // http request 拦截器
  AxiosInstance.interceptors.request.use(config => {
    const conf: AxiosRequestConfigInterface = config as AxiosRequestConfigInterface
    return axiosRequestInterceptor(conf)
  }, error => {
    // TODO 此处需要对错误返回统一处理
    return Promise.reject(error)
  })

  // 添加响应拦截器
  AxiosInstance.interceptors.response.use(axiosResponseInterceptor, error => axiosResponseErrorHandler(error, AxiosInstance))
  return AxiosInstance
}
