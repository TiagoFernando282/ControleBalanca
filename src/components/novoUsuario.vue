<template>
  <v-dialog v-model="dialog" scrollable max-width="400px">
    <template v-slot:activator="{ on, attrs }">
      <v-fab-transition>
        <v-btn color="indigo" dark absolute bottom right fab style="bottom:40px;" v-bind="attrs" v-on="on">
          <v-icon>mdi-plus</v-icon>
        </v-btn>
      </v-fab-transition>
    </template>
    <v-card>
      <v-card-title>Adicionar usuário</v-card-title>
      <v-divider></v-divider>
      <v-form v-model="isFormValid">
        <v-list-item two-line>
          <v-list-item-content>
            <v-col cols="12" md="12">
              <v-select :items="items" :rules="[rules.required, rules.min1]" v-model="usuario.tipo" dense outlined
                label="Tipo" item-text='descricao' item-value='id'>
              </v-select>
            </v-col>
            <v-col cols="12" md="12">
              <v-text-field label="Usuário" :rules="[rules.required, rules.min]" v-model="usuario.nome" dense outlined
                v-on:keyup.enter="addUsuario">
              </v-text-field>
            </v-col>
          </v-list-item-content>
        </v-list-item>
      </v-form>
      <br />
      <v-divider></v-divider>
      <v-card-actions>
        <v-btn color="red darken-2" text @click="dialog = false">
          Cancelar
        </v-btn>
        <v-btn color="green darken-2" text @click="addUsuario" :disabled="!isFormValid">
          Confirmar
        </v-btn>
      </v-card-actions>
    </v-card>
    <v-snackbar v-model="snackbar.visible">
      {{ snackbar.text }}
      <template v-slot:action="{ attrs }">
        <v-btn color="red" text v-bind="attrs" @click="snackbar.visible = false">Fechar</v-btn>
      </template>
    </v-snackbar>
  </v-dialog>
</template>

<script>
import usuario from '@/controllers/usuario.js';
export default {
  name: 'novoUsuario',

  data: () => ({
    dialog: false,
    items: [],
    usuario: { nome: "", tipo: "" },
    isFormValid: false,
    snackbar: { visible: false, text: "" },

    rules: {
      required: value => !!value || 'Preencha este campo',
      min: v => v.length >= 3 || 'Min 3 caracteres',
      min1: v => v != "" || 'Selecione um item',
    }
  }),

  methods: {
    addUsuario: function () {
      if (this.isFormValid) {
        usuario.adicionar(this.usuario).then(response => {
          this.$emit("retornoNovoUsuario", response.msg);
          this.usuario.nome = "";
          this.usuario.tipo = "";
          this.dialog = false;
        }).catch(err => {
          alert(err);
        });
      }
    },

    listarCategorias: function () {
      usuario.obterTiposUsuario().then(response => {
        
        this.items = response;
      }).catch(err => {
        console.log(err);
      });
    }
  },

  mounted() {
    this.listarCategorias();
  }
}
</script>
