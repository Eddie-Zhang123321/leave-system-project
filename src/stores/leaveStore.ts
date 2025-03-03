import { defineStore } from 'pinia'
import { useUserStore } from './userStore' // 引入 userStore

export const useLeaveStore = defineStore('leave', {
  state: () => ({
    leaveRecords: [] as Array<{
      // 请假记录
      id: number
      reason: string // 请假原因
      startDate: string // 开始日期
      endDate: string // 结束日期
      status: 'pending' | 'approved' | 'rejected' // 请假状态
    }>,
    isLoading: false, // 是否正在加载
    error: null as string | null, // 错误信息
  }),
  actions: {
    // 获取当前学生的请假记录
    async fetchLeaveRecords() {
      const userStore = useUserStore()
      if (!userStore.isLoggedIn || !userStore.id) {
        this.error = '用户未登录或用户ID无效'
        return
      }

      this.isLoading = true
      this.error = null

      try {
        // 模拟 API 调用，获取当前学生的请假记录
        const response = await fetch(`/api/leave-records?studentId=${userStore.id}`)
        const data = await response.json()
        this.leaveRecords = data
      } catch (error) {
        this.error = '获取请假记录失败'
        console.error('获取请假记录失败', error)
      } finally {
        this.isLoading = false
      }
    },

    // 提交请假申请
    async submitLeaveApplication(leaveData: {
      reason: string // 请假原因
      startDate: string // 开始日期
      endDate: string // 结束日期
    }) {
      const userStore = useUserStore()
      if (!userStore.isLoggedIn || !userStore.id) {
        this.error = '用户未登录或用户ID无效'
        return
      }

      this.isLoading = true
      this.error = null

      try {
        // 模拟 API 调用
        const response = await fetch('/api/leave', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            ...leaveData,
            studentId: userStore.id, // 关联当前学生
          }),
        })
        const newRecord = await response.json()
        this.leaveRecords.push(newRecord) // 更新本地记录
      } catch (error) {
        this.error = '提交请假申请失败'
        console.error('提交请假申请失败', error)
      } finally {
        this.isLoading = false
      }
    },

    // 撤销请假申请（学生只能撤销自己的请假申请）
    async cancelLeaveApplication(leaveId: number) {
      const userStore = useUserStore()
      if (!userStore.isLoggedIn || !userStore.id) {
        this.error = '用户未登录或用户ID无效'
        return
      }

      this.isLoading = true
      this.error = null

      try {
        // 模拟 API 调用
        await fetch(`/api/leave/${leaveId}/cancel`, {
          method: 'DELETE',
        })

        // 更新本地记录
        this.leaveRecords = this.leaveRecords.filter((record) => record.id !== leaveId)
      } catch (error) {
        this.error = '撤销请假申请失败'
        console.error('撤销请假申请失败', error)
      } finally {
        this.isLoading = false
      }
    },
  },
})
