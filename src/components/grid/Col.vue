<template>
  <div :class="classes" :style="styles">
    <slot></slot>
  </div>
</template>
<script lang="ts">
import { computed, defineComponent, inject, PropType, ref, toRefs } from 'vue'

const prefixCls = 'ivu-col'

function parseFlex(flex: string | number) {
  if (typeof flex === 'number') {
    return `${flex} ${flex} auto`
  }

  if (/^\d+(\.\d+)?(px|em|rem|%)$/.test(flex)) {
    return `0 0 ${flex}`
  }

  return flex
}

export default defineComponent({
  name: 'iCol',
  props: {
    span: [Number, String] as PropType<number | string>,
    order: [Number, String] as PropType<number | string>,
    offset: [Number, String] as PropType<number | string>,
    push: [Number, String] as PropType<number | string>,
    pull: [Number, String] as PropType<number | string>,
    className: String,
    xs: [Number, Object],
    sm: [Number, Object],
    md: [Number, Object],
    lg: [Number, Object],
    xl: [Number, Object],
    xxl: [Number, Object],
    // 4.5.0
    flex: {
      type: [Number, String] as PropType<number | string>,
      default: ''
    }
  },
  setup(props, ctx) {
    const { span, order, offset, push, pull, className, flex } = toRefs(props)

    const row: any = inject('Row')

    const gutter = ref(row.ctx.gutter)

    const classes = computed(() => {
      const classList = [
        `${prefixCls}`,
        {
          [`${prefixCls}-span-${span?.value}`]: span?.value,
          [`${prefixCls}-order-${order?.value}`]: order?.value,
          [`${prefixCls}-offset-${offset?.value}`]: offset?.value,
          [`${prefixCls}-push-${push?.value}`]: push?.value,
          [`${prefixCls}-pull-${pull?.value}`]: pull?.value,
          [`${className?.value}`]: !!className?.value
        }
      ];

      ['xs', 'sm', 'md', 'lg', 'xl', 'xxl'].forEach(size => {
        if (typeof props[size] === 'number') {
          classList.push(`${prefixCls}-span-${size}-${props[size]}`)
        } else if (typeof props[size] === 'object') {
          const ps = props[size]
          Object.keys(ps).forEach(prop => {
            classList.push(
              prop !== 'span'
                ? `${prefixCls}-${size}-${prop}-${ps[prop]}`
                : `${prefixCls}-span-${size}-${ps[prop]}`
            )
          })
        }
      })

      return classList
    })
    const styles = computed(() => {
      let style: any = {}

      if (gutter.value !== 0) {
        style = {
          paddingLeft: gutter.value / 2 + 'px',
          paddingRight: gutter.value / 2 + 'px'
        }
      }

      // 4.5.0
      if (flex.value) {
        style.flex = parseFlex(flex.value)
      }

      return style
    })

    return {
      gutter,
      classes,
      styles
    }
  }
})
</script>
