<template>
  <button
    class="text-sm text-center rounded duration-150 flex justify-center items-center"
    :class="[
      typeEnum[type],
      sizeEnum[sizeKey].button,
      {
        'acitve:scale-105': isActiveAnim
      }
    ]"
    @click.stop="onBtnClick"
  >
    <!-- loading -->
    <m-svg-icon
      v-if="loading"
      name="loading"
      class="w-2 h-2 animate-spin mr-1"
    />
    <!-- icon 按钮 -->
    <m-svg-icon
      v-if="icon"
      :name="icon"
      class="m-auto"
      :class="sizeEnum[sizeKey].icon"
      :color="iconColor"
      :fillClass="iconClass"
    />
    <!-- 文字按钮 -->
    <slot v-else />
  </button>
</template>

<script>
const EMITS_CLICK = 'click'
// type 可选项，表示按钮风格
const typeEnum = {
  primary:
    'text-white  bg-zinc-800 hover:bg-zinc-900 active:bg-zinc-800 dark:bg-zinc-900  dark:hover:bg-zinc-700 dark:active:bg-zinc-700',
  main: 'text-white  bg-main hover:bg-hover-main active:bg-main dark:bg-zinc-900  dark:hover:bg-zinc-700 dark:active:bg-zinc-700',
  info: 'text-zinc-800 bg-zinc-200 hover:bg-zinc-300 active:bg-zinc-200 dark:text-zinc-300  dark:bg-zinc-700 dark:hover:bg-zinc-600 dark:active:bg-zinc-700'
}
// size 可选项，表示按钮大小，区分文字按钮和 icon 按钮
const sizeEnum = {
  // 文字按钮
  default: {
    button: 'w-8 h-4 text-base',
    icon: ''
  },
  // icon 按钮
  'icon-default': {
    button: 'w-4 h-4',
    icon: 'w-1.5 h-1.5'
  },
  small: {
    button: 'w-7 h-3 text-base',
    icon: ''
  },
  'icon-small': {
    button: 'w-3 h-3',
    icon: 'w-1.5 h-1.5'
  }
}
</script>

<script setup>
/**
 * 1. 构建 type 风格可选项和 size 大小可选项
 * 2. 通过 props 让开发者控制按钮
 * 3. 区分 icon button 和 text button
 * 4. 依据当前数据，实现视图
 * 5. 点击事件
 */
import { computed } from '@vue/runtime-core'

const props = defineProps({
  // icon 图标
  icon: String,
  // icon 颜色
  iconColor: String,
  // icon 图标类名 (tailwind)
  iconClass: String,
  // 按钮风格
  type: {
    type: String,
    default: 'main',
    validator(val) {
      // 获取所有的可选项
      const keys = Object.keys(typeEnum)
      // 校验开发者指定的风格是否在可选项内
      const result = keys.includes(val)
      if (!result) {
        throw new Error(`type 必须是 ${keys.join(', ')} 中的一个`)
      }
      return result
    }
  },
  // 大小风格
  size: {
    type: String,
    default: 'default',
    validator(val) {
      const keys = Object.keys(sizeEnum).filter((key) => !key.includes('icon'))
      const result = keys.includes(val)
      if (!result) {
        throw new Error(`size 必须是 ${keys.join(', ')} 中的一个`)
      }
      return result
    }
  },
  // 按钮点击时，是否需要动画
  isActiveAnim: {
    type: Boolean,
    default: true
  },
  // 加载状态
  loading: {
    type: Boolean,
    default: false
  }
})

/**
 * props.size
 * 处理 icon 按钮大小
 * 区分 icon button 和 text button
 **/
const sizeKey = computed(() => (props.icon ? 'icon-' + props.size : props.size))

const emits = defineEmits([EMITS_CLICK])

// 按钮点击事件
const onBtnClick = () => {
  if (props.loading) return
  emits(EMITS_CLICK)
}
</script>
