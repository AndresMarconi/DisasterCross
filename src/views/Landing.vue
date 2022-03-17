<template>
  <v-container class="fill-height">
    <v-row class="fill-height">
      <v-col class="d-flex flex-column align-center">
        <v-form
          aria-label="Enter a username"
          class="d-flex flex-column align-center"
          ref="form"
          v-model="valid"
        >
          <v-text-field
            v-model="name"
            :rules="nameRules"
            label="Username"
            color="white"
            solo
          ></v-text-field>
          <v-btn v-if=spanish :disabled="!valid" color="primary" class="button" @click="play"
            >Iniciar Juego</v-btn
          >
          <v-btn v-else :disabled="!valid" color="primary" class="button" @click="play"
            >Start Game</v-btn
          >
        </v-form>
        <HowToPlay />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import HowToPlay from "@/components/HowToPlay.vue";
import { users } from "@/firebase.js";
export default {
  name: "Home",
  data() {
    return {
      valid: true,
      name: "",
      pageTitle: "",
      nameRules: [(v) => !!v || "Please provide a username"],
      lang: window.localStorage.getItem("language")
    };
  },
  components: {
    HowToPlay,
  },
  methods: {
    async play() {
      await users
        .doc(this.name)
        .get()
        .then(async (doc) => {
          if (doc.exists) {
            this.$store.commit("SET_USER", { name: this.name, ...doc.data() });
            this.$store.commit(
              "ACTIVE_SNACK",
              `Welcome back ${this.name}`
            );
            this.$router.push("/play");
          } else {
            await users
              .doc(this.name)
              .set({
                world: "Flood",
                level: "1",
                words: [false, false, false, false, false],
              })
              .then(() => {
                this.$store.commit("SET_USER", {
                  name: this.name,
                  world: "Flood",
                  level: 1,
                  words: [false, false, false, false, false],
                });
                this.$store.commit(
                  "ACTIVE_SNACK",
                  `Welcome to DissasterCross ${this.name}`
                );
                this.$router.push("/play");
              })
              .catch(() => {
                this.$store.commit(
                  "ACTIVE_SNACK",
                  "There was an error during signup, please try again"
                );
              });
          }
        })
        .catch((error) => {
          console.log("Error getting document:", error);
          this.$store.commit(
            "ACTIVE_SNACK",
            "There was an error during signup, please try again"
          );
        });
    },
  },
  computed: {
    // a computed getter
    spanish: function () {
      let inSpanish = this.lang == 'Spanish'


      return inSpanish
    }
  },
  created() {
    if (this.spanish){
        this.pageTitle = "Bienvenido a DisasterCross"
      }
      else{
        this.pageTitle = "Welcome to DisasterCross"
      }
    this.$store.commit("SET_PAGE_TITLE", this.pageTitle);
  },
};
</script>

<style scoped>
.button {
  margin-bottom: 3vh;
}
</style>