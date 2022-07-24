<template>
  <div>
    <teleport to="body">
      <!-- 蒙版 -->
      <transition name="fade">
        <div
          v-if="isOpen"
          class="w-screen h-screen bg-zinc-900/80 fixed top-0 left-0 z-20"
          @click="isOpen = false"
        ></div>
      </transition>
      <!-- 内容  -->
      <transition name="popup-down-up">
        <div
          v-if="isOpen"
          v-bind="$attrs"
          class="w-screen bg-white z-50 fixed bottom-0"
        >
          <slot />
        </div>
      </transition>
    </teleport>
  </div>
</template>

<script setup>
import { watch } from '@vue/runtime-core'
import { useScrollLock, useVModel } from '@vueuse/core'

const props = defineProps({
  modelValue: {
    type: Boolean,
    required: true
  }
})

// const emits = defineEmits(['update:modelValue'])
const isOpen = useVModel(props)
// 锁定滚动
const isLocked = useScrollLock(document.body)
watch(
  // () => props.modelValue,
  isOpen,
  (val) => {
    isLocked.value = val
  },
  {
    immediate: true
  }
)
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: all 0.3s;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.popup-down-up-enter-active,
.popup-down-up-leave-active {
  transition: all 0.3s;
}
.popup-down-up-enter-from,
.popup-down-up-leave-to {
  transform: translateY(100%);
}
</style>
