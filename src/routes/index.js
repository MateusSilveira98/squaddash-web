import Vue from 'vue'
import Router from 'vue-router'
import axios from 'axios'
import routes from './routes'
import Utils from '@/utils/index'
Vue.use(Router)

const router = new Router({
  mode: 'history',
  routes
})
// router.beforeEach((to, from, next) => {
//   if (to.path === '/usuarios/cadastro') {
//     next()
//   } else if (Utils.localstorage.get('token')) {
//     axios.defaults.headers.common['Authorization'] = `Bearer ${Utils.localstorage.get('token')}`
//     next()
//   } else {
//     if (to.path !== '/login') {
//       next({ path: '/login' })
//     }
//     next()
//   }
// })
export default router
