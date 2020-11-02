const state = {
  collapse: true,
  currentModule: null
}

const mutations = {
  TOGGLE_SIDEBAR(state) {
    state.collapse = !state.collapse
  },
  SET_CURRENT_MODULE(state, module) {
    state.currentModule = module
  }
}

const actions = {
  toggleSidebar({ commit }) {
    commit('TOGGLE_SIDEBAR')
  },
  setCurrentModule({ commit }, module) {
    commit('SET_CURRENT_MODULE', module)
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
