/**
 * 全局vue组件注入
 * @author huangchunmao
 * @email sujinw@qq.com
 * @date 2020/6/8
*/
import { App } from 'vue';
import SvgIcon from './SvgIcon'
import { Toast, Card, Tag, Button, SubmitBar, Row, Col } from 'vant'

/**
 *  全局导入组件
 * @param {App} Vue
 */
export default function initComponents(Vue: App) {
  Vue.component('svg-icon', SvgIcon)
  Vue.use(Toast).use(Card).use(Tag).use(Button).use(SubmitBar).use(Row).use(Col)
}
const req = require.context('../assets/images/svgs', false, /\.svg$/)
const requireAll = (requireContext: any): void => requireContext.keys().map(requireContext)
requireAll(req)
