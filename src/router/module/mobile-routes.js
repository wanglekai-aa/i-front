import publicRoutes from './public-routes'

export default [
  {
    path: '/',
    name: 'home',
    component: () => import('@/views/main/mainIndex.vue')
  },
  ...publicRoutes
]
