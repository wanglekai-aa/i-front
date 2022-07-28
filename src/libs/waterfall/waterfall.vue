<template>
  <div
    class="relative"
    ref="containerTarget"
    :style="{
      height: containerHeight + 'px'
    }"
  >
    <template v-if="columnWidth && data.length">
      <div
        v-for="(item, index) in data"
        :key="nodeKey ? item[nodeKey] : index"
        class="m-waterfall-item absolute duration-300"
        :style="{
          width: columnWidth + 'px',
          left: item._style?.left + 'px',
          top: item._style?.top + 'px'
        }"
      >
        <slot :item="item" :width="columnWidth" :index="index" />
      </div>
    </template>
    <div v-else>加载中...</div>
  </div>
</template>

<script setup>
import { ref } from '@vue/reactivity'
import { computed, nextTick, onMounted, watch } from '@vue/runtime-core'
import { getAllImg, getImgElements, onComplateImgs } from './utils'

const props = defineProps({
  // 数据源
  data: { type: Array, required: true },
  // 唯一标识 key
  nodeKey: String,
  // 列数
  column: { default: 2, type: Number },
  // 列间距
  columnSpacing: { default: 20, type: Number },
  // 行间距
  rowSpacing: { default: 20, type: Number },
  // 是否需要图片预读取
  picturePreReading: { default: true, type: Boolean }
})

// 容器的高度
const containerHeight = ref(0)
// 记录每列高度： key：所在列， val：列高
const columnHeightObj = ref({})

// 构建记录各列高度的对象
const useColumnHeightObj = () => {
  columnHeightObj.value = {}
  for (let i = 0; i < props.column; i++) {
    columnHeightObj.value[i] = 0
  }
}

/**
 * 想要计算列宽，那么首先需要有容器的总宽度：
 * 容器的宽度不包含 padding, margin, border
 * 容器的左边距，计算 item left 需要使用定位
 */
const containerTarget = ref(null)
const containerWidth = ref(0)
const containerLeft = ref(0)

// 容器的宽度
const useContainerWidth = () => {
  const { paddingLeft, paddingRight } = getComputedStyle(
    containerTarget.value,
    null
  )
  // 容器左边距
  containerLeft.value = parseFloat(paddingLeft)
  // 容器的宽度
  containerWidth.value =
    containerTarget.value.offsetWidth -
    parseFloat(paddingLeft) -
    parseFloat(paddingRight)
}

// 计算列宽
const columnWidth = ref(0)
const columnSpacingTotal = computed(() => {
  // 列间合计，如果为 5列，则存在 4个间距
  return (props.column - 1) * props.columnSpacing
})
const useColumnWidth = () => {
  useContainerWidth()
  columnWidth.value =
    (containerWidth.value - columnSpacingTotal.value) / props.column
}

onMounted(() => {
  useColumnWidth()
  // console.log(columnWidth.value)
})

// 需要图片预加载

// item 高度集合
let itemHeights = []

// 图片高度未知
// 监听图片加载完成
const waitImgComplate = () => {
  // 拿到所有元素
  let itemElements = [...document.getElementsByClassName('m-waterfall-item')]
  // 获取所有元素的 img 标签
  const imgElements = getImgElements(itemElements)
  // console.log('imgElements', imgElements)
  // 获取所有 img 标签的图片
  const allImgs = getAllImg(imgElements)

  onComplateImgs(allImgs).then((res) => {
    itemElements.forEach((el) => {
      itemHeights.push(el.offsetHeight)
    })
    useItemLocation()
  })
}

// 不需要图片预加载
const useItemHeight = () => {
  let itemElements = [...document.getElementsByClassName('m-waterfall-item')]
  itemElements.forEach((el) => {
    itemHeights.push(el.offsetHeight)
  })
  useItemLocation()
}

// 为每个 item 生成位置
const useItemLocation = () => {
  console.log('itemHeights: ', itemHeights)
}

// 监听数据获取时，触发对应的计算：
watch(
  () => props.data,
  (val) => {
    nextTick(() => {
      if (props.picturePreReading) {
        waitImgComplate()
      } else {
        useItemHeight()
      }
    })
  },
  {
    immediate: true,
    deep: true
  }
)
</script>
