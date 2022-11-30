<template>
    <v-dialog v-model="dialog" scrollable max-width="650px">
        <v-card>
            <v-container>
                <v-card-title>{{ titleComponent }}</v-card-title>
                <v-divider></v-divider>
                <v-data-table :headers="headers" :items="dados" :items-per-page="10" :loading="carregando">
                </v-data-table>
            </v-container>
            <v-divider></v-divider>
            <v-card-actions>
                <v-btn color="red darken-2" text @click="dialog = false">
                    Cancelar
                </v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>

<script>
import req from "@/controllers/requisicao.js";

export default {
    name: 'ResumoPesagem',
    data() {
        return {
            titleComponent: "Resumo de pesagens",
            tipoSelecionado: this.value,
            dialog: false,
            carregando : false,

            headers: [
                { text: "Cód.", value: "codProduto" },
                { text: "Produto", value: "produto" },
                { text: "Peso", value: "pesoLiquido" },
            ],

            dados: []
        }
    },
    methods:
    {
        open: function (id , dataFinal) {
            let tipo = "";
            this.dialog = true;
            if (id == 1) tipo = "recebimento";
            if (id == 2) tipo = "expedicao";
            if (id == 3) tipo = "ambos";
            this.carregando = true;
            this.dados = [];


            req.obterJsonApi("/resumo/" + tipo + "/" + dataFinal).then(response=>
            {
                this.dados = Object.values(response);
            }).finally(()=>{
                this.carregando = false;
            })
    
        },

        

    },

    mounted() {

    }
}
</script>
