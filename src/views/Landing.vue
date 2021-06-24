<template>
  <v-container class="fill-height">
    <v-row class="fill-height">
      <v-col class="d-flex flex-column align-center">
        <v-form
          class="d-flex flex-column align-center"
          ref="form"
          v-model="valid"
        > 
          <v-text-field v-model="name" :rules="nameRules" label="Nombre de usuario" color="white" solo></v-text-field>
          <v-btn :disabled="!valid" color="primary" class="button" @click="play" >Jugar</v-btn>
        </v-form>
        <HowToPlay />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import HowToPlay from '@/components/HowToPlay.vue'
import { users } from "@/firebase.js";
export default {
  name: 'Home',
  data() {
    return {
      valid: true,
      name: '',
      nameRules: [
        v => !!v || 'Debe ingresar un nombre'
      ],
    }
  },
  components:{
    HowToPlay
  },
  methods:{
    play(){

      users.doc(this.name).get().then((doc) => {
          if (doc.exists) {
            this.$store.commit(
              "SET_USER",
              {name: this.name,
              ...doc.data()}
            )
            this.$store.commit(
              "ACTIVE_SNACK",
              "existe"
            );
          } else {
            this.$store.commit(
              "ACTIVE_SNACK",
              "no existe"
            );
          }
      }).catch((error) => {
          console.log("Error getting document:", error);
      });

      this.$router.push("/play");
    },
  },
  created(){
    this.$store.commit("SET_PAGE_TITLE", "DisasterCross");
  }
}
</script>

<style scoped>
  .button{
    margin-bottom: 3vh;
  }
</style>