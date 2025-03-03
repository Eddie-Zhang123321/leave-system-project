<template>
  <div class="home-page">
    <!-- 顶部导航栏 -->
    <el-header class="navbar">
      <h2>学生管理系统</h2>
      <div class="user-info">
        <img src="@/assets/avatar.jpg" alt="头像" class="avatar" />
        <span class="student-name">{{ userName }}</span>
        <el-button @click="handleLogout">退出登录</el-button>
      </div>
    </el-header>

    <!-- 主体内容 -->
    <el-container class="main-content">
      <!-- 左侧导航栏 -->
      <el-aside width="200px" class="sidebar">
        <el-menu default-active="1" class="el-menu-vertical-demo" router>
          <el-menu-item index="/apply-leave">
            <i class="el-icon-edit"></i>
            <template #title>提交请假申请</template>
          </el-menu-item>
          <el-menu-item index="/leave-records">
            <i class="el-icon-document"></i>
            <template #title>查看请假记录</template>
          </el-menu-item>
          <el-menu-item index="/profile">
            <i class="el-icon-user"></i>
            <template #title>修改个人信息</template>
          </el-menu-item>
        </el-menu>
      </el-aside>

      <!-- 右侧展示区 -->
      <el-main class="content">
        <!-- 请假统计 -->
        <el-card class="stats">
          <h3>请假统计</h3>
          <p>本月请假次数：{{ leaveStats.monthlyCount }}</p>
          <p>剩余假期天数：{{ leaveStats.remainingDays }}</p>
        </el-card>

        <!-- 通知公告 -->
        <el-card class="notices">
          <h3>通知公告</h3>
          <ul>
            <li v-for="notice in notices" :key="notice.id">{{ notice.content }}</li>
          </ul>
        </el-card>

        <!-- 最近请假记录 -->
        <el-card class="recent-leaves">
          <h3>最近请假记录</h3>
          <el-table :data="recentLeaves" style="width: 100%">
            <el-table-column prop="date" label="日期" />
            <el-table-column prop="reason" label="原因" />
            <el-table-column prop="status" label="状态" />
          </el-table>
        </el-card>
      </el-main>
    </el-container>
  </div>
</template>

<script lang="ts">
import { defineComponent, toRefs, ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { useUserStore } from '@/stores/userStore.ts';
import axios from 'axios'; // 导入 axios

export default defineComponent({
  name: 'HomePage',
  setup() {
    const userStore = useUserStore();
    // 修改为正确的属性名 userName
    const { userName } = toRefs(userStore);
    const router = useRouter();

    // 定义 notices 为响应式变量
    const notices = ref<{ id: number; content: string }[]>([]);

    // 在组件挂载时获取通知数据
    onMounted(async () => {
      try {
        const response = await axios.get('http://127.0.0.1:4523/m2/5935405-5622867-default/265785294'); // 替换为你的 API 接口
        notices.value = response.data; // 假设接口返回的数据格式为 [{ id: 1, content: '通知一' }, ...]
      } catch (error) {
        console.error('获取通知数据失败:', error);
      }
    });

    // 其他数据
    const leaveStats = ref({ monthlyCount: 0, remainingDays: 0 });
    const fetchLeaveStats = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:4523/m1/5949162-5637165-default/api/leave-stats');
        leaveStats.value = response.data;
      } catch (error) {
        console.error('获取请假统计数据失败:', error);
      }
    };
    const recentLeaves = ref([]); // 使用 ref 来定义响应式数据

    const fetchRecentLeaves = async () => {
      try {
        const { data } = await axios.get('http://127.0.0.1:4523/m1/5949162-5637165-default/api/recent-leaves'); // 解构赋值
        recentLeaves.value = data; // 更新响应式数据
      } catch (error) {
        console.error('获取最近请假记录失败:', error);
      }
    };

    // 调用函数以获取数据
    fetchLeaveStats();
    fetchRecentLeaves();


    return {
      userName,
      leaveStats,
      notices,
      recentLeaves,
      handleLogout: () => {
        console.log('用户已注销');
        router.replace('/user-login');
      },
    };
  },
});
</script>

<style scoped>
.user-info {
  display: flex;
  /* 启用 Flexbox 布局 */
  align-items: center;
  /* 垂直居中对齐 */
  gap: 10px;
  /* 设置元素之间的间距 */
}

.avatar {
  width: 40px;
  /* 设置头像宽度 */
  height: 40px;
  /* 设置头像高度 */
  border-radius: 50%;
  /* 将头像变为圆形 */
  object-fit: cover;
  /* 保持图片比例，填充整个容器 */
}

.student-name {
  font-size: 16px;
  /* 设置字体大小 */
  font-weight: bold;
  /* 设置字体加粗 */
  margin-right: 10px;
  /* 设置右边距 */
}

.el-button {
  margin-left: auto;
  /* 将按钮推到最右边 */
}


.navbar {
  background-color: #409eff;
  color: white;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 20px;
}

.nav-links .student-name {
  margin-right: 20px;
}

.main-content {
  height: calc(100vh - 60px);
}

.sidebar {
  background-color: #d3dce6;
}

.stats,
.notices,
.recent-leaves {
  margin-bottom: 20px;
}

.stats h3,
.notices h3,
.recent-leaves h3 {
  margin-top: 0;
}

.el-table th,
.el-table td {
  text-align: center;
}
</style>
