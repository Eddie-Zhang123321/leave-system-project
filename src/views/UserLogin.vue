<template>
  <div class="user-login">
    <h2>学生请假系统登录</h2>
    <form @submit.prevent="handleLogin">
      <div>
        <label>用户名：</label>
        <input v-model="form.username" type="text" placeholder="请输入用户名" @blur="validateUsername" required />
        <p v-if="errors.username" class="error-small">{{ errors.username }}</p>
      </div>
      <div>
        <label>密码：</label>
        <input v-model="form.password" type="password" placeholder="请输入密码" @blur="validatePassword" required />
        <p v-if="errors.password" class="error-small">{{ errors.password }}</p>
      </div>
      <button type="submit">登录</button>
    </form>
    <p>没有账号？<router-link to="/user-register">立即注册</router-link></p>
  </div>
</template>

<script lang="ts">
import { reactive } from 'vue';
import { useUserStore } from '@/stores/userStore'; // 引入 Pinia Store
import { useRouter } from 'vue-router'; // 引入 Vue Router

export default {
  name: 'UserLogin',
  setup() {
    const userStore = useUserStore(); // 获取 Store
    const router = useRouter(); // 获取 Router
    const form = reactive({
      username: '',
      password: '',
    });
    const errors = reactive({
      username: '',
      password: '',
    });

    // 用户名验证
    const validateUsername = () => {
      if (!form.username) {
        errors.username = '用户名不能为空';
      } else if (!/^[a-zA-Z]/.test(form.username)) {
        errors.username = '用户名必须以字母开头';
      } else {
        errors.username = '';
      }
    };

    // 密码验证
    const validatePassword = () => {
      if (!form.password) {
        errors.password = '密码不能为空';
      } else if (form.password.length < 5 || form.password.length > 20) {
        errors.password = '密码长度必须为5-20位';
      } else {
        errors.password = '';
      }
    };

    // 登录逻辑
    const handleLogin = () => {
      validateUsername();
      validatePassword();
      if (!errors.username && !errors.password) {
        if (/^[a-zA-Z]/.test(form.username) && form.password.length >= 5 && form.password.length <= 20) {
          userStore.login(form.username); // 更新登录状态
          router.replace('/home-page'); // 跳转到主页
        }
      }
    };

    return {
      form,
      errors,
      handleLogin,
      validateUsername,
      validatePassword,
    };
  },
};
</script>

<style scoped>
.user-login {
  max-width: 400px;
  margin: 50px auto;
  padding: 2rem;
  background-color: #ffffff;
  border-radius: 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  text-align: center;
}

.user-login h2 {
  margin-bottom: 1.5rem;
  font-size: 1.75rem;
  color: #333;
}

.user-login form div {
  margin-bottom: 1.5rem;
  text-align: left;
}

.user-login label {
  display: block;
  margin-bottom: 0.5rem;
  font-weight: 500;
  color: #555;
}

.user-login input {
  width: 100%;
  padding: 0.75rem;
  border: 1px solid #ddd;
  border-radius: 5px;
  font-size: 1rem;
  transition: border-color 0.3s ease;
}

.user-login input:focus {
  border-color: #007bff;
  outline: none;
}

.user-login button {
  width: 100%;
  padding: 0.75rem;
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 5px;
  font-size: 1rem;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.user-login button:hover {
  background-color: #0056b3;
}



.user-login a {
  color: #007bff;
  text-decoration: none;
}

.user-login a:hover {
  text-decoration: underline;
}

.error-small {
  color: #ff4444;
  font-size: 0.75rem;
  margin-top: 0.25rem;
}
</style>
