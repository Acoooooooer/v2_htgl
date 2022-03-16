import {
  getSpuDate,
  getSpuById,
  getTrademarkList,
  spuImageList,
  baseSaleAttrList
} from 'apis/product/spu'
const spuData = () => ({
  category3Id: '',
  description: '', // 描述
  tmId: '', // 品牌id
  spuName: '',
  spuImageList: [ // 图片
    // {
    //   id: 0,
    //   imgName: '',
    //   imgUrl: '',
    //   spuId: 0
    // }
  ],
  spuSaleAttrList: [ // 平台属性
    // {
    //   baseSaleAttrId: 0,
    //   id: 0,
    //   saleAttrName: '',
    //   spuId: 0,
    //   spuSaleAttrValueList: [
    //     {
    //       baseSaleAttrId: 0,
    //       id: 0,
    //       isChecked: '',
    //       saleAttrName: '',
    //       saleAttrValueName: '',
    //       spuId: 0
    //     }
    //   ]
    // }
  ]
})
const stateHandle = () => {
  return {
    sTable: {
      tableLabel: ['序号', 'SPU名称', 'SPU描述', '日期', '操作'],
      tableWidth: [100, 280, '', 230, 300],
      tableProp: ['id', 'spuName', 'description', 'timer', 'active'],
      spuList: [] // 数据列表
    },

    sForm: { // 三级联动 id
      category1Id: '',
      category2Id: '',
      category3Id: ''
    },

    pagination: { // 分页器
      total: 0, // 总数
      sizes: [5, 8, 12],
      limit: 8, // 每页条数
      page: 1 // 当前页码
    },

    scene: 0, // 切换组件 0 index , 1 spu , 2 sku
    isShowTable: true, // 三级联动是否可选
    spuData: spuData(), // spu信息
    tradmarkData: [{ a: 1 }], // 品牌信息
    spuImage: [], // spu图片
    saleAttrList: [] // 平台全部销售属性
  }
}

const state = stateHandle()

const mutations = {
  // 重置
  RESET_STATE: (state) => {
    Object.assign(state, stateHandle())
  },
  // 修改 spuList
  CHANGE_S_TABLE: (state, poly) => {
    state.sTable = { ...state.sTable, ...poly }
  },
  // 修改 三级联动 id
  CHANGE_S_FORM: (state, poly) => {
    state.sForm = { ...state.sForm, ...poly }
  },
  // 修改 分页器
  CHANGE_PAGIN: (store, poly) => {
    store.pagination = { ...store.pagination, ...poly }
  },
  // 修改 sence
  CHANGE_SENCE: (store, poly) => {
    store.scene = poly
  },
  // 修改 isShowTable
  CHANGE_IS_SHOWTABLE: (store, poly) => {
    store.isShowTable = poly
  },
  // 修改 spuData
  CHANGE_SPU_DATA: (store, poly) => {
    store.spuData = poly
  },
  // 修改 tradmarkData
  CHANGE_TRADMARK_DATA: (store, poly) => {
    store.tradmarkData = poly
  },
  // 修改 spuImage
  CHANGE_SPU_IMAGE: (store, poly) => {
    store.spuImage = poly
  },
  // 修改 saleAttrList
  CHANGE_SALEATTRLIST: (store, poly) => {
    store.saleAttrList = poly
  },
  // 重置 addSpu页面的数据
  RESET_ADD_DATA: (store, poly) => {
    store.spuData = spuData()
    store.tradmarkData = []
    store.spuImage = []
    store.saleAttrList = []
  },

  // 销售属性添加  spuSaleAttrList
  SET_SPUSALEATTRLIST (store, poly) {
    store.spuData.spuSaleAttrList.push(poly)
  },
  // 销售属性删除  spuSaleAttrList
  DEL_SPUSALEATTRLIST (store, poly) {
    store.spuData.spuSaleAttrList.splice(poly, 1)
  }
}

const actions = {
  // 异步请求 修改 spuList
  async getSpuDate ({ dispatch, commit, getters, rootGetters }, poly) {
    const result = await getSpuDate(poly)
    if (result.code === 200 && result.ok) {
      const { total, records } = result.data
      commit('CHANGE_S_TABLE', { spuList: rootGetters.timer(records) })
      commit('CHANGE_PAGIN', { total })
    }
  },
  // 获取spu信息
  async getSpuById ({ commit, rootGetters }, poly) {
    const result = await getSpuById(poly)
    if (result.code === 200) {
      rootGetters.timer(result.data.spuSaleAttrList)
      commit('CHANGE_SPU_DATA', result.data)
    }
  },
  // 获取品牌信息
  async getTrademarkList ({ commit }, poly) {
    const result = await getTrademarkList()
    if (result.code === 200) {
      commit('CHANGE_TRADMARK_DATA', result.data)
    }
  },
  // spu图片
  async spuImageList ({ commit }, poly) {
    const result = await spuImageList(poly)
    if (result.code === 200) {
      result.data.map(v => {
        v.url = v.imgUrl
        v.name = v.imgName
        return v
      })
      commit('CHANGE_SPU_IMAGE', result.data)
    }
  },
  // 平台全部销售属性
  async baseSaleAttrList ({ commit, rootGetters }, poly) {
    const result = await baseSaleAttrList()
    if (result.code === 200) {
      commit('CHANGE_SALEATTRLIST', result.data)
    }
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
