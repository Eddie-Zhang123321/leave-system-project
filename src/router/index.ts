import { createRouter, createWebHistory } from 'vue-router'
import UserLogin from '@/views/UserLogin.vue'
import HomePage from '@/views/HomePage.vue'
import ApplyLeave from '@/views/ApplyLeave.vue'
import { useUserStore } from '@/stores/userStore' // 引入 Pinia Store
import UserRegister from '@/views/UserRegister.vue'

const routes = [
  { path: '/', redirect: '/user-login' }, // 默认跳转到登录页面
  { path: '/user-login', component: UserLogin },
  { path: '/user-register', component: UserRegister },
  {
    path: '/home-page',
    component: HomePage,
    meta: { requiresAuth: true }, // 需要登录
  },
  {
    path: '/apply-leave',
    component: ApplyLeave,
    meta: { requiresAuth: true }, // 需要登录
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

// 路由守卫
router.beforeEach((to, from, next) => {
  const userStore = useUserStore() // 获取 Store
  if (to.meta.requiresAuth && !userStore.isLoggedIn) {
    next('/user-login') // 未登录则跳转到登录页
  } else {
    next() // 已登录则继续
  }
})

export default router
