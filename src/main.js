import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { useRem } from '@/utils/flexible'
import mLibs from './libs'
import './styles/index.scss'

useRem()

createApp(App).use(mLibs).use(router).mount('#app')
