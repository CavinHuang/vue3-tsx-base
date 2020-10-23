import Cookies from 'js-cookie'
import { base64Encode } from './index'
import consts from '@/config/consts'

/**
 * 是否登录
 * @param redirectUrl
 * @param isMust
 * @returns {boolean}
 */
export const isLogin = (redirectUrl = '/', isMust = false) => {
  if (!Cookies.get(consts.SXH_TOKEN) || isMust) {
    const host = process.env.VUE_APP_UIS_HOST
    const datas = getUisDatas(redirectUrl)
    window.location.href = `${host}?datas=${datas}`
  }
  return true
}

/**
 * 加密uis参数
 * @param redirectUrl
 * @returns {*}
 */
export const getUisDatas = (redirectUrl: string = '/'): string => {
  const MODULE_CODE = process.env.VUE_APP_UIS_MODULE_CODE
  const queryString = `moduleCode=${MODULE_CODE}&redirectUrl=${redirectUrl}`
  return base64Encode(queryString)
}
