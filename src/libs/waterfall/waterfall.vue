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
import { computed, onMounted } from '@vue/runtime-core'

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
  console.log(columnWidth.value)
})
</script>
