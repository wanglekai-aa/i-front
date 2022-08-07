import md5 from 'md5'
import { loginUser } from '@/api/sys'

export default {
  namespaced: true,
  state: () => {
    return {
      token: ''
    }
  },
  mutations: {
    // 保存 token
    setToken(state, newToken) {
      state.token = newToken
    }
  },
  actions: {
    // 登录
    async login(context, payload) {
      const { password } = payload
      const data = await loginUser({
        ...payload,
        password: password ? md5(password) : ''
      })
      console.log(data)
      context.commit('setToken', data.token)
    }
  }
}
