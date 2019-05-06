import Users from '@/views/Users/Users.route';
import Dashboard from '@/views/Dashboard/Dashboard.route';
import Projects from '@/views/Projects/Projects.route';
import Clients from '@/views/Clients/Clients.route';
import Employees from '@/views/Employees/Employees.route';
import Squads from '@/views/Squads/Squads.route';
import PageNotFound from '@/components/PageNotFound';
let routes = [].concat(
  Users,
  Dashboard,
  Projects,
  Clients,
  Employees,
  Squads,
  [{path: '*', component: PageNotFound}]
)

export default routes
