import { addClass, removeClass } from '@/assets/scripts/utils/element'
import { onMounted, ref, reactive, provide, nextTick, defineComponent, Ref, unref } from 'vue'
import { useRoute } from 'vue-router'
import style from '@styles/modules/app.module.scss'
export default defineComponent({
  name: 'AppRoot',
  setup(props, context) {
    const route = useRoute()
    let body = ref<HTMLElement | null>(null)
    let state = reactive({
      isActiveView: true
    })
    onMounted(() => {
      body = ref(document.querySelector('body'))
    })

    /**
     * 隐藏body滚动条
     */
    const hideBodyScroll = () => {
      const el = unref(body)
      addClass((el as HTMLElement), 'noscroll')
    }
    /**
    * 显示body滚动条
    */
    const showBodyScroll = () => {
      const el = unref(body)
      removeClass((el as HTMLElement), 'noscroll')
    }
    /**
     * 手动刷新页面
     */
    const reload = () => {
      if (route.meta && route.meta.isBack) {
        delete route.meta.isBack
      }
      state.isActiveView = false
      nextTick(() => {
        state.isActiveView = true
      })
    }

    provide('$app', {
      hideBodyScroll,
      showBodyScroll,
      reload
    })

    return {
      body,
      state
    }
  },
  render() {
    return this.state.isActiveView ? <router-view /> : ''
  }
})
