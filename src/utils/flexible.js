import { computed } from 'vue'
import { PC_DEVICE_WIDTH } from '@/constants'
import { useWindowSize } from '@vueuse/core'

const { width } = useWindowSize()

/**
 * 判断当前是否为移动设备
 * 判断依据 屏幕的宽度是否小于指定的宽度（1280）
 * 要在后面进行 响应式的视图处理 所以此处通过 宽度 进行移动端判断
 */
export const isMobileTerminal = computed(
  // () => document.documentElement.clientWidth < PC_DEVICE_WIDTH
  () => width.value < PC_DEVICE_WIDTH
)

/** 
 * 实际开发中建议: 判断当前是否为移动设备
export const isMobileTerminal = computed(() => {
  return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
     navigator.userAgent
  )
})
*/

/**
 * 动态指定 rem 基准值，最大为 40px
 * 根据设备屏幕的宽度，进行计算，把计算出来的值 赋值给 html 根标签作为 fontSize 的大小
 */
export const useRem = () => {
  const MAX_FONT_SIZE = 40
  document.addEventListener('DOMContentLoaded', () => {
    const html = document.querySelector('html')
    let fontSize = window.innerWidth / 10
    fontSize = fontSize > MAX_FONT_SIZE ? MAX_FONT_SIZE : fontSize
    html.style.fontSize = fontSize + 'px'
  })
}
