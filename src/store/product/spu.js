
const stateHandle = function () {
  return {
    sTable: {
      tableLabel: ['序号', 'SPU名称', 'SPU描述', '日期', '操作'],
      tableWidth: [100, 280, '', 200, 300],
      tableProp: ['id', 'attrName', 'attrValueList', 'timer', 'active'],
      attrList: [{}] // 数据列表
    },

    sForm: { // 三级联动 id
      category1Id: '',
      category2Id: '',
      category3Id: ''
    }
  }
}
const state = stateHandle()

const mutations = {
  // 重置
  RESET_STATE: (state) => {
    state = stateHandle()
  },
  // 修改 attrList
  CHANGE_S_TABLE: (state, poly) => {
    console.log(state, poly)
    // state.sTable.attrList = poly
  },
  // 修改 三级联动 id
  CHANGE_S_FORM: (state, poly) => {
    state.cForm = poly
  }

}

const actions = {
  // 异步请求 修改 attrList
  async getSpuList ({ dispatch, commit, getters, rootGetters }, poly) {
    // const rusult = await
    commit('CHANGE_S_TABLE', poly)
  }
}

export default {
  namespace: true,
  state,
  mutations,
  actions
}
/**
 *
 */
