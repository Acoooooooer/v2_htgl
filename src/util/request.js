import axios from 'axios'
import { MessageBox, Message } from 'element-ui'
import store from 'ste'
import { getToken } from './auth' // token

// axios封装

const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API, // base url + request url
  timeout: 50000
})

// 请求拦截
service.interceptors.request.use(
  config => {
    // console.log('config >>>>', config.headers.token)
    if (store.getters && store.getters.token) {
      config.headers.token = getToken() // 权限验证
    }
    return config // 进行下一步操作
  },
  err => {
    console.log('request error >>>>', err)
    return Promise.resolve(err) // 返回错误信息
  }
)

// 响应拦截
service.interceptors.response.use(
  response => {
    const { data: res } = response

    if (res.code !== 200 && res.code !== 20000) { // 状态码
      Message({ // 顶部提示
        message: res.message,
        type: 'error',
        duration: 5 * 1000
      })

      if (res.code === 50008 || res.code === 50012 || res.code === 50014) {
        MessageBox.confirm('xxxx', 'xxx', {
          confirmButtonText: 'Cancel', // 确认
          cancelButtonText: 'Re-Login', // 取消
          type: 'warning'
        })
          .then(() => {
            store.dispatch('user/resetToken').then(() => {
              location.reload() // 刷新文档
            })
          })
      }

      return Promise.reject(new Error(res.message || 'Error'))
    } else {
      return res
    }
  },
  err => {
    console.log('respond error >>>>', err)
    Message({ // 顶部提示
      message: err.message,
      type: 'error',
      duration: 5 * 1000
    })
    return Promise.resolve(err) // 返回错误信息
  }
)

function post ({ url, data }) {
  return service({
    url,
    data,
    method: 'post'
  })
}

function get ({ url, params }) {
  return service({
    url,
    params,
    method: 'get'
  })
}

export { service, post, get }
