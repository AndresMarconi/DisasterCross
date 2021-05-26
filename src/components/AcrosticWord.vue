<template>
    <v-container class="d-flex justify-center">
      <v-form
        v-for="caracter in 25" 
        :key=caracter>
        <v-text-field
          v-if="caracter == coords.center" 
          :class="extraClass"
          v-model="caracters[caracter - coords.start]"
          v-on:blur="handleBlur(caracter - coords.start)"
          v-on:focus="focused()"
          v-on:keyup="changeFocus(caracter - coords.start)"
          solo
          outlined
          :disabled="winLevel"
          :ref="`word${caracter - coords.start}`"/>
        <v-text-field
          v-else-if="isInRange(caracter)" 
          :class="extraClass"
          v-model="caracters[caracter - coords.start]"
          v-on:blur="handleBlur(caracter - coords.start)"
          v-on:focus="focused()"
          v-on:keyup="changeFocus(caracter - coords.start)"
          solo
          :disabled="winLevel"
          :ref="`word${caracter - coords.start}`"/>
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
      res: [],
      extraClass: "inp-box",
      winLevel: false
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
      this.caracters.push("")
    }
  },
  methods:{
    focused(){
      this.$emit('focused')
    },
    isInRange(pos){
      return (pos >= this.coords.start) && (pos < this.coords.start + this.word.word.length )
    },
    handleBlur(car){
      if (this.caracters[car] != "") {
        this.res[car] = this.caracters[car]
        if (this.completeAnswer()) {
          if (this.checkAnswer()) {
            this.win()
          } else {
            this.lose()
          }
        }
      }
    },
    changeFocus(pos){
      let next = pos + 1
      if (next < this.word.word.length) {
        this.$refs[`word${next}`][0].focus()
      } else {
        this.res[pos] = this.caracters[pos]
        this.handleBlur(pos)
      }
      
    },
    completeAnswer(){
      return (this.res.length == this.caracters.length) && !(this.res.includes(undefined))
    },
    checkAnswer(){
      let answer = true
      for (let i = 0; i < this.word.word.length; i++) {
        if (this.res[i] != this.word.word[i]) {
          answer = false
        }
      }
      return answer 
    },
    win(){
      console.log("ganaste perro")
      this.extraClass = "inp-box win"
      this.winLevel = true
    },
    lose(){
      console.log("perdiste perro")
      this.extraClass = "inp-box lose"
      for (let i = 0; i < this.caracters.length; i++) {
        this.caracters[i] = ""
      }
      this.res=[]
      setTimeout(() => this.extraClass = "inp-box", 1000)
      this.$refs["word0"][0].focus()
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

  .win{
    background-color: green
  }

  .lose{
    background-color: red
  }
</style>