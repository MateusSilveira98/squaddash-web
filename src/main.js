import Vue from 'vue'
import App from '@/App.vue'
import router from '@/routes/index'
import store from '@/store/index'
import '@/registerServiceWorker'
import axios from 'axios'
import enviroment from './enviroment'

axios.defaults.baseURL = enviroment.url
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
