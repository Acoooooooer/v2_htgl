import {
  getSpuDate,
  getSpuById,
  getTrademarkList,
  spuImageList,
  baseSaleAttrList,
  saveSpuInfo,
  updateSpuInfo,
  deleteSpu,
  skuImageList,
  skuSaleAttrList,
  skuAttrInfoList,
  skuSaveSkuInfo,
  skuFindBySpuId
} from 'apis/product/spu'

import { Message } from 'element-ui'

const spuData = () => ({
  category3Id: '',
  description: '', // 描述
  tmId: '', // 品牌id
  spuName: '',
  spuImageList: [], // 图片
  spuSaleAttrList: []// 平台属性
})

const skuData = () => ({
  category3Id: 0,
  spuId: 0,
  tmId: 0,
  spuName: '',

  skuName: '',
  price: '', // 价格
  weight: '',
  skuDefaultImg: '',
  skuDesc: '',
  skuAttrValueList: [ // 平台属性
    // {
    //   attrId: 0,
    //   valueId: 0,
    // }
  ],
  skuImageList: [ // 图片
    // {
    //   id: 0,
    //   imgName: '',
    //   imgUrl: '',
    //   isDefault: '',
    //   skuId: 0,
    //   spuImgId: 0
    // }
  ],
  skuSaleAttrValueList: [ // 销售属性
    // {
    //   saleAttrId: 0,
    //   saleAttrValueId: 0,
    // }
  ]

})

const stateHandle = () => {
  return {
    sTable: { // spu
      tableLabel: ['序号', 'SPU名称', 'SPU描述', '日期', '操作'],
      tableWidth: [100, 280, '', 230, 300],
      tableProp: ['id', 'spuName', 'description', 'timer', 'active'],
      spuList: [] // 数据列表
    },

    kTable: { // sku
      tableLabel: ['图片', '名称', '操作'],
      tableWidth: [300, '', 300],
      tableProp: ['imgUrl', 'imgName', 'active'],
      spuList: [] // table 数据列表
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
    saleAttrList: [], // 平台全部销售属性

    skuData: skuData(), // skuData
    attrInfoList: [],
    skuSaleAttrList: [],

    skuFromSpuList: []// 查看sku列表
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
  // 修改 spuData中的属性
  CHANGE_SPUIMAGELIST: (store, { name, value }) => {
    store.spuData[name] = value
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
  },

  // 修改 kTable
  CHANGE_STABLE (store, poly) {
    if (poly.name) {
      store.kTable[poly.name] = poly.value
    } else {
      store.kTable = poly
    }
  },

  // 修改 skuData
  CHANGE_SKUDATA (store, poly) {
    if (poly.name) {
      store.skuData[poly.name] = poly.value
      console.log(poly, store.skuDate)
    } else {
      store.skuData = { ...store.skuData, ...poly }
    }
  },
  // 修改 attrInfoList
  CHANGE_ATTRINFOLIST (store, poly) {
    store.attrInfoList = poly
  },
  // 修改 skuSaleAttrList
  CHANGE_SKUSALEATTRLIST (store, poly) {
    store.skuSaleAttrList = poly
  },
  // 重置 skuSaleAttrList
  RESET_SKUDATA (store, poly) {
    store.skuData = skuData()
  },
  // 修改 skuFromSpuList
  CHANGE_SKUFROMSPULIST (store, poly) {
    store.skuFromSpuList = poly
  }
}

const actions = {
  // 修改 spuList
  async getSpuDate ({ commit, rootGetters }, poly) {
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
  async baseSaleAttrList ({ commit }, poly) {
    const result = await baseSaleAttrList()

    if (result.code === 200) {
      commit('CHANGE_SALEATTRLIST', result.data)
    }
  },
  // 修改 或 添加
  async saveOrUpdateSpu ({ commit, dispatch, state }, poly) {
    const { sForm: { category3Id }, pagination: { limit }, spuData } = state

    const arr = state.spuImage.map(val => {
      const { name, imgName, imgUrl, response } = val
      return {
        imgName: name || imgName,
        imgUrl: imgUrl || response.data
      }
    })

    commit('CHANGE_SPUIMAGELIST', { name: 'spuImageList', value: arr })
    commit('CHANGE_SPUIMAGELIST', { name: 'category3Id', value: category3Id })

    const result = spuData.id ? await updateSpuInfo(spuData) : await saveSpuInfo(spuData)
    if (result.code === 200) {
      Message({ type: 'success', message: '保存成功' })
      dispatch('getSpuDate', { category3Id, limit, page: 1 })
      commit('CHANGE_SENCE', 0)
      commit('RESET_ADD_DATA')
    }
  },
  // 删除spu
  async deleteSpu ({ dispatch, commit, state }, poly) {
    const { sForm: { category3Id }, pagination: { limit, page }, sTable: { spuList } } = state

    const result = await deleteSpu(poly)

    const pageNum = spuList.length > 1 && page < 1 ? page : page - 1

    if (result.code === 200) {
      commit('CHANGE_PAGIN', { page: pageNum })
      dispatch('getSpuDate', { category3Id, limit, page: pageNum })
      Message({ type: 'success', message: '删除成功' })
    }
  },

  // ................
  // 获取图片接口
  async skuImageList ({ commit }, poly) {
    const result = await skuImageList(poly)
    if (result.code === 200) {
      const value = result.data.map(v => {
        v.isDefault = 0
        return v
      })
      commit('CHANGE_STABLE', { value, name: 'spuList' })
    }
  },
  // 获取销售属性
  async skuSaleAttrList ({ commit }, poly) {
    const result = await skuSaleAttrList(poly)

    if (result.code === 200) {
      commit('CHANGE_SKUSALEATTRLIST', result.data)
    }
  },

  // 获取平台属性
  async skuAttrInfoList ({ commit }, poly) {
    const result = await skuAttrInfoList(poly)
    if (result.code === 200) {
      commit('CHANGE_ATTRINFOLIST', result.data)
    }
  },
  // 保存
  async skuSaveSkuInfo ({ commit, state }, poly) {
    console.log('skuSave', poly)

    const skuAttrValueList = state.attrInfoList.map(v => {
      if (v.idAndAttrId) {
        const arr = v.idAndAttrId.split(':')
        return { attrId: arr[1], valueId: arr[0] }
      }
      return false
    }).filter(v => v)

    const skuSaleAttrValueList = state.skuSaleAttrList.map(v => {
      if (v.idAndValueId) {
        const arr = v.idAndValueId.split(':')
        return { saleAttrId: arr[0], saleAttrValueId: arr[1] }
      }
      return false
    }).filter(v => v)

    const skuImageList = Array.isArray(poly)
      ? poly.map(v => ({
        spuImgId: v.id,
        imgName: v.imgName,
        imgUrl: v.imgUrl,
        isDefault: v.isDefault
      }))
      : []

    commit('CHANGE_SKUDATA', { skuAttrValueList, skuSaleAttrValueList, skuImageList })

    const result = await skuSaveSkuInfo(state.skuData)

    if (result.code === 200) {
      Message({ type: 'success', message: '添加成功' })
      commit('CHANGE_SENCE', 0)
      commit('RESET_SKUDATA')
    }
  },
  // 查看当前spu的sku列表
  async skuFindBySpuId ({ commit }, poly) {
    const result = await skuFindBySpuId(poly)
    if (result.code === 200) {
      console.log(result.data)
      commit('CHANGE_SKUFROMSPULIST', result.data)
      return result.data
    }
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
