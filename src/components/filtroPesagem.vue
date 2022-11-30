<template>
    <v-dialog v-model="dialog" scrollable max-width="400px">
        <template v-slot:activator="{ on, attrs }">
            <v-chip class="ma-2" color="grey darken-4" outlined label v-bind="attrs" v-on="on">
                <v-icon left>mdi-filter</v-icon>{{ titleButton }}
            </v-chip>
        </template>
        <v-card>
            <v-card-title> {{ titleComponent }}</v-card-title>
            <v-divider></v-divider>
            <v-card-text>
                <v-container style="margin-top:20px; padding:0px;">
                    <v-text-field v-for="item in items" :key="item.label" dense outlined :label="item.label"
                        class="compactar" v-model="item.value"></v-text-field>
                </v-container>
            </v-card-text>
            <v-divider></v-divider>
            <v-card-actions>
                <v-btn color="red darken-2" text @click="dialog = false">CANCELAR</v-btn>
                <v-btn color="green darken-2" text @click="salvar">CONFIRMAR</v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>

<script>
export default {
    name: 'filtroPesagem',
    data() {
        return {
            titleComponent: "Filtros",
            titleButton: "Filtros",
            dialog: false,
            items: [
                { label: 'Placa', value: "" },
                { label: 'Motorista', value: "" },
                { label: 'CPF', value: "" },
                { label: 'Produto', value: "" },
                { label: 'NF', value: "" },
                { label: 'Fornecedor', value: "" },
                { label: 'BC', value: "" }
            ]
        }
    },

    methods:
    {
        salvar: function () {
            let dados = [];
            this.items.forEach(element => {
                if (element.value.toLowerCase() != "") {
                    dados.push({
                        [element.label.toLowerCase()]: element.value.toLowerCase()
                    });
                }
            });
            this.$emit("retornoFiltros", dados);
            this.dialog = false;
        }
    }
}
</script>
<style scoped>
.compactar {
    margin-top: -8px;
}
</style>
