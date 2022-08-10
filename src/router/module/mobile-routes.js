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
  ...publicRoutes
]
