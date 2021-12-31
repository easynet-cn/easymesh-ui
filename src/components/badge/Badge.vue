<template>
  <span v-if="dot" :class="classes" ref="badge">
    <slot></slot>
    <sup :class="dotClasses" :style="styles" v-show="badge"></sup>
  </span>
  <span v-else-if="status || color" :class="classes" class="ivu-badge-status" ref="badge">
    <span :class="statusClasses" :style="statusStyles"></span>
    <span class="ivu-badge-status-text">
      <slot name="text">{{ text }}</slot>
    </span>
  </span>
  <span v-else :class="classes" ref="badge">
    <slot></slot>
    <sup v-if="showCountSlot" :style="styles" :class="customCountClasses">
      <slot name="count"></slot>
    </sup>
    <sup v-else-if="hasCount" :style="styles" :class="countClasses" v-show="badge">
      <slot name="text">{{ finalCount }}</slot>
    </sup>
  </span>
</template>
<script lang="ts">
import { defineComponent, computed, PropType, toRefs } from 'vue'

const initColorList = ['blue', 'green', 'red', 'yellow', 'pink', 'magenta', 'volcano', 'orange', 'gold', 'lime', 'cyan', 'geekblue', 'purple']
const prefixCls = 'ivu-badge'

export default defineComponent({
  name: 'Badge',
  props: {
    count: Number,
    dot: {
      type: Boolean,
      default: false
    },
    overflowCount: {
      type: [Number, String],
      default: 99
    },
    className: String,
    showZero: {
      type: Boolean,
      default: false
    },
    text: {
      type: String,
      default: ''
    },
    status: {
      type: String as PropType<'success' | 'processing' | 'default' | 'error' | 'warning'>
    },
    type: {
      type: String as PropType<'success' | 'primary' | 'normal' | 'error' | 'warning' | 'info'>
    },
    offset: {
      type: Array
    },
    color: {
      type: String
    }
  },
  setup(props, ctx) {
    const { count, dot, overflowCount, className, showZero, text, status, type, offset, color } = toRefs(props)

    const classes = computed(() => {
      return `${prefixCls}`
    })

    const dotClasses = computed(() => {
      return `${prefixCls}-dot`
    })

    const alone = computed(() => {
      return ctx.slots.default === undefined
    })

    const countClasses = computed(() => {
      return [
        `${prefixCls}-count`,
        {
          [`${className?.value}`]: !!className?.value,
          [`${prefixCls}-count-alone`]: alone.value,
          [`${prefixCls}-count-${type?.value}`]: !!type?.value
        }
      ]
    })

    const customCountClasses = computed(() => {
      return [
        `${prefixCls}-count`,
        `${prefixCls}-count-custom`,
        {
          [`${className?.value}`]: !!className?.value
        }
      ]
    })

    const statusClasses = computed(() => {
      return [
        `${prefixCls}-status-dot`,
        {
          [`${prefixCls}-status-${status?.value}`]: !!status?.value,
          [`${prefixCls}-status-${color?.value}`]: !!color?.value && initColorList.includes(color?.value)
        }
      ]
    })

    const statusStyles = computed(() => {
      return color?.value && initColorList.includes(color?.value) ? {} : { backgroundColor: color?.value }
    })

    const styles = computed(() => {
      if (offset?.value && offset.value.length === 2) {
        return {
          'margin-top': `${offset.value[0]}px`,
          'margin-right': `${offset.value[1]}px`
        }
      }
      return {}
    })

    const finalCount = computed(() => {
      if (text.value !== '') return text.value

      return count?.value && count?.value >= (parseInt(overflowCount.value as string) ?? overflowCount.value) ? `${overflowCount.value}+` : count?.value
    })

    const badge = computed(() => {
      let status = false

      if (count?.value) {
        status = !(count.value === 0)
      }

      if (dot.value) {
        status = true
        if (count?.value !== null) {
          if (count?.value === 0) {
            status = false
          }
        }
      }

      if (text.value !== '') status = true

      return status || showZero.value
    })

    const hasCount = computed(() => {
      if (count?.value || text.value !== '') return true
      if (showZero.value && count?.value === 0) return true
      else return false
    })

    const showCountSlot = computed(() => {
      return ctx.slots.count !== undefined
    })

    return {
      classes,
      dotClasses,
      alone,
      countClasses,
      customCountClasses,
      statusClasses,
      statusStyles,
      styles,
      finalCount,
      badge,
      hasCount,
      showCountSlot
    }
  }
})
</script>
