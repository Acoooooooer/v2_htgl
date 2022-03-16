import router from './router'
import store from './store'
import { Message } from 'element-ui'
import NProgress from 'nprogress' // 进度条插件,提高用户体验
import 'nprogress/nprogress.css' // style
import { getToken } from 'util/auth' //  token
import getPageTitle from 'util/get-page-title'

NProgress.configure({ showSpinner: false })

const whiteList = ['/login'] // no redirect whitelist

router.beforeEach(async (to, from, next) => {
  // start progress bar
  NProgress.start()

  // 面包屑、trademark页面、侧边栏 点击修改isSHow，统一设置
  if (to.path === '/trademark/additem') {
    store.commit('trademark/CHANGE_IS_SHOW', true)
  }
  if (to.path === '/trademark') {
    store.commit('trademark/CHANGE_IS_SHOW', false)
  }

  if (getToken()) { // 是否有token
    if (to.path === '/login') {
      next({ path: '/' })
      NProgress.done()
    } else {
      const hasGetUserInfo = store.getters.name
      if (hasGetUserInfo) {
        next()
      } else {
        try {
          // get user info
          await store.dispatch('user/getInfo')
          next()
        } catch (error) {
          // remove token
          await store.dispatch('user/resetToken')
          Message.error(error || 'Has Error')
          // 如果从其他页面退到了login.   下次进入直接跳转到该页
          next(`/login?redirect=${to.path}`)
          NProgress.done()
        }
      }
    }
  } else {
    /*  no token */
    if (whiteList.includes(to.path)) {
      next()
    } else {
      // 如果从其他页面退到了login.   下次进入直接跳转到该页
      next(`/login?redirect=${to.path}`)
      NProgress.done()
    }
  }
})

router.afterEach((to, from) => {
  // 获取title,添加到 document.title
  document.title = getPageTitle(to.meta.title)
  NProgress.done()
})
