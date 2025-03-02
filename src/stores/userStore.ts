import { defineStore } from 'pinia'

export const useUserStore = defineStore('user', {
  state: () => ({
    isLoggedIn: false, // 用户是否登录
    username: '', // 当前用户
  }),
  actions: {
    // 登录
    login(username: string) {
      this.isLoggedIn = true
      this.username = username
    },
    // 登出
    logout() {
      this.isLoggedIn = false
      this.username = ''
    },
  },
})
