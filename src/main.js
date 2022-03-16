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
import timer from 'util/momentZh'
import _ from 'loadsh'

// 三级联动
import CardThreeSelect from 'com/CardThreeSelect'

// mock
// if (process.env.NODE_ENV === 'development') {
//   const { mockXHR } = require('../mock')
//   mockXHR()
// }

Vue.component(CardThreeSelect.name, CardThreeSelect)

// apis
Vue.prototype.$apis = API
// moment
Vue.prototype.$timer = timer
// loadsh
Vue.prototype.$lds = _

Vue.config.productionTip = false

Vue.use(ElementUI, { locale })

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
