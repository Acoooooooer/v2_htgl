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
// 全局守卫
import '@/permission'

import API from 'apis'
import timer from 'util/momentZh'
import _ from 'loadsh'

// echarts 引入
import * as echarts from 'echarts'
// import map from './map.json'

/** 组件引入 */
// 三级联动
import CardThreeSelect from 'com/CardThreeSelect'
// button 按钮
import HinButton from 'com/HinButton'
// card  echarts
import CardDashBoard from 'com/CardDashBoard'

/**
 *
 *
 *
 */

Vue.component(CardThreeSelect.name, CardThreeSelect)
Vue.component(HinButton.name, HinButton)
Vue.component(CardDashBoard.name, CardDashBoard)

/** **** apis *****/
Vue.prototype.$apis = API

/** **** moment *****/
Vue.prototype.$timer = timer

/** **** loadsh *****/
Vue.prototype.$lds = _

/** **** echarts *****/
// echarts.registerMap('china', map) // 注册中国地图
Vue.prototype.$echarts = echarts

Vue.config.productionTip = false

Vue.use(ElementUI, { locale })

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

// mock
// if (process.env.NODE_ENV === 'development') {
//   const { mockXHR } = require('../mock')
//   mockXHR()
// }
