import BreadcrumbItem from '../breadcrumb/BreadcrumbItem.vue'
import { App } from 'vue'

BreadcrumbItem.install = (Vue: App) => {
  Vue.component(BreadcrumbItem.name, BreadcrumbItem)
}

export default BreadcrumbItem
