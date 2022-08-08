import axios from 'axios'
import store from '../store'
import { mMessage } from '../libs'
const request = axios.create({
  baseURL: import.meta.env.VITE_BASE_API,
  timeout: 5000
})

// 请求拦截器
request.interceptors.request.use((config) => {
  config.headers.icode = '5C05D847DC5F4978'
  const token = store.getters.token
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

// 响应拦截器
request.interceptors.response.use(
  (response) => {
    const { success, message, data } = response.data
    //   要根据success的成功与否决定下面的操作
    if (success) {
      return data
    } else {
      // TODO：业务错误
      mMessage('error', message)
      return Promise.reject(new Error(message))
    }
  },
  (err) => {
    mMessage('error', err.message)
  }
)

export default request
