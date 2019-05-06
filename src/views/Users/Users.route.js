import Login from './Login'
import UserRegister from './UserRegister'
import UserEdit from './UserEdit'
import Users from './Users'
let route = [
  {
    path: '/login',
    component: Login
  },
  {
    path: '/usuarios',
    component: Users
  },
  {
    path: '/usuarios/criar',
    component: UserRegister
  },
  {
    path: '/usuarios/criar/:type',
    component: UserRegister
  },
  {
    path: '/usuarios/editar/:id',
    component: UserEdit
  }
]
export default route
