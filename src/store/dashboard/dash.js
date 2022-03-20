
const stateHandle = () => {
  return {
    barChartsInit: [],
    activeName: ''
  }
}

const state = stateHandle()

const mutations = {

  // 记录echarts init dom  根据窗口改变进行宽度重置
  CHANGE_BARCHARTSINIT (state, poly) {
    if (Array.isArray(poly) && !poly.length) {
      state.barChartsInit = []
      return
    }
    if (state.barChartsInit.length > 7) {
      return
    }
    state.barChartsInit.push(poly)
  },

  // 记录activeName
  CHANGE_ACTIVENAME (state, poly) {
    state.activeName = poly
  }
}

const actions = {

}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
