<template>
    <div>
        <Breadcrumb>
            <BreadcrumbItem to="/">Home</BreadcrumbItem>
            <BreadcrumbItem to="/components/breadcrumb">Components</BreadcrumbItem>
            <BreadcrumbItem>Breadcrumb</BreadcrumbItem>
        </Breadcrumb>
    </div>
    <div>
        <Breadcrumb>
            <BreadcrumbItem to="/">
                <Icon type="ios-home-outline"></Icon>Home
            </BreadcrumbItem>
            <BreadcrumbItem to="/components/breadcrumb">
                <Icon type="logo-buffer"></Icon>Components
            </BreadcrumbItem>
            <BreadcrumbItem>
                <Icon type="ios-cafe"></Icon>Breadcrumb
            </BreadcrumbItem>
        </Breadcrumb>
    </div>
    <div>
        <Breadcrumb separator=">">
            <BreadcrumbItem to="/">Home</BreadcrumbItem>
            <BreadcrumbItem to="/components/breadcrumb">Components</BreadcrumbItem>
            <BreadcrumbItem>Breadcrumb</BreadcrumbItem>
        </Breadcrumb>
        <Breadcrumb separator="<b class='demo-breadcrumb-separator'>=></b>">
            <BreadcrumbItem to="/">Home</BreadcrumbItem>
            <BreadcrumbItem to="/components/breadcrumb">Components</BreadcrumbItem>
            <BreadcrumbItem>Breadcrumb</BreadcrumbItem>
        </Breadcrumb>
    </div>
</template>
<script setup lang="ts">
import BreadcrumbItem from '../src/components/breadcrumb-item/';
import Breadcrumb from '../src/components/breadcrumb/';
import Icon from '../src/components/icon';
</script>
<style>
.demo-breadcrumb-separator {
    color: #ff5500;
    padding: 0 5px;
}
</style>