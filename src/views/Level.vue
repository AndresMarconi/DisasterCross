<template>
  <v-container class="d-flex flex-column justify-center">
    <Scroller
      v-if="level.words[0]"
      :elementHeigth="40"
      :elementsSize="level.words.length + 2"
      :the120="70"
      :the40="30"
    >
      <AcrosticWord
        v-for="word in level.words"
        :key="word.docId"
        :word="word"
        :coords="{ center: level.center, start: calculatedCenter(word) }"
        :winLevelFromParent="passedWords[level.words.indexOf(word)]"
        v-on:focused="selectWord(word)"
        v-on:success="nextWordFocus(word)"
        :ref="word"
      />
    </Scroller>

    <v-container class="desc-container d-flex flex-column align-center">
      <h2>Hint</h2>
      <p role="alert" :hidden="hideHint">
        {{ currentWord.hint }}
      </p>
    </v-container>
  </v-container>
</template>

<script>
import { topics } from "@/firebase.js";
import AcrosticWord from "@/components/AcrosticWord.vue";
import Scroller from "@/components/Scroller.vue";
export default {
  name: "level",
  components: {
    AcrosticWord,
    Scroller,
  },
  data() {
    return {
      wins: 0,
      level: {
        level: 0,
        center: 0,
        words: [],
      },
      currentWord: {
        word: "",
        hint: "",
        center: 0,
      },
      passedWords: [],
      focusFlag: false,
      hideHint: false,
    };
  },
  async created() {
    this.$store.commit("ACTIVATE_LOADING");
    this.$store.commit("SET_PAGE_TITLE", "Loading level");
    try {
      this.level = await this.getLevel();
      this.level.words = await this.getWords();
      this.setPassedWords();
      this.focusFlag = true;
      this.$store.commit("SET_PAGE_TITLE", `Level ${this.level.level}`);
      this.$store.commit("DEACTIVATE_LOADING");
    } catch (error) {
      console.log(error);
      this.$store.commit("ACTIVE_SNACK", "An error has occurred on level :(");
      this.$store.commit("DEACTIVATE_LOADING");
    }
  },
  updated() {
    if (this.focusFlag) {
      this.focusFirst();
      this.focusFlag = false;
    }
  },
  methods: {
    async getLevel() {
      let level = await topics
        .doc(this.$route.params.worldId)
        .collection("levels")
        .doc(this.$route.params.levelId)
        .get()
        .then((doc) => {
          let auxLevel = {
            docId: doc.id,
            level: doc.data().level,
            center: doc.data().center,
            words: [],
          };
          return auxLevel;
        });
      return level;
    },
    async getWords() {
      let words = await topics
        .doc(this.$route.params.worldId)
        .collection("levels")
        .doc(this.$route.params.levelId)
        .collection("words")
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
      return this.orderByIndex(words);
    },
    selectWord(word) {
      if (this.currentWord.word != word.word) {
        this.hideHint = true;
        this.currentWord = word;
        setTimeout(() => {
          this.hideHint = false;
        }, 1000);
      }
    },
    calculatedCenter(word) {
      return this.level.center - (word.center - 1);
    },
    orderByIndex(words) {
      words.sort((word1, word2) => {
        return word1.index - word2.index;
      });
      return words;
    },
    nextWordFocus(word) {
      let index = this.level.words.indexOf(word) + 1;
      this.$store.dispatch("pass_word", index - 1);
      this.wins++;
      if (index < this.level.words.length) {
        this.$refs[`${this.level.words[index]}`][index].focusToFirst();
      } else {
        if (!this.$store.state.user.words.includes(false)) {
          if (this.level.level == 5) {
            this.$store.commit("INVERT_WORDFINISHEDFLAG");
          } else {
            this.$store.dispatch("pass_level", parseInt(this.level.level) + 1);
          }
          this.$store.commit("ACTIVE_SNACK", "Level complete!");
          this.$router.push("/world/" + this.$route.params.worldId);
        }
      }
    },
    focusFirst() {
      this.$refs[`${this.level.words[0]}`][0].focusToFirst();
    },
    setPassedWords() {
      if (this.level.level < this.$store.state.user.level) {
        this.level.words.forEach((word) => {
          word.hint;
          this.passedWords.push(true);
        });
      } else {
        this.passedWords = this.$store.state.user.words;
      }
    },
  },
};
</script>

<style>
.desc-container {
  color: black;
  font-weight: bold;
  background-color: rgba(25, 118, 210, 0.89);
}
</style>