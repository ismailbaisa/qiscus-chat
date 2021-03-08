import Vue from 'vue'
import VueRouter from 'vue-router'
import TheLogin from '../views/TheLogin.vue'
import { authGuard } from '../services/authGuards'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Login',
    component: TheLogin,
  },
  {
    path: '/dashboard',
    name: 'Chats',
    component: () => import('../views/Dashboard.vue'),
  },
  {
    path: '/new',
    name: 'New Chat',
    component: () => import('../views/NewChat.vue'),
  },
  {
    path: '/room',
    name: 'Chat Room',
    component: () => import('../views/ChatRoom.vue'),
  },
]

const router = new VueRouter({
  routes
})
router.beforeEach((to, from, next) => authGuard(to, from, next))

export default router
