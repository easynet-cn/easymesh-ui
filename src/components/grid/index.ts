import Row from './Row.vue'
import { App } from 'vue'

Row.install = (Vue: App) => {
  Vue.component(Row.name, Row)
}

export default Row
