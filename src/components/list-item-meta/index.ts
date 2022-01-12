import ListItemMeta from '../list/ListItemMeta.vue'
import { App } from 'vue'

ListItemMeta.install = (Vue: App) => {
  Vue.component(ListItemMeta.name, ListItemMeta)
}

export default ListItemMeta
