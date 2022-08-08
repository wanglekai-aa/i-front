<template>
  <m-popover class="guide-my flex items-center" placement="left-bottom">
    <template #reference>
      <div
        v-if="$store.getters.token"
        class="guide-my relative flex items-center p-0.5 rounded-sm cursor-pointer duration-200 outline-none hover:bg-zinc-100 dark:hover:bg-zinc-900"
      >
        <!-- 头像 -->
        <img
          v-lazy
          class="w-3 h-3 rounded-sm"
          :src="$store.getters.userInfo.avatar"
        />
        <!-- 下箭头 -->
        <m-svg-icon
          class="h-1.5 w-1.5 ml-0.5"
          name="down-arrow"
          fillClass="fill-zinc-900 dark:fill-zinc-300"
        ></m-svg-icon>
        <!-- vip 标记 -->
        <m-svg-icon
          v-if="$store.getters.userInfo.vipLevel"
          name="vip"
          class="w-1.5 h-1.5 absolute right-[16px] bottom-0"
        ></m-svg-icon>
      </div>
      <div v-else>
        <router-link to="/login">
          <m-button class="guide-my" icon="profile" iconColor="#fff" />
        </router-link>
      </div>
    </template>
    <div v-if="$store.getters.token" class="w-[140px] overflow-hidden">
      <div
        class="flex items-center p-1 cursor-pointer rounded hover:bg-zinc-100/60 dark:hover:bg-zinc-800"
        v-for="item in menuArr"
        :key="item.id"
        @click="onMenuItemClick(item)"
      >
        <m-svg-icon
          :name="item.icon"
          class="w-1.5 h-1.5 mr-1"
          fillClass="fill-zinc-900 dark:fill-zinc-300"
        ></m-svg-icon>
        <span class="text-zinc-800 dark:text-zinc-300 text-sm">{{
          item.title
        }}</span>
      </div>
    </div>
  </m-popover>
</template>

<script setup>
import { useStore } from 'vuex'
import { mConfirm } from '@/libs'
import { useRouter } from 'vue-router'

const menuArr = [
  { id: 101, title: '个人资料', icon: 'profile', path: '/profile' },
  { id: 102, title: '升级 VIP', icon: 'vip-profile', path: '/member' },
  { id: 103, title: '退出登录', icon: 'logout', path: '' }
]

const store = useStore()
const router = useRouter()

const onMenuItemClick = (item) => {
  if (item.path) {
    return router.push(item.path)
  }

  // 退出登录
  mConfirm('提示', '确定退出登录吗?').then(() => {
    store.dispatch('user/logout')
  })
}
</script>
