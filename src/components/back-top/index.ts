import BackTop from './BackTop.vue'
import { App } from 'vue'

BackTop.install = (Vue: App) => {
  Vue.component(BackTop.name, BackTop)
}

export default BackTop
