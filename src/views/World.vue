<template>
  <v-container class="fill-height">
    <v-row class="fill-height">
      <v-col 
        v-for="level in world.levels" 
        :key="level.level"
        class="d-flex fill-height justify-center  level-column py-5">
          <div class="d-flex align-center justify-center levelSelector">
            <router-link :to="makeRoute(level.docId)">
              {{level.level}}
            </router-link>
          </div>
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
          auxlevels.push(level);
        });
        return auxlevels;
      });
      return levels.reverse()
    }
  },
  async created(){
    try {
      this.world = await this.getWorld()
      this.world.levels = await this.getLevels()
      this.$store.commit("SET_PAGE_TITLE", this.world.name);
    } catch (error) {
      console.log(error)
      this.$store.commit('ACTIVE_SNACK', "Hubo un problema con el mundo :(")
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
  .level-column:nth-child(odd){
    align-items: flex-end
  }
</style>