import { useIntersectionObserver } from '@vueuse/core'

export default {
  /**
   * 图片懒加载：
   *    在用户无法看到图片时，不加载图片
   *    在用户可以看到图片后 加载图片
   * 如何判断用户是否看到了图片:
   *    useIntersectionObserver
   * 如何做到不加载图片（网络）:
   *    img 标签渲染图片，指的是 src 属性
   *    src 属性为网络地址时，则会从网络中获取图片资源
   *    如果 img 标签 src 不是网络地址，则不获取资源地址
   *    把网络地址默认替换为非网络地址，然后当用户可见时，在替换为网络地址
   */
  mounted(el) {
    // 获取当前 img 标签 src 属性
    const imgsrc = el.src
    // 把 img 标签的 src 替换为 本地地址，或替换为空，还可以是一张透明图片
    el.src = ''

    const { stop } = useIntersectionObserver(el, ([{ isIntersecting }]) => {
      if (isIntersecting) {
        el.src = imgsrc
        stop()
      }
    })
  }
}
