import publicRoutes from './public-routes'

export default [
  {
    path: '/',
    name: 'home',
    component: () => import('@/views/main/mainIndex.vue')
  },
  {
    path: '/profile',
    name: 'profile',
    component: () => import('@/views/profile/profileIndex.vue'),
    meta: {
      user: true
    }
  },
  {
    path: '/member',
    name: 'member',
    component: () => import('@/views/member/index.vue'),
    meta: {
      user: true // 需要登录才可以访问
    }
  },
  ...publicRoutes
]
