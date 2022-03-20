import Vue from 'vue'
import VueRouter from 'vue-router'
import { constantroutes } from './routes'

// 使用 路由
Vue.use(VueRouter)

const createRouters = () => new VueRouter({
  // mode: 'history',
  // base: process.env.BASE_URL,
  routes: constantroutes
})

const router = createRouters()

// 解决多次点击路由报错问题
const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push (location) {
  return originalPush.call(this, location).catch(err => err)
}

// 重置 router
export function resetRouter () {
  const newRouter = createRouters()
  router.matcher = newRouter.matcher
}

export default router
