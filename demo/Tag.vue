<template>
    <div>
        <Tag>标签一</Tag>
        <Tag>标签二</Tag>
        <Tag v-if="show" closable @on-close="handleClose">标签三</Tag>
    </div>
    <div>
        <Tag type="border">标签三</Tag>
        <Tag type="border" closable>标签四</Tag>
        <Tag type="dot">标签一</Tag>
        <Tag type="dot" closable>标签二</Tag>
    </div>
    <div>
        <Tag color="default">default</Tag>
        <Tag color="primary">primary</Tag>
        <Tag color="success">success</Tag>
        <Tag color="error">error</Tag>
        <Tag color="warning">warning</Tag>
        <Tag color="magenta">magenta</Tag>
        <Tag color="red">red</Tag>
        <Tag color="volcano">volcano</Tag>
        <Tag color="orange">orange</Tag>
        <Tag color="gold">gold</Tag>
        <Tag color="yellow">yellow</Tag>
        <Tag color="lime">lime</Tag>
        <Tag color="green">green</Tag>
        <Tag color="cyan">cyan</Tag>
        <Tag color="blue">blue</Tag>
        <Tag color="geekblue">geekblue</Tag>
        <Tag color="purple">purple</Tag>
        <Tag color="#FFA2D3">Custom Color</Tag>
        <br />
        <br />
        <Tag type="border" closable color="primary">标签一</Tag>
        <Tag type="border" closable color="success">标签二</Tag>
        <Tag type="border" closable color="error">标签三</Tag>
        <Tag type="border" closable color="warning">标签四</Tag>
        <br />
        <br />
        <Tag type="dot" closable color="primary">标签一</Tag>
        <Tag type="dot" closable color="success">标签二</Tag>
        <Tag type="dot" closable color="error">标签三</Tag>
        <Tag type="dot" closable color="warning">标签四</Tag>
    </div>
    <div>
        <Tag checkable color="primary">标签一</Tag>
        <Tag checkable color="success">标签二</Tag>
        <Tag checkable color="error">标签三</Tag>
        <Tag checkable color="warning">标签四</Tag>
    </div>
    <div>
        <Tag
            v-for="item in count"
            :key="item"
            :name="item"
            closable
            @on-close="handleClose2"
        >标签{{ item + 1 }}</Tag>
        <Button icon="ios-add" type="dashed" size="small" @click="handleAdd">添加标签</Button>
    </div>
    <div>
        <Tag>Default Tag</Tag>
        <Tag size="medium">Medium Tag</Tag>
        <Tag size="large">Large Tag</Tag>
    </div>
</template>
<script setup lang="ts">
import { ref, reactive } from 'vue'
import Button from '../src/components/button'
import Tag from '../src/components/tag'

const show = ref(true);

const handleClose = () => {
    show.value = false;
}

const count = reactive([0, 1, 2])

const handleAdd = () => {

}
const handleClose2 = () => {

}
</script>