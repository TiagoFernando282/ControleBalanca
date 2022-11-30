<template>
    <v-dialog v-model="dialog" scrollable max-width="820px" style="">
        <v-card style="padding:5px;">
            <v-divider style="margin-top:8px;"></v-divider>
            <v-card-text style="margin-top:5px;">
                <v-row v-show="frameLoading" class="fill-height padrao" align-content="center" justify="center">
                    <v-col class="text-subtitle-1 text-center" cols="12">
                        Obtendo ticket...
                    </v-col>
                    <v-col cols="6">
                        <v-progress-linear indeterminate rounded height="6">
                        </v-progress-linear>
                    </v-col>
                </v-row>
                <iframe v-show="frameTicket" id="frame_ticket" class="padrao" :src="url_view_ticket"></iframe>
            </v-card-text>
            <v-card-actions style="margin-top:-20px;">
                <v-btn color="red darken-2" text @click="dialog = false">CANCELAR</v-btn>
                <v-btn color="green darken-2" text>IMPRIMIR</v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>

<script>
export default {
    name: 'ticketPesagem',
    data() {
        return {
            titleButton: "Ticket",
            dialog: false,
            id_ticket: "",
            url_view_ticket: "",
            frameTicket: false,
            frameLoading: true,
        }
    },

    methods: {
        open: function ($id) {

            //Definindo valores padrão
            this.frameLoading = true;
            this.frameTicket = false;

            //Exibindo ticket
            var vm = this;
            vm.id_ticket = $id;
            vm.dialog = true;

            //Evento de carregamento
            setTimeout(() => {
                this.frameLoading = false;
                this.frameTicket = true;
            }, 500);
        }
    },

    watch: {
        id_ticket: function () {
            this.url_view_ticket = "http://localhost/apibalanca/ticket/imprimir/" +
                this.id_ticket;
        },
    },

    props: {
        ticket: String
    }
}
</script>
<style scoped>
.padrao {
    width: 100%;
    height: 420px;
    border: none;
}
</style>