import Dashboard from './Dashboard'
import MonthlySquadRegister from './MonthlySquadRegister'
import MonthlySquadEdit from './MonthlySquadEdit'
let route = [
  {
    path: '/',
    component: Dashboard
  },
  {
    path: '/squadmensal/criar/:month/:year',
    component: MonthlySquadRegister
  },
  {
    path: '/squadmensal/editar/:id',
    component: MonthlySquadEdit
  }
]
export default route
