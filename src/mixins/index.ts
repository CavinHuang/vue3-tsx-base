/**
 * 全局混入
 * @author huangchunmao
 * @email sujinw@qq.com
 * @date 2020/6/8
*/
import { date } from '@/assets/scripts/utils/date'
import QS from 'qs'

interface UrlParamsInterface {
  params?: any;
  path: string;
}

export default {
  method: {
    /**
     * 页面跳转
     * @param {Object|String} path 路径，或者路由对象
     * @param {Object|Boolean} params 参数或者标识是否是远程连接 远程连接自动用location打开
     * @param isRemote 是否是远程连接 远程连接自动用location打开
     */
    goTo(path: (string | UrlParamsInterface), params: any = {}, isRemote: boolean = false) {
      if (path instanceof Object) {
        params = path.params
        path = path.path
      }
      if (typeof params === 'boolean') {
        isRemote = true
        params = {}
      }
      params._t = new Date().getTime()
      if (isRemote) {
        window.location.href = path + '?' + QS.stringify(params)
        return false
      }
      this.$router.push({
        path,
        query: params
      })
    },
    /**
     * 把时间戳转换成 几秒前 几分钟前 今天xx:xx xx年xx月xx日
     * @param timestamp
     * @param targetTime
     * @returns {string}
     */
    time2String(timestamp: string, targetTime = new Date()): (string | undefined) {
      if (typeof timestamp === 'string') timestamp = timestamp.replace(/-/g, '/')
      const ofttimes = new Date(timestamp)
      const now = new Date(targetTime) || new Date()

      const dateTime = ofttimes.getTime()
      const nowTime = now.getTime()
      const dateDay = ofttimes.getDate()
      const nowDay = now.getDate()
      const dateMonth = ofttimes.getMonth()
      const nowMonth = now.getMonth()
      const dateYear = ofttimes.getFullYear()
      const nowYear = now.getFullYear()

      // TODO 此处因为有人把数据改成未来，我没办法啊，只能把未来的时间告诉他，你的未来帖子已经发表了
      if (nowTime - dateTime <= 0) return date('Y.m.d', ofttimes)
      if (nowTime - dateTime < 3600 * 1000) {
        if (nowTime - dateTime < 60 * 1000) {
          return Math.floor((nowTime - dateTime) / 1000) + '秒前'
        } else {
          return Math.floor((nowTime - dateTime) / (60 * 1000)) + '分钟前'
        }
      }
      if (dateYear === nowYear && dateMonth === nowMonth && dateDay === nowDay) return '今天 ' + date('H:i', ofttimes)
      if (dateYear === nowYear) return date('m月d日', ofttimes)
      if (dateYear !== nowYear) return date('Y.m.d', ofttimes)
    },
    /**
     * 格式化日期时间
     * @param {String|Number|datetime} timeStamp 需要转换的时间格式
     * @param {string} formatter 需要的格式
     * @returns { string } 日期格式化的字符串
     */
    dateFormat(timeStamp: string, formatter: string = 'Y-m-d H:i:s') {
      if (typeof timeStamp === 'string') timeStamp = timeStamp.replace(/-/g, '/')
      return date(formatter, new Date(timeStamp))
    }
  }
}
