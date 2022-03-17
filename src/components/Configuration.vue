<template>
  <v-row >
    <v-col class="d-flex flex-column align-end"> 
      <v-btn v-if=spanish class="info" @click="open">Configuracion</v-btn>
      <v-btn v-else class="info" @click="open">Settings</v-btn>
    </v-col>
    <v-dialog role="dialog" class="d-flex align-center justify-center" v-model="dialog">
      <v-card class="d-flex flex-column align-center" >
        <v-card-title > 
          <h2 v-if=spanish class="headline text-center">Seleccione el tamaño de fuente deseado</h2>
          <h2 v-else class="headline text-center">Select your desired font size</h2>
        </v-card-title>
      <v-col class="d-flex flex-column align-center justify-center">
        <v-btn @click='saveFontSize("SMALL")' class="ma-3" style="font-size: 1rem"> Small </v-btn>
        <v-btn @click='saveFontSize("MEDIUM")' class="ma-3" style="font-size: 1.3rem"> Medium </v-btn>
        <v-btn @click='saveFontSize("LARGE")' class="ma-3" style="font-size: 1.6rem"> Large </v-btn>
      </v-col>
      <v-card-title > 
          <h2 v-if=spanish class="headline text-center">Idioma</h2>
          <h2 v-else class="headline text-center">Language</h2>
        </v-card-title>
      <v-col class="d-flex flex-column align-center justify-center">
        <v-btn @click='saveLanguage("English")' class="ma-3" style="font-size: 1rem"> English </v-btn>
        <v-btn @click='saveLanguage("Spanish")' class="ma-3" style="font-size: 1rem"> Spanish </v-btn>
      </v-col>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script>
export default {
  name: 'Configuration',
  data() {
    return {
      dialog: false,
      lang: window.localStorage.getItem("language")
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
    },
    saveFontSize(size){
      const myStorage = window.localStorage;
      myStorage.setItem('fontsize', size);
      window.location.reload()
    },
    saveLanguage(size){
      const myStorage = window.localStorage;
      myStorage.setItem('language', size);
      window.location.reload()
    }, 
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