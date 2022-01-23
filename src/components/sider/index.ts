import Sider from '../layout/Sider.vue'
import { App } from 'vue'

Sider.install = (Vue: App) => {
  Vue.component(Sider.name, Sider)
}

export default Sider
