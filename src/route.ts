import Affix from "/demo/Affix.vue"
import Avatar from "/demo/Avatar.vue"
import BackTop from "/demo/BackTop.vue"
import Badge from "/demo/Badge.vue"
import Breadcrumb from "/demo/Breadcrumb.vue"
import Button from "/demo/Button.vue"
import Card from "/demo/Card.vue"
import Circle from "/demo/Circle.vue"
import Divider from "/demo/Divider.vue"
import Grid from "/demo/Grid.vue"
import Icon from "/demo/Icon.vue"
import Layout from "/demo/Layout.vue"
import List from "/demo/List.vue"
import Tag from "/demo/Tag.vue"

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
    path: "/demo/divider",
    name: "divider",
    component: Divider
  },
  {
    path: "/demo/grid",
    name: "grid",
    component: Grid
  },
  {
    path: "/demo/icon",
    name: "icon",
    component: Icon
  },
  {
    path: "/demo/layout",
    name: "laytout",
    component: Layout
  },
  {
    path: "/demo/list",
    name: "list",
    component: List
  },
  {
    path: "/demo/tag",
    name: "tag",
    component: Tag
  }
]

export const router = createRouter({
  history: createWebHashHistory(),
  routes: routes
})