import Vue from 'vue'

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
// 中文
import locale from 'element-ui/lib/locale/lang/zh-CN'

import App from './App.vue'
import router from './router'
import store from './store'

// global css
import 'styles/index.less'

import 'icons'
// iconfont
import 'assets/iconfont/iconfont.css'
import '@/permission'

import API from 'apis'
import timer from '@/momentZh'
import _ from 'loadsh'

// apis
Vue.prototype.$apis = API
// moment
Vue.prototype.$timer = timer
// loadsh
Vue.prototype.$ldh = _

Vue.config.productionTip = false

// mock
// if (process.env.NODE_ENV === 'development') {
//   const { mockXHR } = require('../mock')
//   mockXHR()
// }

Vue.use(ElementUI, { locale })

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
