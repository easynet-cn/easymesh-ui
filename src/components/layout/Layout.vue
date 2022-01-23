<template>
  <div :class="wrapClasses">
    <slot></slot>
  </div>
</template>
<script lang="ts">
import { computed, defineComponent, onMounted, ref } from 'vue'

const prefixCls = 'ivu-layout'

export default defineComponent({
  name: 'Layout',
  setup(props, ctx) {
    const hasSider = ref(false)

    const wrapClasses = computed(() => {
      return [
        `${prefixCls}`,
        {
          [`${prefixCls}-has-sider`]: hasSider.value
        }
      ]
    })

    onMounted(() => {
      hasSider.value = ctx.slots.default !== undefined && ctx.slots.default().some((child: any) => {
        return child.type.name === 'Sider'
      })
    })

    return {
      hasSider,
      wrapClasses
    }
  }
})
</script>
