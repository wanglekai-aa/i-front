<template>
  <div class="relative" @mouseenter="onMouseenter" @mouseleave="onMouseleave">
    <div>
      <slot name="reference" />
    </div>

    <!-- 气泡展示动画 -->
    <transition name="slide">
      <div
        v-show="isVisable"
        class="absolute p-1 z-20 bg-white border rounded-md"
      >
        <slot />
      </div>
    </transition>
  </div>
</template>

<script setup>
import { ref } from '@vue/reactivity'

const isVisable = ref(false)

// 鼠标移入
const onMouseenter = () => {
  isVisable.value = true
}

// 鼠标移出
const onMouseleave = () => {
  isVisable.value = false
}
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
