/**
 * 时间处理
 */

interface DateOptionInterface {
  short?: boolean;
  chainese?: boolean;
}

/**
 * 时间格式化函数
 * strtotime('Y-m-d H:i:s')
 * @param format 只支持 'Y-m-d H:i:s','Y-m-d','H:i:s' 三种调用方式
 *        实现 Y m d H i s
 * @param time 为空时，取当前时间
 * @param option
 * @return 日期格式化的字符串
 */
export function date(format: string, time: (string | number | Date), option: DateOptionInterface = {}): string {
  const defaultOpt: DateOptionInterface = {
    short: true,
    chainese: true
  }
  option = Object.assign(defaultOpt, option)
  const _temp = (time != null) ? new Date(time) : new Date()
  // var _return = ''

  const Year: number = _temp.getFullYear()
  const Month: number = _temp.getMonth() + 1
  const Day: number = _temp.getDate()
  const Hour: number = _temp.getHours()
  const Minute: number = _temp.getMinutes()
  const Seconds: number = _temp.getSeconds()
  const Week: number = _temp.getDay()

  format = format.replace('Y', Year.toString())
  format = format.replace('m', appendZear(Month))
  format = format.replace('M', monthNote(Month, option.short || false))
  format = format.replace('d', appendZear(Day))
  format = format.replace('H', appendZear(Hour))
  format = format.replace('i', appendZear(Minute))
  format = format.replace('s', appendZear(Seconds))
  format = format.replace('w', (Week + 1).toString())
  format = format.replace('W', week2Chinese(Week, option.short || false, option.chainese || false))

  return format
}

/**
 * 数字添零
 * @param num
 * @returns {*}
 */
const appendZear = (num: number): string => {
  return num < 10 ? '0' + num : num.toString()
}

/**
 * 返回中文星期
 * @param  {number} w [description]
 * @param short
 * @param chinese
 * @return {string}   [description]
 */
export function week2Chinese(w: number, short: boolean, chinese: boolean): string {
  const chineseWeek = ['日', '一', '二', '三', '四', '五', '六']
  const DAY_NAMES = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
  const DAY_SHORT_NAMES = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']

  if (short) return DAY_SHORT_NAMES[w]
  else if (chinese) return chineseWeek[w]
  else return DAY_NAMES[w]
}

/**
 * 返回英文全称或者简写月份
 * @param  {number} m     [description]
 * @param  {[type]} short [description]
 * @return {string}       [description]
 */
export function monthNote(m: number, short: boolean): string {
  const MONTH_NAMES = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
  const MONTH_SHORT_NAMES = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

  if (short) return MONTH_SHORT_NAMES[m]
  else return MONTH_NAMES[m]
}

export default date
