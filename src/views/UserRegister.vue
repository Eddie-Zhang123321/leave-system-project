<template>
  <div class="user-register">
    <h2>学生请假系统注册</h2>
    <form @submit.prevent="handleRegister">
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
      <div>
        <label>确认密码：</label>
        <input v-model="form.confirmPassword" type="password" placeholder="请再次输入密码" @blur="validateConfirmPassword"
          required />
        <p v-if="errors.confirmPassword" class="error-small">{{ errors.confirmPassword }}</p>
      </div>
      <button type="submit">注册</button>
    </form>
    <p>已有账号？<router-link to="/user-login">立即登录</router-link></p>
  </div>
</template>

<script lang="ts">
import { reactive } from 'vue';
import { useRouter } from 'vue-router'; // 引入 Vue Router

export default {
  name: 'UserRegister',
  setup() {
    const router = useRouter(); // 获取 Router
    const form = reactive({
      username: '',
      password: '',
      confirmPassword: '',
    });
    const errors = reactive({
      username: '',
      password: '',
      confirmPassword: '',
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

    // 确认密码验证
    const validateConfirmPassword = () => {
      if (!form.confirmPassword) {
        errors.confirmPassword = '确认密码不能为空';
      } else if (form.confirmPassword !== form.password) {
        errors.confirmPassword = '两次输入的密码不一致';
      } else {
        errors.confirmPassword = '';
      }
    };

    // 表单验证
    const validateForm = () => {
      validateUsername();
      validatePassword();
      validateConfirmPassword();
      return !errors.username && !errors.password && !errors.confirmPassword;
    };

    // 注册逻辑
    const handleRegister = () => {
      if (validateForm()) {
        // 模拟注册逻辑
        console.log('注册成功', form);
        router.replace('/user-login'); // 跳转到登录页
      }
    };

    return {
      form,
      errors,
      handleRegister,
      validateUsername,
      validatePassword,
      validateConfirmPassword,
    };
  },
};
</script>

<style scoped>
.user-register {
  max-width: 400px;
  margin: 50px auto;
  padding: 2rem;
  background-color: #ffffff;
  border-radius: 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  text-align: center;
}

.user-register h2 {
  margin-bottom: 1.5rem;
  font-size: 1.75rem;
  color: #333;
}

.user-register form div {
  margin-bottom: 1.5rem;
  text-align: left;
}

.user-register label {
  display: block;
  margin-bottom: 0.5rem;
  font-weight: 500;
  color: #555;
}

.user-register input {
  width: 100%;
  padding: 0.75rem;
  border: 1px solid #ddd;
  border-radius: 5px;
  font-size: 1rem;
  transition: border-color 0.3s ease;
}

.user-register input:focus {
  border-color: #007bff;
  outline: none;
}

.user-register button {
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

.user-register button:hover {
  background-color: #0056b3;
}

.user-register p {
  margin-top: 1rem;
  color: #666;
}

.user-register a {
  color: #007bff;
  text-decoration: none;
}

.user-register a:hover {
  text-decoration: underline;
}

.error-small {
  color: #ff4444;
  font-size: 0.75rem;
  margin-top: 0.25rem;
}
</style>
