<template>
  <span>
    <a
      v-if="to"
      :href="linkUrl"
      :target="target"
      :class="linkClasses"
      @click.exact="handleCheckClick($event, false)"
      @click.ctrl="handleCheckClick($event, true)"
      @click.meta="handleCheckClick($event, true)"
    >
      <slot></slot>
    </a>
    <span v-else :class="linkClasses">
      <slot></slot>
    </span>
    <span :class="separatorClasses" v-html="separator" v-if="!showSeparator"></span>
    <span :class="separatorClasses" v-else>
      <slot name="separator"></slot>
    </span>
  </span>
</template>
<script lang="ts">
import { computed, defineComponent, getCurrentInstance, inject, onMounted, PropType, ref, toRefs } from 'vue'
import link from '../../mixins/link'

const prefixCls = 'ivu-breadcrumb-item'

export default defineComponent({
  name: 'BreadcrumbItem',
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
    }
  },
  setup(props, ctx) {
    const instance = getCurrentInstance()
    const { linkUrl, handleClick, handleCheckClick } = link(instance, toRefs(props))

    const separator = inject('separator')
    const showSeparator = ref(false)

    const linkClasses = computed(() => {
      return `${prefixCls}-link`
    })

    const separatorClasses = computed(() => {
      return `${prefixCls}-separator`
    })

    onMounted(() => {
      showSeparator.value = ctx.slots.separator !== undefined
    })

    return {
      linkUrl,
      handleClick,
      handleCheckClick,
      separator,
      showSeparator,
      linkClasses,
      separatorClasses
    }
  }
})
</script>
