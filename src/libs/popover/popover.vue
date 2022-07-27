<template>
  <div class="relative" @mouseenter="onMouseenter" @mouseleave="onMouseleave">
    <div ref="referenceTarget">
      <slot name="reference" />
    </div>

    <!-- 气泡展示动画 -->
    <transition name="slide">
      <div
        ref="contentTarget"
        v-show="isVisable"
        class="absolute p-1 z-20 bg-white dark:bg-zinc-900 border dark:border-zinc-700 rounded-md"
        :style="contentStyle"
      >
        <slot />
      </div>
    </transition>
  </div>
</template>

<script>
// 左上
const PROP_LEFT_TOP = 'left-top'
// 左下
const PROP_LEFT_BOTTOM = 'left-bottom'
// 右上
const PROP_RIGHT_TOP = 'right-top'
// 右下
const PROP_RIGHT_BUTTOM = 'right-bottom'

// 指定位置的 enum
const placementEnum = [
  PROP_LEFT_TOP,
  PROP_LEFT_BOTTOM,
  PROP_RIGHT_TOP,
  PROP_RIGHT_BUTTOM
]

// 延迟关闭弹层时间
const DELAY_TIEM = 200
</script>

<script setup>
/**
 * popover 位置计算
 * 1. 指定所有可选位置的常量，并生成 enum
 * 2. 通过 props 控制指定位置
 * 3. 获取 DOM 元素，创建读取元素尺寸的方法
 * 4. 生成气泡的样式对象，用来控制每个位置对应的样式
 * 5. 根据 props ，计算样式对象
 */
import { ref } from '@vue/reactivity'
import { nextTick, watch } from '@vue/runtime-core'

const props = defineProps({
  placement: {
    type: String,
    default: 'left-bottom',
    validator(val) {
      const res = placementEnum.includes(val)
      if (!res) {
        throw new Error(`placement 必须是 ${placementEnum.join(', ')} 中的一个`)
      }
      return res
    }
  }
})

const isVisable = ref(false)

// 控制延迟关闭
let timeout

// 鼠标移入
const onMouseenter = () => {
  isVisable.value = true
  if (timeout) clearTimeout(timeout)
}

// 鼠标移出
const onMouseleave = () => {
  timeout = setTimeout(() => {
    isVisable.value = false
    timeout = null
  }, DELAY_TIEM)
}

// 计算元素尺寸
const referenceTarget = ref(null)
const contentTarget = ref(null)
const getElementSize = (el) => {
  if (!el) return {}
  return {
    width: el.offsetWidth,
    height: el.offsetHeight
  }
}

// 弹层位置
const contentStyle = ref({ left: 0, top: 0 })

// 监听展示变化，在展示时计算气泡位置
watch(isVisable, (val) => {
  if (!val) return

  nextTick(() => {
    switch (props.placement) {
      case PROP_LEFT_TOP: // 左上
        contentStyle.value.top = 0
        contentStyle.value.left =
          -getElementSize(contentTarget.value).width + 'px'
        break
      case PROP_LEFT_BOTTOM: // 左下
        contentStyle.value.top =
          getElementSize(referenceTarget.value).height + 'px'
        contentStyle.value.left =
          -getElementSize(contentTarget.value).width + 'px'
        break
      case PROP_RIGHT_TOP: // 右上
        contentStyle.value.top = 0
        contentStyle.value.left =
          getElementSize(referenceTarget.value).width + 'px'
        break
      case PROP_RIGHT_BUTTOM: // 右下
        contentStyle.value.top =
          getElementSize(referenceTarget.value).height + 'px'
        contentStyle.value.left =
          getElementSize(referenceTarget.value).width + 'px'
        break
    }
  })
})
</script>

<style lang="scss" scoped>
.slide-enter-active {
  transition: opacity 0.3s, transform 0.3s;
}

.slide-leave-active {
  transition: opacity 0.3s, transform 0.3s;
}

.slide-enter-from,
.slide-leave-to {
  transform: translateY(20px);
  opacity: 0;
}
</style>
