<template>
  <div class="text-sm">
    <!-- <list-item v-for="item in pexelsList" :key="item.id" :data="item" /> -->
    <m-waterfall :data="pexelsList" :column="5">
      <template v-slot="{ item, width }">
        {{ item.photoLink }} -- {{ width }}
      </template>
    </m-waterfall>
  </div>
</template>

<script setup>
// import listItem from './listItem.vue'
import { getPexelsList } from '@/api/pexels.js'
import { ref } from '@vue/reactivity'

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
