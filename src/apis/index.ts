/**
 * 公共常用的请求，会挂在vue实例
 * @author huangchunmao
 * @email sujinw@qq.com
 * @date 2020/5/11
*/
import { App } from 'vue'
import { post } from './request'
import { SsoInterface } from './types/login'
/**
 * 读取./modules下的所有js文件并注册模块
 */
const requireModule = require.context('./modules', false, /\.js|\.ts$/)
const modules = {}
requireModule.keys().forEach(fileName => {
  const moduleName = fileName.substring(2, fileName.length - 3)
  modules[moduleName] = requireModule(fileName).default
})

export default {
  install(Vue: App) {
    Vue.config.globalProperties.$api = {
      // TODO 公用的请求方法
      uislogin(data: SsoInterface) {
        return post('/sys/sso', data)
      },
      ...modules
    }
  }
}
