import Vue from 'vue'
import Vuex from 'vuex'
import { topics } from '@/firebase.js'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    page: "home",
    snackBar: false,
    snackText: "",
    currentWorldAdmin: null,
    currentLevelAdmin: null
  },
  mutations: {
    'SET_PAGE_TITLE'(state, name) {
      state.page = name;
    },
    'ACTIVE_SNACK': (state, text) => {
      state.snackBar = true,
        state.snackText = text
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
              word: doc.data().word,
              start: doc.data().start
            })
          })
        })
        .catch((error) => {
          console.log(error)
        })
      state.currentLevelAdmin = level;
    },
  },
  actions: {
  },
  modules: {
  }
})
