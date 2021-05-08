const routerQueue = {
  state: {
    cache: []
  },
  mutations: {
    SET_CACHE (state, cache) {
      let i = state.cache.findIndex(v => v === cache)
      if (i > -1) {
        if (i === 0) {
          state.cache = state.cache.slice(0, 1)
        } else {
          state.cache = state.cache.slice(0, i + 1)
        }
      } else {
        state.cache.push(cache)
      }
    }
  },
  actions: {
    setCache ({ commit }, cache) {
      commit('SET_CACHE', cache)
    }
  }
}
export default routerQueue
