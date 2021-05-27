<template>
  <v-container class="fill-height">
    <v-row class="fill-height">
      <v-col class="d-flex flex-column align-center "> 
        <v-btn color="primary" class="button" @click="play">Jugar</v-btn>
        <HowToPlay />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import HowToPlay from '@/components/HowToPlay.vue'

export default {
  name: 'Home',
  data() {
    return {
    }
  },
  components:{
    HowToPlay
  },
  methods:{
    play(){
      this.$router.push("/play");
    }
  },
  created(){
    this.$store.commit("SET_PAGE_TITLE", "DisasterCross");
  }
}
</script>

<style scoped>
  .button{
    margin: 3vh;
  }
</style>