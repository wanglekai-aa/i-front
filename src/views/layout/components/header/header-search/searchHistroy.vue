<template>
  <div>
    <div class="flex items-center text-xs mb-1 text-zinc-400">
      <span>最近搜索</span>
      <m-svg-icon
        name="delete"
        class="w-2.5 h-2.5 ml-1 p-0.5 cursor-pointer duration-300 rounded-sm hover:bg-zinc-100"
        fillClass="fill-zinc-400"
        @click="onDeleteAllClick"
      />
    </div>

    <!-- 搜索记录 -->
    <ul class="flex flex-wrap">
      <li
        class="mr-2 mb-1.5 flex items-center cursor-pointer bg-zinc-100 px-1.5 py-0.5 text-zinc-700 text-sm font-bold rounded-sm duration-300 hover:bg-zinc-200"
        v-for="(item, index) in $store.getters.searchHistories"
        :key="item"
      >
        <span>{{ item }}</span>
        <m-svg-icon
          name="input-delete"
          class="w-2.5 h-2.5 p-0.5 ml-1 duration-300 rounded-sm hover:bg-zinc-100"
          @click.stop="onDeleteClick(index)"
        />
      </li>
    </ul>
  </div>
</template>

<script>
const EMITS_ITEM_CLICK = 'itemClick'
</script>

<script setup>
import { useStore } from 'vuex'

const store = useStore()

const emits = defineEmits([EMITS_ITEM_CLICK])

// 清空历史记录
const onDeleteAllClick = () => {
  store.commit('search/removeAllHistory')
}
// 删除指定历史记录
const onDeleteClick = (index) => {
  store.commit('search/removeHistory', index)
}

const onItemClick = (item) => {
  emits(EMITS_ITEM_CLICK, item)
}
</script>
