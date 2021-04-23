<template>
    <v-container class="d-flex flex-column justify-center align-center back-con">
      <v-toolbar style="width:100%" flat class="tenloFondo">
          <v-toolbar-title class="text--primary font-weight-large">Niveles</v-toolbar-title>
          <v-divider class="mx-4" inset vertical></v-divider>
          <v-spacer></v-spacer>
          <v-dialog dark v-model="dialog" max-width="500px">
            <template v-slot:activator="{ on }">
              <v-btn color="orange" class="mb-2" v-on="on"><v-icon color="black">mdi-plus</v-icon></v-btn>
            </template>
            <v-card>
              <v-card-title class="justify-space-around">
                <span> Agregar Nivel</span>
              </v-card-title>
              <v-card-text>
                <v-container>
                  <v-form ref="form" v-model="valid">
                      <v-row>
                        <v-col cols="12" sm="12">
                          <v-text-field v-model="editedLevel.word" label="Palabra Central" required></v-text-field>
                        </v-col>
                      </v-row>
                    </v-form>
                </v-container>
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue darken-1" text @click="close">Cancelar</v-btn>
                <v-btn :disabled="!valid" color="blue darken-1" text @click="save">Cargar</v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </v-toolbar>
      <Scroller :elementHeigth="150" :elementsSize="levels.length">
        <v-card 
          class="my-5 py-5"
          v-for="item in levels" 
          :key="item.level"
          @click="selectLevel(item)"
        >
          <v-card-title>Nivel {{item.level}} </v-card-title>
          <v-card-text>
            <h2>{{item.word}}</h2>
            <h5> {{item.center}} </h5>
          </v-card-text>
        </v-card>  
      </Scroller >
    </v-container>
</template>

<script>
import Scroller from "@/components/Scroller.vue";
export default {
  name:"SliderLevel",
  data(){
    return{
      //levels: [],
      editedIndex: -1,
      editedLevel: { id: -1, word: ""},
      defaultLevel: { id: -1, word: ""},
      valid: false,
      dialog: false,
    }
  },
  components:{Scroller},
  
  /* updated(){
    if (this.$store.state.currentWorldAdmin.levels.length == 0) {
      this.levels.push({level: "1", word: "word1", center: 13})
    } else {
      this.levels.push(
        {level: "1", word: "word1", center: 13}, 
        {level: "2", word: "word2", center: 13}, 
        {level: "3", word: "word3", center: 13}, 
        {level: "4", word: "word4", center: 13}, 
        {level: "5", word: "word5", center: 13}, 
        {level: "6", word: "word6", center: 13}, 
        {level: "7", word: "word7", center: 13}, 
        {level: "8", word: "word8", center: 13}, 
        {level: "9", word: "word9", center: 13}, 
        {level: "10", word: "word10", center: 13}
      )
    }
  }, */
  methods:{
    editItem(level) {
      this.editedIndex = this.levels.indexOf(level);
      this.editedLevel = Object.assign({}, level);
      this.dialog = true;
    },
    close(){
      this.dialog = false;
    },
    async save(){
      /* await topics.add(this.editedLevel)
      .then(() => {
        this.levels.push(this.editedLevel);
        this.$store.commit('ACTIVE_SNACK', 'El nivel se registro correctamente')
      })
      .catch(() => {
        this.$store.commit('ACTIVE_SNACK', 'Se produjo un error al cargar el nivel, Intente nuevamente')
      }); */
      this.close(); 
    },
    selectLevel(level){
      this.$store.commit("SET_ADMIN_LEVEL", level)
    }
  },
  computed:{
    levels(){
      if (this.$store.state.currentWorldAdmin == null) {
        return []
      }
      return this.$store.state.currentWorldAdmin.levels
    }
  }
}
</script>

<style>
  .back-con{
    background-color: aqua
  }
</style>