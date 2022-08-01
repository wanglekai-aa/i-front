import loginIndex from '@/views/login-register/login/loginIndex.vue'

export default [
  {
    path: '/pins/:id',
    name: 'pins',
    component: () => import('@/views/pins/pinsIndex.vue')
  },
  {
    path: '/login',
    name: 'login',
    component: loginIndex
  }
]
