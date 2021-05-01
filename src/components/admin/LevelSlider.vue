<template>
    <v-container class="d-flex flex-column justify-center align-center back-con">
      <v-toolbar style="width:100%" flat class="tenloFondo">
          <v-toolbar-title class="text--primary font-weight-large">Niveles</v-toolbar-title>
          <v-divider class="mx-4" inset vertical></v-divider>
          <v-spacer></v-spacer>
          <v-dialog dark v-model="dialog" max-width="500px">
            <template v-slot:activator="{ on }">
              <v-btn :disabled="!world" color="orange" class="mb-2" v-on="on"><v-icon color="black">mdi-plus</v-icon></v-btn>
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
                          <v-text-field v-model="editedLevel.level" label="N° nivel" required></v-text-field>
                        </v-col>
                        <v-col cols="12" sm="12">
                          <v-text-field v-model="editedLevel.word" label="Palabra Central" required></v-text-field>
                        </v-col>
                        <v-col cols="12" sm="12">
                          <v-text-field v-model="editedLevel.center" label="Fila Central" required></v-text-field>
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
        <p v-show="!world">
          No hay mundo seleccionado
        </p>
        <p v-show="world && world.levels.length <= 0">
          Mundo sin niveles
        </p>
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
          <v-card-actions>
            <v-icon small @click="editItem(item)" class="mr-4">mdi-pencil</v-icon>
            <v-icon small @click="deleteItem(item)" class="mr-4">mdi-delete</v-icon>
          </v-card-actions>
        </v-card>  
      </Scroller >
    </v-container>
</template>

<script>
import Scroller from "@/components/Scroller.vue";
import { topics } from '@/firebase.js'
export default {
  name:"SliderLevel",
  data(){
    return{
      editedIndex: -1,
      editedLevel: { id: -1, level: "", word: "", center: 0},
      defaultLevel: { id: -1, level: "", word: "", center: 0},
      valid: false,
      dialog: false,
    }
  },
  components:{Scroller},
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
      if (this.editedIndex > -1) {
        await topics.doc(this.world.docId).collection('levels').doc(this.editedLevel.docId)
        .update({
          level: this.editedLevel.level,
          word: this.editedLevel.word,
          center: this.editedLevel.center
        })
        .then(() => {
          Object.assign(this.levels[this.editedIndex], this.editedLevel);
          
          this.$store.commit('ACTIVE_SNACK', 'El nivel se actualizo correctamente')
        })
        .catch((error) => {
          console.log(error)
          this.$store.commit('ACTIVE_SNACK', 'Se produjo un error al actualizar el nivel, Intente nuevamente')
        });
      } else {
        await topics.doc(this.world.docId).collection('levels')
        .add(this.editedLevel)
        .then(() => {
          this.levels.push(this.editedLevel);
          this.$store.commit('ACTIVE_SNACK', 'El nivel se registro correctamente')
        })
        .catch(() => {
          this.$store.commit('ACTIVE_SNACK', 'Se produjo un error al cargar el nivel, Intente nuevamente')
        });
      }
      this.close(); 
    },
    async deleteItem(item) {
      const index = this.levels.indexOf(item);
      var result = confirm(`Seguro que quiere Eliminar el nivel ${item.level} del mundo ${this.world.name} ?`);
      if (result == true) {
        await topics.doc(this.world.docId).collection('levels').doc(item.docId)
        .delete()
        .then(() => {
          this.levels.splice(index, 1);
          this.$store.commit('ACTIVE_SNACK', 'El nivel se elimino correctamente')
        })
        .catch(() => {
          this.$store.commit('ACTIVE_SNACK', 'Se produjo un error al eliminar el nivel, Intente nuevamente')
        });
      }
    },
    selectLevel(level){
      if ((this.$store.state.currentLevelAdmin)&&(this.$store.state.currentLevelAdmin.level == level.level)) return
      this.$store.commit("SET_ADMIN_LEVEL", level)
    }
  },
  computed:{
    world(){
      return this.$store.state.currentWorldAdmin
    },
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