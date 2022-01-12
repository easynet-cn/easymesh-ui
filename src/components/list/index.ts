import List from './List.vue'
import { App } from 'vue'

List.install = (Vue: App) => {
  Vue.component(List.name, List)
}

export default List
