<template>
    <div>
        <Circle :percent="80">
            <span class="demo-Circle-inner" style="font-size:24px">80%</span>
        </Circle>
        <Circle :percent="100" stroke-color="#5cb85c">
            <Icon type="ios-checkmark" size="60" style="color:#5cb85c"></Icon>
        </Circle>
        <Circle :percent="35" stroke-color="#ff5500">
            <span class="demo-Circle-inner">
                <Icon type="ios-close" size="50" style="color:#ff5500"></Icon>
            </span>
        </Circle>
    </div>
    <div>
        <Circle :percent="80" dashboard>
            <span class="demo-circle-inner" style="font-size:24px">80%</span>
        </Circle>
    </div>
</template>

<script setup lang="ts">
import Circle from '../src/components/circle';
import Icon from '../src/components/icon';
</script>