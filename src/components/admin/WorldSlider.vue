<template>
    <v-container class="d-flex flex-column justify-center align-center back-con">
      <v-toolbar style="width:100%" flat class="tenloFondo">
          <v-toolbar-title class="text--primary font-weight-large">Mundos</v-toolbar-title>
          <v-divider class="mx-4" inset vertical></v-divider>
          <v-spacer></v-spacer>
          <v-dialog dark v-model="dialog" max-width="500px">
            <template v-slot:activator="{ on }">
              <v-btn color="orange" class="mb-2" v-on="on"><v-icon color="black">mdi-plus</v-icon></v-btn>
            </template>
            <v-card>
              <v-card-title class="justify-space-around">
                <span> Agregar Mundo </span>
              </v-card-title>
              <v-card-text>
                <v-container>
                  <v-form ref="form" v-model="valid">
                      <v-row>
                        <v-col cols="12" sm="12">
                          <v-text-field v-model="editedworld.name" label="Mundo" required></v-text-field>
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
      
      <Scroller :elementHeigth="150" :elementsSize="worlds.length">
        <v-card 
          class="my-5 py-5"
          v-for="item in worlds" 
          :key="item.level" 
          @click="selectWorld(item)"
        >
          <v-card-title>{{item.name}} </v-card-title>

          <v-card-text>
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
  name:"SliderWorld",
  components:{Scroller},
  data(){
    return{
      worlds: [],
      editedIndex: -1,
      editedworld: { id: -1, name: ""},
      defaultworld: { id: -1, name: ""},
      valid: false,
      dialog: false,
    }
  },
  async created(){
    try {
      this.worlds = await topics
      .get()
      .then((querySnapshot) => {
        let auxworlds = []
        querySnapshot.forEach((doc) => {
          let aux = doc.data()
          aux.docId = doc.id
          aux.levels = [ 
            {level: "1", word: "word1", center: 13}, 
            {level: "2", word: "word2", center: 13}, 
            {level: "3", word: "word3", center: 13}]
          auxworlds.push(aux);
        });
        return auxworlds
      })     
    } catch (error) {
      return {error}
    }

  },
  methods:{
    editItem(world) {
      this.editedIndex = this.worlds.indexOf(world);
      this.editedworld = Object.assign({}, world);
      this.dialog = true;
    },
    close(){
      this.dialog = false;
    },
    async save(){
      if (this.editedIndex > -1) {
        console.log(this.editedworld)
        await topics.doc(this.editedworld.docId) 
        .update({name: this.editedworld.name})
        .then(() => {
          Object.assign(this.worlds[this.editedIndex], this.editedworld);
          this.$store.commit('ACTIVE_SNACK', 'El mundo se actualizo correctamente')
        })
        .catch((error) => {
          console.log(error)
          this.$store.commit('ACTIVE_SNACK', 'Se produjo un error al actualizar el mundo, Intente nuevamente')
        });
      } else {
        await topics.add({name: this.editedworld.name})
        .then((data) => {
          console.log(data)
          this.worlds.push(this.editedworld);
          this.$store.commit('ACTIVE_SNACK', 'El mundo se registro correctamente')
        })
        .catch(() => {
          this.$store.commit('ACTIVE_SNACK', 'Se produjo un error al cargar el mundo, Intente nuevamente')
        });
      }
      this.close(); 
    },
    async deleteItem(item) {
      const index = this.worlds.indexOf(item); // Se queda con el index para luego, en caso de desearlo, eliminar el producto de la tabla.
      var result = confirm(`Seguro que quiere Eliminar el mundo ${item.name} ?`);
      if (result == true) {
        await topics.doc(item.docId)
        .delete()
        .then(() => {
          this.worlds.splice(index, 1);
          this.$store.commit('ACTIVE_SNACK', 'El mundo se elimino correctamente')
        })
        .catch(() => {
          this.$store.commit('ACTIVE_SNACK', 'Se produjo un error al eliminar el mundo, Intente nuevamente')
        });
      }
    },
    selectWorld(world){
      this.$store.commit("SET_ADMIN_WORLD", world)
    }
  }
}
</script>

<style>
  .back-con{
    background-color: aqua
  }
</style>