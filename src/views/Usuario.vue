<template>
  <div style="padding:10px;">
    <v-container>
      <br />
      <v-alert v-if="exibirMsg" type="success">Usuário adicionado com êxito</v-alert>
      <v-card class="mx-auto" outlined style="padding:15px;">
        <div>
          <v-data-table style="margin-top:0px; cursor: pointer;" :headers="headers" :items="dados" :search="search"
            isSelected="true" :loading="carregando" loading-text="Carregando dados...">
            <template v-slot:header="{ props: { headers } }">
              <thead>
                <tr>
                  <th :colspan="headers.length">
                    Usuários cadastrados
                  </th>
                </tr>
              </thead>
            </template>
            <template v-slot:body="{ items }">
              <tbody>
                <tr v-for="item in items" :key="item.id">
                  <td>{{ item.id }}</td>
                  <td>{{ item.nome }}</td>
                  <td>{{ item.senha }}</td>
                  <td>{{ item.tipo }}</td>
                  <td>
                    <v-icon @click="excluirUsuario(item)">mdi-delete-outline</v-icon>
                  </td>
                </tr>
              </tbody>
            </template>
          </v-data-table>
          <br />
        </div>
      </v-card>
      <novoUsuario @retornoNovoUsuario="exibirRetornoInsercao($event)"></novoUsuario>
      <v-snackbar v-model="snackbar.visible" :color="snackbar.color">
        {{ snackbar.text }}
        <template v-slot:action="{ attrs }">
          <v-btn color="white" text v-bind="attrs" @click="snackbar.visible = false">Fechar</v-btn>
        </template>
      </v-snackbar>
    </v-container>
  </div>
</template>

<script>
import novoUsuario from '@/components/novoUsuario.vue';
import usuario from '@/controllers/usuario.js';
export default {

  name: "pagUsuario",
  data: () => ({
    carregando: false,
    selected: "",
    search: "",
    exibirMsg: false,
    snackbar: { visible: false, text: "", color: "" },
    headers: [
      {
        text: "Cód.",
        align: "start",
        value: "id",
      },
      { text: "Usuário", value: "nome" },
      { text: "Gerou senha", value: "senha" },
      { text: "Tipo", value: "tipo" },
      { text: "", value: "excluir" }
    ],
    dados: []

  }),

  methods: {
    listarUsuarios() {
      this.carregando = true;
      usuario.listarTodos().then(response => {
        this.dados = response;
      }).catch(err => {
        this.dados = [];
        this.exibirMensagem(err, false);
      }).finally(() => {
        this.carregando = false;
      });
    },

    excluirUsuario(item) {
      if (confirm("Tem certeza?")) {
        usuario.remover(item.id).then(response => {
          this.exibirMensagem(response.msg, true);
          this.listarUsuarios();
        }).catch(err => {
          this.exibirMensagem(err.error, true);
        });
      }
    },

    exibirRetornoInsercao(data) {
      this.exibirMensagem(data, false);
      this.listarUsuarios();
    },

    exibirMensagem(msg, erro) {
      if (msg != "")
        this.snackbar.text = msg;
      else return;
      if (erro)
        this.snackbar.color = "red accent-2";
      else this.snackbar.color = "";
      this.snackbar.visible = true;
    }
  },

  mounted() {
    this.listarUsuarios();
  },
  created() {
    this.$emit("retornoAppBar", true);
  },

  components: { novoUsuario }
};
</script>