<template>
  <v-container class="d-flex flex-column justify-center">
    <AcrosticWord
      v-for="word in level.words"
      :key="word.docId"
      :word="word"
      :coords="{ center: level.center, start: calculatedCenter(word) }"
      v-on:focused="selectWord(word)"
      v-on:success="nextWordFocus(word)"
      :ref="word"
    />

    <v-container class="desc-container d-flex flex-column align-center">
      <h1>Pista</h1>
      <p>
        {{ currentWord.hint }}
      </p>
    </v-container>
  </v-container>
</template>

<script>
import { topics } from "@/firebase.js";
import AcrosticWord from "@/components/AcrosticWord.vue";
export default {
  name: "level",
  components: {
    AcrosticWord,
  },
  data() {
    return {
      wins: 0,
      level:{
        level: 0,
        center: 0,
        words: []
      },
      currentWord: {
        word: "",
        hint: "",
        center: 0
      }
    };
  },
  async created() {
    this.$store.commit("ACTIVATE_LOADING")
    this.$store.commit("SET_PAGE_TITLE", "Cargando Palabras");
    try {
      this.level = await this.getLevel()
      this.level.words = await this.getWords()
      this.$store.commit("SET_PAGE_TITLE", `Nivel ${this.level.level}`);
      this.$store.commit("DEACTIVATE_LOADING")
    } catch (error) {
      console.log(error)
      this.$store.commit('ACTIVE_SNACK', "Hubo un problema con el nivel :(")
      this.$store.commit("DEACTIVATE_LOADING")
    }
  },
  methods: {
    async getLevel(){
      let level = await topics.doc(this.$route.params.worldId).collection("levels").doc(this.$route.params.levelId)
      .get()
      .then((doc) => {
        let auxLevel={
          docId: doc.id,
          level: doc.data().level,
          center: doc.data().center,
          words: []
        }
        return auxLevel
      })
      return level
    },
    async getWords(){
      let words = await topics.doc(this.$route.params.worldId).collection("levels").doc(this.$route.params.levelId).collection("words")
      .get()
      .then((querySnapshot) => {
        let auxwords = [];
        querySnapshot.forEach((doc) => {
          let word = doc.data();
          word.docId = doc.id;
          auxwords.push(word);
        });
        return auxwords;
      });
      return this.orderByIndex(words)
    },
    selectWord(word) {
      if (this.currentWord.word != word.word) {
        this.currentWord = word;
      }
    },
    calculatedCenter(word) {
      return this.level.center - (word.center - 1);
    },
    orderByIndex(words){
      words.sort((word1, word2) => {
        return word1.index - word2.index  
      }) 
      return words
    },
    nextWordFocus(word){
      let index = this.level.words.indexOf(word) + 1
      this.wins++
      if (index < this.level.words.length) {
        this.$refs[`${ this.level.words[index] }`][index].focusToFirst()
      } else {
        if (this.wins == (this.level.words.length * 2)) {
          this.$store.commit('ACTIVE_SNACK', "Nivel completado")
          this.$router.push("/world/"+this.$route.params.worldId)
        }
      }
      
    }
  }
};
</script>

<style>
.desc-container {
  background-color: aqua;
}
</style>