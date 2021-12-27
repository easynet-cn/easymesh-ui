import Avatar from "/demo/Avatar.vue"
import Icon from "/demo/Icon.vue"
import { createRouter, createWebHashHistory } from "vue-router"

const routes = [
  {
    path: "/demo/avatar",
    name: "avatar",
    component: Avatar
  },
  {
    path: "/demo/icon",
    name: "icon",
    component: Icon
  }
]

export const router = createRouter({
  history: createWebHashHistory(),
  routes: routes
})