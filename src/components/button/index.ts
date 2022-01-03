import Button from './Button.vue'
import { App } from 'vue'

Button.install = (Vue: App) => {
  Vue.component(Button.name, Button)
}

export default Button
