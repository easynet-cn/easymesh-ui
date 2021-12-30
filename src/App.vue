<script setup lang="ts">
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup
</script>
<template>
  <router-link to="/demo/avatar">avatar</router-link>
  <router-link to="/demo/badge">badge</router-link>
   <router-link to="/demo/breadcrumb">breadcrumb</router-link>
  <router-link to="/demo/icon">icon</router-link>
  <div>
    <router-view></router-view>
  </div>
</template>

<style>
#app {
  font-family: Helvetica Neue, Helvetica, PingFang SC, Hiragino Sans GB,
    Microsoft YaHei, \5fae软雅黑, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
  font-size: 14px;
  line-height: 1.5;
}
</style>