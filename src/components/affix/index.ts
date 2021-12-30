import Affix from './Affix.vue'
import { App } from 'vue'

Affix.install = (Vue: App) => {
  Vue.component(Affix.name, Affix)
}

export default Affix
