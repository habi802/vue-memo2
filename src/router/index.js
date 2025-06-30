import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('@/views/Home.vue'),
    },
    {
      path: '/add',
      name: 'MemoAdd',
      component: () => import('@/views/Form.vue'),
    },
    {
      path: '/mod/:memoId',
      name: 'MemoDetail',
      component: () => import('@/views/Form.vue'),
    }
  ],
})

export default router
