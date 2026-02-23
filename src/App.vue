<template>
  <div class="app-wrapper">
    <Header />
    
    <router-view></router-view>
    
    <Footer />
  </div>
</template>

<script setup lang="ts">
import Header from './components/Header.vue'
import Footer from './components/Footer.vue'
</script>

<style>
/* 全局基础重置样式 */
body, html {
  margin: 0;
  padding: 0;
  background-color: #fff;
  font-family: "Helvetica Neue", Helvetica, "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", "\5FAE\8F6F\96C5\9ED1", Arial, sans-serif, SimSun;
  /* 【新增】字体抗锯齿，让文字更细腻平滑 */
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

.app-wrapper {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}
</style>