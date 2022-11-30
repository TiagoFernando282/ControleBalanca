<template>
  <v-app id="app">
    <v-navigation-drawer v-model="drawer" absolute bottom temporary app>
      <v-list-item>
        <v-list-item-content>
          <v-list-item-title class="text-h6"> Home </v-list-item-title>
          <v-list-item-subtitle> Controle de balança </v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>
      <v-divider></v-divider>
      <v-list dense>
        <v-list-group v-for="item in items" :key="item.title" v-model="item.active" :prepend-icon="item.action"
          no-action>
          <template v-slot:activator>
            <v-list-item-content>
              <v-list-item-title v-text="item.title"></v-list-item-title>
            </v-list-item-content>
          </template>
          <v-list-item v-for="subItem in item.items" :key="subItem.title" link>
            <v-list-item-content>
              <v-list-item-title v-text="subItem.title" @click="exibirResumoPesagem(subItem.id)"></v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list-group>
      </v-list>
    </v-navigation-drawer>
    <v-app-bar v-if="appbarVisible === true" color="blue darken-3" elevation="2" dark dense style="max-height:48px" flat
      app>
      <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
      <v-toolbar-title style="font-size: medium;">Página inicial</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-text-field @focus="search.closed = false" @blur="search.closed = true" placeholder="Pesquisar"
        style="margin-top:25px !important; max-width:350px; " class="expanding-search mt-1"
        :class="{ 'closed': search.closed }" prepend-inner-icon="mdi-magnify" v-model="search.text" filled dense>
      </v-text-field>
      <v-menu left bottom>
        <template v-slot:activator="{ on, attrs }">
          <v-btn icon v-bind="attrs" v-on="on">
            <v-icon>mdi-dots-vertical</v-icon>
          </v-btn>
        </template>
        <v-list>
          <v-list-item>
            <v-list-item-title @click="editarUsuarios()">Editar usuários</v-list-item-title>
          </v-list-item>
          <v-list-item>
            <v-list-item-title @click="logout()">Sair</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
    </v-app-bar>
    <v-main>
      <v-container fluid>
        <router-view ref="router_view" @retornoAppBar="setAppBarVisible($event)" :textSearch="search.text">
        </router-view>
      </v-container>
    </v-main>
  </v-app>
</template>
<script>
import router from './router';
export default {
  name: "App",
  data: () => ({
    appbarVisible: true,
    drawer: false,

    search: {
      text: "",
      closed: true
    },
    items: [
      {
        action: "mdi-file-chart",
        title: "Resumo",
        items: [
          { title: "Recebimento", id: 1 },
          { title: "Expedição", id: 2 },
          { title: "Ambos", id: 3 },
        ],
      },
      {
        action: "mdi-clipboard-text",
        title: "Relatório",
        items: [
          { title: "Recebimento", id: 4 },
          { title: "Expedição", id: 5 },
          { title: "Ambos", id: 6 },
        ],
      },
    ],
  }),
  methods:
  {
    exibirResumoPesagem(data) {
      var vm = this;
      this.drawer = false;
      if (data <= 3) {
        vm.$refs.router_view.exibirResumoPesagem(data);
      }

    },

    setAppBarVisible(data) {
      this.appbarVisible = data;
    },

    editarUsuarios() {
      router.push('/usuario');
    },

    logout() {
      router.push('/login');
    }
  }
};
</script>

<style>
/* Largura da barra de rolagem */
::-webkit-scrollbar {
  width: 4px;
}

/* Fundo da barra de rolagem */
::-webkit-scrollbar-track-piece {
  background-color: #eee;
  border-left: 1px solid #ccc;
}

/* Cor do indicador de rolagem */
::-webkit-scrollbar-thumb:vertical,
::-webkit-scrollbar-thumb:horizontal {
  background-color: #bac0c4;
}

/* Cor do indicador de rolagem - ao passar o mouse */
::-webkit-scrollbar-thumb:vertical:hover,
::-webkit-scrollbar-thumb:horizontal:hover {
  background-color: #717171;
}

body {
  -webkit-user-select: none;
  -ms-user-select: none;
  /* IE 10 and IE 11 */
  user-select: none;
}

.v-input.expanding-search {
  transition: max-width 0.3s
}

.v-input__slot {
  border-color: transparent !important;
}

.closed {
  max-width: 45px !important;
  background-color: none;
}
</style>
