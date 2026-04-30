import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/login',
      name: 'Login',
      component: () => import('@/views/login/index.vue')
    },
    {
      path: '/register',
      name: 'Register',
      component: () => import('@/views/register/index.vue')
    },
    {
      path: '/',
      name: 'Layout',
      component: () => import('@/layout/index.vue'),
      children: [
        {
          path: '',
          name: 'Home',
          component: () => import('@/views/home/index.vue')
        },
        {
          path: 'book-detail/:id',
          name: 'BookDetail',
          component: () => import('@/views/book-detail/index.vue')
        },
        {
          path: 'search',
          name: 'Search',
          component: () => import('@/views/search/index.vue')
        },
        {
          path: 'my-lend',
          name: 'MyLend',
          component: () => import('@/views/my-lend/index.vue')
        },
        {
          path: 'profile',
          name: 'Profile',
          component: () => import('@/views/profile/index.vue')
        },
        {
          path: 'message',
          name: 'Message',
          component: () => import('@/views/message/index.vue')
        },
        {
          path: 'message-detail/:id',
          name: 'MessageDetail',
          component: () => import('@/views/message/message-detail.vue')
        }
      ]
    }
  ]
})

export default router
