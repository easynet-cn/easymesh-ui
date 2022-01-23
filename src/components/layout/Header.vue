<template>
  <div :class="wrapClasses">
    <slot></slot>
  </div>
</template>
<script lang="ts">
import { computed, defineComponent } from 'vue'

const prefixCls = 'ivu-layout'

export default defineComponent({
  name: 'Header',
  setup() {
    const wrapClasses = computed(() => {
      return `${prefixCls}-header`
    })

    return {
      wrapClasses
    }
  }
})
</script>
