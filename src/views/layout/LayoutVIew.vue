<template>
  <div class="h-screen">
    <header-vue class="h-header" />
    <div class="h-main">
      <main-vue />
    </div>
    <floating-vue />
  </div>
</template>

<script setup>
import headerVue from './components/header/header.vue'
import floatingVue from './components/floating.vue'
import mainVue from './components/main.vue'
</script>
