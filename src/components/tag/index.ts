import Tag from './Tag.vue'
import { App } from 'vue'

Tag.install = (Vue: App) => {
  Vue.component(Tag.name, Tag)
}

export default Tag
