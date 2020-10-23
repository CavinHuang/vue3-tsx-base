/**
 * 插件导出到vue实例
 * @author huangchunmao
 * @email sujinw@qq.com
 * @date 2020/6/8
*/

import { App } from 'vue'

/**
 * 函数节流
 * @param fn 需要调用的函数
 * @param wait 节流时间 单位毫秒
 * @returns {function(...[*]=)}
 */
export const throttle = (fn: Function, wait: number = 1000) => {
  let pre = Date.now()
  const fn2 = function (): void {
    const context = this
    const args = arguments
    const now = Date.now()
    if (now - pre >= wait) {
      fn.apply(context, args)
      pre = Date.now()
    }
  }
  return fn2
}

/**
 * 挂载vue实例
 */
export default {
  install(Vue: App) {
    Vue.config.globalProperties.$utils = {
      throttle
    }
  }
}

