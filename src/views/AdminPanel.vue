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

    <v-container v-if="words.length > 0" class="d-flex flex-column justify-center">
      <AcrosticWord
        v-for="word in words"
        :key="word.id"
        :word="word"
        :coords="{center: center, start: calculatedCenter(word)}"
      />
    </v-container>
  </v-container>
</template>

<script>
import WorldSlider from "@/components/admin/WorldSlider.vue";
import LevelSlider from "@/components/admin/LevelSlider.vue";
import WordSlider from "@/components/admin/WordSlider.vue";
import AcrosticWord from "@/components/AcrosticWord.vue";
export default {
  name: 'Home',
  data() {
    return {
    }
  },
  components:{
    WorldSlider,
    LevelSlider,
    WordSlider,
    AcrosticWord
  },
  computed:{
    words(){
      if (!this.$store.state.currentLevelAdmin) {return []}
      return this.orderByIndex(this.$store.state.currentLevelAdmin.words);
    },
    center(){
      return this.$store.state.currentLevelAdmin.center
    }
  },
  methods:{
    calculatedCenter(word) {
      return this.center - (word.center - 1);
    },
    orderByIndex(words){
      words.sort((word1, word2) => {
        return word1.index - word2.index  
      }) 
      return words
    }
  },
  created(){
    this.$store.commit("SET_PAGE_TITLE", "Panel de Administrador");
  }
}
</script>

<style scoped>
</style>