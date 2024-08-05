import { createRouter, createWebHistory } from 'vue-router'

import SearchItems from '../views/SearchItemsView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: SearchItems
    },
    {
      path: '/search/:title',
      name: 'searchItem',
      component: () => import('../views/ItemView.vue')
    }
  ]
})

export default router
