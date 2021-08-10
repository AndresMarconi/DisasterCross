<template>
  <v-row >
    <v-col class="d-flex flex-column align-center"> 
      <v-btn @click="open">¿Como jugar?</v-btn>
    </v-col>
    <v-dialog v-model="dialog">
      <v-card role="dialog" aria-labelledby="dialog1Title" aria-describedby="dialog1Desc" >
        <v-card-title class="d-flex justify-center my-5"> 
          <h2 id="dialog1Title" class="headline text-center">¿Como jugar DissasterCross?</h2>
        </v-card-title>
        <v-card-text>
          <p id="dialog1Desc" class="body-1 text-center">
            Seleccione el mundo y el nivel mas avanzado posible, desafíe su conocimiento sobre catástrofes y cómo reaccionar frente a una.
            <br><br>
            Completa las palabras del acróstico utilizando la descripción que aparece en pantalla.
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