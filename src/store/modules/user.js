import md5 from 'md5'
import { loginUser, getProfile } from '@/api/sys'
import { mMessage } from '@/libs'

export default {
  namespaced: true,
  state: () => {
    return {
      token: '',
      userInfo: ''
    }
  },
  mutations: {
    // 保存 token
    setToken(state, newToken) {
      state.token = newToken
    },
    // 保存用户信息
    setUserInfo(state, newUserInfo) {
      state.userInfo = newUserInfo
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
      context.dispatch('profile')
    },
    // 获取用户信息
    async profile(context) {
      const data = await getProfile()
      context.commit('setUserInfo', data)
      mMessage(
        'success',
        `欢迎您 ${
          data.vipLevel
            ? ' 尊贵的 VIP ' + data.vipLevel + ' 用户 ' + data.nickname
            : data.nickname
        }`,
        6000
      )
    }
  }
}
