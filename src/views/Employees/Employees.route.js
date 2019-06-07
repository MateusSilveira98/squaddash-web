import Employees from './Employees';
import EmployeeRegister from './EmployeeRegister';
import EmployeeEdit from './EmployeeEdit';
let route = [
  {
    path: '/pessoas',
    component: Employees
  },
  {
    path: '/pessoa/criar',
    component: EmployeeRegister
  },
  {
    path: '/pessoa/editar/:id',
    component: EmployeeEdit
  }
]
export default route
