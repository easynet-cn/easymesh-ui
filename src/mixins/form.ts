import { computed, inject, Ref } from 'vue'

export default function (disabled: Ref<boolean>): any {
  const FormInstance: any = inject('FormInstance', '')

  const itemDisabled = computed(() => {
    return (!disabled.value && FormInstance) ? FormInstance.disabled : disabled.value
  })

  return {
    itemDisabled
  }
}
