<template>
  <div :class="classes">
    <span v-if="hasSlot" :class="slotClasses">
      <slot></slot>
    </span>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, PropType, toRefs } from 'vue'

const prefixCls = 'ivu-divider'

export default defineComponent({
  name: 'Divider',
  props: {
    type: {
      type: String as PropType<'horizontal' | 'vertical'>,
      default: 'horizontal'
    },
    orientation: {
      type: String as PropType<'left' | 'right' | 'center'>,
      default: 'center'
    },
    dashed: {
      type: Boolean,
      default: false
    },
    size: {
      type: String as PropType<'small' | 'default'>,
      default: 'default'
    },
    // 4.5.0
    plain: {
      type: Boolean,
      default: false
    }
  },
  setup(props, ctx) {
    const { type, orientation, dashed, size, plain } = toRefs(props)

    const hasSlot = computed(() => {
      return !!ctx.slots.default
    })
    const classes = computed(() => {
      return [
        `${prefixCls}`,
        `${prefixCls}-${type.value}`,
        `${prefixCls}-${size.value}`,
        {
          [`${prefixCls}-with-text`]: hasSlot.value && orientation.value === 'center',
          [`${prefixCls}-with-text-${orientation.value}`]: hasSlot.value,
          [`${prefixCls}-dashed`]: !!dashed.value,
          [`${prefixCls}-plain`]: plain.value
        }
      ]
    })
    const slotClasses = computed(() => {
      return [
        `${prefixCls}-inner-text`
      ]
    })

    return {
      hasSlot,
      classes,
      slotClasses
    }
  }
})
</script>
