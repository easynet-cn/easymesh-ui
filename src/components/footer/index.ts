import Footer from '../laytou/Footer.vue'
import { App } from 'vue'

Footer.install = (Vue: App) => {
  Vue.component(Footer.name, Footer)
}

export default Footer
