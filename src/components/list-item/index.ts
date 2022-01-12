import ListItem from '../list/ListItem.vue'
import { App } from 'vue'

ListItem.install = (Vue: App) => {
  Vue.component(ListItem.name, ListItem)
}

export default ListItem
