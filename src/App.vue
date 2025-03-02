<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script lang="ts">
export default {
  name: 'App',
};
</script>

<style>
body {
  padding: 20px;
  background-image: url('@/assets/bg.jpg');
  /* 背景图片路径 */
  background-size: cover;
  /* 图片覆盖整个区域 */
  background-position: center;
  /* 图片居中 */
  background-repeat: no-repeat;
  /* 防止图片重复 */
  min-height: 100vh;
  /* 确保 #app 高度占满整个视口 */
  font-family: 'Arial', sans-serif;
  margin: 0;
  padding: 0;
  background-color: #f8f9fa;
  color: #333;
}
</style>
