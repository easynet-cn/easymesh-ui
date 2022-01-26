<template>
  <div :class="classes">
    <label
      :class="[prefixCls + '-label']"
      :for="labelFor"
      :style="labelStyles"
      v-if="label || $slots.label"
    >
      <slot name="label">{{ label }}{{ FormInstance.colon }}</slot>
    </label>
    <div :class="[prefixCls + '-content']" :style="contentStyles">
      <slot></slot>
      <transition name="fade">
        <div
          :class="[prefixCls + '-error-tip']"
          v-if="validateState === 'error' && showMessage && FormInstance.showMessage"
        >{{ validateMessage }}</div>
      </transition>
    </div>
  </div>
</template>
<script lang="ts">
import { computed, defineComponent, getCurrentInstance, inject, onBeforeUnmount, onMounted, PropType, provide, ref, toRefs, watch } from 'vue'
import AsyncValidator, { RuleItem } from 'async-validator'
import mitt from 'mitt'

const prefixClass = 'ivu-form-item'

function getPropByPath(obj: any, path: any) {
  let tempObj = obj
  path = path.replace(/\[(\w+)\]/g, '.$1')
  path = path.replace(/^\./, '')

  const keyArr = path.split('.')
  let i = 0

  for (let len = keyArr.length; i < len - 1; ++i) {
    const key = keyArr[i]
    if (key in tempObj) {
      tempObj = tempObj[key]
    } else {
      throw new Error('[iView warn]: please transfer a valid prop path to form item!')
    }
  }
  return {
    o: tempObj,
    k: keyArr[i],
    v: tempObj[keyArr[i]]
  }
}

export default defineComponent({
  name: 'FormItem',
  props: {
    label: {
      type: String,
      default: ''
    },
    labelWidth: {
      type: Number
    },
    prop: {
      type: String
    },
    required: {
      type: Boolean,
      default: false
    },
    rules: {
      type: [Object, Array] as PropType<RuleItem | RuleItem[]>
    },
    error: {
      type: String
    },
    validateStatus: {
      type: Boolean
    },
    showMessage: {
      type: Boolean,
      default: true
    },
    labelFor: {
      type: String
    }
  },
  setup(props) {
    const { labelWidth, prop, required, rules, error, validateStatus } = toRefs(props)

    const instance = getCurrentInstance()

    provide('FormItemInstance', instance)

    const prefixCls = ref(prefixClass)
    const isRequired = ref(false)
    const validateState = ref('')
    const validateMessage = ref('')
    const validateDisabled = ref(false)
    const validator = ref({})

    const FormInstance: any = inject('FormInstance', '')

    const formItemMitt = mitt()

    const classes = computed(() => {
      return [
        `${prefixCls.value}`,
        {
          [`${prefixCls.value}-required`]: required.value || isRequired.value,
          [`${prefixCls.value}-error`]: validateState.value === 'error',
          [`${prefixCls.value}-validating`]: validateState.value === 'validating'
        }
      ]
    })
    const fieldValue = computed(() => {
      const model = FormInstance.model
      if (!model || !prop?.value) { return }

      let path = prop.value
      if (path.indexOf(':') !== -1) {
        path = path.replace(/:/, '.')
      }

      return getPropByPath(model, path).v
    })

    const initialValue = ref(fieldValue.value)

    const labelStyles = computed(() => {
      const style: any = {}
      const labelWidthVal = labelWidth?.value === 0 || labelWidth?.value ? labelWidth?.value : FormInstance.labelWidth

      if (labelWidthVal || labelWidthVal === 0) {
        style.width = `${labelWidthVal}px`
      }
      return style
    })
    const contentStyles = computed(() => {
      const style: any = {}
      const labelWidthVal = labelWidth?.value === 0 || labelWidth?.value ? labelWidth.value : FormInstance.labelWidth

      if (labelWidthVal || labelWidthVal === 0) {
        style.marginLeft = `${labelWidthVal}px`
      }
      return style
    })

    const getRules = (): any => {
      let formRules = FormInstance.rules
      const selfRules = rules?.value

      formRules = formRules && prop?.value ? formRules[prop?.value] : []

      return [].concat(selfRules || formRules || [])
    }
    const getFilteredRule = (trigger: any) => {
      const rules = getRules()

      return rules.filter((rule: any) => !rule.trigger || rule.trigger.indexOf(trigger) !== -1)
    }
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    const validate = (trigger: any, callback: Function = function () { }) => {
      let rules = getFilteredRule(trigger)

      if (!rules || rules.length === 0) {
        if (!required.value) {
          callback()
          return true
        } else {
          rules = [{ required: true }]
        }
      }

      validateState.value = 'validating'

      const descriptor: any = {}

      if (prop?.value) {
        descriptor[prop?.value] = rules
      }

      const validator = new AsyncValidator(descriptor)
      const model: any = {}

      if (prop?.value) {
        model[prop?.value] = fieldValue.value
      }

      validator.validate(model, { firstFields: true }, errors => {
        validateState.value = !errors ? 'success' : 'error'
        validateMessage.value = errors && errors[0] && errors[0].message ? errors[0].message : ''

        callback(validateMessage.value)

        FormInstance && FormInstance.emit('on-validate', prop?.value, !errors, validateMessage.value || null)
      })

      validateDisabled.value = false
    }
    const resetField = () => {
      validateState.value = ''
      validateMessage.value = ''

      const model = FormInstance.model
      const value = fieldValue.value
      let path = prop?.value

      if (path && path.indexOf(':') !== -1) {
        path = path.replace(/:/, '.')
      }

      const propVal = getPropByPath(model, path)

      if (Array.isArray(value)) {
        validateDisabled.value = true
        propVal.o[propVal.k] = [].concat(initialValue.value)
      } else {
        validateDisabled.value = true
        propVal.o[propVal.k] = initialValue.value
      }
    }
    const onFieldBlur = () => {
      validate('blur')
    }
    const onFieldChange = () => {
      if (validateDisabled.value) {
        validateDisabled.value = false
        return
      }

      validate('change')
    }
    const setRules = () => {
      const rules = getRules()
      if (rules.length && required.value) {
        return
      } else if (rules.length) {
        rules.every((rule: any) => {
          isRequired.value = rule.required
        })
      } else if (required.value) {
        isRequired.value = required.value
      }

      formItemMitt.off('on-form-blur', onFieldBlur)
      formItemMitt.off('on-form-change', onFieldChange)
      formItemMitt.on('on-form-blur', onFieldBlur)
      formItemMitt.on('on-form-change', onFieldChange)
    }

    if (error?.value) {
      watch(error, (val) => {
        if (val) {
          validateMessage.value = val
        }

        validateState.value = val ? 'error' : ''
      })
    }

    watch(validateStatus, (val) => {
      validateState.value = val.toString()
    })

    if (rules) {
      watch(rules, () => {
        setRules()
      })
    }

    watch(required, (n, o) => {
      isRequired.value = n
      if (o && !n) {
        resetField()
      }
    })

    onMounted(() => {
      if (prop?.value) {
        FormInstance.$emit('on-form-item-add', instance)

        initialValue.value = fieldValue.value

        setRules()
      }
    })

    onBeforeUnmount(() => {
      FormInstance.$emit('on-form-item-remove', instance)
    })

    return {
      FormInstance,
      formItemMitt,
      prefixCls,
      isRequired,
      validateState,
      validateMessage,
      validateDisabled,
      validator,
      classes,
      fieldValue,
      labelStyles,
      contentStyles,
      getRules,
      getFilteredRule,
      validate,
      resetField,
      onFieldBlur,
      onFieldChange,
      setRules
    }
  }
})
</script>
