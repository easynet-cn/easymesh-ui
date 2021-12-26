<template>
  <span :class="classes" :style="styles">
    <img :src="src" v-if="src" @error="handleError" />
    <Icon :type="icon" :custom="customIcon" v-else-if="icon || customIcon"></Icon>
    <span ref="children" :class="[prefixCls + '-string']" :style="childrenStyle" v-else>
      <slot></slot>
    </span>
  </span>
</template>
<script lang="ts">
import { computed, defineComponent, onBeforeMount, onMounted, onUpdated, PropType, ref, toRefs, watch } from 'vue'
import Icon from '../icon/'

const prefixClass = 'ivu-avatar'

const sizeList = ['small', 'large', 'default']

export default defineComponent({
  name: 'Avatar',
  components: { Icon },
  props: {
    shape: {
      type: String as PropType<'circle' | 'square'>,
      default: 'circle'
    },
    size: {
      type: [String, Number],
      default: 'default'
    },
    src: {
      type: String
    },
    icon: {
      type: String
    },
    customIcon: {
      type: String,
      default: ''
    }
  },
  setup(props, ctx) {
    const { shape, size, src, icon, customIcon } = toRefs(props)

    const prefixCls = ref(prefixClass)
    const scale = ref(1)
    const childrenWidth = ref(0)
    const isSlotShow = ref(false)
    const slotTemp = ref()

    const children = ref(null)

    const classes = computed(() => {
      return [
        `${prefixCls.value}`,
        `${prefixCls.value}-${shape.value}`,
        {
          [`${prefixCls.value}-image`]: !!src?.value,
          [`${prefixCls.value}-icon`]: !!icon?.value || !!customIcon.value,
          [`${prefixCls.value}-${size.value}`]: size.value
        }
      ]
    })
    const styles = computed(() => {
      return typeof size.value === 'number' ? {
        width: `${size.value}px`,
        height: `${size.value}px`,
        lineHeight: `${size.value}px`,
        fontSize: `${size.value / 2}px`
      } : {}
    })
    const childrenStyle = computed(() => {
      let style = {}

      if (isSlotShow.value) {
        style = {
          msTransform: `scale(${scale.value})`,
          WebkitTransform: `scale(${scale.value})`,
          transform: `scale(${scale.value})`,
          position: 'absolute',
          display: 'inline-block',
          left: `calc(50% - ${Math.round(childrenWidth.value / 2)}px)`
        }
      }
      return style
    })

    const setScale = () => {
      isSlotShow.value = !src?.value && !icon?.value

      if (children.value) {
        // set children width again to make slot centered
        childrenWidth.value = (children.value! as HTMLElement).offsetWidth
        const avatarWidth = (children.value! as HTMLElement).getBoundingClientRect().width
        // add 4px gap for each side to get better performance
        if (avatarWidth - 8 < childrenWidth.value) {
          scale.value = (avatarWidth - 8) / childrenWidth.value
        } else {
          scale.value = 1
        }
      }
    }
    const handleError = (e: any) => {
      ctx.emit('on-error', e)
    }

    watch(size, (val, oldVal) => {
      if (val !== oldVal) setScale()
    })

    onBeforeMount(() => {
      slotTemp.value = ctx.slots.default ? ctx.slots.default : null
    })

    onMounted(() => {
      setScale()
    })

    onUpdated(() => {
      if (ctx.slots.default !== slotTemp.value) {
        slotTemp.value = ctx.slots.default!

        setScale()
      }
    })

    return {
      prefixCls,
      scale,
      childrenWidth,
      isSlotShow,
      slotTemp,
      children,
      classes,
      styles,
      childrenStyle,
      setScale,
      handleError
    }
  }
})
</script>
