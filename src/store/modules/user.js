import lds from 'loadsh'
// 登录 、退出、用户接口信息
import { login, logout, getInfo, permission } from 'apis/user'
// taoken
import { getToken, setToken, removeToken } from 'util/auth'
// 重置
import router, { resetRouter } from 'rou'
// 路由
import { constantroutes, asyroutes } from 'rou/routes'

const getDefaultState = () => {
  return {
    // main: ''
    token: getToken(),
    name: '',
    avatar: '', // 头像
    routes: [], // 菜单权限
    roles: [], // 用户角色
    buttons: [], // 按钮权限
    filterAsyncRoutes: [], // 已有异步路由和返回的标记信息 对比后的路由
    AllRoutes: [] // 合并路由
  }
}

const state = getDefaultState()

const mutations = {
  RESET_STATE: (state) => {
    Object.assign(state, getDefaultState())
  },

  SET_TOKEN: (state, token) => {
    state.token = token
  },

  // 存储用户信息
  SET_USERINFO: (state, userInfo) => {
    const { name, avatar, routes, roles, buttons } = userInfo
    state.name = name
    state.avatar = avatar
    state.routes = routes.push('AddItem')
    state.roles = roles
    state.buttons = buttons
  },

  // 将 处理后的路由进行  赋值state
  SET_SETROUTES (state, filterAsyncRoutes) {
    // 过滤 routes
    state.filterAsyncRoutes = filterAsyncRoutes
    // 合并路由
    state.AllRoutes = [...constantroutes, ...filterAsyncRoutes]
    filterAsyncRoutes.forEach(v => {
      router.addRoute(v)
    })
    // router.push({ path: '' })
    router.back()
  }

}

const actions = {
  //  login
  async login ({ commit }, userInfo) {
    const { username, password } = userInfo
    const result = await login({ username: username.trim(), password })
    if (result.code === 20000) {
      commit('SET_TOKEN', result.data.token)
      setToken(result.data.token)
      return '登陆成功!'
    } else {
      return Promise.reject(new Error('error'))
    }
  },

  // 获取用户信息
  async getInfo ({ commit, state }, poly) {
    const result = await getInfo(state.token)
    if (result.data && result.code === 20000) {
      // 存储全部信息
      commit('SET_USERINFO', result.data)
      commit('SET_SETROUTES', computedAsyRutes(lds.cloneDeep(asyroutes), result.data.routes))
      return result.data
    } else {
      return Promise.reject(new Error('Verification failed, please Login again.'))
    }
  },

  // logout
  async logout ({ commit, state }) {
    const result = await logout(state.token)
    if (result.data && result.code === 20000) {
      removeToken() // must remove  token  first
      resetRouter()
      commit('RESET_STATE')
      return 'OK'
    } else {
      return Promise.reject(new Error('error'))
    }
  },

  // remove token
  resetToken ({ commit }) {
    return new Promise(resolve => {
      removeToken() // must remove  token  first
      commit('RESET_STATE')
      resolve()
    })
  },

  // remove token
  async permission ({ commit }) {
    const result = await permission()
    console.log(result)
  }

}

// 遍历权限路由
const computedAsyRutes = (asyroutes, dataroutes) => {
  const routes = asyroutes.filter(v => {
    if (v.children && v.children.length) {
      v.children = computedAsyRutes(v.children, dataroutes)
    }
    return dataroutes.includes(v.name)
  })
  return routes
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
