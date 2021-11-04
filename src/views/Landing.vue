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
            label="Enter a username"
            color="white"
            solo
          ></v-text-field>
          <v-btn :disabled="!valid" color="primary" class="button" @click="play"
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
      nameRules: [(v) => !!v || "Please provide a username"],
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
  created() {
    this.$store.commit("SET_PAGE_TITLE", "Welcome to DisasterCross");
  },
};
</script>

<style scoped>
.button {
  margin-bottom: 3vh;
}
</style>