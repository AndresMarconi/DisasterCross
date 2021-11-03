<template>
  <v-row >
    <v-col class="d-flex flex-column align-end"> 
      <v-btn class="info" @click="open">Settings</v-btn>
    </v-col>
    <v-dialog role="dialog" class="d-flex align-center justify-center" v-model="dialog">
      <v-card class="d-flex flex-column align-center" >
        <v-card-title > 
          <h2 class="headline text-center">Select your desired font size</h2>
        </v-card-title>
      <v-col class="d-flex flex-column align-center justify-center">
        <v-btn @click='saveFontSize("SMALL")' class="ma-3" style="font-size: 1rem"> Small </v-btn>
        <v-btn @click='saveFontSize("MEDIUM")' class="ma-3" style="font-size: 1.3rem"> Medium </v-btn>
        <v-btn @click='saveFontSize("LARGE")' class="ma-3" style="font-size: 1.6rem"> Large </v-btn>
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
    },
    saveFontSize(size){
      const myStorage = window.localStorage;
      myStorage.setItem('fontsize', size);
      window.location.reload()
    },
  }
}
</script>

<style scoped>
</style>