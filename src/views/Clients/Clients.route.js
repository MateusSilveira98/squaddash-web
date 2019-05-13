import Clients from './Clients'
import ClientRegister from './ClientRegister'
import ClientEdit from './ClientEdit'
let route = [
  {
    path: '/clientes',
    component: Clients
  },
  {
    path: '/cliente/criar',
    component: ClientRegister
  },
  {
    path: '/cliente/editar/:id',
    component: ClientEdit
  }
]
export default route
