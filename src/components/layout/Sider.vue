<template>
  <div :class="wrapClasses" :style="wrapStyles">
    <span v-show="showZeroTrigger" @click="toggleCollapse" :class="zeroWidthTriggerClasses">
      <i class="ivu-icon ivu-icon-ios-menu"></i>
    </span>
    <div :class="childClasses">
      <slot></slot>
    </div>
    <slot name="trigger">
      <div
        v-show="showBottomTrigger"
        :class="triggerClasses"
        @click="toggleCollapse"
        :style="{ width: siderWidth + 'px' }"
      >
        <i :class="triggerIconClasses"></i>
      </div>
    </slot>
  </div>
</template>
<script lang="ts">
import { computed, defineComponent, onMounted, PropType, ref, toRefs, watch } from 'vue'

import { on, off } from '../../utils/dom'
import { dimensionMap, setMatchMedia } from '../../utils/assist'

const prefixClass = 'ivu-layout-sider'

setMatchMedia()

export default defineComponent({
  name: 'Sider',
  props: {
    value: { // if it's collpased now
      type: Boolean,
      default: false
    },
    width: {
      type: [Number, String] as PropType<number | string>,
      default: 200
    },
    collapsedWidth: {
      type: [Number, String] as PropType<number | string>,
      default: 64
    },
    hideTrigger: {
      type: Boolean,
      default: false
    },
    breakpoint: {
      type: String as PropType<'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'xxl'>
    },
    collapsible: {
      type: Boolean,
      default: false
    },
    defaultCollapsed: {
      type: Boolean,
      default: false
    },
    reverseArrow: {
      type: Boolean,
      default: false
    }
  },
  emits: ['input', 'on-collapse', 'update:value'],
  setup(props, ctx) {
    const { value, width, collapsedWidth, hideTrigger, breakpoint, collapsible, defaultCollapsed, reverseArrow } = toRefs(props)

    const prefixCls = ref(prefixClass)
    const mediaMatched = ref(false)

    const siderWidth = computed(() => {
      return collapsible.value ? (value.value ? (mediaMatched.value ? 0 : parseInt(collapsedWidth.value.toString())) : parseInt(width.value.toString())) : width.value
    })
    const wrapClasses = computed(() => {
      return [
        `${prefixCls.value}`,
        siderWidth.value ? '' : `${prefixCls.value}-zero-width`,
        value.value ? `${prefixCls.value}-collapsed` : ''
      ]
    })
    const wrapStyles = computed(() => {
      return {
        width: `${siderWidth.value}px`,
        minWidth: `${siderWidth.value}px`,
        maxWidth: `${siderWidth.value}px`,
        flex: `0 0 ${siderWidth.value}px`
      }
    })
    const triggerClasses = computed(() => {
      return [
        `${prefixCls.value}-trigger`,
        value.value ? `${prefixCls.value}-trigger-collapsed` : ''
      ]
    })
    const childClasses = computed(() => {
      return `${prefixCls.value}-children`
    })
    const zeroWidthTriggerClasses = computed(() => {
      return [
        `${prefixCls.value}-zero-width-trigger`,
        reverseArrow.value ? `${prefixCls.value}-zero-width-trigger-left` : ''
      ]
    })
    const triggerIconClasses = computed(() => {
      return [
        'ivu-icon',
        `ivu-icon-ios-arrow-${reverseArrow.value ? 'forward' : 'back'}`,
        `${prefixCls.value}-trigger-icon`
      ]
    })
    const showZeroTrigger = computed(() => {
      if (collapsible.value) {
        return (mediaMatched.value && !hideTrigger.value) || ((parseInt(collapsedWidth.value.toString()) === 0) && value.value && !hideTrigger.value)
      }

      return false
    })
    const showBottomTrigger = computed(() => {
      return collapsible.value ? !mediaMatched.value && !hideTrigger.value : false
    })

    const toggleCollapse = () => {
      const val = collapsible.value ? !value.value : false
      ctx.emit('input', val)
      ctx.emit('update:value', val)
    }
    const matchMedia = () => {
      let matchMedia
      if (window.matchMedia) {
        matchMedia = window.matchMedia
      }
      const mediaMatchedVal = mediaMatched.value

      mediaMatched.value = breakpoint?.value !== undefined && matchMedia !== undefined && matchMedia(`(max-width: ${dimensionMap[breakpoint?.value]})`).matches

      if (mediaMatched.value !== mediaMatchedVal) {
        ctx.emit('input', mediaMatched.value)
      }
    }
    const onWindowResize = () => {
      matchMedia()
    }

    watch(value, (stat) => {
      ctx.emit('on-collapse', stat)
    })

    onMounted(() => {
      if (defaultCollapsed.value) {
        ctx.emit('input', defaultCollapsed.value)
      }
      if (breakpoint?.value !== undefined) {
        on(window, 'resize', onWindowResize)
        matchMedia()
      }
    })
    onMounted(() => {
      if (breakpoint?.value !== undefined) {
        off(window, 'resize', onWindowResize)
      }
    })

    return {
      prefixCls,
      mediaMatched,
      siderWidth,
      wrapClasses,
      wrapStyles,
      triggerClasses,
      childClasses,
      zeroWidthTriggerClasses,
      triggerIconClasses,
      showZeroTrigger,
      showBottomTrigger,
      toggleCollapse,
      matchMedia,
      onWindowResize
    }
  }
})
</script>
