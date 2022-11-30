<template>
    <div>
        <v-row justify="center">
            <v-dialog v-model="dialog" fullscreen hide-overlay transition="dialog-bottom-transition" scrollable>
                <v-card tile>
                    <v-toolbar flat dark color="primary" max-heigth="50px">
                        <v-btn icon dark @click="dialog = false">
                            <v-icon>mdi-close</v-icon>
                        </v-btn>
                        <v-toolbar-title>{{ tituloModal }}</v-toolbar-title>
                        <v-spacer></v-spacer>
                        <v-toolbar-items>
                            <v-btn dark text @click="salvar()"> Salvar</v-btn>
                        </v-toolbar-items>
                    </v-toolbar>
                    <v-card-text><br /><br />
                        <v-container>
                            <v-row justify="center">
                                <v-col cols="12" sm="10" md="8" lg="6" v-for="item in items" :key="item.label">
                                    <v-text-field dense :label="item.label" class="compactar" v-model="item.value">
                                    </v-text-field>
                                </v-col>
                            </v-row>
                        </v-container>
                    </v-card-text>
                    <div style="flex: 1 1 auto;"></div>
                </v-card>
            </v-dialog>
        </v-row>
    </div>
</template>
<script>
export default {
    name: 'editarTicket',
    data() {
        return {
            dialog: false,
            qtdAlteracoes: 0,
            tituloModal: "Editar Ticket",
            items: [
                { label: 'Placa', id: "placa", value: "" },
                { label: 'Motorista', id: "motorista", value: "" },
                { label: 'RG/CPF', id: "cpf", value: "" },
                { label: 'Produto', id: "produto", value: "" },
                { label: 'Fornecedor', id: "fornecedor", value: "" },
                { label: 'NF', id: "nf", value: "" },
                { label: 'Peso NF', id: "pesoNF", value: "" },
                { label: 'Boletim', id: "boletim", value: "" },
            ]
        }
    },

    methods: {

        open: function ($data) {
            this.items.forEach(element => {
                if (element.label.toLowerCase() != "") {
                    element.value = $data[element.id];
                }
            });
            this.tituloModal = "Editar ticket - " + $data.ticket;
            this.qtdAlteracoes = 0;
            this.dialog = true;
        },

        salvar: function () {
            if (this.qtdAlteracoes > 1) {
                let dados = [];
                this.items.forEach(element => {
                    if (element.value.toLowerCase() != "") {
                        dados.push({
                            [element.id]: element.value
                        });
                    }
                });

                this.$emit("retornoEdicaoTicket", dados);
            }
            this.dialog = false;
        },

        dadosAlterados() {
            this.qtdAlteracoes++;
        }
    },

    watch: {
        'items': { handler: function () { this.dadosAlterados(); }, deep: true }
    },


}
</script>