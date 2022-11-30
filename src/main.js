import Vue from 'vue';
import App from './App.vue';
import router from './router';
import vuetify from './plugins/vuetify'
import VueMask from 'v-mask';
Vue.use(VueMask);
Vue.use(require("moment"));

Vue.config.productionTip =

    new Vue({
        vuetify,
        router,
        render: h => h(App),
    }).$mount('#app')