<template>
  <navigation-mobile v-if="isMobileTerminal" />
</template>

<script setup>
import NavigationMobile from './NavigationMobile.vue'
import { isMobileTerminal } from '@/utils/flexible'
import { useStore } from 'vuex'

const store = useStore()
store.dispatch('category/useCategoriesData')
</script>
