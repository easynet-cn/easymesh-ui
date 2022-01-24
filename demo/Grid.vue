<template>
    <div>
        <Row>
            <Col span="12">col-12</Col>
            <Col span="12">col-12</Col>
        </Row>
        <br />
        <Row>
            <Col span="8">col-8</Col>
            <Col span="8">col-8</Col>
            <Col span="8">col-8</Col>
        </Row>
        <br />
        <Row>
            <Col span="6">col-6</Col>
            <Col span="6">col-6</Col>
            <Col span="6">col-6</Col>
            <Col span="6">col-6</Col>
        </Row>
    </div>
    <div>
        <Row :gutter="16">
            <Col span="6">
                <div>col-6</div>
            </Col>
            <Col span="6">
                <div>col-6</div>
            </Col>
            <Col span="6">
                <div>col-6</div>
            </Col>
            <Col span="6">
                <div>col-6</div>
            </Col>
        </Row>
    </div>
    <div>
        <Row>
            <Col span="18" push="6">col-18 | push-6</Col>
            <Col span="6" pull="18">col-6 | pull-18</Col>
        </Row>
    </div>
    <div>
        <Row>
            <Col span="8">col-8</Col>
            <Col span="8" offset="8">col-8 | offset-8</Col>
        </Row>
        <br />
        <Row>
            <Col span="6" offset="8">col-6 | offset-8</Col>
            <Col span="6" offset="4">col-6 | offset-4</Col>
        </Row>
        <br />
        <Row>
            <Col span="12" offset="8">col-12 | offset-8</Col>
        </Row>
    </div>
    <div>
        <p>子元素向左排列</p>
        <Row type="flex" justify="start" class="code-row-bg">
            <Col span="4">col-4</Col>
            <Col span="4">col-4</Col>
            <Col span="4">col-4</Col>
            <Col span="4">col-4</Col>
        </Row>
        <p>子元素向右排列</p>
        <Row type="flex" justify="end" class="code-row-bg">
            <Col span="4">col-4</Col>
            <Col span="4">col-4</Col>
            <Col span="4">col-4</Col>
            <Col span="4">col-4</Col>
        </Row>
        <p>子元素居中排列</p>
        <Row type="flex" justify="center" class="code-row-bg">
            <Col span="4">col-4</Col>
            <Col span="4">col-4</Col>
            <Col span="4">col-4</Col>
            <Col span="4">col-4</Col>
        </Row>
        <p>子元素等宽排列</p>
        <Row type="flex" justify="space-between" class="code-row-bg">
            <Col span="4">col-4</Col>
            <Col span="4">col-4</Col>
            <Col span="4">col-4</Col>
            <Col span="4">col-4</Col>
        </Row>
        <p>子元素分散排列</p>
        <Row type="flex" justify="space-around" class="code-row-bg">
            <Col span="4">col-4</Col>
            <Col span="4">col-4</Col>
            <Col span="4">col-4</Col>
            <Col span="4">col-4</Col>
        </Row>
    </div>
    <div>
        <p>顶部对齐</p>
        <Row type="flex" justify="center" align="top" class="code-row-bg">
            <Col span="4">
                <p style="height: 80px">col-4</p>
            </Col>
            <Col span="4">
                <p style="height: 30px">col-4</p>
            </Col>
            <Col span="4">
                <p style="height: 100px">col-4</p>
            </Col>
            <Col span="4">
                <p style="height: 60px">col-4</p>
            </Col>
        </Row>
        <p>底部对齐</p>
        <Row type="flex" justify="center" align="bottom" class="code-row-bg">
            <Col span="4">
                <p style="height: 80px">col-4</p>
            </Col>
            <Col span="4">
                <p style="height: 30px">col-4</p>
            </Col>
            <Col span="4">
                <p style="height: 100px">col-4</p>
            </Col>
            <Col span="4">
                <p style="height: 60px">col-4</p>
            </Col>
        </Row>
        <p>居中对齐</p>
        <Row type="flex" justify="center" align="middle" class="code-row-bg">
            <Col span="4">
                <p style="height: 80px">col-4</p>
            </Col>
            <Col span="4">
                <p style="height: 30px">col-4</p>
            </Col>
            <Col span="4">
                <p style="height: 100px">col-4</p>
            </Col>
            <Col span="4">
                <p style="height: 60px">col-4</p>
            </Col>
        </Row>
    </div>
    <div>
        <Divider size="small" orientation="left">Percentage columns</Divider>
        <Row>
            <Col flex="2">2 / 5</Col>
            <Col flex="3">3 / 5</Col>
        </Row>
        <Divider size="small" orientation="left">Fill rest</Divider>
        <Row>
            <Col flex="100px">100px</Col>
            <Col flex="auto">Fill Rest</Col>
        </Row>
        <Divider size="small" orientation="left">Raw flex style</Divider>
        <Row>
            <Col flex="1 1 200px">1 1 200px</Col>
            <Col flex="0 1 300px">0 1 300px</Col>
        </Row>
        <Row :wrap="false" style="margin-top: 16px">
            <Col flex="none">
                <div style="padding: 0 16px">none</div>
            </Col>
            <Col flex="auto">auto with no-wrap</Col>
        </Row>
    </div>
    <div>
        <Row>
            <Col :xs="2" :sm="4" :md="6" :lg="8">Col</Col>
            <Col :xs="20" :sm="16" :md="12" :lg="8">Col</Col>
            <Col :xs="2" :sm="4" :md="6" :lg="8">Col</Col>
        </Row>
    </div>
    <div>
        <Row>
            <Col :xs="{ span: 5, offset: 1 }" :lg="{ span: 6, offset: 2 }">Col</Col>
            <Col :xs="{ span: 11, offset: 1 }" :lg="{ span: 6, offset: 2 }">Col</Col>
            <Col :xs="{ span: 5, offset: 1 }" :lg="{ span: 6, offset: 2 }">Col</Col>
        </Row>
    </div>
</template>
<script setup lang="ts">
import Row from '../src/components/grid';
import Col from '../src/components/col';
import Divider from '../src/components/divider';
</script>