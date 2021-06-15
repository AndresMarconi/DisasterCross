<template>
  <v-app>
    <v-app-bar app color="primary" dark>
      <div class="d-flex align-center">
        <v-img
          alt="Vuetify Logo"
          class="shrink mr-2"
          contain
          src="./assets/logo.png"
          transition="scale-transition"
          width="40"
          v-on:dblclick="goToAdmin"
          v-on:click="goToHome"
        />
      </div>

      <v-spacer></v-spacer>

      <v-btn @click="goBack" text>
        <span class="mr-2">Volver</span>
      </v-btn>
    </v-app-bar>

    <v-main class="myMain">
      <v-container class="principalBack">
        <v-row class="d-flex flex-column align-center justify-center py-3">
          <h1>
            {{ $store.state.page }}
          </h1>
          <v-progress-circular
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
    <v-snackbar :model="$store.state.snackBar" :timeout="4000" top>
      {{ $store.state.snackText }}
    </v-snackbar>
  </v-app>
</template>

<script>
import a11yChecker from 'a11y-checker';
export default {
  name: "App",
  components: {},
  methods: {
    goBack(){
      this.$router.go(-1)
    },
    goToAdmin() {
      this.$router.push("admin");
    },
    goToHome() {
      this.$router.push("/");
    }
  },
  updated(){
    a11yChecker();
  }
};
</script>

<style scoped>
  .myMain{
    display: flex;
    align-items: center
  }

  .principalBack{
    min-height: 80vh;
    background-color: darkgray;
  }
</style>