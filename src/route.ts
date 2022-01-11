import Affix from "/demo/Affix.vue"
import Avatar from "/demo/Avatar.vue"
import BackTop from "/demo/BackTop.vue"
import Badge from "/demo/Badge.vue"
import Breadcrumb from "/demo/Breadcrumb.vue"
import Button from "/demo/Button.vue"
import Card from "/demo/Card.vue"
import Circle from "/demo/Circle.vue"
import Icon from "/demo/Icon.vue"

import { createRouter, createWebHashHistory } from "vue-router"

const routes = [
  {
    path: "/demo/affix",
    name: "affix",
    component: Affix
  },
  {
    path: "/demo/avatar",
    name: "avatar",
    component: Avatar
  },
  {
    path: "/demo/back-top",
    name: "back-top",
    component: BackTop
  },
  {
    path: "/demo/badge",
    name: "badge",
    component: Badge
  },
  {
    path: "/demo/breadcrumb",
    name: "breadcrumb",
    component: Breadcrumb
  },
  {
    path: "/demo/button",
    name: "button",
    component: Button
  },
  {
    path: "/demo/card",
    name: "card",
    component: Card
  },
  {
    path: "/demo/circle",
    name: "circle",
    component: Circle
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