<template>
  <div>
    <!-- 内容 -->
    <slot />
    <div ref="loadingTarget" class="h-6 py-4">
      <!-- 加载更多 -->
      <m-svg-icon
        v-show="loading"
        class="w-4 h-4 mx-auto animate-spin"
        name="infinite-load"
      />
      <!-- 没有更多数据了 -->
      <p v-if="isFinished" class="text-center text-base text-zinc-400">
        {{ finishedText }}
      </p>
    </div>
  </div>
</template>

<script setup>
import { ref } from '@vue/reactivity'
import { useIntersectionObserver, useVModel } from '@vueuse/core'

const props = defineProps({
  // 是否处于加载状态
  modelValue: {
    type: Boolean,
    required: true
  },
  // 数据是否全部加载完成
  isFinished: {
    type: Boolean,
    default: false
  },
  finishedText: {
    type: String,
    default: '没有更多数据了！'
  }
})

const emits = defineEmits(['onLoad', 'update:modelValue'])

// 处理 loading 状态
const loading = useVModel(props)

// 利用 useIntersectionObserver 方法，监听元素可见行为，用于判断列表滚动到底部：

const loadingTarget = ref(null)
useIntersectionObserver(
  loadingTarget,
  ([{ isIntersecting }], obsrverElement) => {
    // 当加载更多视图可见时，加载更多数据
    if (isIntersecting && !loading.value && !props.isFinished) {
      console.log('load more...')
      loading.value = false
      emits('onLoad')
    }
  }
)
</script>
