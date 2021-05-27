import Vue from 'vue'
import VueRouter from 'vue-router'
import Landing from '../views/Landing.vue'

Vue.use(VueRouter)

const routes = [ 
  {
    path: '/',
    name: 'Home',
    component: Landing
  },
  {
    path: "/play",
    name: "Play",
    component: () =>
      import(/* webpackChunkName: "Level" */ "../views/Home.vue"),
  },
  {
    path: "/world/:worldId",
    name: "World",
    component: () =>
      import(/* webpackChunkName: "Level" */ "../views/World.vue"),
  },
  {
    path: "/level/:worldId/:levelId",
    name: "Level",
    component: () =>
      import(/* webpackChunkName: "Level" */ "../views/Level.vue"),
  },
  {
    path: "/admin",
    name: "admin",
    component: () =>
      import(/* webpackChunkName: "AdminPanel" */ "../views/AdminPanel.vue"),
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
