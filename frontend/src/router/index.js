import { createRouter, createWebHistory } from 'vue-router'
import homeView from '@/views/homeView.vue'
import loginView from '@/views/loginView.vue'
import registerView from '@/views/registerView.vue'
import todoView from '@/views/todoView.vue'
import userView from '@/views/userView.vue'
import notFoundView from '@/views/notFoundView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'HomeView',
      component: homeView,
      meta: { requiresAuth: false },
    },
    {
      path: '/login',
      name: 'LoginView',
      component: loginView,
      meta: { requiresAuth: false },
    },
    {
      path: '/register',
      name: 'RegisterView',
      component: registerView,
      meta: { requiresAuth: false },
    },
    {
      path: '/todo',
      name: 'TodoView',
      component: todoView,
      meta: { requiresAuth: true },
    },
    {
      path: '/user',
      name: 'UserView',
      component: userView,
      meta: { requiresAuth: true },
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'NotFoundView',
      component: notFoundView,
      meta: { requiresAuth: false },
    },
  ],
})

export default router
