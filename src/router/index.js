import Vue from 'vue'
import VueRouter from 'vue-router'

import constantRoutes from './constantRoutes'

Vue.use(VueRouter)

import manageRouter from './modules/manage'
import newsRouter from './modules/news'
import moduleRouter from './modules/module'
import supportRouter from './modules/support'
import controlRouter from './modules/control'

// 动态路由，这些路由需要根据用户的权限信息进行加载
export const asyncRoutes = [
  // todo 动态路由
  manageRouter,
  newsRouter,
  moduleRouter,
  supportRouter,
  controlRouter,

  // 404 页面必须放在最后
  { path: '*', redirect: '/404', hidden: true }
]

const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}

const createRouter = () =>
  new VueRouter({
    scrollBehavior: () => ({ y: 0 }),
    // 先将固定可访问的路由加载上，动态的路由等在获取到权限信息后再追加
    routes: constantRoutes,
    // Leave these as they are and change in quasar.conf.js instead!
    // quasar.conf.js -> build -> vueRouterMode
    // quasar.conf.js -> build -> publicPath
    mode: process.env.VUE_ROUTER_MODE,
    base: process.env.VUE_ROUTER_BASE
  })

const router = createRouter()

// 在更改权限后，重置路由信息，如登出，赋权后重载
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
