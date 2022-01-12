<template>
  <div :class="classes">
    <div class="ivu-list-header" v-if="header || $slots.header">
      <slot name="header">{{ header }}</slot>
    </div>
    <div class="ivu-list-container">
      <ul class="ivu-list-items">
        <slot></slot>
      </ul>
    </div>
    <Spin v-if="loading" fix size="large">
      <slot name="spin"></slot>
    </Spin>
    <div class="ivu-list-footer" v-if="footer || $slots.footer">
      <slot name="footer">{{ footer }}</slot>
    </div>
  </div>
</template>
<script lang="ts">
import { computed, defineComponent, getCurrentInstance, provide, PropType, toRefs } from 'vue'

const prefixCls = 'ivu-list'

export default defineComponent({
  name: 'List',
  props: {
    border: {
      type: Boolean,
      default: false
    },
    itemLayout: {
      type: String as PropType<'horizontal' | 'vertical'>,
      default: 'horizontal'
    },
    // 或 slot
    header: {
      type: String,
      default: ''
    },
    // 或 slot
    footer: {
      type: String,
      default: ''
    },
    // 含 slot: spin
    loading: {
      type: Boolean,
      default: false
    },
    size: {
      type: String as PropType<'small' | 'large' | 'default'>,
      default: 'default'
    },
    split: {
      type: Boolean,
      default: true
    }
  },
  setup(props) {
    provide('ListInstance', getCurrentInstance())

    const { border, itemLayout, size, split } = toRefs(props)

    const classes = computed(() => {
      return [
        `${prefixCls}`,
        `${prefixCls}-${size.value}`,
        `${prefixCls}-${itemLayout.value}`,
        {
          [`${prefixCls}-bordered`]: border.value,
          [`${prefixCls}-split`]: split.value
        }
      ]
    })

    return {
      classes
    }
  }
})
</script>
