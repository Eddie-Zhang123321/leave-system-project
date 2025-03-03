import { defineStore } from 'pinia';

export const useUserStore = defineStore('user', {
  state: () => ({
    isLoggedIn: false, // 用户是否登录
    id: null as number | null, // 用户 ID
    name: '', // 用户名称
    token: '', // JWT 令牌
    userName: '', // 用户名
    gender: '' as '男' | '女' | '', // 性别
    age: null as number | null, // 年龄
    phone: '', // 联系方式
    email: '', // 邮箱
  }),
  actions: {
    // 登录
    login(userData: {
      id: number;
      name: string;
      token: string;
      userName: string;
      gender?: '男' | '女';
      age?: number;
      phone?: string;
      email?: string;
    }) {
      this.isLoggedIn = true;
      this.id = userData.id;
      this.name = userData.name;
      this.token = userData.token;
      this.userName = userData.userName;
      this.gender = userData.gender || '';
      this.age = userData.age || null;
      this.phone = userData.phone || '';
      this.email = userData.email || '';

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
      this.gender = '';
      this.age = null;
      this.phone = '';
      this.email = '';

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
        this.userName = userState.userName;
        this.gender = userState.gender || '';
        this.age = userState.age || null;
        this.phone = userState.phone || '';
        this.email = userState.email || '';
      }
    },
    // 更新用户信息
    updateProfile(profileData: {
      name?: string;
      gender?: '男' | '女';
      age?: number;
      phone?: string;
      email?: string;
    }) {
      if (profileData.name !== undefined) this.name = profileData.name;
      if (profileData.gender !== undefined) this.gender = profileData.gender;
      if (profileData.age !== undefined) this.age = profileData.age;
      if (profileData.phone !== undefined) this.phone = profileData.phone;
      if (profileData.email !== undefined) this.email = profileData.email;

      // 更新 localStorage
      localStorage.setItem('user', JSON.stringify(this.$state));
    },
  },
});
