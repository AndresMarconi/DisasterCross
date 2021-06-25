import Vue from 'vue'
import Vuex from 'vuex'
import { topics, users } from '@/firebase.js'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    page: "home",
    loading: false,
    snackBar: false,
    snackText: "",
    currentWorldAdmin: null,
    currentLevelAdmin: null,
    user: {
      name: "",
      world: "",
      level: "",
      words: [],
      passedWorlds: []
    }
  },
  mutations: {
    'SET_PAGE_TITLE'(state, name) {
      state.page = name;
    },
    'ACTIVE_SNACK': (state, text) => {
      state.snackBar = true,
      state.snackText = text
      setTimeout(function(){ state.snackBar = false }, 3000);
    },
    'ACTIVATE_LOADING': (state) => {
      state.loading = true
    },
    'DEACTIVATE_LOADING': (state) => {
      state.loading = false
    },
    async 'SET_ADMIN_WORLD'(state, world) {
      world.levels = []
      await topics.doc(world.docId).collection("levels")
        .get()
        .then((querySnapshot) => {
          querySnapshot.forEach((doc) => {
            world.levels.push({
              docId: doc.id,
              level: doc.data().level,
              word: doc.data().word,
              center: doc.data().center
            })
          })
        })
        .catch((error) => {
          console.log(error)
        })
      state.currentWorldAdmin = world;
    },
    async 'SET_ADMIN_LEVEL'(state, level) {
      if (!level){
        state.currentLevelAdmin = null
        return false
      }
      level.words = []
      await topics.doc(state.currentWorldAdmin.docId).collection("levels").doc(level.docId).collection("words")
        .get()
        .then((querySnapshot) => {
          querySnapshot.forEach((doc) => {
            level.words.push({
              docId: doc.id,
              index: doc.data().index,
              word: doc.data().word,
              center: doc.data().center,
              hint: doc.data().hint
            })
          })
        })
        .catch((error) => {
          console.log(error)
        })
      state.currentLevelAdmin = level;
    },
    'SET_USER'(state, {name, world, level, words}) {
      state.user.name = name;
      state.user.world = world;
      state.user.level = level;
      state.user.words = words;
    },
    'SET_WORLD_PASSED'(state, world) {
      state.user.passedWorlds.push(world)
    },
    'SET_LEVEL_PASSED'(state, level) {
      state.user.level = level
    },
    'SET_WORD_PASSED'(state, pos) {
      state.user.words[pos] = true
    },
    'CLEAN_WORD'(state) {
      state.user.words = []
    }
    
  },
  actions: {
    pass_word ({ commit, state }, pos) {
      commit('SET_WORD_PASSED', pos)
      users.doc(state.user.name)
      .update({
        words: state.user.words
      }).then(() => {
        console.log('passes')
      }).catch((error) => {
        console.log(error)
      })
    },
    pass_level ({ commit, state }, level) {
      commit('SET_LEVEL_PASSED', level)
      commit('CLEAN_WORD')
      users.doc(state.user.name)
      .update({
        level: state.user.level
      }).then(() => {
        console.log('passes level')
      }).catch((error) => {
        console.log(error)
      })
    }
  },
  modules: {
  }
})
