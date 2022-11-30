<template>
  <div style="padding:10px; ">
    <v-progress-linear :active="tabela.carregando" indeterminate absolute bottom></v-progress-linear>
    <v-row class="d-inline-flex pa-2" style="margin-top:-60px;">
      <lista-tipo-pesagem @retornoTipoPesagem="setTipoPesagem($event)"></lista-tipo-pesagem>
      <lista-selecionar-data @retornoDataInicial="setDataInicial($event)" @retornoDataFinal="setDataFinal($event)">
      </lista-selecionar-data>
      <filtro-pesagem @retornoFiltros="setFiltros($event)"></filtro-pesagem>
      <ticket ref="exibir_ticket" ></ticket>
      <editar-ticket @retornoEdicaoTicket="setAlteracoesTicket($event)" ref="editar_ticket"></editar-ticket>
      <resumo-pesagem ref="exibir_resumo_pesagem"></resumo-pesagem>
    </v-row>
    <br />
    <v-data-table  fixed-header style="margin-top:12px;" :headers="headers" :items="dados" :search="search"
      :loading="tabela.carregando" :items-per-page="5">
      <template v-slot:header="{ props: { headers } }">
        <thead>
          <tr>
            <th :colspan="headers.length">
              Pesagens do dia
            </th>
          </tr>
        </thead>
      </template>

      <template v-slot:body="{ items }">
        <tbody>
          <tr v-for="item in items" :key="item.ticket">
            <td @click="exibirTicket(item.ticket)">
              <v-chip small style="cursor:pointer;">
                {{ item.ticket }}
              </v-chip>
            </td>
            <td>{{ item.placa }}</td>
            <td>{{ item.motorista }}</td>
            <td>{{ item.produto }}</td>
            <td>{{ item.fornecedor }}</td>
            <td>{{ item.dataSaida}}</td>
            <td>{{ item.horaSaida }}</td>
            <td>{{ item.pesoLiquido }}</td>
            <td>
              <v-icon small @click="editarTicket(item.ticket)">mdi-pencil</v-icon>
            </td>
            <td >
              <v-icon disabled small>mdi-download</v-icon>
            </td>
          </tr>
        </tbody>
        <v-snackbar v-model="snackbar.visible" :color="snackbar.color">
        {{ snackbar.text }}
        <template v-slot:action="{ attrs }">
          <v-btn color="white" text v-bind="attrs" @click="snackbar.visible = false">Fechar</v-btn>
        </template>
      </v-snackbar>
      </template>
    </v-data-table>
  </div>
</template>

<script>
import  moment from "moment/moment";
import ListaSelecionarData from '@/components/listaSelecionarData.vue';
import ListaTipoPesagem from '@/components/listaTipoPesagem.vue';
import filtroPesagem from '@/components/filtroPesagem.vue';
import ticket from '@/components/ticket.vue';
import editarTicket from '@/components/editarTicket.vue'
import ResumoPesagem from '@/components/ResumoPesagem.vue'
import req from "@/controllers/requisicao.js";

export default {

  name: "homePage",
  data: () => ({

    search: "",

    tabela: {
      carregando: false
    },

    parametros: {
      tipoPesagem: "",
      dataInicial: "",
      dataFinal: "",
      filtros: [],
    },


    ticket: {
      id: ""
    },
    snackbar: { visible: false, text: "", color: "" },

    headers: [
      { text: "Ticket", value: "ticket" },
      { text: "Placa", value: "placa" },
      { text: "Motorista", value: "motorista" },
      { text: "Produto", value: "produto" },
      { text: "Fornecedor", value: "fornecedor" },
      { text: "Data saída", value: "dataSaida" },
      { text: "Hor.", value: "horaSaida" },
      { text: "Peso liquído", value: "pesoLiquido" },
      { text: "", value: "" },
      { text: "", value: "" },
    ],

    dados: []
  }),
  methods:
  {
    exibirMensagem(msg, erro) {
      if (msg != "")
        this.snackbar.text = msg;
      else return;
      if (erro)
        this.snackbar.color = "red accent-2";
      else this.snackbar.color = "";
      this.snackbar.visible = true;
    },
    
    exibirTicket($id) {
      var vm = this;
      moment.isDate("14/11/1993");
      vm.$refs.exibir_ticket.open($id);
    },

    exibirResumoPesagem(id){
      var vm = this;ee
      vm.$refs.exibir_resumo_pesagem.open(id , this.parametros.dataFinal);
    },

    editarTicket($id) {
      var vm = this;
      this.ticket.id = $id;
      
      req.obterJsonApi("/ticket/" + $id).then(response => {
        if (response.error === undefined) {
          vm.$refs.editar_ticket.open(response);
        }
      });

    },

    setTipoPesagem(data) {
      this.parametros.tipoPesagem = data;
    },

    setDataInicial(data) {
      this.parametros.dataInicial = data;
    },

    setDataFinal(data) {
      this.parametros.dataFinal = data;
    },

    setFiltros(data) {
      this.parametros.filtros = data;
    },

    setAlteracoesTicket(data) {
      req.sendJsonApi("/ticket/update/" + this.ticket.id , data).then(response=>{

        if (response.msg !== undefined) {
          this.exibirMensagem(response.msg , false);
          this.buscaDados();
        } else{
          this.exibirMensagem("Falha ao tentar atualizar as informações do ticket" , true);
        } 
      });

    },

    buscaDados() {
      let argumentos = {
        tipoPesagem: this.parametros.tipoPesagem.toLocaleLowerCase(),
        dataInicial: this.parametros.dataInicial,
        dataFinal: this.parametros.dataFinal,
        filtros: this.parametros.filtros
      }

      this.tabela.carregando = true;
      this.dados = [];
      console.log(JSON.stringify(argumentos));
      req.sendJsonApi("/relatorio/json", argumentos).then(response => {
        if (response.error === undefined) {
          this.dados = Object.values(response);
        }

      }).finally(() => {
        this.tabela.carregando = false;
      });

    },

    ajustarItensSelecionados() {
      /*if (this.tabela.itensSelecionados.length != 0) {
        this.tabela.itensSelecionados.forEach(item => {
          this.tabela.valorSelecionado = item.ticket;
          this.btnDownloadDesativado = false;
        });
      } else {
        this.tabela.valorSelecionado = "",
          this.btnDownloadDesativado = true;
      }*/
      console.log(this.tabela.itensSelecionados);
    }
  },
  created() {
    this.$emit("retornoAppBar", true);
  },
  watch: {
    'parametros': { handler: function () { this.buscaDados(); }, deep: true },
    textSearch: function () {
      this.search = this.textSearch;
    },
    'tabela.itensSelecionados': { handler: function () { this.ajustarItensSelecionados(); }, deep: true },
  },

  props: {
    textSearch: String
  },

  components: { ListaTipoPesagem, ListaSelecionarData, filtroPesagem, ticket, editarTicket , ResumoPesagem },
}
  ;
</script>