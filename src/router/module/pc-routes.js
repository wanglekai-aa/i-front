import publicRoutes from './public-routes'

export default [
  {
    path: '/',
    name: 'main',
    component: () => import('@/views/layout/LayoutVIew.vue'),
    children: [
      {
        path: '',
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
      }
    ]
  },
  ...publicRoutes
]
