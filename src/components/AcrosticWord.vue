<template>
    <v-container class="d-flex justify-center">
      <v-form
        v-for="caracter in 25" 
        :key=caracter>
        <v-text-field
          v-if="caracter == coords.center" 
          class="inp-box"
          v-on:focus="focused()"
          :ref="'car' + caracter"
          v-on:keyup="changeFocus(caracter)"
          solo
          outlined/>
        <v-text-field
          v-else-if="isInRange(caracter)" 
          class="inp-box"
          :ref="'car' + caracter"
          v-on:focus="focused()"
          v-on:keyup="changeFocus(caracter)"
          solo/>
        <v-text-field
          class="inp-box"
          v-else 
          disabled/>

      </v-form>
    </v-container>
</template>

<script>
export default {
  name:"AcrosticWord",
  data(){
    return{
      caracters: [],
      focuseOnMe: false
    }
  },
  props:{
    word:{
      id: 0,
      word:"",
      description: "",
    },
    coords:{
      start:0,
      center:0
    }
  },
  created(){
    for (let i = 0; i < this.word.word.length; i++) {
      this.caracters.push(this.word.word[i])
    }
  },
  methods:{
    focused(){
      this.$emit('focused')
    },
    isInRange(pos){
      if ((pos > this.coords.start) && (pos < this.coords.start + this.word.word.length )) {
        return true
      } else {
        return false
      }
    },
    changeFocus(pos){
      console.log(pos)
    }
  }
}
</script>

<style>
  .inp-box{
    width: 50px;
    height: 50px;
  }

  .center-box{
    background-color: aqua;
  }
</style>