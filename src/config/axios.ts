/**
 * axios 配置文件
 * @author huangchunmao sujinw@qq.com
 * @date 2020/05/08
*/

export default {
  baseURL: process.env.VUE_APP_API_ROOT, // Api Host,
  url: '',
  data: {},
  method: 'POST',
  responseType: 'json', // 响应数据类型
  withCredentials: true, // 携带cookie
  timeout: 1000 * 60 * 5, // 超时时间
  sourceType: 'h5' // 用来标记请求应用， 自定义
}
