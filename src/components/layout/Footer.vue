<template>
  <div :class="wrapClasses">
    <slot></slot>
  </div>
</template>
<script lang="ts">
import { computed, defineComponent } from 'vue'

const prefixCls = 'ivu-layout'

export default defineComponent({
  name: 'Footer',
  setup() {
    const wrapClasses = computed(() => {
      return `${prefixCls}-footer`
    })

    return {
      wrapClasses
    }
  }
})
</script>
