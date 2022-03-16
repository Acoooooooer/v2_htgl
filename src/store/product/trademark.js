const state = {
  isShow: false // 新建页面的开关
}

const mutations = {
  CHANGE_IS_SHOW: (state, value) => {
    state.isShow = value
  }
}

export default {
  namespaced: true,
  state,
  mutations
}
