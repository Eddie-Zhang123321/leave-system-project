<template>
  <div class="apply-leave">
    <h2>提交请假申请</h2>
    <form @submit.prevent="handleSubmit">
      <div>
        <label>姓名：</label>
        <input v-model="form.name" type="text" placeholder="请输入姓名" required />
        <p v-if="errors.name" class="error-small">{{ errors.name }}</p>
      </div>
      <div>
        <label>请假原因：</label>
        <textarea v-model="form.reason" placeholder="请输入请假原因" required />
        <p v-if="errors.reason" class="error-small">{{ errors.reason }}</p>
      </div>
      <div>
        <label>请假时间：</label>
        <input v-model="form.date" type="date" required />
        <p v-if="errors.date" class="error-small">{{ errors.date }}</p>
      </div>
      <button type="submit">提交</button>
    </form>
    <p><router-link to="/home-page">返回主页</router-link></p>
    <p v-if="message" class="message">{{ message }}</p>
  </div>
</template>

<script lang="ts">
import { reactive, ref } from 'vue';
import { useRouter } from 'vue-router';

export default {
  name: 'ApplyLeave',
  setup() {
    const router = useRouter();

    // 表单数据
    const form = reactive({
      name: '',
      reason: '',
      date: '',
    });

    // 错误信息
    const errors = reactive({
      name: '',
      reason: '',
      date: '',
    });

    // 提交成功或失败的消息
    const message = ref('');

    // 表单验证
    const validateForm = () => {
      let isValid = true;

      if (!form.name) {
        errors.name = '姓名不能为空';
        isValid = false;
      } else {
        errors.name = '';
      }

      if (!form.reason) {
        errors.reason = '请假原因不能为空';
        isValid = false;
      } else {
        errors.reason = '';
      }

      if (!form.date) {
        errors.date = '请假时间不能为空';
        isValid = false;
      } else {
        errors.date = '';
      }

      return isValid;
    };

    // 提交申请
    const handleSubmit = async () => {
      if (validateForm()) {
        try {
          // 发送提交请求
          const response = await fetch('http://127.0.0.1:4523/m1/5949162-5637165-default/api/user/apply-leave', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              name: form.name,
              reason: form.reason,
              date: form.date,
            }),
          });

          // 解析响应数据
          const result = await response.json();
          if (result.code === 0) {
            // 提交成功，显示消息并跳转
            message.value = '请假申请已提交！';
            setTimeout(() => {
              router.replace('/home-page');
            }, 2000);
          } else {
            // 提交失败，显示错误信息
            message.value = result.msg || '提交失败，请重试';
          }
        } catch (error) {
          console.error('提交请求失败', error);
          message.value = '提交请求失败，请检查网络连接';
        }
      }
    };

    // 返回模板中需要使用的数据和方法
    return {
      form,
      errors,
      message,
      handleSubmit,
    };
  },
};
</script>

<style scoped>
.apply-leave {
  max-width: 400px;
  margin: 50px auto;
  padding: 2rem;
  background-color: #ffffff;
  border-radius: 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  text-align: center;
}

.apply-leave h2 {
  margin-bottom: 1.5rem;
  font-size: 1.75rem;
  color: #333;
}

.apply-leave form div {
  margin-bottom: 1.5rem;
  text-align: left;
}

.apply-leave label {
  display: block;
  margin-bottom: 0.5rem;
  font-weight: 500;
  color: #555;
}

.apply-leave input,
.apply-leave textarea {
  width: 100%;
  padding: 0.75rem;
  border: 1px solid #ddd;
  border-radius: 5px;
  font-size: 1rem;
  transition: border-color 0.3s ease;
}

.apply-leave input:focus,
.apply-leave textarea:focus {
  border-color: #007bff;
  outline: none;
}

.apply-leave button {
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

.apply-leave button:hover {
  background-color: #0056b3;
}

.apply-leave p {
  margin-top: 1rem;
  color: #666;
}

.apply-leave a {
  color: #007bff;
  text-decoration: none;
}

.apply-leave a:hover {
  text-decoration: underline;
}

.message {
  color: #28a745;
  margin-top: 1rem;
}

.error-small {
  color: #ff4444;
  font-size: 0.75rem;
  margin-top: 0.25rem;
}
</style>
