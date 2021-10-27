import Vue from 'vue'
import VueRouter from 'vue-router'
import app from "../App"
import Home from "../views/Home.vue"
import Fluxo from "../views/Fluxo.vue"
Vue.use(VueRouter)

const routes = [
  {
    path: '/app',
    name: 'App',
    component: app,
    children: [
      {
        path: '/Home',
        name: "Home",
        component: Home,
      },
      {
        path: '/Fluxo',
        name: "Fluxo",
        component: Fluxo,
      }
    ]
  },
  { path: '/', redirect: '/Home' }

]

const router = new VueRouter({

  base: process.env.BASE_URL,
  routes
})

export default router
