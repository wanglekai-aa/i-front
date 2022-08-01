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
        path: '/pins/:id',
        name: 'pins',
        component: () => import('@/views/pins/pinsIndex.vue')
      }
    ]
  }
]
