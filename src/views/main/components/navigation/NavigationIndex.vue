<template>
  <navigation-mobile v-if="isMobileTerminal" />
</template>

<script setup>
import NavigationMobile from './NavigationMobile.vue'

import { isMobileTerminal } from '@/utils/flexible'
import { getCategory } from '@/api/category'

const getCategoryData = async () => {
  const { categorys } = await getCategory()
  console.log(categorys)
}
getCategoryData()
</script>
