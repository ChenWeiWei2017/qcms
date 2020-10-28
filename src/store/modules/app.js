const state = {
  collapse: true
}

const mutations = {
  TOGGLE_SIDEBAR(state) {
    state.collapse = !state.collapse
  }
}

const actions = {
  toggleSidebar({ commit }) {
    commit('TOGGLE_SIDEBAR')
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
