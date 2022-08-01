export default [
  {
    path: '/',
    name: 'home',
    component: () => import('@/views/main/mainIndex.vue')
  },
  {
    path: '/pins/:id',
    name: 'pins',
    component: () => import('@/views/pins/pinsIndex.vue')
  }
]
