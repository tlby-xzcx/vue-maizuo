import Vue from 'vue'
import VueRouter from 'vue-router'
import Guide from "@/views/Guide"
import Setting from "@/views/Setting"
Vue.use(VueRouter)


const routes = [
  {
    path: "/",
    component: Guide
  },
  {
    path: "/guide",
    name: "guide",
    // 懒加载
    component: () => import("@/views/Guide")
  },
  {
    path: "/home",
    component: () => import("@/views/Home"),
    children: [
      {
        path: "/",
        redirect: { name: "hotplaying" }
      },
      {
        path: "movie",
        name: "movie",
        component: () => import("@/views/Movie"),
        children: [
          { path: "/", redirect: { name: "hotplaying" } },
          { path: "hotplaying", name: "hotplaying", component: () => import("@/views/Hotplaying") },
          { path: "futureplaying", name: "futureplaying", component: () => import("@/views/Futureplaying") }
        ]
      },
      {
        path: "cinema",
        name: "cinema",
        component: () => import("@/views/Cinema")
      },
      {
        path: "news",
        name: "news",
        component: () => import("@/views/News")
      },
      {
        path: "mine",
        name: "mine",
        component: () => import("@/views/Mine")
      },
      {
        path: "*",
        redirect: "movie/hotplaying"
      }
    ]
  },
  {
    path: "/search",
    name: "search",
    component: () => import("@/views/Search")
  },
  {
    path: "/login",
    name: "login",
    component: () => import("@/views/Login")
  },
  {
    path: "/morelogin",
    name: "morelogin",
    component: () => import("@/views/MoreLogin")
  },
  {
    path: "/city",
    name: "city",
    component: () => import("@/views/City")
  },
  {
    path: "/setting", name: "setting", component: Setting
  },
  {
    path: "/user",
    name: "user",
    component: () => import("@/views/user/Index"),
    children: [
      { path: "updatepwd", name: "updatepwd", component: () => import("@/views/user/UpdatePwd") },
      { path: "advise", name: "advise", component: () => import("@/views/user/Advise") }
    ]
  },
  {
    path: "/cinemadetail/:cinemaId",
    name: "cinemadetail",
    component: () => import("@/views/CinemaDetail")
  },
  {
    path: "*",
    redirect: { name: "guide" }
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
