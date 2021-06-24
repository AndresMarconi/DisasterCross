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
    console.log(this.$store.state.user)
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
        return auxworlds
      });
    } catch (error) {
      this.$store.commit("DEACTIVATE_LOADING")
      return { error }
    }
  }
}
</script>

<style lang="sass" scoped>

  $selector_size: 16vh
  $distance: 4vw
  $margin1: random(40)
  $margin2: random(40)
  $margin3: random(40)
  $margin4: random(40) 
  $margin5: random(40)
  
  .levelSelector
    width: $selector_size
    height: $selector_size
    border-radius: 100%
    background-color: aquamarine

  .level-column
    margin: 0
    padding: 0
    flex-grow: 0

  @for $i from 1 through 5
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
      $m2: $margin4
    @else if $i == 4
      $m1: $margin4
      $m2: $margin5
    @else if $i == 5
      $m1: $margin5
      $m2: $margin5

    @if ($m1 < $m2)
      $height: ($m2 - $m1)
      .level-column:nth-child(#{$i})
        margin-top: #{$m1}vh
        display: flex
        flex-direction: row
      .level-column:nth-child(#{$i}) .first-line
        width: $distance
        height: #{$height}vh
        border-right: solid
        border-top: solid
        margin-top: ($selector_size / 2) 
      .level-column:nth-child(#{$i}) .second-line
        margin-right: 0
        width: $distance
        border-bottom: solid
        margin-top: ($selector_size / 2)
        height: #{$height}vh
    @else if ($m1 > $m2)
      $height: ($m1 - $m2)
      $mt: ($m2 * 1vh) + ($selector_size / 2) 
      .level-column:nth-child(#{$i})
        display: flex
        flex-direction: row
      .level-column:nth-child(#{$i}) .levelSelector
        margin-top:  #{$m1}vh
      .level-column:nth-child(#{$i}) .first-line
        width: $distance
        height: #{$height}vh
        border-right: solid
        border-bottom: solid
        margin-top: $mt
      .level-column:nth-child(#{$i}) .second-line
        margin-right: 0
        margin-top: $mt
        width: $distance
        border-top: solid
    @else 
        .level-column:nth-child(#{$i})
          margin-top: #{$m1}vh
          display: flex
          flex-direction: row
        @if ($i != 5)
          .level-column:nth-child(#{$i}) .first-line
            margin-right: 0
            width: $distance
            border-bottom: solid
            height: ($selector_size / 2)
          .level-column:nth-child(#{$i}) .second-line
            margin-right: 0
            width: $distance
            border-bottom: solid
            height: ($selector_size / 2)

</style>