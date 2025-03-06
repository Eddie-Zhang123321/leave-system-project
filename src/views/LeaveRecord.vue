<template>
  <div class="leave-record">
    <h2>{{ userName }}所有请假记录</h2>
    <el-main class="content">
      <!-- 所有请假记录 -->
      <el-card class="all-leaves">
        <el-table :data="allLeaves" style="width: 100%">
          <el-table-column prop="date" label="日期" width="180"></el-table-column>
          <el-table-column prop="reason" label="原因" width="180"></el-table-column>
          <el-table-column prop="status" label="状态"></el-table-column>
        </el-table>
        <!-- 分页 -->
        <el-pagination background layout="prev, pager, next" :total="totalRecords" :page-size="pageSize"
          :current-page="currentPage" @current-change="handlePageChange" />
      </el-card>
    </el-main>
  </div>
</template>

<script lang="ts">
import { ref, onMounted, toRefs } from 'vue';
import axios from 'axios';
import { useUserStore } from '@/stores/userStore.ts';
export default {
  name: 'LeaveRecord',
  setup() {
    const userStore = useUserStore();
    const { userName } = toRefs(userStore);
    // 所有请假记录
    const allLeaves = ref([]);
    // 分页相关数据
    const totalRecords = ref(0); // 总记录数
    const pageSize = ref(5); // 每页显示条数
    const currentPage = ref(1); // 当前页码

    // 获取所有请假记录
    const fetchAllLeaves = async () => {
      try {
        const response = await axios.post('http://127.0.0.1:4523/m1/5949162-5637165-default/api/leave-records', {
          page: currentPage.value,
          pageSize: pageSize.value,
        }, {
          headers: {
            'Content-Type': 'application/json',
          },
        });
        allLeaves.value = response.data.data; // 当前页的数据
        totalRecords.value = response.data.total; // 总记录数
      } catch (error) {
        console.error('获取所有请假记录失败:', error);
      }
    };

    // 处理页码变化
    const handlePageChange = (page: number) => {
      currentPage.value = page;
      fetchAllLeaves();
    };

    // 在组件挂载时获取数据
    onMounted(() => {
      fetchAllLeaves();
    });

    // 返回模板中需要使用的数据
    return {
      userName,
      allLeaves,
      totalRecords,
      pageSize,
      currentPage,
      handlePageChange,
    };
  },
};
</script>

<style scoped>
.leave-record {
  max-width: 1200px;
  margin: 20px auto;
  padding: 20px;
  background-color: #ffffff;
  border-radius: 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.leave-record h2 {
  margin-bottom: 20px;
  font-size: 24px;
  color: #333;
  text-align: center;
}

.all-leaves {
  margin-bottom: 20px;
}

.all-leaves h3 {
  margin-bottom: 16px;
  font-size: 20px;
  color: #333;
}

.el-table {
  margin-bottom: 20px;
}

.el-pagination {
  margin-top: 20px;
  justify-content: center;
}
</style>
