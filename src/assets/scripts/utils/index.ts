/**
 * 工具函数
 * @author huangchunmao
 * @email sujinw@qq.com
 * @date 2020/6/8
*/
import { Base64 } from 'js-base64'

/**
 * base64 加密
 * @param string
 * @returns {*}
 */
export const base64Encode = (string: string) => {
  return Base64.encode(string)
}

/**
 * 判断操作系统
 * @type {{versions: {iPhone: boolean, webApp: boolean, trident: boolean, gecko: (boolean|boolean), android: boolean, mobile: boolean, iPad: boolean, ios: boolean, presto: boolean, webKit: boolean}, language: string}}
 */
export const browser = {
  versions: () => {
    const u = navigator.userAgent
    return { // 移动终端浏览器版本信息
      trident: u.indexOf('Trident') > -1, // IE内核
      presto: u.indexOf('Presto') > -1, // opera内核
      webKit: u.indexOf('AppleWebKit') > -1, // 苹果、谷歌内核
      gecko: u.indexOf('Gecko') > -1 && u.indexOf('KHTML') === -1, // 火狐内核
      mobile: !!u.match(/AppleWebKit.*Mobile/i) || !!u.match(/MIDP|SymbianOS|NOKIA|SAMSUNG|LG|NEC|TCL|Alcatel|BIRD|DBTEL|Dopod|PHILIPS|HAIER|LENOVO|MOT-|Nokia|SonyEricsson|SIE-|Amoi|ZTE/), // 是否为移动终端
      ios: !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/), // ios终端
      android: u.indexOf('Android') > -1 || u.indexOf('Linux') > -1, // android终端或者uc浏览器
      iPhone: u.indexOf('iPhone') > -1 || u.indexOf('Mac') > -1, // 是否为iPhone或者QQHD浏览器
      iPad: u.indexOf('iPad') > -1, // 是否iPad
      webApp: u.indexOf('Safari') === -1 // 是否web应该程序，没有头部与底部
    }
  },

  /**
   * 浏览器语言
   */
  language: navigator.language.toLowerCase(),
  /**
   * 是否是全面屏
   * @returns {boolean}
   */
  isFullScreen: (): boolean => {
    let result = false
    const rate = window.screen.height / window.screen.width
    const limit = window.screen.height === window.screen.availHeight ? 1.8 : 1.65 // 临界判断值

    // window.screen.height为屏幕高度
    // window.screen.availHeight 为浏览器 可用高度

    if (rate > limit) {
      result = true
    }
    return result
  }
}
/**
 * 随机数
 * @param min
 * @param max
 * @returns {number}
 */
export const random = (min: number, max: number): number => {
  return Math.floor(Math.random() * (max - min + 1) + min)
}

/**
 * localStore
 * @type {{set(*=, *=): void, get(*=): any, remove(*=): void}}
 */
export const store = {
  set(key: string, value: string) {
    localStorage.setItem(key, JSON.stringify(value))
  },
  get(key: string) {
    return JSON.parse(localStorage.getItem(key) || '')
  },
  remove(key: string) {
    localStorage.removeItem(key)
  }
}

/**
 * 对象克隆&深拷贝
 * @param obj
 * @returns {*}
 */
interface objInterface {
  [propName: string]: any | objInterface;
}
export const cloneDeep = (obj: objInterface): objInterface => {
  // Handle the 3 simple types, and null or undefined
  if (obj === null || typeof obj !== 'object') return obj
  // Handle Date
  if (obj instanceof Date) {
    const copy = new Date()
    copy.setTime(obj.getTime())
    return copy
  }
  // Handle Array
  if (obj instanceof Array) {
    const copy = []
    for (let i = 0, len = obj.length; i < len; ++i) {
      copy[i] = cloneDeep(obj[i])
    }
    return copy
  }
  // Handle Object
  if (obj instanceof Object) {
    const copy: objInterface = {}
    for (const attr in obj) {
      // eslint-disable-next-line no-prototype-builtins
      if (obj.hasOwnProperty(attr)) copy[attr] = cloneDeep(obj[attr])
    }
    return copy
  }
  throw new Error("Unable to copy obj! Its type isn't supported.")
}

/**
 * base64转blob
 * @param ndata
 * @returns {Blob}
 */
export const toBlob = (ndata: string): Blob => {
  // ndata为base64格式地址
  const arr = ndata.split(',')
  const obj = arr[0] || ''
  const mime = obj.match(/:(.*?);/)
  const mimeResult = mime ? mime[1] : ''
  const bstr = atob(arr[1])
  let n = bstr.length
  const u8arr = new Uint8Array(n)
  while (n--) {
    u8arr[n] = bstr.charCodeAt(n)
  }
  return new Blob([u8arr], {
    type: mimeResult
  })
}

/**
 * 返回地址origin
 * @returns {string|*}
 */
export const getOrigin = (): string => {
  const location = window.location
  if (location.origin) return location.origin
  const { protocol, host, pathname, port } = location
  return protocol + '//' + host + pathname + ':' + port
}
