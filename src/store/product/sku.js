import { skuList } from 'apis/product/sku'
const stateHandle = () => {
  return {
    skuList: [] // sku列表
  }
}

const state = stateHandle()

const mutations = {
  // 重置 state
  RESET_STATE (state, poly) {
    Object.assign(state, stateHandle()) // 将state 替换为 stateHandle()
  },
  // 修改 skuList
  CHANGE_SKULIST (state, poly) {
    state.skuList = poly
  }
}

const actions = {
  // 获取 sku 列表数据
  async skuList ({ commit }, poly) {
    const result = await skuList()
    if (result.code === 200) {
      console.log(result)
      // commit('CHANGE_SKULIST', result.data)
    }
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
