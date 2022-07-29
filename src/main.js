import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { useRem } from '@/utils/flexible'
import mLibs from './libs'
import store from './store'
import useTheme from '@/utils/theme'
import directives from './directives'
import './styles/index.scss'
import 'virtual:svg-icons-register'

useRem()
useTheme()

createApp(App).use(mLibs).use(store).use(directives).use(router).mount('#app')
