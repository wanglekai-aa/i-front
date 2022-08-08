// import loginIndex from '@/views/login-register/login/loginIndex.vue'
// import registerIndex from '@/views/login-register/register/registerIndex.vue'

export default [
  {
    path: '/pins/:id',
    name: 'pins',
    component: () => import('@/views/pins/pinsIndex.vue')
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/login-register/login/loginIndex.vue')
  },
  {
    path: '/register',
    name: 'register',
    component: () => import('@/views/login-register/register/registerIndex.vue')
  }
]
