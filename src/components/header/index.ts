import Header from '../layout/header.vue'
import { App } from 'vue'

Header.install = (Vue: App) => {
  Vue.component(Header.name, Header)
}

export default Header
