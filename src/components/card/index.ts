import Card from './Card.vue'
import { App } from 'vue'

Card.install = (Vue: App) => {
  Vue.component(Card.name, Card)
}

export default Card
