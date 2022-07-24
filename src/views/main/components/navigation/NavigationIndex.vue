<template>
  <navigation-mobile v-if="isMobileTerminal" :categories="categories" />
</template>

<script setup>
import NavigationMobile from './NavigationMobile.vue'

import { isMobileTerminal } from '@/utils/flexible'
import { getCategory } from '@/api/category'
import { ref } from '@vue/reactivity'
import { ALL_CATEGORY_ITEM } from '@/constants'

const categories = ref([])

const getCategoryData = async () => {
  const { categorys } = await getCategory()
  categories.value = categorys
  categories.value.unshift(ALL_CATEGORY_ITEM)
}
getCategoryData()
</script>
