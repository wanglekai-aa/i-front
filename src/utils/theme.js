import store from '@/store'
import { watch } from 'vue'
import { THEME_DARK, THEME_LIGHT } from '@/constants'

// 初始化主题
export default () => {
  watch(
    () => store.getters.themeType,
    (val) => {
      let themeClass = ''
      switch (val) {
        case THEME_DARK:
          themeClass = 'dark'
          break
        case THEME_LIGHT:
          themeClass = 'light'
          break
      }
      document.querySelector('html').className = themeClass
    },
    { immediate: true }
  )
}
