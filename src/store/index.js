import Vue from 'vue'
import Vuex from 'vuex'
import getters from './getters'
import app from './modules/app'
import settings from './modules/settings'
import user from './modules/user'
import trademark from './product/trademark'
import spu from './product/spu'
import sku from './product/sku'
import dash from './dashboard/dash'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    app,
    settings,
    user,
    trademark,
    spu,
    sku,
    dash
  },
  getters
})

export default store
