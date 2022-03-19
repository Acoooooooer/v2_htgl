import { skuList, onSale, cancelSale, getSkuById, deleteSku } from 'apis/product/sku'
import { Message } from 'element-ui'
const message = (message, type) => { Message({ type, message }) }
const close = () => Message.closeAll()

const stateHandle = () => {
  return {
    skuList: [], // sku列表
    pagination: { // 分页器
      total: 0, // 总数
      sizes: [5, 8, 12],
      limit: 8, // 每页条数
      page: 1 // 当前页码
    },
    loading: false, // 加载中...
    drawerData: {} // 抽屉数据
  }
}

const state = stateHandle()

const mutations = {
  // 重置 state
  RESET_STATE (state, poly) {
    Object.assign(state, stateHandle()) // 将state 与 stateHandle() 合并
  },
  // 修改 skuList
  CHANGE_SKULIST (state, poly) {
    state.skuList = poly
  },
  // 修改 pagination
  CHANGE_PAGINATION (state, poly) {
    Object.assign(state.pagination, poly)
    // console.log({ ...state.pagination })
  },
  // 修改 loading
  CHANGE_LOADING (state, poly) {
    state.loading = poly
    // console.log({ ...state.pagination })
  },
  // 抽屉数据 drawerData
  CHANGE_DRAWERDATA (state, poly) {
    state.drawerData = poly
  }
}

const actions = {
  // 获取 sku 列表数据
  async skuListAsync ({ commit, state }, poly) {
    const result = await skuList(poly)
    if (result.code === 200) {
      const { records, total } = result.data
      // console.log(result)
      commit('CHANGE_SKULIST', records)
      commit('CHANGE_PAGINATION', { total })
      commit('CHANGE_LOADING', false)
    }
  },
  // 上架请求
  async sortUpOnSale ({ dispatch }, poly) {
    const result = await onSale(poly)
    if (result.code === 200) {
      close()
      message('上架成功', 'success')
    }
  },
  // 下架请求
  async sortDownCancelSale ({ dispatch }, poly) {
    const result = await cancelSale(poly)
    if (result.code === 200) {
      console.log(result)
      close()
      message('下架成功', 'success')
    }
  },
  // 获取 sku 某行数据的详情
  async getSkuById ({ commit }, poly) {
    const result = await getSkuById(poly)
    if (result.code === 200) {
      commit('CHANGE_DRAWERDATA', result.data)
    } else {
      // eslint-disable-next-line prefer-promise-reject-errors
      return Promise.reject(('获取数据失败'))
    }
    return result
  },
  // 获取 sku 某行数据的详情
  async deleteSku ({ dispatch, state }, poly) {
    const { skuList, pagination: { page } } = state
    const pageNum = skuList.length > 1 && page < 1 ? page : page - 1
    const result = await deleteSku(poly)
    if (result.code === 200) {
      dispatch('skuListAsync', { ...state.pagination, page: pageNum })
    }
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
