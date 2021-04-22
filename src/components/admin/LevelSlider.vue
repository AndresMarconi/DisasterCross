<template>
    <v-container class="d-flex flex-column justify-center align-center">
      <h1>Niveles</h1>
      <Scroller :elementHeigth="150" :elementsSize="levels.length">
        <v-card 
          class="my-5 py-5"
          v-for="item in levels" 
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
export default {
  name:"SliderLevel",
  data(){
    return{
      levels: []
    }
  },
  components:{Scroller},
  created(){
    this.levels.push(
      {level: "1", word: "word1", center: 13}, 
      {level: "2", word: "word2", center: 13}, 
      {level: "3", word: "word3", center: 13}, 
      {level: "4", word: "word4", center: 13}, 
      {level: "5", word: "word5", center: 13}, 
      {level: "6", word: "word6", center: 13}, 
      {level: "7", word: "word7", center: 13}, 
      {level: "8", word: "word8", center: 13}, 
      {level: "9", word: "word9", center: 13}, 
      {level: "10", word: "word10", center: 13}
    )
  },
  methods:{
  }
}
</script>

<style>
</style>