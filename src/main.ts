import { createApp } from 'vue'
import App from './App'
import router from './router'
import store from './store'
import initComponents from '@/components'
// global init
import '@scripts/init'
// global api
import Apis from '@/apis'
// global filters
import * as Filter from '@/filters'
// global mixins
import Mixins from '@/mixins'
// global request/post/get action
import Http from '@/apis/request'
// global mount vue plugins
import Plugins from '@/assets/scripts/plugins'
// global const
import { setConsts } from '@/config/consts'
// global scss
import '@styles/common.scss'
// import 'vant/lib/index.css'

const Vue = createApp(App)

initComponents(Vue)
Vue.config.globalProperties.$filters = {}
Object.keys(Filter).forEach(key => {
  Vue.config.globalProperties.$filters[key] = Filter[key]
})
Vue.mixin(Mixins)

Vue
  .use(store)
  .use(router)
  .use(Http)
  .use(Apis)
  .use(setConsts)
  .use(Plugins)
  .mount('#app')
