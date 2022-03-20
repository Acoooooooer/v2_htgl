import {
  service as request
  // post,
  // get,
} from 'util/request'

const apis = {
  login: '/admin/acl/index/login',
  getInfo: '/admin/acl/index/info',
  logout: '/admin/acl/index/logout'
}

// const mock = {
//   login: '/vue-admin-template/user/login',
//   getInfo: '/vue-admin-template/user/info',
//   logout: '/vue-admin-template/user/logout'
// }

// const str = 'apis'
// const res = str === 'mock' ? mock : apis
const res = apis
// 登录
export function login (data) {
  return request({
    url: res.login,
    method: 'post',
    data
  })
}

// 获取用户信息
export function getInfo (token) {
  return request({
    url: res.getInfo,
    method: 'get',
    params: { token }
  })
}

// 退出
export function logout () {
  return request({
    url: res.logout,
    method: 'post'
  })
}

// 权限列表
export function permission () {
  return request({
    // url: `/admin/acl/role/${1}/${1000000}`,
    // url: `/admin/acl/role/get/${'1505411139111710721'}`,
    url: `/admin/acl/user/${1}/${1000000}`,
    // url: `/admin/acl/user/get/${'1505070813901713409'}`,
    method: 'get'
  })
}
