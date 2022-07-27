import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { useRem } from '@/utils/flexible'
import mLibs from './libs'
import store from './store'
import './styles/index.scss'
import 'virtual:svg-icons-register'

useRem()

createApp(App).use(mLibs).use(store).use(router).mount('#app')
