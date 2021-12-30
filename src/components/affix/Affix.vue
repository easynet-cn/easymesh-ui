<template>
    <div ref="root">
        <div ref="point" :class="classes" :style="styles">
            <slot></slot>
        </div>
        <div v-show="slot" :style="slotStyle"></div>
    </div>
</template>
<script lang="ts">
import { computed, defineComponent, nextTick, onBeforeUnmount, onMounted, ref, toRefs } from 'vue'
import { on, off } from '../../utils/dom'
const prefixCls = 'ivu-affix'

function getScroll (target: Window, top = false) {
  const prop = top ? 'pageYOffset' : 'pageXOffset'
  const method = top ? 'scrollTop' : 'scrollLeft'

  let ret = target[prop]

  if (typeof ret !== 'number') {
    ret = window.document.documentElement[method]
  }

  return ret
}

function getOffset (element: HTMLElement) {
  const rect = element.getBoundingClientRect()

  const scrollTop = getScroll(window, true)
  const scrollLeft = getScroll(window)

  const docEl = window.document.body
  const clientTop = docEl.clientTop || 0
  const clientLeft = docEl.clientLeft || 0

  return {
    top: rect.top + scrollTop - clientTop,
    left: rect.left + scrollLeft - clientLeft
  }
}

export default defineComponent({
  name: 'Affix',
  props: {
    offsetTop: {
      type: Number,
      default: 0
    },
    offsetBottom: {
      type: Number
    },
    useCapture: {
      type: Boolean,
      default: false
    }
  },
  emits: ['on-change'],
  setup (props, ctx) {
    const { offsetTop, offsetBottom, useCapture } = toRefs(props)
    const root = ref(null)
    const point = ref(null)
    const affix = ref(false)
    const styles = ref({})
    const slot = ref(false)
    const slotStyle = ref({})

    const offsetType = computed(() => {
      let type = 'top'
      if (offsetBottom?.value !== undefined && offsetBottom.value >= 0) {
        type = 'bottom'
      }

      return type
    })

    const classes = computed(() => {
      return [
        {
          [`${prefixCls}`]: affix.value
        }
      ]
    })

    const handleScroll = function () {
      const scrollTop = getScroll(window, true)
      const elOffset = getOffset(root.value!)
      const windowHeight = window.innerHeight
      const elHeight = (root.value! as HTMLElement).getElementsByTagName('div')[0].offsetHeight

      // Fixed Top
      if ((elOffset.top - offsetTop.value) < scrollTop && offsetType.value === 'top' && !affix.value) {
        affix.value = true
        slotStyle.value = {
          width: (point.value! as HTMLElement).clientWidth + 'px',
          height: (point.value! as HTMLElement).clientHeight + 'px'
        }
        slot.value = true
        styles.value = {
          top: `${offsetTop.value}px`,
          left: `${elOffset.left}px`,
          width: `${(root.value! as HTMLElement).offsetWidth}px`
        }

        ctx.emit('on-change', true)
      } else if ((elOffset.top - offsetTop.value) > scrollTop && offsetType.value === 'top' && affix) {
        slot.value = false
        slotStyle.value = {}
        affix.value = false
        styles.value = {}

        ctx.emit('on-change', false)
      }

      // Fixed Bottom
      if ((offsetBottom && offsetBottom.value && (elOffset.top + offsetBottom.value + elHeight) > (scrollTop + windowHeight)) && offsetType.value === 'bottom' && !affix.value) {
        affix.value = true
        styles.value = {
          bottom: `${offsetBottom?.value}px`,
          left: `${elOffset.left}px`,
          width: `${(root.value! as HTMLElement).offsetWidth}px`
        }

        ctx.emit('on-change', true)
      } else if (((offsetBottom && offsetBottom.value && (elOffset.top + offsetBottom.value + elHeight) < (scrollTop + windowHeight)) && offsetType.value === 'bottom' && affix)) {
        affix.value = false
        styles.value = {}

        ctx.emit('on-change', false)
      }
    }

    onMounted(() => {
      on(window, 'scroll', handleScroll, useCapture.value)
      on(window, 'resize', handleScroll, useCapture.value)

      nextTick(() => {
        handleScroll()
      })
    })

    onBeforeUnmount(() => {
      off(window, 'scroll', handleScroll, useCapture.value)
      off(window, 'resize', handleScroll, useCapture.value)
    })

    return {
      affix,
      styles,
      slot,
      slotStyle,
      offsetType,
      classes,
      root,
      point
    }
  }
})
</script>
