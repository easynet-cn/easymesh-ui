import Content from '../layout/Content.vue'
import { App } from 'vue'

Content.install = (Vue: App) => {
  Vue.component(Content.name, Content)
}

export default Content
