<template>
  <div
    class="fixed top-[20%] left-[50%] translate-x-[-50%] w-[340px] h-[270px] text-sm bg-white dark:bg-zinc-800 rounded border border-zinc-200 dark:border-zinc-900 shadow-2xl"
  >
    <div class="flex items-center h-5 text-left px-1 mb-1">
      <span class="flex-grow dark:text-zinc-200">请完成安全验证</span>
      <m-svg-icon
        name="refresh"
        class="w-3 h-3 p-0.5 rounded-sm duration-300 cursor-pointer hover:bg-zinc-200 dark:hover:bg-zinc-900"
        fillClass="fill-zinc-900 dark:fill-zinc-200"
        @click="onReset"
      />
      <m-svg-icon
        name="close"
        class="ml-2 w-3 h-3 p-0.5 rounded-sm duration-300 cursor-pointer hover:bg-zinc-200 dark:hover:bg-zinc-900"
        fillClass="fill-zinc-900 dark:fill-zinc-200"
        @click="onClose"
      />
    </div>
    <div id="captcha"></div>
  </div>
</template>

<script>
const EMITS_CLOSE = 'close'
const EMITS_SUCCESS = 'success'
</script>

<script setup>
import '@/vendor/SliderCaptcha/longbow.slidercaptcha.min.js'
import '@/vendor/SliderCaptcha/slidercaptcha.min.css'
import { getCaptcha } from '@/api/sys'
import { onMounted } from 'vue'

const emits = defineEmits([EMITS_CLOSE, EMITS_SUCCESS])

let captcha = null

onMounted(() => {
  captcha = sliderCaptcha({
    id: 'captcha',
    // 拼图成功后的回调
    async onSuccess(arr) {
      const res = await getCaptcha({ behavior: arr })
      res && emits(EMITS_SUCCESS)
    },
    // 拼图失败后的回调
    onFail() {
      console.log('onFail')
    },
    // 默认的验证方法，不在此处进行验证，而是选择在用户拼图成功之后进行验证，所以此处永远返回为 true
    verify() {
      return true
    }
  })
})

// 重置
const onReset = () => {
  captcha && captcha.reset()
}

// 关闭
const onClose = () => {
  captcha && emits(EMITS_CLOSE)
}
</script>
