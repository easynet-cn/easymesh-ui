import Divider from './Divider.vue'
import { App } from 'vue'

Divider.install = (Vue: App) => {
  Vue.component(Divider.name, Divider)
}

export default Divider
