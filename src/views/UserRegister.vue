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
import { useUserStore } from '@/stores/userStore';

export default {
  name: 'UserRegister',
  setup() {
    const userStore = useUserStore();
    const router = useRouter(); // 获取 Router

    // 表单数据
    const form = reactive({
      username: '',
      password: '',
      confirmPassword: '',
    });

    // 错误信息
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
    const handleRegister = async () => {
      if (validateForm()) {
        try {
          // 发送注册请求
          const response = await fetch('http://127.0.0.1:4523/m1/5949162-5637165-default/api/register', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              username: form.username,
              password: form.password,
            }),
          });

          // 解析响应数据
          const result = await response.json();
          if (result.code === 0) {
            // 注册成功，更新用户状态
            userStore.login({
              id: result.data.id,
              name: result.data.name,
              token: result.data.token,
              userName: result.data.userName,
            });
            console.log('注册成功');
            // 跳转到主页
            router.replace('/home-page');
          } else {
            // 注册失败，显示错误信息
            alert(result.msg || '注册失败，请重试');
          }
        } catch (error) {
          console.error('注册请求失败', error);
          alert('注册请求失败，请检查网络连接');
        }
      }
    };

    // 返回模板中需要使用的数据和方法
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
