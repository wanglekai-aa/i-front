import { createStore } from 'vuex'
import getters from './getters'
import category from './modules/category'
import theme from './modules/theme'
import app from './modules/app'
import createPersistedState from 'vuex-persistedstate'

const store = createStore({
  getters,
  modules: {
    category,
    theme,
    app
  },
  plugins: [
    createPersistedState({
      key: 'i-front',
      path: ['category', 'theme']
    })
  ]
})

export default store
