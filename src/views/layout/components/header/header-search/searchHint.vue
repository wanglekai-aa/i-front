<template>
  <div class="">
    <div
      v-for="(item, index) in hintData"
      :key="index"
      class="py-1 pl-1 text-base font-bold text-zinc-500 rounded cursor-pointer duration-300 hover:bg-zinc-200 dark:hover:bg-zinc-900"
      v-html="highlightText(item)"
      @click="onItemClick(item)"
    ></div>
  </div>
</template>

<script>
const EMITS_ITEM_CLICK = 'itemClick'
</script>

<script setup>
import { getHint } from '@/api/pexels'
import { watchDebounced } from '@vueuse/core'
import { ref } from 'vue'

// 接收搜索数据
const props = defineProps({
  searchText: {
    type: String,
    required: true
  }
})

const emits = defineEmits([EMITS_ITEM_CLICK])

// 处理搜索提示数据获取
const hintData = ref([])
const getHintData = async () => {
  if (!props.searchText) return
  const { result } = await getHint(props.searchText)
  hintData.value = result
}

// 监听搜索文本的变化，并获取对应提示数据
watchDebounced(() => props.searchText, getHintData, {
  immediate: true,
  debounce: 500
})

const onItemClick = (item) => {
  emits(EMITS_ITEM_CLICK, item)
}

// 处理关键字高亮
const highlightText = (text) => {
  // 生成高亮标签
  const highlightStr = `<span class="text-zinc-900 dark:text-zinc-200">${props.searchText}</span>`
  const reg = new RegExp(props.searchText, 'gi')
  return text.replace(reg, highlightStr)
}
</script>
