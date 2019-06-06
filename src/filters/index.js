import Vue from 'vue'
import moment from 'moment'

Vue.filter('brDate', value => {
  moment.locale('pt-br');
  return moment(value).format('L');
})
Vue.filter('boolFormat', (value, caseTrue, caseFalse) => {
  return value ? caseTrue : caseFalse
})
Vue.filter('brCurrency', (value) => {
  let currency = value ? (value/1).toFixed(2).replace('.', ',') : 0.00;
  currency = currency.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  return `R$ ${currency}`
})
Vue.filter('cnpj', (value) => {
  return value.replace(/^(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/, '$1.$2.$3/$4-$5');
})
