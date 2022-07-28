<template>
  <div class="text-sm">
    <!-- <list-item v-for="item in pexelsList" :key="item.id" :data="item" /> -->
    <m-waterfall
      :data="pexelsList"
      :column="isMobileTerminal ? 2 : 5"
      nodeKey="id"
      class="w-full px-1"
      :picturePreReading="false"
    >
      <template v-slot="{ item, width }">
        <list-item :data="item" :width="width" />
      </template>
    </m-waterfall>
  </div>
</template>

<script setup>
import listItem from './listItem.vue'
import { getPexelsList } from '@/api/pexels.js'
import { ref } from '@vue/reactivity'
import { isMobileTerminal } from '@/utils/flexible.js'

let query = {
  page: 1,
  size: 20
}

const pexelsList = ref([])
const getPexelsData = async () => {
  const res = await getPexelsList(query)
  pexelsList.value = res.list
}
getPexelsData()
</script>
