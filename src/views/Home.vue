<template>
  <v-container class="fill-height">
    <v-row class="fill-height">
      <v-col 
        v-for="world in worlds" 
        :key="world.name"
        class="d-flex fill-height justify-center  level-column py-5">
          <div class="d-flex align-center justify-center levelSelector">
            <router-link :to="makeRoute(world.docId)">
              {{world.name}}
            </router-link>
          </div>
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

<style scoped>
  .levelSelector{
    width: 100px;
    height: 100px;
    border-radius: 100%;
    background-color: aquamarine;
  }
  .level-column:nth-child(1){
    margin-top: 5vh;
  }
  .level-column:nth-child(2){
    margin-top: 25vh;
  }
  .level-column:nth-child(3){
    margin-top: 15vh;
  }
</style>