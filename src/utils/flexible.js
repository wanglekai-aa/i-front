import { computed } from 'vue'
import { PC_DEVICE_WIDTH } from '../constants'
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
