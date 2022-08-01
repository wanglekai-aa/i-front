<template>
  <div class="text-sm">
    <!-- <list-item v-for="item in pexelsList" :key="item.id" :data="item" /> -->
    <m-infinite-list
      v-model="isLoading"
      :isFinished="isFinished"
      :finishedText="'我是有底线的😊'"
      @onLoad="getPexelsData"
    >
      <m-waterfall
        :data="pexelsList"
        :column="isMobileTerminal ? 2 : 5"
        nodeKey="id"
        class="w-full px-1"
        :picturePreReading="false"
      >
        <template v-slot="{ item, width }">
          <list-item :data="item" :width="width" @click="onToPins" />
        </template>
      </m-waterfall>
    </m-infinite-list>
  </div>

  <!-- 大图详情 -->
  <transition
    :css="false"
    @beforeEnter="beforeEnter"
    @enter="enter"
    @leave="leave"
  >
    <pins-vue v-if="isVisiblePins" :id="currentPins.id" />
  </transition>
</template>

<script setup>
import listItem from './listItem.vue'
import pinsVue from '@/views/pins/components/pins.vue'
import { getPexelsList } from '@/api/pexels.js'
import { ref, nextTick } from 'vue'
import { isMobileTerminal } from '@/utils/flexible.js'
import { watch } from '@vue/runtime-core'
import { useStore } from 'vuex'
import gsap from 'gsap'
import { useEventListener } from '@vueuse/core'

let query = {
  page: 1,
  size: 20
}

// 数据是否在加载
const isLoading = ref(false)
// 数据是否全部加载完成
const isFinished = ref(false)

const pexelsList = ref([])
const getPexelsData = async () => {
  if (isFinished.value) return
  // isLoading.value = true

  // 完成第一次请求后，后续让 page 自增
  if (pexelsList.value.length) query.page++
  const { list, total } = await getPexelsList(query)

  if (query.page === 1) pexelsList.value = list
  else pexelsList.value.push(...list)

  // 判断数据是否全部加载完成
  if (pexelsList.value.length === total) {
    isFinished.value = true
  }
  isLoading.value = false
}
// getPexelsData()

// 重制查询参数，并清空数据
const resetQuery = (newQuery) => {
  query = { ...query, ...newQuery }
  isFinished.value = false
  // 情况数据，触发 getPexelsData
  pexelsList.value = []
}

// 控制 Pins 展示
const isVisiblePins = ref(false)
// 当前选中的 pins 属性
const currentPins = ref({})

const onToPins = (item) => {
  history.pushState(null, null, '/pins/' + item.id)
  currentPins.value = item
  isVisiblePins.value = true
}

const beforeEnter = (el) => {
  gsap.set(el, {
    scaleX: 0,
    scaleY: 0,
    transformOrigin: '0 0',
    translateX: currentPins.value.localtion?.translateX,
    translateY: currentPins.value.localtion?.translateY
  })
}

const enter = (el, done) => {
  gsap.to(el, {
    duration: 0.3,
    scaleX: 1,
    scaleY: 1,
    opacity: 1,
    translateX: 0,
    translateY: 0,
    onComplete: done
  })
}

const leave = (el) => {
  gsap.to(el, {
    duration: 0.3,
    scaleX: 0,
    scaleY: 0,
    translateX: currentPins.value.localtion?.translateX,
    translateY: currentPins.value.localtion?.translateY,
    opacity: 0
  })
}

// 监听浏览器后退事件
useEventListener(window, 'popstate', () => {
  isVisiblePins.value = false
})

const store = useStore()
watch(
  () => store.getters.currentCategory,
  // 选中项发送变化，触发重制参数
  (currentCategory) => {
    resetQuery({
      page: 1,
      categoryId: currentCategory.id
    })
  }
)

// 监听搜索内容的变化
watch(
  () => store.getters.searchText,
  (val) => {
    resetQuery({
      page: 1,
      searchText: val
    })
  }
)
</script>
