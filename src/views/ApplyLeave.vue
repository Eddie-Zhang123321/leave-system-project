<template>
  <div class="apply-leave">
    <h2>提交请假申请</h2>
    <form @submit.prevent="handleSubmit">
      <div>
        <label>姓名：</label>
        <input v-model="name" type="text" placeholder="请输入姓名" required />
      </div>
      <div>
        <label>请假原因：</label>
        <textarea v-model="reason" placeholder="请输入请假原因" required />
      </div>
      <div>
        <label>请假时间：</label>
        <input v-model="date" type="date" required />
      </div>
      <button type="submit">提交</button>
    </form>
    <p><router-link to="/home-page">返回主页</router-link></p>
    <p v-if="message" class="message">{{ message }}</p>
  </div>
</template>

<script lang="ts">
export default {
  name: 'ApplyLeave',
  data() {
    return {
      name: '',
      reason: '',
      date: '',
      message: '',
    };
  },
  methods: {
    handleSubmit() {
      // 模拟提交逻辑
      this.message = '请假申请已提交！';
      setTimeout(() => {
        this.$router.push('/home-page');
      }, 2000);
    },
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
</style>
