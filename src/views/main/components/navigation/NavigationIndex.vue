<template>
  <navigation-mobile v-if="isMobileTerminal" />
</template>

<script setup>
import { isMobileTerminal } from '@/utils/flexible'

import NavigationMobile from './NavigationMobile.vue'
</script>
