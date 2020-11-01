const state = {
  tabList: [],
  cachedTabs: []
}

const mutations = {
  ADD_TAB(state, tab) {
    if (state.tabList.some(item => item.path === tab.path)) {
      return
    }
    state.tabList.push(
      Object.assign({}, tab, {
        title: tab.meta.title || '未知标签页'
      })
    )
  },
  ADD_CACHED_TAB: (state, tab) => {
    if (state.cachedTabs.includes(tab.name)) return
    if (!tab.meta.noCache) {
      state.cachedTabs.push(tab.name)
    }
  },

  DEL_TAB(state, tab) {
    for (const [i, v] of state.tabList.entries()) {
      if (v.path === tab.path) {
        state.tabList.splice(i, 1)
        break
      }
    }
  },
  DEL_CACHED_TAB: (state, tab) => {
    const index = state.cachedTabs.indexOf(tab.name)
    index > -1 && state.cachedTabs.splice(index, 1)
  },

  DEL_OTHER_TABS(state, tab) {
    state.tabList = state.tabList.filter(
      item => item.meta.affix || item.path === tab.path
    )
  },
  DEL_OTHER_CACHED_TABS: (state, tab) => {
    const index = state.cachedTabs.indexOf(tab.name)
    if (index > -1) {
      state.cachedTabs = state.cachedTabs.slice(index, index + 1)
    } else {
      // if index = -1, there is no cached tags
      state.cachedTabs = []
    }
  },

  DEL_ALL_TABS(state) {
    state.tabList = state.tabList.filter(item => item.meta.affix)
  },
  DEL_ALL_CACHED_TABS: state => {
    state.cachedTabs = []
  },

  UPDATE_TAB(state, tab) {
    // path未改变，其他属性有变动
    for (let t of state.tabList) {
      if (t.path === tab.path) {
        t = Object.assign(t, tab)
        break
      }
    }
  }
}

const actions = {
  addView({ dispatch }, view) {
    dispatch('addTab', view)
    dispatch('addCachedTab', view)
  },
  addTab({ commit }, tag) {
    commit('ADD_TAB', tag)
  },
  addCachedTab({ commit }, view) {
    commit('ADD_CACHED_TAB', view)
  },

  delView({ dispatch, state }, view) {
    return new Promise(resolve => {
      dispatch('delTab', view)
      dispatch('delCachedTab', view)
      resolve({
        tabList: [...state.tabList],
        cachedTabs: [...state.cachedTabs]
      })
    })
  },
  delTab({ commit, state }, tag) {
    return new Promise(resolve => {
      commit('DEL_TAB', tag)
      resolve([...state.tabList])
    })
  },
  delCachedTab({ commit, state }, view) {
    return new Promise(resolve => {
      commit('DEL_CACHED_TAB', view)
      resolve([...state.cachedTabs])
    })
  },

  delOthersViews({ dispatch, state }, view) {
    return new Promise(resolve => {
      dispatch('delOtherTabs', view)
      dispatch('delOtherCachedTabs', view)
      resolve({
        tabList: [...state.tabList],
        cachedTabs: [...state.cachedTabs]
      })
    })
  },
  delOtherTabs({ commit, state }, tag) {
    return new Promise(resolve => {
      commit('DEL_OTHER_TABS', tag)
      resolve([...state.tabList])
    })
  },
  delOtherCachedTabs({ commit, state }, view) {
    return new Promise(resolve => {
      commit('DEL_OTHER_CACHED_TABS', view)
      resolve([...state.cachedTabs])
    })
  },

  delAllViews({ dispatch, state }, view) {
    return new Promise(resolve => {
      dispatch('delAllTabs', view)
      dispatch('delAllCachedTabs', view)
      resolve({
        tabList: [...state.tabList],
        cachedTabs: [...state.cachedTabs]
      })
    })
  },
  delAllTabs({ commit, state }) {
    return new Promise(resolve => {
      commit('DEL_ALL_TABS')
      resolve([...state.tabList])
    })
  },
  delAllCachedTabs({ commit, state }) {
    return new Promise(resolve => {
      commit('DEL_ALL_CACHED_TABS')
      resolve([...state.cachedTabs])
    })
  },

  updateView({ commit }, tab) {
    commit('UPDATE_TAB', tab)
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
