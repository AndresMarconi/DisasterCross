import Vue from 'vue'
import Vuex from 'vuex'
import { topics } from '@/firebase.js'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    page:"home",
    snackBar: false,
    snackText: "",
    currentWorldAdmin: null,
    currentLevelAdmin: null
  },
  mutations: {
    'SET_PAGE_TITLE' (state, name) {
      state.page = name;
    },
    'ACTIVE_SNACK': (state, text) =>{
      state.snackBar = true,
      state.snackText = text
    },
    'SET_ADMIN_WORLD' (state, world) {
      world.levels = []
      topics.doc(world.docId).collection("levels")
      .get()
      .then((querySnapshot) => {
        console.log(querySnapshot)
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
      /* world.levels= [
        {level: "1", word: "word1", center: 13}, 
        {level: "2", word: "word2", center: 13}, 
        {level: "3", word: "word3", center: 13} ] */
      state.currentWorldAdmin = world;
    },
    'SET_ADMIN_LEVEL' (state, level) {
      state.currentLevelAdmin = level
      state.currentLevelAdmin.words = [
        { value: 1, name: 'item 1', selected: false },
        { value: 2, name: 'item 2', selected: false },
        { value: 3, name: 'item 3', selected: false }
      ];
    },
  },
  actions: {
  },
  modules: {
  }
})
