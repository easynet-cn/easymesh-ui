import Circle from './Circle.vue'
import { App } from 'vue'

Circle.install = (Vue: App) => {
  Vue.component(Circle.name, Circle)
}

export default Circle
