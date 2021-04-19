<template>
  <v-container class="fill-height">
    <v-row class="fill-height">
      <v-col 
        v-for="level in levels" 
        :key=level
        class="d-flex fill-height justify-center  level-column py-5">
          <div class="d-flex align-center justify-center levelSelector">
            <router-link :to="makeRoute(level)">
              {{level}}
            </router-link>
          </div>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>

export default {
  name: 'Home',
  data() {
    return {
      levels: []
    }
  },
  methods:{
    makeRoute(id){
      return "/level/" + id
    }
  },
  created(){
    this.levels = [1, 2, 3, 4, 5]
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