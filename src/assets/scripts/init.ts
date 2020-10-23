/**
 * 全局初始化
 * @author huangchunmao
 * @email sujinw@qq.com
 * @date 2020/6/8
*/
// const vConsole = new Vconsole()
// export default vConsole

/**
 * 初始化Rem
 */
function initRem() {
  const cale = window.innerWidth > 750 ? 2 : window.innerWidth / 375
  window.document.documentElement.style.fontSize = `${100 * cale}px`
}
document.addEventListener('DOMContentLoaded', initRem, false)

/**
 * 重新加载rem
 */
window.addEventListener('resize', function () {
  console.log('++++')
  initRem()
  const activeElement = <Element>document.activeElement
  if (
    activeElement.tagName === 'INPUT' ||
    activeElement.tagName === 'TEXTAREA'
  ) {
    window.setTimeout(function () {
      activeElement.scrollIntoView(false)
    }, 0)
  }
})

document.addEventListener('focusout', () => {
  setTimeout(() => {
    const height = document.documentElement.scrollTop || document.body.scrollTop
    window.scrollTo(0, height + 1)
  }, 20)
})

// ============================= 切换屏 ===================================
window.addEventListener('onorientationchange' in window ? 'orientationchange' : 'resize', onOrientationChange, false)
function onOrientationChange(): void {
  initRem()
}
