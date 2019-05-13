import Employees from './Employees';
import EmployeeRegister from './EmployeeRegister';
import EmployeeEdit from './EmployeeEdit';
let route = [
  {
    path: '/funcionarios',
    component: Employees
  },
  {
    path: '/funcionario/criar',
    component: EmployeeRegister
  },
  {
    path: '/funcionario/editar/:id',
    component: EmployeeEdit
  }
]
export default route
