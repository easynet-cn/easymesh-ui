<template>
  <div :class="classes">
    <slot></slot>
  </div>
</template>
<script lang="ts">
import { defineComponent, computed, provide, toRefs } from 'vue'
const prefixCls = 'ivu-breadcrumb'

export default defineComponent({
  name: 'Breadcrumb',
  props: {
    separator: {
      type: String,
      default: '/'
    }
  },
  setup(props) {
    const { separator } = toRefs(props)

    provide('separator', separator)

    const classes = computed(() => {
      return `${prefixCls}`
    })

    return {
      classes
    }
  }
})
</script>
