import Form from './Form.vue'
import { App } from 'vue'

Form.install = (Vue: App) => {
  Vue.component(Form.name, Form)
}

export default Form
