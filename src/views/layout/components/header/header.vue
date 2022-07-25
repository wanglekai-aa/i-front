<template>
  <div class="w-full bg-white border-b border-b-zinc-200 py-1 px-2">
    <div class="flex items-center">
      <router-link to="/" class="w-4 h-4 mr-2">
        <img src="@/assets/logo.jpg" class="w-full" alt="logo" />
      </router-link>
      <header-search class="mr-1" />
      <header-theme class="mr-1" />
      <header-my />
    </div>
  </div>
</template>

<script setup>
import headerSearch from './header-search/headerSearch.vue'
import headerMy from './header-my.vue'
import headerTheme from './header-theme.vue'
</script>
