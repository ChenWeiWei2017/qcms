import { login, logout, getInfo } from '@/api/auth'
import { getToken, setToken, removeToken } from '@/utils/auth'
import { resetRouter } from '@/router'

const state = {
  token: getToken(),
  name: '',
  avatar: '',
  roles: []
}

const mutations = {
  SET_TOKEN: (state, token) => {
    state.token = token
  },
  SET_NAME: (state, name) => {
    state.name = name
  },
  SET_AVATAR: (state, avatar) => {
    state.avatar = avatar
  },
  SET_ROLES: (state, roles) => {
    state.roles = roles
  }
}

const actions = {
  // user login
  login({ commit }, userInfo) {
    const { username, password, smsCode } = userInfo
    return new Promise((resolve, reject) => {
      login({ username: username.trim(), password, smsCode: smsCode.trim() })
        .then(response => {
          commit('SET_TOKEN', response.data)
          setToken(response.data)
          resolve()
        })
        .catch(error => {
          reject(error)
        })
    })
  },

  // user logout
  logout({ commit, dispatch }) {
    return new Promise((resolve, reject) => {
      logout()
        .then(() => {
          commit('SET_TOKEN', '')
          commit('SET_ROLES', [])
          removeToken()
          resetRouter()

          // reset visited views and cached views
          // to fixed https://github.com/PanJiaChen/vue-element-admin/issues/2485
          dispatch('tab/delAllViews', null, { root: true })

          resolve()
        })
        .catch(error => {
          reject(error)
        })
    })
  },

  // get user info
  getInfo({ commit }) {
    return new Promise((resolve, reject) => {
      getInfo()
        .then(response => {
          const { data } = response

          if (!data) {
            reject('验证失败，请重新登录！')
          }

          const { roles, name, avatar } = data

          // roles must be a non-empty array
          if (!roles || roles.length <= 0) {
            reject('getInfo: 权限信息不能为空！')
          }

          commit('SET_ROLES', roles)
          commit('SET_NAME', name)
          commit('SET_AVATAR', avatar)
          resolve(data)
        })
        .catch(error => {
          reject(error)
        })
    })
  },

  // remove token
  resetToken({ commit }) {
    return new Promise(resolve => {
      commit('SET_TOKEN', '')
      commit('SET_ROLES', [])
      removeToken()
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
