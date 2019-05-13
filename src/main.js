import Vue from 'vue';
import App from '@/App.vue';
import router from '@/routes/index';
import store from '@/store/index';
import '@/filters/index';
import config from '@/config.json';
import '@/registerServiceWorker'
import axios from 'axios';
import 'vue-multiselect/dist/vue-multiselect.min.css'

import VeeValidate, { Validator } from "vee-validate";
import pt_BR from "vee-validate/dist/locale/pt_BR";

Validator.localize({ pt_BR: pt_BR })

Vue.use(VeeValidate, { locale: 'pt_BR' });

axios.defaults.headers.common['Content-Type'] = `application/json`
axios.defaults.baseURL = config.API.dev_url;
Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
