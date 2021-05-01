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
        <!-- <v-img
          alt="Vuetify Name"
          class="shrink mt-1 hidden-sm-and-down"
          contain
          min-width="100"
          src="https://cdn.vuetifyjs.com/images/logos/vuetify-name-dark.png"
          width="100"
        /> -->
      </div>

      <v-spacer></v-spacer>

      <v-btn @click="goBack" text>
        <span class="mr-2">Volver</span>
      </v-btn>
    </v-app-bar>

    <v-main>
      <v-row class="d-flex justify-center py-3">
        <h1>
          {{ $store.state.page }}
        </h1>
      </v-row>
      <v-container :fluid="true" class="fill-height">
        <v-row class="fill-height">
          <v-col class="fill-height">
            <router-view />
          </v-col>
        </v-row>
      </v-container>
    </v-main>
    <v-snackbar v-model="$store.state.snackBar" timeout="4000" top>
      {{ $store.state.snackText }}
    </v-snackbar>
  </v-app>
</template>

<script>
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
};
</script>
