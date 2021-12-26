import Badge from './Badge.vue'
import { App } from 'vue'

Badge.install = (Vue: App) => {
  Vue.component(Badge.name, Badge)
}

export default Badge
