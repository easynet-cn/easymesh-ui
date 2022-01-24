<template>
  <div :class="classes" :style="styles">
    <slot></slot>
  </div>
</template>
<script lang="ts">
import { computed, defineComponent, getCurrentInstance, PropType, provide, toRefs } from 'vue'

const prefixCls = 'ivu-row'

export default defineComponent({
  name: 'Row',
  props: {
    // todo 4.5.0 已无效，强制 flex
    type: {
      type: String as PropType<'flex'>
    },
    align: {
      type: String as PropType<'top' | 'middle' | 'bottom'>
    },
    justify: {
      type: String as PropType<'start' | 'end' | 'center' | 'space-around' | 'space-between'>
    },
    gutter: {
      type: Number,
      default: 0
    },
    className: String,
    // 4.5.0
    wrap: {
      type: Boolean,
      default: true
    }
  },
  setup(props) {
    const { type, align, justify, gutter, className, wrap } = toRefs(props)

    provide('Row', getCurrentInstance())

    const classes = computed(() => {
      return [
        // todo 4.5.0 已无效，强制 flex
        `${prefixCls}`,
        {
          [`${prefixCls}-${type?.value}`]: !!type?.value,
          [`${prefixCls}-${type?.value}-${align?.value}`]: !!align?.value,
          [`${prefixCls}-${type?.value}-${justify?.value}`]: !!justify?.value,
          [`${prefixCls}-${align?.value}`]: !!align?.value,
          [`${prefixCls}-${justify?.value}`]: !!justify?.value,
          [`${className?.value}`]: !!className?.value,
          [`${prefixCls}-no-wrap`]: !wrap.value
        }
      ]
    })
    const styles = computed(() => {
      let style: any = {}
      if (gutter.value !== 0) {
        style = {
          marginLeft: gutter.value / -2 + 'px',
          marginRight: gutter.value / -2 + 'px'
        }
      }

      return style
    })

    return {
      classes,
      styles
    }
  }
})
</script>
