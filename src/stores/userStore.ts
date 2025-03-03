import { defineStore } from 'pinia';

export const useUserStore = defineStore('user', {
  state: () => ({
    isLoggedIn: false, // 用户是否登录
    id: null as number | null, // 用户 ID
    name: '', // 用户名称
    token: '', // JWT 令牌
    userName: '', // 用户名
  }),
  actions: {
    // 登录
    login(userData: { id: number; name: string; token: string; userName: string }) {
      this.isLoggedIn = true;
      this.id = userData.id;
      this.name = userData.name;
      this.token = userData.token;
      this.userName = userData.userName;

      // 将登录状态持久化到 localStorage
      localStorage.setItem('user', JSON.stringify(this.$state));
    },
    // 登出
    logout() {
      this.isLoggedIn = false;
      this.id = null;
      this.name = '';
      this.token = '';
      this.userName = '';

      // 清除 localStorage 中的登录状态
      localStorage.removeItem('user');
    },
    // 初始化时从 localStorage 恢复登录状态
    initialize() {
      const storedUser = localStorage.getItem('user');
      if (storedUser) {
        const userState = JSON.parse(storedUser);
        this.isLoggedIn = userState.isLoggedIn;
        this.id = userState.id;
        this.name = userState.name;
        this.token = userState.token;
        this.userName = userState.userName; // 确保字段名称一致
      }
    },
  },
});
