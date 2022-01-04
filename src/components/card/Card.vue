<template>
  <component :is="tagName" :class="classes" v-bind="tagProps" @click="handleClickLink">
    <div :class="headClasses" v-if="showHead">
      <slot name="title">
        <p v-if="title">
          <Icon v-if="icon" :type="icon"></Icon>
          <span>{{ title }}</span>
        </p>
      </slot>
    </div>
    <div :class="extraClasses" v-if="showExtra">
      <slot name="extra"></slot>
    </div>
    <div :class="bodyClasses" :style="bodyStyles">
      <slot></slot>
    </div>
  </component>
</template>
<script lang="ts">
import { computed, defineComponent, getCurrentInstance, onMounted, PropType, ref, toRefs } from 'vue'
import Icon from '../icon'
import link from '../../mixins/link'

const prefixCls = 'ivu-card'
const defaultPadding = 16

export default defineComponent({
  name: 'Card',
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
    bordered: {
      type: Boolean,
      default: true
    },
    disHover: {
      type: Boolean,
      default: false
    },
    shadow: {
      type: Boolean,
      default: false
    },
    padding: {
      type: Number,
      default: defaultPadding
    },
    title: {
      type: String
    },
    icon: {
      type: String
    }
  },
  setup(props, ctx) {
    const instance = getCurrentInstance()
    const { to, target } = toRefs(props)
    const { linkUrl, handleClick, handleCheckClick } = link(instance, props)

    const { bordered, disHover, shadow, padding, title } = toRefs(props)

    const showHead = ref(false)
    const showExtra = ref(false)

    const classes = computed(() => {
      return [
        `${prefixCls}`,
        {
          [`${prefixCls}-bordered`]: bordered.value && !shadow.value,
          [`${prefixCls}-dis-hover`]: disHover.value || shadow.value,
          [`${prefixCls}-shadow`]: shadow.value
        }
      ]
    })
    const headClasses = computed(() => {
      return `${prefixCls}-head`
    })
    const extraClasses = computed(() => {
      return `${prefixCls}-extra`
    })
    const bodyClasses = computed(() => {
      return `${prefixCls}-body`
    })
    const bodyStyles = computed(() => {
      if (padding.value !== defaultPadding) {
        return {
          padding: `${padding.value}px`
        }
      } else {
        return ''
      }
    })
    const isHrefPattern = computed(() => {
      return !!to?.value
    })
    const tagName = computed(() => {
      return isHrefPattern.value ? 'a' : 'div'
    })
    const tagProps = computed(() => {
      if (isHrefPattern.value) {
        return { href: linkUrl.value, target: target.value }
      } else {
        return {}
      }
    })

    const handleClickLink = (event: any) => {
      if (isHrefPattern.value) return
      const openInNewWindow = event.ctrlKey || event.metaKey
      handleCheckClick(event, openInNewWindow)
    }

    onMounted(() => {
      showHead.value = title?.value !== undefined || ctx.slots.title !== undefined
      showExtra.value = ctx.slots.extra !== undefined
    })

    return {
      linkUrl,
      handleClick,
      handleCheckClick,
      showHead,
      showExtra,
      classes,
      headClasses,
      extraClasses,
      bodyClasses,
      bodyStyles,
      tagName,
      tagProps,
      handleClickLink
    }
  }
})
</script>
