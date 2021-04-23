import Vue from "vue"
import VueRouter from "vue-router"

import Storage from '@/views/Storage.vue'
import Orders from '@/views/Orders.vue'
import Rolls from '@/views/Rolls.vue'
import Products from '@/views/Products.vue'
import CreateOrder from '@/views/CreateOrder.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: "/",
    name: "Storage",
    component: Storage,
  },
  {
    path: "/orders",
    name: "Orders",
    component: Orders,
  },
  {
    path: "/rolls",
    name: "Rolls",
    component: Rolls,
  },
  {
    path: "/products",
    name: "Products",
    component: Products,
  },
  {
    path: "/create-order",
    name: "CreateOrder",
    component: CreateOrder,
  },
]

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
})

export default router
