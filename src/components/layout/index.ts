import Layout from './Layout.vue'
import { App } from 'vue'

Layout.install = (Vue: App) => {
  Vue.component(Layout.name, Layout)
}

export default Layout
