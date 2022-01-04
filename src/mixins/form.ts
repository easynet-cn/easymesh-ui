import { computed, inject, Ref } from 'vue'

export default function (disabled: Ref<Boolean>): any {
  const FormInstance: any = inject('FormInstance', '')

  const itemDisabled = computed(() => {
    if (!disabled.value && FormInstance.disabled !== undefined) {
      return FormInstance.disabled ? FormInstance.disabled : null
    }

    return disabled.value ? disabled.value : null
  })

  return {
    itemDisabled
  }
}
