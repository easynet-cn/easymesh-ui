<template>
  <div :class="classes">
    <slot></slot>
  </div>
</template>
<script lang="ts">
import { computed, defineComponent, PropType, toRefs } from 'vue'

const prefixCls = 'ivu-btn-group'

export default defineComponent({
  name: 'ButtonGroup',
  props: {
    size: {
      type: String as PropType<'small' | 'large' | 'default'>,
      default: 'default'
    },
    shape: {
      type: String as PropType<'circle' | 'circle-outline'>
    },
    vertical: {
      type: Boolean,
      default: false
    }
  },
  setup(props) {
    const { size, shape, vertical } = toRefs(props)

    const classes = computed(() => {
      return [
        `${prefixCls}`,
        {
          [`${prefixCls}-${size.value}`]: !!size.value,
          [`${prefixCls}-${shape?.value}`]: !!shape?.value,
          [`${prefixCls}-vertical`]: vertical.value
        }
      ]
    })

    return {
      classes
    }
  }
})
</script>
