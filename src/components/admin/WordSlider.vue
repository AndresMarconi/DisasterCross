<template>
  <v-container class="d-flex flex-column justify-center align-center back-con">
    <v-toolbar style="width: 100%" flat class="tenloFondo">
      <v-toolbar-title class="text--primary font-weight-large">Palabras</v-toolbar-title>
      <v-divider class="mx-4" inset vertical></v-divider>
      <v-spacer></v-spacer>
      <v-dialog dark v-model="dialog" max-width="500px">
        <template v-slot:activator="{ on }">
          <v-btn :disabled="!level" color="orange" class="mb-2" v-on="on">
            <v-icon color="black">mdi-plus</v-icon>
          </v-btn>
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
                    <v-text-field
                      v-model="editedWord.index"
                      label="Indice"
                      required
                    ></v-text-field>
                    <v-text-field
                      v-model="editedWord.word"
                      label="Palabra"
                      required
                    ></v-text-field>
                    <v-text-field
                      v-model="editedWord.center"
                      label="Casilla central"
                      required
                    ></v-text-field>
                    <v-text-field
                      v-model="editedWord.hint"
                      label="Pista"
                      required
                    ></v-text-field>
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
    <Scroller v-if="level" :elementHeigth="150" :elementsSize="words.length">
      <p v-show="level && level.words.length <= 0"> Nivel sin palabras </p>
      <v-card class="my-5 py-5" v-for="item in words" :key="item.word">
        <v-card-title>{{ item.word }} </v-card-title>
        <v-card-text> Centrada en {{ item.center }} </v-card-text>
        <v-card-actions>
          <v-icon small @click="editItem(item)" class="mr-4">mdi-pencil</v-icon>
          <v-icon small @click="deleteItem(item)" class="mr-4">mdi-delete</v-icon>
        </v-card-actions>
      </v-card>
    </Scroller>
    <p class="mt-5" v-else>
      No hay nivel seleccionado
    </p>
  </v-container>
</template>

<script>
import Scroller from "@/components/Scroller.vue";
import { topics } from "@/firebase.js";
export default {
  name: "SliderWord",
  data() {
    return {
      editedIndex: -1,
      editedWord: {index: 0, word: "", hint: "", center: 0 },
      defaultWord: {index: 0, word: "", hint: "", center: 0 },
      valid: false,
      dialog: false,
    };
  },
  components: {
    Scroller,
  },
  methods: {
    editItem(word) {
      this.editedIndex = this.words.indexOf(word);
      this.editedWord = Object.assign({}, word);
      this.dialog = true;
    },
    close() {
      this.dialog = false;
      this.$nextTick(() => {
        this.editedWord = Object.assign({}, this.defaultWord);
        this.editedIndex = -1;
      });
    },
    async save() {
      if (this.editedIndex > -1) {
        await topics.doc(this.world.docId).collection("levels").doc(this.level.docId).collection("words").doc(this.editedWord.docId)
          .update({
            index: this.editedWord.index,
            word: this.editedWord.word,
            center: this.editedWord.center,
            hint: this.editedWord.hint
          })
          .then(() => {
            Object.assign(this.words[this.editedIndex], this.editedWord);
            this.$store.commit( "ACTIVE_SNACK", "La palabra se actualizo correctamente" );
          })
          .catch((error) => {
            console.log(error);
            this.$store.commit( "ACTIVE_SNACK", "Se produjo un error al actualizar la palabra, Intente nuevamente" );
          });
      } else {
        await topics.doc(this.world.docId).collection("levels").doc(this.level.docId).collection("words")
          .add(this.editedWord)
          .then((data) => {
            this.editedWord.docId = data.id;
            this.words.push(this.editedWord);
            this.$store.commit( "ACTIVE_SNACK", "La palabra se registro correctamente" );
          })
          .catch(() => {
            this.$store.commit( "ACTIVE_SNACK", "Se produjo un error al cargar la palabra, Intente nuevamente" );
          });
      }
      this.close();
    },
    async deleteItem(item) {
      const index = this.words.indexOf(item);
      var result = confirm(
        `Seguro que quiere Eliminar la palabra ${item.word}?`
      );
      if (result == true) {
        await topics.doc(this.world.docId).collection("levels").doc(this.level.docId).collection("words").doc(item.docId)
          .delete()
          .then(() => {
            this.words.splice(index, 1);
            this.$store.commit( "ACTIVE_SNACK", "La palabra se elimino correctamente" );
          })
          .catch(() => {
            this.$store.commit( "ACTIVE_SNACK", "Se produjo un error al eliminar la palabra, Intente nuevamente" );
          });
      }
    },
    orderByIndex(words){
      words.sort((word1, word2) => {
        return word1.index - word2.index  
      }) 
      return words
    }
  },
  computed: {
    words() {
      if (this.$store.state.currentLevelAdmin == null) { return [] }
      return this.orderByIndex(this.$store.state.currentLevelAdmin.words);
    },
    level() {
      return this.$store.state.currentLevelAdmin;
    },
    world() {
      return this.$store.state.currentWorldAdmin;
    },
  },
};
</script>

<style>
</style>