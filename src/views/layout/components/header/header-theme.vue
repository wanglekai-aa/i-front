<template>
  <m-popover placement="left-top">
    <template #reference>
      <m-svg-icon
        :name="svgIconName"
        class="guide-theme w-4 h-4 p-1 cursor-pointer rounded-sm duration-200 outline-none hover:bg-zinc-100/60 dark:bg-zinc-900"
        fillClass="fill-zinc-900 dark:fill-zinc-300"
      />
    </template>

    <div class="overflow-hidden w-[140px]">
      <div
        class="flex items-center p-1 cursor-pointer rounded hover:bg-zinc-100/60 dark:bg-zinc-800"
        v-for="item in themeArr"
        :key="item.id"
        @click="onItemClick(item)"
      >
        <m-svg-icon
          :name="item.icon"
          class="w-1.5 h-1.5 mr-1"
          fillClass="fill-zinc-900 dark:fill-zinc-300"
        />
        <span
          class="text-zinc-800 dark:text-zinc-300 text-sm"
          v-text="item.name"
        ></span>
      </div>
    </div>
  </m-popover>
</template>

<script setup>
import { THEME_DARK, THEME_LIGHT, THEME_SYSTEM } from '@/constants'
import { computed } from '@vue/runtime-core'
import { useStore } from 'vuex'
const themeArr = [
  { id: '101', type: THEME_LIGHT, icon: 'theme-light', name: '极简白' },
  { id: '102', type: THEME_DARK, icon: 'theme-dark', name: '极夜黑' },
  { id: '103', type: THEME_SYSTEM, icon: 'theme-system', name: '跟随系统' }
]

// 监听主题的切换行为
// 根据行为保存当前展示的主题到 vuex 中
// 根据 vuex 中保存的当前主题，展示 header -> theme 的显示图标
// 根据 vuex 中保存的当前主题，修改 html 的 class

const store = useStore()

const onItemClick = (theme) => {
  store.commit('theme/changeThemeType', theme.type)
}

const svgIconName = computed(() => {
  const theme = themeArr.find((theme) => {
    return theme.type === store.getters.themeType
  })
  return theme?.icon
})
</script>
