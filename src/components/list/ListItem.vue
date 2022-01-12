<template>
  <li class="ivu-list-item" :class="classes">
    <template v-if="itemLayout === 'vertical' && $slots.extra">
      <div class="ivu-list-item-main">
        <slot></slot>
        <ul class="ivu-list-item-action" v-if="$slots.action">
          <slot name="action"></slot>
        </ul>
      </div>
      <div class="ivu-list-item-extra">
        <slot name="extra"></slot>
      </div>
    </template>
    <template v-else>
      <slot></slot>
      <ul class="ivu-list-item-action" v-if="$slots.action">
        <slot name="action"></slot>
      </ul>
      <div class="ivu-list-item-extra">
        <slot name="extra"></slot>
      </div>
    </template>
  </li>
</template>
<script lang="ts">
import { computed, defineComponent, inject } from 'vue'

export default defineComponent({
  name: 'ListItem',
  inject: ['ListInstance'],
  setup(props, ctx) {
    const ListInstance: any = inject('ListInstance')

    const itemLayout = computed(() => {
      return ListInstance.ctx.itemLayout
    })
    const isItemContainsTextNode = computed(() => {
      let result

      if (ctx.slots.default) {
        ctx.slots.default().forEach(item => {
          if (typeof item === 'string') {
            result = true
          }
        })
      }

      return result
    })
    const isFlexMode = computed(() => {
      const extra = ctx.slots.extra

      if (itemLayout.value === 'vertical') {
        return !!extra
      }

      return !isItemContainsTextNode.value
    })
    const classes = computed(() => {
      return [
        {
          'ivu-list-item-no-flex': !isFlexMode.value
        }
      ]
    })

    return {
      itemLayout,
      isItemContainsTextNode,
      isFlexMode,
      classes
    }
  }
})
</script>
