import Col from '../grid/Col.vue'
import { App } from 'vue'

Col.install = (Vue: App) => {
  Vue.component(Col.name, Col)
}

export default Col
