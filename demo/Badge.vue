
<template>
    <div>
        <Badge :count="3">
            <a href="#" class="demo-badge"></a>
        </Badge>
        <Badge>
            <a href="#" class="demo-badge" style="margin-left: 32px"></a>
            <template v-slot:count>
                <Icon type="md-time" color="#ed4014" size="16" />
            </template>
        </Badge>
    </div>
    <div>
        <Badge dot>
            <a href="#" class="demo-badge"></a>
        </Badge>
        <Badge dot>
            <Icon type="ios-notifications-outline" size="26"></Icon>
        </Badge>
        <Badge dot>
            <a href="#">可以是一个链接</a>
        </Badge>
    </div>
    <div>
        <Badge :count="100">
            <a href="#" class="demo-badge"></a>
        </Badge>
        <Badge :count="1000" overflow-count="999">
            <a href="#" class="demo-badge"></a>
        </Badge>
    </div>
    <div>
        <Badge :count="10"></Badge>
        <Badge :count="20" class-name="demo-badge-alone"></Badge>
    </div>
    <div>
        <Badge text="new">
            <a href="#" class="demo-badge"></a>
        </Badge>
        <Badge text="hot">
            <a href="#" class="demo-badge"></a>
        </Badge>
    </div>
    <div>
        <Badge status="success" />
        <Badge status="error" />
        <Badge status="default" />
        <Badge status="processing" />
        <Badge status="warning" />
        <br />
        <Badge status="success" text="Success" />
        <br />
        <Badge status="error" text="Error" />
        <br />
        <Badge status="default" text="Default" />
        <br />
        <Badge status="processing" text="Processing" />
        <br />
        <Badge status="warning" text="Warning" />
    </div>
    <div>
        <strong>Presets:</strong>
        <br />
        <Badge color="blue" text="blue" />
        <Badge color="green" text="green" />
        <Badge color="red" text="red" />
        <Badge color="yellow" text="yellow" />
        <Badge color="pink" text="pink" />
        <Badge color="magenta" text="magenta" />
        <Badge color="volcano" text="volcano" />
        <Badge color="orange" text="orange" />
        <Badge color="gold" text="gold" />
        <Badge color="lime" text="lime" />
        <Badge color="cyan" text="cyan" />
        <Badge color="geekblue" text="geekblue" />
        <Badge color="purple" text="purple" />
        <br />
        <strong>Custom:</strong>
        <br />
        <Badge color="#2db7f5" text="#2db7f5" />
        <Badge color="#f50" text="#f50" />
    </div>
    <div>
        <Badge :count="5" type="primary">
            <a href="#" class="demo-badge"></a>
        </Badge>
        <Badge :count="5" type="success">
            <a href="#" class="demo-badge"></a>
        </Badge>
        <Badge :count="5" type="normal">
            <a href="#" class="demo-badge"></a>
        </Badge>
        <Badge :count="5" type="info">
            <a href="#" class="demo-badge"></a>
        </Badge>
        <Badge :count="5" type="error">
            <a href="#" class="demo-badge"></a>
        </Badge>
        <Badge :count="5" type="warning">
            <a href="#" class="demo-badge"></a>
        </Badge>
    </div>
</template>

<script setup lang="ts">
import Badge from '../src/components/badge';
import Icon from '../src/components/icon';

</script>

<style scoped>
.demo-badge {
    width: 42px;
    height: 42px;
    background: #eee;
    border-radius: 6px;
    display: inline-block;
}
.demo-badge-alone {
    background: #5cb85c !important;
}
</style>