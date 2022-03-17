<template>
  <v-row >
    <v-col class="d-flex flex-column align-center"> 
      <v-btn v-if=spanish @click="open">Como Jugar?</v-btn>
      <v-btn v-else @click="open">How To Play?</v-btn>
    </v-col>
    <v-dialog v-model="dialog">
      <v-card>
        <v-card-title class="d-flex justify-center my-5"> 
          <h2 v-if=spanish class="headline text-center">Instrucciones</h2>
          <h2 v-else class="headline text-center">Instructions</h2>
        </v-card-title>
        <v-card-text>
          <p v-if=spanish role="alert" class="body-1 text-center" :hidden="hideHint">
            Selecciona tu mundo favorito, clickea el nivel disponible, desafia tu conocimiento y divertite!.
            <br><br>
            Completa las palabras faltantes con las pistas provistas.
          </p>
          <p v-else role="alert" class="body-1 text-center" :hidden="hideHint">
            Select your favourite world and click on the available level, challenge your knowledge and have fun.
            <br><br>
            Complete the missing words with the hints provided.
          </p>
        </v-card-text>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script>
export default {
  name: 'HowToPlay',
  data() {
    return {
      dialog: false,
      hideHint: false,
      lang: window.localStorage.getItem("language"),
      
    }
  },
  watch: {
    dialog (val) {
      val || this.close()
    }
  },
  methods:{
    open(){
      this.dialog = true
      this.hideHint = true;
        setTimeout(() => {
          this.hideHint = false;
        }, 1000);
    },
    close () {
      this.dialog = false
    }
  },
  computed: {
    // a computed getter
    spanish: function () {
      // `this` points to the vm instance
      return this.lang == 'Spanish'
    }
  },
}
</script>

<style scoped>
</style>