<template>
    <v-container class="d-flex flex-column justify-center align-center">
      <h1>Palabras</h1>
      <Scroller :elementHeigth="100" :elementsSize="words.length">
        <h1 v-for="item in words" :key="item.id" :data-val="item.value" :class="item.selected ? 'vselected' : ''">{{item.name}}</h1>  
      </Scroller >
    </v-container>
</template>

<script>
import Scroller from "@/components/Scroller.vue";
export default {
  name:"SliderWord",
  data(){
    return{
      words: [
        { value: 1, name: 'item 1', selected: false },
        { value: 2, name: 'item 2', selected: false },
        { value: 3, name: 'item 3', selected: false },
        { value: 4, name: 'item 4', selected: true },
        { value: 5, name: 'item 5', selected: false },
        { value: 6, name: 'item 6', selected: false },
        { value: 7, name: 'item 7', selected: false },
        { value: 8, name: 'item 8', selected: false }
      ]
    }
  },
  components:{
    Scroller
  },
  created(){
  },
  methods:{
  }
}
</script>

<style>
</style>