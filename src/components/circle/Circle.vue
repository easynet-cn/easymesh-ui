<template>
  <div :style="circleSize" :class="wrapClasses">
    <svg viewBox="0 0 100 100">
      <defs v-if="showDefs">
        <linearGradient :id="id" x1="100%" y1="0%" x2="0%" y2="0%">
          <stop offset="0%" :stop-color="strokeColor[0]" />
          <stop offset="100%" :stop-color="strokeColor[1]" />
        </linearGradient>
      </defs>
      <path
        :d="pathString"
        :stroke="trailColor"
        :stroke-width="trailWidth"
        :fill-opacity="0"
        :style="trailStyle"
        :stroke-linecap="strokeLinecap"
      />
      <path
        :d="pathString"
        :stroke-linecap="strokeLinecap"
        :stroke="strokeValue"
        :stroke-width="computedStrokeWidth"
        fill-opacity="0"
        :style="pathStyle"
      />
    </svg>
    <div :class="innerClasses">
      <slot></slot>
    </div>
  </div>
</template>
<script lang="ts">
import { computed, defineComponent, PropType, ref, toRefs } from 'vue'

import random from '../../utils/random_str'

const prefixCls = 'ivu-chart-circle'

export default defineComponent({
  name: 'iCircle',
  props: {
    percent: {
      type: Number,
      default: 0
    },
    size: {
      type: Number,
      default: 120
    },
    strokeWidth: {
      type: Number,
      default: 6
    },
    strokeColor: {
      type: [String, Array],
      default: '#2d8cf0'
    },
    strokeLinecap: {
      type: String as PropType<'square' | 'round'>,
      default: 'round'
    },
    trailWidth: {
      type: Number,
      default: 5
    },
    trailColor: {
      type: String,
      default: '#eaeef2'
    },
    dashboard: {
      type: Boolean,
      default: false
    }
  },
  setup(props, ctx) {
    const { percent, size, strokeWidth, strokeColor, strokeLinecap, trailWidth, trailColor, dashboard } = toRefs(props)

    const id = ref(`ivu-chart-circle-${random(3)}`)

    const circleSize = computed(() => {
      return {
        width: `${size.value}px`,
        height: `${size.value}px`
      }
    })
    const computedStrokeWidth = computed(() => {
      return percent.value === 0 && dashboard.value ? 0 : strokeWidth.value
    })
    const radius = computed(() => {
      return 50 - strokeWidth.value / 2
    })
    const pathString = computed(() => {
      if (dashboard.value) {
        return `M 50,50 m 0,${radius.value}
                    a ${radius.value},${radius.value} 0 1 1 0,-${2 * radius.value}
                    a ${radius.value},${radius.value} 0 1 1 0,${2 * radius.value}`
      } else {
        return `M 50,50 m 0,-${radius.value}
                    a ${radius.value},${radius.value} 0 1 1 0,${2 * radius.value}
                    a ${radius.value},${radius.value} 0 1 1 0,-${2 * radius.value}`
      }
    })
    const len = computed(() => {
      return Math.PI * 2 * radius.value
    })
    const trailStyle = computed(() => {
      const style = {}
      return dashboard.value ? {
        'stroke-dasharray': `${len.value - 75}px ${len.value}px`,
        'stroke-dashoffset': `-${75 / 2}px`,
        transition: 'stroke-dashoffset .3s ease 0s, stroke-dasharray .3s ease 0s, stroke .3s'
      } : {}
    })
    const pathStyle = computed(() => {
      return dashboard.value ? {
        'stroke-dasharray': `${(percent.value / 100) * (len.value - 75)}px ${len.value}px`,
        'stroke-dashoffset': `-${75 / 2}px`,
        transition: 'stroke-dashoffset .3s ease 0s, stroke-dasharray .6s ease 0s, stroke .6s, stroke-width .06s ease .6s'
      } : {
        'stroke-dasharray': `${len.value}px ${len.value}px`,
        'stroke-dashoffset': `${((100 - percent.value) / 100 * len.value)}px`,
        transition: 'stroke-dashoffset 0.6s ease 0s, stroke 0.6s ease'
      }
    })
    const wrapClasses = computed(() => {
      return `${prefixCls}`
    })
    const innerClasses = computed(() => {
      return `${prefixCls}-inner`
    })
    const strokeValue = computed(() => {
      return (typeof strokeColor.value !== 'string') ? `url(#${id.value})` : strokeColor.value
    })
    const showDefs = computed(() => {
      return typeof strokeColor.value !== 'string'
    })

    return {
      id,
      circleSize,
      computedStrokeWidth,
      radius,
      pathString,
      len,
      trailStyle,
      pathStyle,
      wrapClasses,
      innerClasses,
      strokeValue,
      showDefs
    }
  }
})
</script>
