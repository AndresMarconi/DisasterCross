<template>
  <v-container class="d-flex justify-center">
    <v-form
      aria-label="Enter character"
      v-for="caracter in 25"
      :key="caracter"
    >
      <v-text-field
        v-if="caracter == coords.center"
        :class="extraClass"
        v-model="caracters[caracter - coords.start]"
        v-on:blur="handleBlur(caracter - coords.start)"
        v-on:focus="focused(caracter - coords.start)"
        v-on:keyup="changeFocus(caracter - coords.start)"
        solo
        outlined
        :disabled="winLevel"
        :ref="`word${caracter - coords.start}`"
      />
      <v-text-field
        v-else-if="isInRange(caracter)"
        :class="extraClass"
        v-model="caracters[caracter - coords.start]"
        v-on:blur="handleBlur(caracter - coords.start)"
        v-on:focus="focused(caracter - coords.start)"
        v-on:keyup="changeFocus(caracter - coords.start)"
        solo
        :disabled="winLevel"
        :ref="`word${caracter - coords.start}`"
      />
      <div class="inputForspace" v-else />
    </v-form>
  </v-container>
</template>

<script>
export default {
  name: "AcrosticWord",
  data() {
    return {
      caracters: [],
      res: [],
      extraClass: "inp-box",
      winLevel: false,
    };
  },
  props: {
    word: {
      id: 0,
      word: "",
      description: "",
    },
    coords: {
      start: 0,
      center: 0,
    },
    winLevelFromParent: Boolean,
  },
  created() {
    this.winLevel = this.winLevelFromParent;
    if (this.winLevel) {
      this.extraClass = "inp-box win";
      for (let i = 0; i < this.word.word.length; i++) {
        this.caracters.push(this.word.word[i]);
      }
    } else {
      for (let i = 0; i < this.word.word.length; i++) {
        this.caracters.push("");
      }
    }
  },
  mounted() {
    for (let i = 0; i < this.word.word.length; i++) {
      const inputElement = this.$refs[`word${i}`][0].$el.querySelector("input");
      inputElement.max = 1;
    }
  },
  methods: {
    focused(car) {
      if (this.caracters[car].length > 0) {
        this.caracters.splice(car, 1, "");
      }
      this.$emit("focused");
    },
    isInRange(pos) {
      return (
        pos >= this.coords.start &&
        pos < this.coords.start + this.word.word.length
      );
    },
    handleBlur(car) {
      if (this.winLevel) {
        return;
      }
      if (this.caracters[car] != "") {
        this.res[car] = this.caracters[car];
        if (this.completeAnswer()) {
          if (this.checkAnswer()) {
            this.win();
          } else {
            this.lose();
          }
        }
      }
    },
    changeFocus(pos) {
      let next = pos + 1;
      if (next < this.word.word.length) {
        this.$refs[`word${next}`][0].focus();
      } else {
        this.res[pos] = this.caracters[pos];
        this.handleBlur(pos);
      }
      if (this.caracters[pos].length > 1) {
        this.caracters.splice(pos, 1, this.caracters[pos][0]);
      }
    },
    completeAnswer() {
      return (
        this.res.length == this.caracters.length &&
        !this.res.includes(undefined)
      );
    },
    checkAnswer() {
      let answer = true;
      for (let i = 0; i < this.word.word.length; i++) {
        if (this.res[i] != this.word.word[i]) {
          answer = false;
        }
      }
      return answer;
    },
    win() {
      this.extraClass = "inp-box win";
      this.winLevel = true;
      //this fix a bug dont delete
      if (this.caracters.includes("")) {
        for (let i = 0; i < this.word.word.length; i++) {
          this.caracters.splice(i, 1, this.word.word[i]);
        }
      }
      this.$store.commit("ACTIVE_SNACK", "Correct");
      this.$emit("success");
    },
    lose() {
      this.extraClass = "inp-box lose";
      for (let i = 0; i < this.caracters.length; i++) {
        this.caracters[i] = "";
      }
      this.res = [];
      this.$store.commit("ACTIVE_SNACK", "Failed");
      setTimeout(() => (this.extraClass = "inp-box"), 1000);
      this.$refs["word0"][0].focus();
    },
    focusToFirst() {
      this.$refs["word0"][0].focus();
      if (this.caracters[0].length > 1) {
        this.caracters.splice(0, 1, "");
      }
    },
  },
};
</script>

<style>
.inp-box {
  width: 50px;
  height: 50px;
}

.inputForspace {
  height: 0;
  width: 50px;
}

.center-box {
  background-color: aqua;
}

.win {
  background-color: green;
}

.win .v-input__control .v-input__slot {
  background-color: rgba(28, 194, 50, 0.5) !important;
}

.win .v-input__control .v-input__slot .v-text-field__slot input {
  color: black;
}

.lose {
  background-color: red;
}

.lose .v-input__control .v-input__slot {
  background-color: rgba(253, 4, 4, 0.5) !important;
}
</style>