<template>
  <v-container :fluid="true" class="fill-height">
    <v-row class="fill-height">
      <v-col>
          <WorldSlider />
      </v-col>
      <v-col>
          <LevelSlider />
      </v-col>
      <v-col>
          <WordSlider />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import WorldSlider from "@/components/admin/WorldSlider.vue";
import LevelSlider from "@/components/admin/LevelSlider.vue";
import WordSlider from "@/components/admin/WordSlider.vue";
export default {
  name: 'Home',
  data() {
    return {
      mundos: []
    }
  },
  components:{
    WorldSlider,
    LevelSlider,
    WordSlider
  },
  methods:{
  },
  created(){
    this.$store.commit("SET_PAGE_TITLE", "Panel de Administrador");
  }
}
</script>

<style scoped>
</style>