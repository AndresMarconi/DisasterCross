<template>
    <v-container class="d-flex flex-column justify-center align-center back-con">
      <v-toolbar style="width:100%" flat class="tenloFondo">
          <v-toolbar-title class="text--primary font-weight-large">Palabras</v-toolbar-title>
          <v-divider class="mx-4" inset vertical></v-divider>
          <v-spacer></v-spacer>
          <v-dialog dark v-model="dialog" max-width="500px">
            <template v-slot:activator="{ on }">
              <v-btn color="orange" class="mb-2" v-on="on"><v-icon color="black">mdi-plus</v-icon></v-btn>
            </template>
            <v-card>
              <v-card-title class="justify-space-around">
                <span> Agregar Palabra </span>
              </v-card-title>
              <v-card-text>
                <v-container>
                  <v-form ref="form" v-model="valid">
                      <v-row>
                        <v-col cols="12" sm="12">
                          <v-text-field v-model="editedword.word" label="Mundo" required></v-text-field>
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
      <Scroller :elementHeigth="100" :elementsSize="words.length">
        <v-card 
          class="my-5 py-5"
          v-for="item in words" 
          :key="item.level" 
        >
          <v-card-title>Nivel {{item.name}} </v-card-title>
          <v-card-text>
          </v-card-text>
        </v-card>  
      </Scroller >
    </v-container>
</template>

<script>
import Scroller from "@/components/Scroller.vue";
export default {
  name:"SliderWord",
  data(){
    return{
      /* words: [
        { value: 1, name: 'item 1', selected: false },
        { value: 2, name: 'item 2', selected: false },
        { value: 3, name: 'item 3', selected: false },
        { value: 4, name: 'item 4', selected: true },
        { value: 5, name: 'item 5', selected: false },
        { value: 6, name: 'item 6', selected: false },
        { value: 7, name: 'item 7', selected: false },
        { value: 8, name: 'item 8', selected: false }
      ], */
      editedIndex: -1,
      editedword: { id: -1, name: ""},
      defaultword: { id: -1, name: ""},
      valid: false,
      dialog: false,
    }
  },
  components:{
    Scroller
  },
  methods:{
    editItem(word) {
      this.editedIndex = this.words.indexOf(word);
      this.editedword = Object.assign({}, word);
      this.dialog = true;
    },
    close(){
      this.dialog = false;
    },
    async save(){
      /* await topics.add(this.editedword)
      .then(() => {
        this.words.push(this.editedword);
        this.$store.commit('ACTIVE_SNACK', 'La palabra se registro correctamente')
      }) 
      .catch(() => {
        this.$store.commit('ACTIVE_SNACK', 'Se produjo un error al cargar la palabra, Intente nuevamente')
      }); */
      this.close(); 
    }
  },
  computed:{
    words(){
      if (this.$store.state.currentLevelAdmin == null) {
        return []
      }
      return this.$store.state.currentLevelAdmin.words
    }
  }
}
</script>

<style>
</style>