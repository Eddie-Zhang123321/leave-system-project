<template>
  <div class="profile-container">
    <el-card class="profile-card">
      <h3>修改个人信息</h3>
      <el-form :model="formData" label-width="120px" ref="profileForm">
        <!-- 用户名（不可修改） -->
        <el-form-item label="用户名">
          <el-input v-model="formData.userName" disabled placeholder="用户名"></el-input>
        </el-form-item>

        <!-- 真实姓名 -->
        <el-form-item label="真实姓名">
          <el-input v-model="formData.realName" placeholder="请输入真实姓名"></el-input>
        </el-form-item>

        <!-- 性别 -->
        <el-form-item label="性别">
          <el-radio-group v-model="formData.gender">
            <el-radio label="男">男</el-radio>
            <el-radio label="女">女</el-radio>
          </el-radio-group>
        </el-form-item>

        <!-- 年龄 -->
        <el-form-item label="年龄">
          <el-input-number v-model="formData.age" :min="1" :max="100" placeholder="请输入年龄"></el-input-number>
        </el-form-item>

        <!-- 联系方式 -->
        <el-form-item label="联系方式">
          <el-input v-model="formData.phone" placeholder="请输入手机号"></el-input>
        </el-form-item>

        <!-- 邮箱 -->
        <el-form-item label="邮箱">
          <el-input v-model="formData.email" placeholder="请输入邮箱"></el-input>
        </el-form-item>

        <!-- 提交按钮 -->
        <el-form-item>
          <el-button type="primary" @click="handleSubmit">保存修改</el-button>
          <el-button @click="back">返回上一页</el-button>
        </el-form-item>

      </el-form>
    </el-card>
  </div>
</template>

<script setup lang="ts">
import { reactive, onMounted, ref } from 'vue';
import { useUserStore } from '@/stores/userStore'; // 引入 userStore
import { ElMessage } from 'element-plus';
import type { FormInstance } from 'element-plus'; // 引入 FormInstance 类型
import axios from 'axios';

const userStore = useUserStore();
const profileForm = ref<FormInstance | null>(null); // 明确类型为 FormInstance 或 null

// 表单数据绑定
const formData = reactive({
  userName: userStore.userName, // 从 userStore 获取用户名（不可修改）
  realName: userStore.name, // 真实姓名
  gender: userStore.gender as '' | '男' | '女', // 性别，确保类型匹配
  age: userStore.age, // 年龄
  phone: userStore.phone, // 联系方式
  email: userStore.email, // 邮箱
});

// 初始化表单数据
onMounted(() => {
  formData.realName = userStore.name; // 初始化真实姓名
});

// 提交表单
const handleSubmit = async () => {
  if (!profileForm.value) return; // 确保 profileForm.value 不为 null

  profileForm.value.validate(async (valid: boolean) => {
    if (valid) {
      try {
        // 转换性别值为接口规范的值
        const genderMap = {
          男: 1,    // 男生
          女: 0,    // 女生
          '': null, // 未定
        };

        // 构造请求数据
        const payload = {
          name: formData.realName,
          gender: genderMap[formData.gender] ?? null, // 转换性别值，如果未匹配则默认为 null
          age: formData.age,
          phone: formData.phone,
          email: formData.email,
        };

        // 发送请求
        const response = await axios.put('http://127.0.0.1:4523/m1/5949162-5637165-default/api/v1/user/profile', payload, {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': userStore.token
          },
        });

        // 处理响应
        if (response.data.code === 200) {
          // 更新 userStore 中的数据
          userStore.name = formData.realName;
          userStore.gender = formData.gender; // 这里可以保持前端原始值
          userStore.age = formData.age;
          userStore.phone = formData.phone;
          userStore.email = formData.email;

          // 提示保存成功
          ElMessage.success('个人信息已更新');
        } else {
          ElMessage.error(response.data.message || '更新失败');
        }
      } catch (error) {
        // 处理错误
        ElMessage.error('请求失败，请稍后重试');
        console.error('请求失败:', error);
      }
    } else {
      ElMessage.error('请填写完整信息');
    }
  });
};

// 返回上一页
const back = () => {
  window.history.back();
};
</script>

<style scoped>
.profile-container {
  display: flex;
  justify-content: center;
  padding: 20px;
}

.profile-card {
  width: 100%;
  max-width: 600px;
}

.el-form-item {
  margin-bottom: 20px;
}
</style>
