<template>
  <v-container class="fill-height">
    <v-row class="fill-height">
      <v-col 
        v-for="level in world.levels" 
        :key="level.level"
        class="d-flex fill-height justify-center  level-column py-5">
          <div :class="'d-flex align-center justify-center levelSelector ' + level.extraClass">
            <router-link v-if="level.extraClass == 'passedSelector'" :to="makeRoute(level.docId)">
              Nivel {{level.level}}
            </router-link>
            <h5 v-else style="color: white"> Level {{level.level}} </h5>
          </div>
          <div aria-hidden="true" class="first-line"></div>
          <div aria-hidden="true" class="second-line"></div>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { topics } from "@/firebase.js";
export default {
  name: 'WorldView',
  data() {
    return {
      world:{
        name: "",
        levels: []
      },
    }
  },
  methods:{
    makeRoute(id){
      return `/level/${this.$route.params.worldId}/${id}`
    },
    async getWorld(){
      let world = await topics.doc(this.$route.params.worldId)
      .get()
      .then((doc) => {
        let auxWorld={
          docId: doc.id,
          name: doc.data().name,
          levels: []
        }
        return auxWorld
      })
      return world
    },
    async getLevels(){
      let levels = await topics.doc(this.world.docId).collection("levels")
      .get()
      .then((querySnapshot) => {
        let auxlevels = [];
        querySnapshot.forEach((doc) => {
          let level = doc.data();
          level.docId = doc.id;
          this.passed(level)
          auxlevels.push(level);
        });
        return auxlevels;
      });
      return this.sortLevels(levels)
    },
    passed(level){
      if (this.$store.state.user.passedWorlds.includes(this.world.name)) {
        level.extraClass = "passedSelector"
      } else {
        if (level.level <= this.$store.state.user.level) {
          level.extraClass = "passedSelector"
        } else {
          level.extraClass = "notPassedSelector"
        }
      } 
    },
    sortLevels(levels){
      levels.sort((level1, level2) => {
        return level1.level - level2.level  
      }) 
      return levels
    }
  },
  async created(){
    this.$store.commit("ACTIVATE_LOADING")
    this.$store.commit("SET_PAGE_TITLE", "Loading levels");
    try {
      this.world = await this.getWorld()
      if (this.$store.state.wordFinishedFlag) {
        this.$store.commit('SET_WORLD_PASSED', this.world.name)
        this.$router.push("/play")
        return
      }
      this.world.levels = await this.getLevels()
      this.$store.commit("SET_PAGE_TITLE", this.world.name);
      this.$store.commit("DEACTIVATE_LOADING")
    } catch (error) {
      console.log(error)
      this.$store.commit('ACTIVE_SNACK', "An error has occurred while loading :(")
      this.$store.commit("DEACTIVATE_LOADING")
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
  
  .passedSelector
    background-color: rgb(25, 118, 210)
  .passedSelector a
    text-decoration: none
    color: black
    font-weight: bold
    &:visited 
      text-decoration: none
  .notPassedSelector
    background-color: black
  .levelSelector
    width: $selector_size
    height: $selector_size
    border-radius: 100%
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