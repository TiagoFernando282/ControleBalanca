<template>
    <v-dialog v-model="dialog" scrollable max-width="400px">
        <template v-slot:activator="{ on, attrs }">
            <v-chip class="ma-2" color="grey darken-4" outlined label v-bind="attrs" v-on="on">
                <v-icon left>mdi-calendar</v-icon>
                {{ titleButton }}
            </v-chip>
        </template>
        <v-card>
            <v-card-title>{{ titleComponent }}</v-card-title>
            <v-divider></v-divider>
            <v-card-text style="height: 110px;">
                <br /><br />
                <v-row>
                    <input type="date" v-model="dataInicial" :max="dataFinal"> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    <input type="date" v-model="dataFinal" >
                </v-row>
            </v-card-text>
            <v-divider></v-divider>
            <v-card-actions>
                <v-btn color="red darken-2" text @click="dialog = false">
                    Cancelar
                </v-btn>
                <v-btn color="green darken-2" text @click="validarDatas">
                    Confirmar
                </v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>

<script>
import * as moment from "moment/moment";

export default {

    name: "listaSelecionarData",
    data() {
        return {
            titleComponent: "Período das pesagens",
            titleButton: "",
            dataInicial: "",
            dataFinal: "",
            dialog: false,
        };
    },

    methods: {

        validarDatas: function () {

            let date1 = moment(this.dataInicial).valueOf();
            let date2 = moment(this.dataFinal).valueOf();

            if (date1 > date2) {
                alert("data maior");
                return;
            }

            this.$emit("retornoDataInicial", this.dataInicial);
            this.$emit("retornoDataFinal", this.dataFinal);
            this.setMensagemData();
            this.dialog = false;
        },

        setMensagemData() {

            if (this.dataInicial != this.dataFinal) {
                this.titleButton = moment(this.dataInicial).format("DD/MM/YYYY")
                    + "-" + moment(this.dataFinal).format("DD/MM/YYYY");
            } else {
                this.titleButton = moment(this.dataInicial).format("DD/MM/YYYY");
            }
        }
    },
    props: {
        inicio: String,
        fim: String
    },

    mounted() {
        if (this.inicio == "" || this.fim == "" || this.inicio == undefined
            || this.fim == undefined) {
            var today = new Date().toLocaleDateString('en-ZA').replaceAll("/", "-");
            this.dataInicial = today;
            this.dataFinal = today;
            this.setMensagemData();

            this.$emit("retornoDataInicial", this.dataInicial);
            this.$emit("retornoDataFinal", this.dataFinal);
        }
    }
}
</script>

<style scoped>
input {
    width: 160px;
    border: 1px solid silver;
    border-radius: 3px;
    padding: 10px;
}

input:focus {
    outline: none;
    border-color: #9ecaed;
    box-shadow: 0 0 10px #9ecaed;
}
</style>
