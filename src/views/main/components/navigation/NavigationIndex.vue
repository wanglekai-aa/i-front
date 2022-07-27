<template>
  <navigation-mobile v-if="isMobileTerminal" />
  <navigation-pc v-else />
</template>

<script setup>
import NavigationMobile from './NavigationMobile.vue'
import NavigationPc from './NavigationPc.vue'
import { isMobileTerminal } from '@/utils/flexible'
import { useStore } from 'vuex'

const store = useStore()
store.dispatch('category/useCategoriesData')
</script>
