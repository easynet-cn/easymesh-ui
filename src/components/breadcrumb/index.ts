import Breadcrumb from './Breadcrumb.vue'
import { App } from 'vue'

Breadcrumb.install = (Vue: App) => {
  Vue.component(Breadcrumb.name, Breadcrumb)
}

export default Breadcrumb
