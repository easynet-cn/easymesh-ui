import Avatar from './avatar.vue'
import { App } from 'vue'

Avatar.install = (Vue: App) => {
  Vue.component(Avatar.name, Avatar)
}

export default Avatar
