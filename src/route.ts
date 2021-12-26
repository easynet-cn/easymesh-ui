import Icon from "/demo/Icon.vue"
import { createRouter,createWebHashHistory} from "vue-router"

const routes = [
  {
    path: "/demo/icon",
    name: "icon",
    component:Icon
  }
]

export const router = createRouter({
    history: createWebHashHistory(),
    routes: routes
})