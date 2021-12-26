import Icon from './Icon.vue'
import { App } from 'vue'

Icon.install = (Vue: App) => {
  Vue.component(Icon.name, Icon)
}

export default Icon
