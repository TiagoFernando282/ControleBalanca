<template>
  <div>
    <v-layout align-center justify-center dark fill-height style="height: 80vh;">
      <v-form v-model="isFormValid" style="width:340px !important;  padding:10px; ">
        <v-list-item two-line>
          <v-list-item-content>
            <v-list-item-title>
              <center><b>
                  <h2>LOG IN</h2>
                </b></center>
            </v-list-item-title>
            <v-list-item-subtitle>
              <center>Insira suas credenciais para prosseguir</center>
            </v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
        <v-col>
          <v-text-field v-model="usuario.nome" :rules="[rules.required, rules.min]" label="Usuário" focus outlined>
          </v-text-field>
          <v-text-field v-model="usuario.senha" :append-icon="showIconPassword ? 'mdi-eye' : 'mdi-eye-off'"
            :rules="[rules.required, rules.min]" :type="showIconPassword ? 'text' : 'password'" label="Senha" counter
            outlined @click:append="showIconPassword = !showIconPassword" v-on:keyup.enter="logar()"></v-text-field>
          <v-btn large style=" margin-top:5px;" block rounded :disabled="!isFormValid" @click="logar()" color="primary">
            ENTRAR</v-btn>
        </v-col>
      </v-form>
    </v-layout>
    <v-footer fixed>
      <v-col class="text-center" cols="12">
        {{ new Date().getFullYear() }} — <strong>TF Software</strong>
      </v-col>
    </v-footer>
    <v-snackbar color="red accent-2" v-model="snackbar.visible" :timeout="snackbar.timeout">{{snackbar.text}}
      <template v-slot:action="{ attrs }">
        <v-btn color="white" text v-bind="attrs" @click="snackbar.visible = false">
          Fechar
        </v-btn>
      </template>
    </v-snackbar>
  </div>
</template>
<script>
import login from '@/controllers/login.js';
import router from '@/router';
export default {
  name: "loginPage",

  data: () => ({
    isFormValid : false,
    showIconPassword: false,
    snackbar: { visible: false, text: "" ,  timeout: 4000},
    usuario : {nome : '', senha : ''},
    rules: {
      required: value => !!value || 'Preencha este campo',
      min: v => v.length >= 5 || 'Min 6 caracteres',
    },

  }),
  methods:
  {

    logar: function () {
      if (this.usuario.nome != "" || this.usuario.senha != "") {
        login.verificar(this.usuario).then(response=>{
          if(response.token !== undefined){
            localStorage.setItem("token" , response.token);
            router.push("/");
          } else 
            this.exibirMensagem("Usuário ou senha inválidos");
        });
      }
    },

    exibirMensagem: function (msg) {
      if (msg == "") return;
      this.snackbar.text = msg;
      this.snackbar.visible = true;
    }
  },
  created(){
    this.$emit("retornoAppBar", false);
  }

}
</script>