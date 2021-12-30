<template>
    <div style="height: 1000px;">
        <div>
            <Affix>
                <span class="demo-affix">Fixed at the top</span>
            </Affix>
        </div>
        <div>
            <Affix :offset-top="50">
                <span class="demo-affix">Fixed at the top 50px from the top</span>
            </Affix>
        </div>
        <div>
            <Affix :offset-bottom="20">
                <span class="demo-affix">Fix at the bottom 20px</span>
            </Affix>
        </div>
        <div>
            <Affix :offset-top="100">
                <span class="demo-affix">Fix the position at the top of 100px at the top</span>
            </Affix>
        </div>
    </div>
</template>
<script setup lang="ts">
import Affix from '../src/components/affix';
</script>
<style>
.demo-affix {
    display: inline-block;
    color: #fff;
    padding: 10px 30px;
    text-align: center;
    background: rgba(0, 153, 229, 0.9);
}
</style>