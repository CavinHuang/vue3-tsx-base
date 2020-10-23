/**
 * 常量定义
 * @author huangchunmao
 * @email sujinw@qq.com
 * @date 2020/10/14
*/
const consts = {
  UIS_TOKEN: process.env.VUE_APP_TOKEN_NAME,
  UIS_HOST: process.env.VUE_APP_UIS_HOST,
  UIS_MODULE_CODE: process.env.VUE_APP_UIS_MODULE_CODE,
  SXH_TOKEN: process.env.VUE_APP_SXH_TOKEN,
  API_HOST: process.env.VUE_APP_API_ROOT,
  CURRENT_URI: 'CURRENT_USER_URI',
  OSS_HOST: '/sys/file/downloadFileFromOSS?key=',
  LOCAL_USER_KEY: 'SXH_USER_INFO',
  LOCAL_POST_DRAFT_KEY: 'SXH_POST_DRAFT',
  SXH_TOKEN_NAME: 'X-Access-Token',
  UIS_TOKEN_NAME: 'X-Access-Uis-Token',
  LOCAL_PERMISSION_KEY: 'LOCAL_PERMISSION_KEY'
}
export default consts

export const setConsts = {
  install(Vue: any) {
    Vue.config.globalProperties.$const = consts
  }
}
