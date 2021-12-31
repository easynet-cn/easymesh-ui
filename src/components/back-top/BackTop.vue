<template>
    <div :class="classes" :style="styles" @click="back">
        <slot>
            <div :class="innerClasses">
                <i class="ivu-icon ivu-icon-ios-arrow-up"></i>
            </div>
        </slot>
    </div>
</template>
<script lang="ts">
import { computed, defineComponent, onBeforeUnmount, onMounted, ref, toRefs } from 'vue'
import { scrollTop } from '../../utils/assist'
import { on, off } from '../../utils/dom'

const prefixCls = 'ivu-back-top'

export default defineComponent({
  name: 'BackTop',
  props: {
    height: {
      type: Number,
      default: 400
    },
    bottom: {
      type: Number,
      default: 30
    },
    right: {
      type: Number,
      default: 30
    },
    duration: {
      type: Number,
      default: 1000
    }
  },
  setup (props, ctx) {
    const { height, bottom, right, duration } = toRefs(props)
    const backTop = ref(false)

    const classes = computed(() => {
      return [
                    `${prefixCls}`,
                    {
                      [`${prefixCls}-show`]: backTop.value
                    }
      ]
    })
    const styles = computed(() => {
      return {
        bottom: `${bottom.value}px`,
        right: `${right.value}px`
      }
    })
    const innerClasses = computed(() => {
      return `${prefixCls}-inner`
    })
    const handleScroll = () => {
      backTop.value = window.pageYOffset >= height.value
    }
    const back = () => {
      const sTop = document.documentElement.scrollTop || document.body.scrollTop
      scrollTop(window, sTop, 0, duration.value)
      ctx.emit('on-click')
    }

    onMounted(() => {
      on(window, 'scroll', handleScroll)
      on(window, 'resize', handleScroll)
    })

    onBeforeUnmount(() => {
      off(window, 'scroll', handleScroll)
      off(window, 'resize', handleScroll)
    })

    return {
      classes,
      styles,
      innerClasses,
      handleScroll,
      back
    }
  }
})
</script>
