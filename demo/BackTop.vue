<template>
    <div>
        <BackTop></BackTop>
    </div>
    <div>
        <BackTop :height="100" :bottom="200">
            <div class="top">返回顶端</div>
        </BackTop>
    </div>
    <div style="height:5000px;"></div>
</template>
<script setup lang="ts">
import BackTop from '../src/components/back-top';
</script>
<style scoped>
.top {
    padding: 10px;
    background: rgba(0, 153, 229, 0.7);
    color: #fff;
    text-align: center;
    border-radius: 2px;
}
</style>