<template>
  <i :class="classes" :style="styles" @click="handleClick"></i>
</template>
<script lang="ts">
import { computed, defineComponent, toRefs } from 'vue'
import type { CSSProperties } from 'vue'

const prefixCls = 'ivu-icon'

export default defineComponent({
  name: 'Icon',
  props: {
    type: {
      type: String,
      default: ''
    },
    size: [Number, String],
    color: String,
    custom: {
      type: String,
      default: ''
    }
  },
  emits: ['click'],
  setup(props, ctx) {
    const { type, size, color, custom } = toRefs(props)

    const classes = computed(() => {
      return [
        `${prefixCls}`,
        {
          [`${prefixCls}-${type.value}`]: type.value !== '',
          [`${custom.value}`]: custom.value !== ''
        }
      ]
    })

    const styles = computed(() => {
      const style: CSSProperties = {}

      if (size) {
        style['font-size'] = `${size.value}px`
      }

      if (color) {
        style.color = color.value
      }

      return style
    })

    const handleClick = (evt: any) => {
      ctx.emit('click', evt)
    }

    return {
      handleClick,
      classes,
      styles
    }
  }
})
</script>
