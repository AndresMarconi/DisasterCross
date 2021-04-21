<template>
  <v-container class="d-flex flex-column justify-center">
    <AcrosticWord
      v-for="word in words"
      :key="word.id"
      :word="word"
      :coords="{ center: center, start: calculatedCenter(word) }"
      v-on:focused="selectWord(word)"
    />

    <v-container class="desc-container d-flex flex-column align-center">
      <h1>Pista</h1>
      <p>
        {{ currentWord.description }}
      </p>
    </v-container>
  </v-container>
</template>

<script>
import AcrosticWord from "@/components/AcrosticWord.vue";
export default {
  name: "level",
  components: {
    AcrosticWord,
  },
  data() {
    return {
      levelName: "",
      words: [],
      currentWord: {
        id: 0,
        word: "",
        description: "",
      },
      center: 0,
    };
  },
  created() {
    this.levelName = this.$route.params.levelId;
    this.$store.commit("SET_PAGE_TITLE", this.levelName);
    (this.words = [
      {
        id: 1,
        word: "indundacion",
        description: "lo que paso en lp",
        center: 2,
      },
      { id: 2, word: "lluvia", description: "Cae agua del cielo", center: 4 },
      { id: 3, word: "guille", description: "El que dibuja pitos", center: 5 },
      {
        id: 4,
        word: "desague",
        description: "Si se tapa cuando llueve es un quilombo",
        center: 2,
      },
    ]),
      (this.center = 13);
  },
  methods: {
    selectWord(word) {
      if (this.currentWord.word != word.word) {
        this.currentWord = word;
      }
    },
    calculatedCenter(word) {
      return this.center - word.center;
    },
  },
};
</script>

<style>
.desc-container {
  background-color: aqua;
}
</style>