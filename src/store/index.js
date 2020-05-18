import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'
Vue.use(Vuex)

export default new Vuex.Store({
  plugins: [createPersistedState()],
  state: {
    index: 0,
    prompt: '123456'
  },
  mutations: {
    changeIndex(state, num) {
      state.index = num
    },
    changePrompt(state, str) {
      state.prompt = str
    }
  },
  actions: {
  },
  modules: {
  }
})
