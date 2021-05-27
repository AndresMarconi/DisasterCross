<template>
  <v-row >
    <v-col class="d-flex flex-column align-center"> 
      <v-btn @click="open">¿Como jugar?</v-btn>
    </v-col>
    <v-dialog v-model="dialog">
      <v-card >
        <v-card-title class="d-flex justify-center my-5"> 
          <h2 class="headline text-center">¿Como jugar DissasterCross?</h2>
        </v-card-title>
        <v-card-text>
          <p class="body-1 text-center">
            Seleccione el mundo y desafíe su conocimiento sobre catástrofes y cómo reaccionar frente a una.
            <br><br>
            Completa las palabras del acróstico utilizando la descripción que aparece en pantalla.
            <br><br>
            Si tienes dificultades completando una palabra puedes solicitar ayuda clickeando el botón 
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
      dialog: false
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
    },
    close () {
      this.dialog = false
    }
  }
}
</script>

<style scoped>
</style>