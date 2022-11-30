<template>
    <v-dialog v-model="dialog" scrollable max-width="300px">
        <template v-slot:activator="{ on, attrs }">
            <v-chip class="ma-2" color="grey darken-4" outlined label v-bind="attrs" v-on="on">
                {{titleButton}}
            </v-chip>
        </template>
        <v-card>
            <v-card-title>{{titleComponent}}</v-card-title>
            <v-divider></v-divider>
            <v-card-text style="height: 150px;">
                <v-radio-group v-model="tipoSelecionado" column>
                    <v-radio v-for="item in items" :key="item.label" :label="item.label" :value="item.value"></v-radio>
                </v-radio-group>
            </v-card-text>
            <v-divider></v-divider>
            <v-card-actions>
                <v-btn color="red darken-2" text @click="dialog = false">
                    Cancelar
                </v-btn>
                <v-btn color="green darken-2" text @click="salvar">
                    Confirmar
                </v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>

<script>
export default {
    name: 'listaTipoPesagem',
    data() {
        return {
            titleComponent: "Tipo de pesagem",
            titleButton: "",
            tipoSelecionado: this.value,
            dialog: false,
            items: [
                { label: 'Recebimento', value: "recebimento" },
                { label: 'Expedição', value: "expedicao" },
                { label: 'Ambos', value: "ambos" }
            ]
        }
    },
    methods:
    {
        salvar: function () {
            this.items.forEach((element) => {
                if (element.value == this.tipoSelecionado)
                    this.titleButton = element.label;
                this.$emit("retornoTipoPesagem", this.tipoSelecionado);
            });
            this.dialog = false
        }
    },

    mounted() {
        if (this.tipoSelecionado == "" || this.tipoSelecionado == undefined)
            this.tipoSelecionado = "recebimento";
            this.$emit("retornoTipoPesagem", this.tipoSelecionado);

        this.items.forEach((element) => {
            if (element.value == this.tipoSelecionado)
                this.titleButton = element.label;
        });
    }
}
</script>
