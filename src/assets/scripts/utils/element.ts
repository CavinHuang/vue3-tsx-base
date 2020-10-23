/**
 * element 操作封装
 * @author huangchunmao sujinw@qq.com
 * @date 2020/05/07
 */

/**
 * 是否含有class
 * @param el
 * @param className
 * @returns {boolean}
 */
export function hasClass(el: HTMLElement, className: string): boolean {
  const reg = new RegExp('(^|\\s)' + className + '(\\s|$)')
  return reg.test(el.className)
}

/**
 * 添加class
 * @param el
 * @param className
 */
export function addClass(el: HTMLElement, className: string): void {
  if (hasClass(el, className)) {
    return
  }
  if (el.className === '') {
    el.className += className
  } else {
    const newClass = el.className.split(' ')
    newClass.push(className)
    el.className = newClass.join(' ')
  }
}

/**
 * 去除class
 * @param el
 * @param className
 */
export function removeClass(el: HTMLElement, className: string): void {
  if (hasClass(el, className)) {
    el.className = el.className.replace(new RegExp('(\\s|^)' + className + '(\\s|$)'), '')
  }
}
