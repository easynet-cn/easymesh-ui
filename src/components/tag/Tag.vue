<template>
  <transition name="fade" v-if="fade">
    <div :class="classes" @click.stop="check" :style="wraperStyles">
      <span :class="dotClasses" v-if="showDot" :style="bgColorStyle"></span>
      <span :class="textClasses" :style="textColorStyle">
        <slot></slot>
      </span>
      <Icon
        v-if="closable"
        :class="iconClass"
        :color="lineColor"
        type="ios-close"
        @click.stop="close"
      ></Icon>
    </div>
  </transition>
  <div v-else :class="classes" @click.stop="check" :style="wraperStyles">
    <span :class="dotClasses" v-if="showDot" :style="bgColorStyle"></span>
    <span :class="textClasses" :style="textColorStyle">
      <slot></slot>
    </span>
    <Icon
      v-if="closable"
      :class="iconClass"
      :color="lineColor"
      type="ios-close"
      @click.stop="close"
    ></Icon>
  </div>
</template>
<script lang="ts">
import { computed, defineComponent, PropType, ref, toRefs, watch } from 'vue'

import Icon from '../icon'

const prefixCls = 'ivu-tag'
const initColorList = ['default', 'primary', 'success', 'warning', 'error', 'blue', 'green', 'red', 'yellow', 'pink', 'magenta', 'volcano', 'orange', 'gold', 'lime', 'cyan', 'geekblue', 'purple']
const colorList = ['pink', 'magenta', 'volcano', 'orange', 'gold', 'lime', 'cyan', 'geekblue', 'purple']

export default defineComponent({
  name: 'Tag',
  components: { Icon },
  props: {
    closable: {
      type: Boolean,
      default: false
    },
    checkable: {
      type: Boolean,
      default: false
    },
    checked: {
      type: Boolean,
      default: true
    },
    color: {
      type: String as PropType<string>,
      default: 'default'
    },
    type: {
      type: String as PropType<'border' | 'dot'>
    },
    name: {
      type: [String, Number]
    },
    fade: {
      type: Boolean,
      default: true
    },
    // 4.0.0
    size: {
      type: String as PropType<'default' | 'medium' | 'large'>,
      default: 'default'
    }
  },
  emits: ['on-close', 'on-change'],
  setup(props, ctx) {
    const { closable, checkable, checked, color, type, name, size } = toRefs(props)

    const isChecked = ref(checked.value)

    const classes = computed(() => {
      return [
        `${prefixCls}`,
        `${prefixCls}-size-${size.value}`,
        {
          [`${prefixCls}-${color.value}`]: !!color.value && initColorList.includes(color.value),
          [`${prefixCls}-${type?.value}`]: !!type?.value,
          [`${prefixCls}-closable`]: closable.value,
          [`${prefixCls}-checked`]: isChecked.value
        }
      ]
    })
    const defaultTypeColor = computed(() => {
      return (type?.value !== 'dot' && type?.value !== 'border') ? (color.value !== undefined ? (initColorList.includes(color.value) ? '' : color.value) : '') : ''
    })
    const borderColor = computed(() => {
      return color.value !== undefined ? (color.value === 'default' ? '' : color.value) : ''
    })
    const lineColor = computed(() => {
      if (type?.value === 'dot') {
        return ''
      } else if (type?.value === 'border') {
        return color.value !== undefined ? (initColorList.includes(color.value) ? '' : color.value) : ''
      } else {
        return color.value !== undefined ? (color.value === 'default' ? '' : 'rgb(255, 255, 255)') : ''
      }
    })
    const wraperStyles = computed(() => {
      return initColorList.includes(color.value) ? {} : { background: isChecked.value ? defaultTypeColor.value : 'transparent', borderWidth: '1px', borderStyle: 'solid', borderColor: ((type?.value !== 'dot' && type?.value !== 'border' && isChecked.value) ? borderColor.value : lineColor.value), color: lineColor.value }
    })
    const textClasses = computed(() => {
      return [
        `${prefixCls}-text`,
        type?.value === 'border' ? (initColorList.includes(color.value) ? `${prefixCls}-color-${color.value}` : '') : '',
        (type?.value !== 'dot' && type?.value !== 'border' && color.value !== 'default') ? (isChecked.value && colorList.indexOf(color.value) < 0 ? `${prefixCls}-color-white` : '') : ''
      ]
    })
    const dotClasses = computed(() => {
      return `${prefixCls}-dot-inner`
    })
    const iconClass = computed(() => {
      if (type?.value === 'dot') {
        return ''
      } else if (type?.value === 'border') {
        return initColorList.includes(color.value) ? `${prefixCls}-color-${color.value}` : ''
      } else {
        return color.value !== undefined ? (color.value === 'default' ? '' : 'rgb(255, 255, 255)') : ''
      }
    })
    const showDot = computed(() => {
      return !!type?.value && type.value === 'dot'
    })
    const dotColor = computed(() => {
      return color.value !== undefined ? (initColorList.includes(color.value) ? '' : color.value) : ''
    })
    const textColorStyle = computed(() => {
      return initColorList.includes(color.value) ? {} : ((type?.value !== 'dot' && type?.value !== 'border') ? (isChecked.value ? { color: lineColor.value } : {}) : { color: lineColor.value })
    })
    const bgColorStyle = computed(() => {
      return initColorList.includes(color.value) ? {} : { background: dotColor.value }
    })

    const close = (event: Event) => {
      if (name?.value === undefined) {
        ctx.emit('on-close', event)
      } else {
        ctx.emit('on-close', event, name.value)
      }
    }
    const check = () => {
      if (!checkable.value) return
      const checked = !isChecked.value
      isChecked.value = checked
      if (name?.value === undefined) {
        ctx.emit('on-change', checked)
      } else {
        ctx.emit('on-change', checked, name.value)
      }
    }

    watch(checked, (val: boolean) => {
      isChecked.value = val
    })

    return {
      isChecked,
      classes,
      defaultTypeColor,
      borderColor,
      lineColor,
      wraperStyles,
      textClasses,
      dotClasses,
      iconClass,
      showDot,
      dotColor,
      textColorStyle,
      bgColorStyle,
      close,
      check
    }
  }
})
</script>
