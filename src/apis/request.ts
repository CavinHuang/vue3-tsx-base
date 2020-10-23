/**
 * axios 封装
 * @author huangchunmao
 * @email sujinw@qq.com
 * @date 2020/10/13
*/

import { AxiosRequestConfigInterface, CustomerAxiosOptionsInterface, RequestInterface } from '@/types/axios'
import Axios, { AxiosResponse } from 'axios'
import AxiosConfig from '@/config/axios'
import QS from 'qs'
import { axiosInterceptor } from './http/interceptors'
import { App } from 'vue'

// 创建axios实例
const instance = Axios.create({
  timeout: 100000,
  responseType: 'json'
})

// axios拦截器
axiosInterceptor(instance)

/**
 * 接口请求公共方法
 * 参数说明：
 * baseURL String 根路径
 * url String 请求路径
 * data/params Object 业务参数
 * method String 请求方法
 * responseType String 响应数据类型
 * withCredentials Boolean 是否携带cookie
 * timeout Number 超时时间(毫秒)
 * exception String 异常例外标识
 * skipError：跳过；
 * download：下载
 * @param  {RequestInterface} requestConfig axios request config
 * @param {CustomerAxiosOptionsInterface} customerConfig 自动定义配置动态注入
 * @returns {Promise<AxiosResponse>}
 */
export function request(requestConfig: RequestInterface = {}, customerConfig: CustomerAxiosOptionsInterface = {}): Promise<AxiosResponse> {
  const axiosRequestConfig: AxiosRequestConfigInterface = Object.assign({}, AxiosConfig, requestConfig, customerConfig)
  if (axiosRequestConfig.contentType && axiosRequestConfig.contentType === 'application/x-www-form-urlencoded') {
    // 序列化参数为表单形式(指定数组以a[0]=b、json以a.b=d方式编码)
    axiosRequestConfig.data = QS.stringify(axiosRequestConfig.data, { arrayFormat: 'indices', allowDots: true })
  }
  return new Promise((resolve, reject) => {
    instance(axiosRequestConfig).then((response) => {
      resolve(response) // 返回数据
    }).catch((error) => {
      reject(error)
    })
  })
}

/**
 * 上传公共方法
 * @param customerConfig {CustomerAxiosOptionsInterface} 自动定义配置动态注入
 * @param options
 * @returns {Promise<AxiosResponse>}
 */
export function upload(url: string, requestConfig: RequestInterface = {}, customerConfig: CustomerAxiosOptionsInterface = {}): Promise<AxiosResponse> {
  const axiosRequestConfig: AxiosRequestConfigInterface = Object.assign({}, AxiosConfig, requestConfig, customerConfig)
  axiosRequestConfig.timeout = 1000 * 60 * 60
  axiosRequestConfig.contentType = 'multipart/form-data'
  return new Promise((resolve, reject) => {
    instance(axiosRequestConfig).then((res) => {
      resolve(res)
    }).catch((error) => {
      console.warn(error)
      reject(error)
    })
  })
}

/**
 * get 请求
 * @param { String } url
 * @param { Object } params
 * @param customerConfig {CustomerAxiosOptionsInterface} 自动定义配置动态注入
 * @returns {Promise<AxiosResponse>}
 */
export const get = (url: string, params: any = {}, customerConfig: CustomerAxiosOptionsInterface = {}): Promise<AxiosResponse> => {
  return request({
    url,
    params,
    method: 'GET'
  }, customerConfig)
}

/**
 * post 请求
 * @param {String} url
 * @param {Object} data
 * @param customerConfig {CustomerAxiosOptionsInterface} 自动定义配置动态注入
 * @returns {Promise<AxiosResponse>}
 */
export const post = (url: string, data: any = {}, customerConfig: CustomerAxiosOptionsInterface = {}): Promise<AxiosResponse> => {
  return request({
    url,
    data,
    method: 'POST'
  }, customerConfig)
}
/**
 * 供vue use使用
 */
export default {
  install(Vue: App) {
    Vue.config.globalProperties.$get = get
    Vue.config.globalProperties.$post = post
    Vue.config.globalProperties.$request = request
  }
}
