<template>
  <v-container class="fill-height">
    <v-row class="fill-height d-flex justify-center">
      <v-col 
        v-for="world in worlds" 
        :key="world.name"
        class="level-column">
          <div class="d-flex align-center justify-center levelSelector">
            <router-link :to="makeRoute(world.docId)">
              {{world.name}}
            </router-link>
          </div>
          <div class="first-line"></div>
          <div class="second-line"></div>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { topics } from "@/firebase.js";
export default {
  name: 'Home',
  data() {
    return {
      worlds: []
    }
  },
  methods:{
    makeRoute(id){
      return "/world/" + id
    }
  },
  async created(){
    this.$store.commit("ACTIVATE_LOADING")
    this.$store.commit("SET_PAGE_TITLE", "Desastres");
    try {
      this.worlds = await topics.get()
      .then((querySnapshot) => {
        let auxworlds = []
        querySnapshot.forEach((doc) => {
          let aux = doc.data()
          aux.docId = doc.id
          aux.levels = []
          auxworlds.push(aux)
        })
        this.$store.commit("DEACTIVATE_LOADING")
        return auxworlds.reverse()
      });
    } catch (error) {
      this.$store.commit("DEACTIVATE_LOADING")
      return { error }
    }
  }
}
</script>

<style lang="sass" scoped>

  $margin1: 5
  $margin2: 25
  $margin3: 15

  .levelSelector
    width: 100px
    height: 100px
    border-radius: 100%
    background-color: aquamarine

  .level-column
    margin: 0
    padding: 0
    flex-grow: 0

  @for $i from 1 through 3
    $m1: 0
    $m2: 0
    @if $i == 1
      $m1: $margin1
      $m2: $margin2
    @else if $i == 2
      $m1: $margin2
      $m2: $margin3
    @else if $i == 3
      $m1: $margin3
      $m2: $margin3

    .level-column:nth-child(#{$i})
      margin-top: #{$m1}vh
      display: flex
      flex-direction: row

    @if ($m1 < $m2)
      $height: ($m2 - $m1)
      .level-column:nth-child(#{$i}) .first-line
        width: 4vw
        height: #{$height}vh
        border-right: solid
        border-top: solid
        margin-top: 50px
      .level-column:nth-child(#{$i}) .second-line
        margin-right: 0
        width: 4vw
        border-bottom: solid
        margin-top: 50px
        height: #{$height}vh
    @else if ($m1 > $m2)
      $height: ($m1 - $m2)
      .level-column:nth-child(#{$i}) .first-line
        width: 4vw
        height: #{$height}vh
        border-right: solid
        border-bottom: solid
      .level-column:nth-child(#{$i}) .second-line
        margin-right: 0
        width: 4vw
        border-top: solid
  
  
  
</style>