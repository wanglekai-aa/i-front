<template>
  <div
    class="h-full overflow-auto bg-white dark:bg-zinc-800 duration-500 scrollbar-thin scrollbar-thumb-transparent xl:scrollbar-thumb-zinc-200 xl:dark:scrollbar-thumb-zinc-900 scrollbar-track-transparent"
  >
    <navigation-index />
    <div class="max-w-screen-xl mx-auto relative m-1 xl:mt-4">
      <list-index />
    </div>
  </div>
</template>

<script setup>
import NavigationIndex from './components/navigation/NavigationIndex.vue'
import listIndex from './components/list/listIndex.vue'
</script>

<style></style>
