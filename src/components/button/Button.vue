<template>
  <component
    :is="tagName"
    :class="classes"
    :disabled="itemDisabled"
    @click="handleClickLink"
    v-bind="tagProps"
  >
    <Icon class="ivu-load-loop" type="ios-loading" v-if="loading"></Icon>
    <Icon :type="icon" :custom="customIcon" v-if="(icon || customIcon) && !loading"></Icon>
    <span v-if="showSlot" ref="slot">
      <slot></slot>
    </span>
  </component>
</template>
<script lang="ts">
import { computed, defineComponent, getCurrentInstance, PropType, toRefs } from 'vue'
import Icon from '../icon'
import form from '../../mixins/form'
import link from '../../mixins/link'

const prefixCls = 'ivu-btn'

export default defineComponent({
  name: 'iButton',
  components: { Icon },
  props: {
    to: {
      type: [Object, String]
    },
    replace: {
      type: Boolean,
      default: false
    },
    target: {
      type: String as PropType<'_blank' | '_self' | '_parent' | '_top'>,
      default: '_self'
    },
    append: {
      type: Boolean,
      required: false,
      default: false
    },
    type: {
      type: String as PropType<'default' | 'primary' | 'dashed' | 'text' | 'info' | 'success' | 'warning' | 'error'>,
      default: 'default'
    },
    shape: {
      type: String as PropType<'circle' | 'circle-outline'>
    },
    size: {
      type: String as PropType<'small' | 'large' | 'default'>,
      default: 'default'
    },
    loading: Boolean,
    disabled: Boolean,
    htmlType: {
      type: String as PropType<'button' | 'submit' | 'reset'>,
      default: 'button'
    },
    icon: {
      type: String,
      default: ''
    },
    customIcon: {
      type: String,
      default: ''
    },
    long: {
      type: Boolean,
      default: false
    },
    ghost: {
      type: Boolean,
      default: false
    }
  },
  emits: ['click'],
  setup(props, ctx) {
    const instance = getCurrentInstance()
    const { to, target } = toRefs(props)
    const { linkUrl, handleClick, handleCheckClick } = link(instance, props)

    const { type, shape, size, loading, disabled, htmlType, icon, customIcon, long, ghost } = toRefs(props)

    const { itemDisabled } = form(disabled)

    const showSlot = computed(() => {
      return !!ctx.slots.default
    })

    const classes = computed(() => {
      return [
        `${prefixCls}`,
        `${prefixCls}-${type.value}`,
        {
          [`${prefixCls}-long`]: long.value,
          [`${prefixCls}-${shape?.value}`]: !!shape?.value,
          [`${prefixCls}-${size.value}`]: size.value !== 'default',
          [`${prefixCls}-loading`]: loading.value != null && loading.value,
          [`${prefixCls}-icon-only`]: !showSlot.value && (!!icon.value || !!customIcon.value || loading.value),
          [`${prefixCls}-ghost`]: ghost.value
        }
      ]
    })

    const isHrefPattern = computed(() => {
      return !!to?.value
    })

    const tagName = computed(() => {
      return isHrefPattern.value ? 'a' : 'button'
    })

    const tagProps = computed(() => {
      if (isHrefPattern.value) {
        return { href: linkUrl.value, target: target.value }
      } else {
        return { type: htmlType.value }
      }
    })

    const handleClickLink = (event: any) => {
      ctx.emit('click', event)
      const openInNewWindow = event.ctrlKey || event.metaKey

      handleCheckClick(event, openInNewWindow)
    }

    return {
      linkUrl,
      handleClick,
      handleCheckClick,
      itemDisabled,
      showSlot,
      classes,
      isHrefPattern,
      tagName,
      tagProps,
      handleClickLink
    }
  }
})
</script>
