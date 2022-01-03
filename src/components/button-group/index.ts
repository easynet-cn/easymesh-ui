import ButtonGroup from '../button/ButtonGroup.vue'
import { App } from 'vue'

ButtonGroup.install = (Vue: App) => {
  Vue.component(ButtonGroup.name, ButtonGroup)
}

export default ButtonGroup
