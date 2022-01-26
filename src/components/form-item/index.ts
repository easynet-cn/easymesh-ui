import FormItem from '../form/FormItem.vue'
import { App } from 'vue'

FormItem.install = (Vue: App) => {
  Vue.component(FormItem.name, FormItem)
}

export default FormItem
