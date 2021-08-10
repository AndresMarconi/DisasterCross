<template>
  <v-container class="fill-height">
    <v-row class="fill-height">
      <v-col class="d-flex flex-column align-center">
        <v-form
          aria-label="Ingrese su nombre de usuario"
          class="d-flex flex-column align-center"
          ref="form"
          v-model="valid"
        >
          <v-text-field
            v-model="name"
            :rules="nameRules"
            label="Ingrese su nombre"
            color="white"
            solo
          ></v-text-field>
          <v-btn :disabled="!valid" color="primary" class="button" @click="play"
            >Iniciar Juego</v-btn
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
      nameRules: [(v) => !!v || "Debe ingresar un nombre"],
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
              `Bienvenido de nuevo ${this.name}`
            );
            this.$router.push("/play");
          } else {
            await users
              .doc(this.name)
              .set({
                world: "Inundación",
                level: "1",
                words: [false, false, false, false, false, false, false],
              })
              .then(() => {
                this.$store.commit("SET_USER", {
                  name: this.name,
                  world: "Inundación",
                  level: 1,
                  words: [false, false, false, false, false, false, false],
                });
                this.$store.commit(
                  "ACTIVE_SNACK",
                  `Bienvenido a DissasterCross ${this.name}`
                );
                this.$router.push("/play");
              })
              .catch(() => {
                this.$store.commit(
                  "ACTIVE_SNACK",
                  "Se produjo un error al registrarte, Intente nuevamente"
                );
              });
          }
        })
        .catch((error) => {
          console.log("Error getting document:", error);
          this.$store.commit(
            "ACTIVE_SNACK",
            "Se produjo un error al registrarte, Intente nuevamente"
          );
        });
    },
  },
  created() {
    this.$store.commit("SET_PAGE_TITLE", "Bienvenido a DisasterCross");
  },
};
</script>

<style scoped>
.button {
  margin-bottom: 3vh;
}
</style>