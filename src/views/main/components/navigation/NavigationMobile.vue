<template>
  <div class="bg-white sticky top-0 left-0 z-10">
    <ul
      ref="ulTarget"
      class="relative flex overflow-x-auto p-1 text-xs text-zinc-600"
    >
      <!-- 滑块 -->
      <li
        ref="sliderTarget"
        :style="sliderStyle"
        class="absolute h-[22px] bg-zinc-900 rounded-lg duration-200"
      ></li>
      <!-- 汉堡按钮 -->
      <li
        class="fixed z-20 top-0 right-[-1px] h-4 px-1 flex items-center bg-white shadow-l-white"
        @click="isOpenPopup = !isOpenPopup"
      >
        <m-svg-icon class="w-1.5 h-1.5" name="hamburger" />
      </li>
      <li
        class="shrink-0 px-1.5 py-0.5 z-10 duration-200 last:mr-4"
        :class="{ 'text-zinc-100': currentCategoryIndex === index }"
        v-for="(category, index) in $store.getters.categories"
        :key="category.id"
        :ref="setItemRef"
        @click="handleTagClick(index)"
      >
        {{ category.name }}
      </li>
    </ul>
    <m-popup v-model="isOpenPopup">
      <menu-vue @onItemClick="onItemClick" />
    </m-popup>
  </div>
</template>

<script setup>
import { ref } from '@vue/reactivity'
import { onBeforeUpdate, watch } from '@vue/runtime-core'
import { useScroll } from '@vueuse/core'
import menuVue from '../menu/menu.vue'

const isOpenPopup = ref(false)

// 滑块样式
const sliderStyle = ref({
  transform: 'translateX(0px)',
  width: '52px'
})

// 获取所有 item 元素
let itemRefs = []
const setItemRef = (el) => {
  if (el) itemRefs.push(el)
}
// 数据改变之后， DOM 变化之前
onBeforeUpdate(() => {
  itemRefs = []
})

// 选中 item 下标
const currentCategoryIndex = ref(0)

watch(currentCategoryIndex, (val) => {
  // 选中元素的 left 和 width
  const { left, width } = itemRefs[val].getBoundingClientRect()
  sliderStyle.value = {
    transform: `translateX(${ulScrollLeft.value + left - 10}px)`,
    width: width + 'px'
  }
  if (isOpenPopup.value) {
    isOpenPopup.value = false
    ulTarget.value.scrollLeft = left + ulTarget.value.scrollLeft - 10
  }
})

const ulTarget = ref(null)
// 通过 vueuse - useScroll 获取响应式 scroll 滚动距离
let { x: ulScrollLeft } = useScroll(ulTarget)

// 切换事件
const handleTagClick = (index) => {
  if (currentCategoryIndex.value === index) return

  currentCategoryIndex.value = index
}

const onItemClick = (index) => {
  if (currentCategoryIndex.value === index && isOpenPopup.value) {
    isOpenPopup.value = false
  }
  currentCategoryIndex.value = index
}
</script>
