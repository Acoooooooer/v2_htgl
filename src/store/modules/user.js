import { login, logout, getInfo } from 'apis/user'
import { getToken, setToken, removeToken } from 'util/auth'
import { resetRouter } from 'rou'

const getDefaultState = () => {
  return {
    token: getToken(),
    name: '',
    avatar: '',
    main: ''
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
  SET_NAME: (state, name) => {
    state.name = name
  },
  SET_AVATAR: (state, avatar) => {
    state.avatar = avatar
  }
}

const actions = {
  // user login
  async login ({ commit }, userInfo) {
    const { username, password } = userInfo
    const result = await login({ username: username.trim(), password: password })
    if (result.code === 20000) {
      commit('SET_TOKEN', result.data.token)
      setToken(result.data.token)
      return '登陆成功!'
    } else {
      return Promise.reject(new Error('error'))
    }
  },

  // get user info
  async getInfo ({ commit, state }) {
    const result = await getInfo(state.token)
    if (result.data && result.code === 20000) {
      commit('SET_NAME', result.data.name)
      commit('SET_AVATAR', result.data.avatar)
      return result.data
    } else {
      return Promise.reject(new Error('Verification failed, please Login again.'))
    }
  },

  // user logout
  async logout ({ commit, state }) {
    // const result = logout(state.token)
    // if (result.data && result.code === 20000) {
    //   removeToken() // must remove  token  first
    //   resetRouter()
    //   commit('RESET_STATE')
    //   return 'OK'
    // } else {
    //   return Promise.reject(new Error('error'))
    // }
    return new Promise((resolve, reject) => {
      logout(state.token).then(() => {
        removeToken() // must remove  token  first
        resetRouter()
        commit('RESET_STATE')
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },

  // remove token
  resetToken ({ commit }) {
    return new Promise(resolve => {
      removeToken() // must remove  token  first
      commit('RESET_STATE')
      resolve()
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
