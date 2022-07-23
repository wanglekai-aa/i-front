import axios from 'axios'

const request = axios.create({
  baseURL: '',
  timeout: 5000
})

// 响应拦截器
request.interceptors.response.use((response) => {
  const { success, message, data } = response.data
  //   要根据success的成功与否决定下面的操作
  if (success) {
    return data
  } else {
    // TODO：业务错误
    return Promise.reject(new Error(message))
  }
})

export default request
