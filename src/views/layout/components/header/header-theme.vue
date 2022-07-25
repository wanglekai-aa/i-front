<template>
  <m-popover placement="left-top">
    <template #reference>
      <m-svg-icon
        name="theme-light"
        class="guide-theme w-4 h-4 p-1 cursor-pointer rounded-sm duration-200 outline-none hover:bg-zinc-100/60"
        fillClass="fill-zinc-900"
      />
    </template>

    <div class="overflow-hidden w-[140px]">
      <div
        class="flex items-center p-1 cursor-pointer rounded hover:bg-zinc-100/60"
        v-for="item in themeArr"
        :key="item.id"
      >
        <m-svg-icon
          :name="item.icon"
          class="w-1.5 h-1.5 mr-1"
          fillClass="fill-zinc-900"
        />
        <span class="text-zinc-800 text-sm" v-text="item.name"></span>
      </div>
    </div>
  </m-popover>
</template>

<script setup>
import { THEME_DARK, THEME_LIGHT, THEME_SYSTEM } from '@/constants'
const themeArr = [
  { id: '101', type: THEME_LIGHT, icon: 'theme-light', name: '极简白' },
  { id: '102', type: THEME_DARK, icon: 'theme-dark', name: '极夜黑' },
  { id: '103', type: THEME_SYSTEM, icon: 'theme-system', name: '跟随系统' }
]
</script>
