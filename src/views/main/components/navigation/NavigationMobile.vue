<template>
  <div class="bg-white sticky top-0 left-0 z-10">
    <ul class="relative flex overflow-x-auto p-1 text-xs text-zinc-600">
      <!-- 汉堡按钮 -->
      <li
        class="fixed z-20 top-0 right-[-1px] h-4 px-1 flex items-center bg-white shadow-l-white"
      >
        <m-svg-icon class="w-1.5 h-1.5" />
      </li>
      <li
        class="shrink-0 px-1.5 py-0.5 z-10 duration-200 last:mr-4"
        v-for="category in categories"
        :key="category.id"
      >
        {{ category.name }}
      </li>
    </ul>
  </div>
</template>

<script setup>
defineProps({
  categories: {
    type: Array,
    required: true
  }
})
</script>
