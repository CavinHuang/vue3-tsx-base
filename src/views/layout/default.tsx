
import { defineComponent } from 'vue'
import css from './default.module.scss'
export default defineComponent({
  name: 'Layout',
  render() {
    const keepalive = () => {
      if (!this.$route.meta.keepAlive) {
        return <router-view></router-view>
      } else {
        return (
          <keep-alive>
            <router-view></router-view>
          </keep-alive>
        )
      }
    }
    return (
      <div class={css['page-container']}>
        {keepalive()}
      </div>
    )
  }
})
