import axios from 'axios'
import store from '@/store'
import { Dialog } from 'quasar'
import { getToken, TokenKey } from '@/utils/auth'

const service = axios.create({
  // baseURL: process.env.VUE_APP_BASE_API, // url = base url + request url
  // withCredentials: true, // send cookies when cross-domain requests
  // 请求超时时间
  timeout: 3000
})

// 添加请求拦截器
service.interceptors.request.use(
  config => {
    // 请求成功的回调，可以对请求的信息进行修改
    // 加入token的信息
    if (store.state.auth.token) {
      // 使每个请求都带上token
      // ['CD-Token'] 是与后端约定的存在header中token的键名
      config.headers[TokenKey] = getToken()
    }

    return config
  },
  error => {
    // 请求失败的回调
    console.log(error)
    return Promise.reject(error)
  }
)

// 添加响应拦截器
service.interceptors.response.use(
  response => {
    // 响应成功回调，返回响应信息
    // 一般在这里对后端返回的数据做一个统一的处理
    const res = response.data
    // 判断是否成功
    if (res.code !== 20000) {
      Message({
        message: res.message || 'Error',
        type: 'error',
        duration: 3000
      })

      if (res.code === 50003 || res.code === 50004) {
        // token失效或异地登录，提醒用户登出
        MessageBox.confirm('您的账号已登出，请重新登录！', '确认登出', {
          confirmButtonText: '重新登录',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          store.dispatch('auth/resetToken').then(() => {
            location.reload()
          })
        })
      }

      return Promise.reject(new Error(res.message || 'Error'))
    } else {
      return res
    }
  },
  error => {
    console.log(error)
    Message({
      message: error.message,
      type: 'error',
      duration: 3 * 1000
    })
    return Promise.reject(error)
  }
)

export default service
