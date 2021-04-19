import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    page:"home"
  },
  mutations: {
    'SET_PAGE_TITLE' (state, name) {
      state.page = name;
    }
  },
  actions: {
  },
  modules: {
  }
})
