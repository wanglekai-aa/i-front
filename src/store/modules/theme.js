import { THEME_LIGHT } from '@/constants'

export default {
  namespaced: true,
  state: () => {
    return {
      themeType: THEME_LIGHT
    }
  },
  mutations: {
    // 切换主体模式
    changeThemeType(state, newTheme) {
      state.themeType = newTheme
    }
  }
}
