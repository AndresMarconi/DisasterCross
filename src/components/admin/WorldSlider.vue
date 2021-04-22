<template>
    <v-container class="d-flex flex-column justify-center align-center">
      <h1>Mundos</h1>
      <Scroller :elementHeigth="150" :elementsSize="worlds.length">
        <v-card 
          class="my-5 py-5"
          v-for="item in worlds" 
          :key="item.level" 
        >
          <v-card-title>Nivel {{item.level}} </v-card-title>
          <v-card-text>
            <h2>{{item.word}}</h2>
            <h5> {{item.center}} </h5>
          </v-card-text>
        </v-card>  
      </Scroller >
    </v-container>
</template>

<script>
import Scroller from "@/components/Scroller.vue";
import { topics } from '@/firebase.js'
export default {
  name:"SliderWorld",
  components:{Scroller},
  data(){
    return{
      worlds: []
    }
  },
  async created(){
    try {
      this.worlds = await topics
      .get()
      .then((querySnapshot) => {
        let auxworlds = []
        querySnapshot.forEach((doc) => {
          auxworlds.push(doc.data);
        });
        console.log(auxworlds)
        return auxworlds
      })      
    } catch (error) {
      return {error}
    }

  },
  methods:{
  }
}
</script>

<style>
</style>