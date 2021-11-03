<template>
  <v-row >
    <v-col class="d-flex flex-column align-center"> 
      <v-btn @click="open">How To Play?</v-btn>
    </v-col>
    <v-dialog v-model="dialog">
      <v-card>
        <v-card-title class="d-flex justify-center my-5"> 
          <h2 class="headline text-center">Instructions</h2>
        </v-card-title>
        <v-card-text>
          <p role="alert" class="body-1 text-center" :hidden="hideHint">
            Select your favorite world and click on the available level, challenge your knowledge and have fun.
            <br><br>
            Complete the missing word with the hint provided.
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
      hideHint: false
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
  }
}
</script>

<style scoped>
</style>