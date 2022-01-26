<template>
  <form :class="classes" :autocomplete="autocomplete">
    <slot></slot>
  </form>
</template>
<script lang="ts">
import { computed, defineComponent, getCurrentInstance, onMounted, PropType, provide, reactive, toRefs, watch } from 'vue'
import mitt from 'mitt'

const prefixCls = 'ivu-form'

export default defineComponent({
  name: 'iForm',
  props: {
    model: {
      type: Object
    },
    rules: {
      type: Object
    },
    labelWidth: {
      type: Number
    },
    labelPosition: {
      type: String as PropType<'left' | 'right' | 'top'>,
      default: 'right'
    },
    inline: {
      type: Boolean,
      default: false
    },
    showMessage: {
      type: Boolean,
      default: true
    },
    autocomplete: {
      type: String as PropType<'on' | 'off'>,
      default: 'off'
    },
    // 4.0.0
    hideRequiredMark: {
      type: Boolean,
      default: false
    },
    // 4.0.0
    labelColon: {
      type: [Boolean, String],
      default: false
    },
    // 4.0.0
    disabled: {
      type: Boolean,
      default: false
    }
  },
  provide() {
    return { FormInstance: this }
  },
  setup(props) {
    const { rules, labelPosition, inline, hideRequiredMark, labelColon } = toRefs(props)

    provide('FormInstance', getCurrentInstance())

    const formMitt = mitt()

    const fields = reactive(Array<object>())

    const classes = computed(() => {
      return [
        `${prefixCls}`,
        `${prefixCls}-label-${labelPosition.value}`,
        {
          [`${prefixCls}-inline`]: inline.value,
          [`${prefixCls}-hide-required-mark`]: hideRequiredMark.value
        }
      ]
    })
    const colon = computed(() => {
      let colon = ''

      if (labelColon.value) {
        colon = (typeof labelColon.value === 'boolean') ? ':' : labelColon.value
      }

      return colon
    })

    const resetFields = () => {
      fields.forEach((field: any) => {
        field.resetField()
      })
    }
    const validate = (callback?: Function) => {
      return new Promise(resolve => {
        let valid = true
        let count = 0
        // fields 为空需要返回promise
        if (fields.length === 0) {
          resolve(valid)
          if (typeof callback === 'function') {
            callback(valid)
          }
        }
        fields.forEach((field: any) => {
          field.validate('', (errors: any) => {
            if (errors) {
              valid = false
            }
            if (++count === fields.length) {
              // all finish
              resolve(valid)
              if (typeof callback === 'function') {
                callback(valid)
              }
            }
          })
        })
      })
    }
    const validateField = (prop: any, cb: Function) => {
      const field = fields.filter((field: any) => field.prop === prop)[0]
      if (!field) { throw new Error('[warn]: must call validateField with valid prop string!') }

      validate(cb)
    }

    if (rules) {
      watch(rules, () => {
        validate()
      })
    }

    onMounted(() => {
      formMitt.on('on-form-item-add', (field: any) => {
        if (field) fields.push(field)
        return false
      })
      formMitt.on('on-form-item-remove', (field: any) => {
        if (field.prop) fields.splice(fields.indexOf(field), 1)
        return false
      })
    })

    return {
      fields,
      classes,
      colon,
      resetFields,
      validate,
      validateField
    }
  }
})
</script>
