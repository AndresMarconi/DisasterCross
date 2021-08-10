<template>
  <v-app>
    <v-app-bar app color="primary" dark>
      <div class="d-flex align-center">
        <v-img
          role="img"
          alt="Bienvenido a DisasterCross"
          class="shrink mr-2"
          contain
          src="./assets/logo.png"
          transition="scale-transition"
          width="40"
          v-on:dblclick="goToAdmin"
          v-on:click="goToHome"
        />
      </div>
      <v-spacer aria-hidden="true"></v-spacer>
      <Configuration />
      <v-btn class="info ma-2" role="button" @click="goBack" text>
        Volver
      </v-btn>
    </v-app-bar>
    <v-main class="myMain">
      <v-container class="principalBack">
        <v-row class="d-flex flex-column align-center justify-center py-3">
          <div class="title">
            <h1 :hidden="$store.state.pagehide" role="alert">
              {{ $store.state.page }}
            </h1>
          </div>
          <v-progress-circular
            aria-hidden="true"
            class="my-5"
            v-if="$store.state.loading"
            indeterminate
            color="primary"
          ></v-progress-circular>
        </v-row>
        <v-container :fluid="true" class="fill-height">
          <v-row class="fill-height">
            <v-col class="fill-height">
              <router-view />
            </v-col>
          </v-row>
        </v-container>
      </v-container>
    </v-main>
    <SnackBar />
  </v-app>
</template>

<script>
import a11yChecker from "a11y-checker";
import SnackBar from "@/components/SnackBar.vue";
import Configuration from "@/components/Configuration.vue";
export default {
  name: "App",
  components: { SnackBar, Configuration },
  methods: {
    goBack() {
      this.$router.go(-1);
    },
    goToAdmin() {
      this.$router.push("admin");
    },
    goToHome() {
      this.$router.push("/");
    },
  },
  updated() {
    a11yChecker();
  },
};
</script>

<style lang="scss">
@import "sass/variables";

.myMain {
  display: flex;
  align-items: center;
}
.principalBack {
  min-height: 80vh;
  background: url("./assets/disaster-select.jpg");
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
}
.title {
  background-color: rgba(102, 92, 92, 0.5);
  padding: 1rem;
}
</style>