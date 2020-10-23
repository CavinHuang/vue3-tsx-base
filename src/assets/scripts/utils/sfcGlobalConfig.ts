import { ComponentInternalInstance } from 'vue';
/**
 * vue实例全局配置
 * @param sfcInstance 
 */
export const getGlobalConfig = (sfcInstance: ComponentInternalInstance | null): any => {
  const { appContext } = sfcInstance || {}
  const { config } = appContext || {}
  return config?.globalProperties || {}
}

/**
 * 获取全局挂载的api
 * @param sfcInstance 
 */
export const $api = (sfcInstance: ComponentInternalInstance | null): any => {
  const { $api } = getGlobalConfig(sfcInstance)
  return $api
}