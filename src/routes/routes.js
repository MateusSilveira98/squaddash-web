import Users from '@/views/Users/Users.route'
import Dashboard from '@/views/Dashboard/Dashboard.route'
import Projects from '@/views/Projects/Projects.route'
import Clients from '@/views/Clients/Clients.route'
import Employees from '@/views/Employees/Employees.route'
import Squads from '@/views/Squads/Squads.route'
let routes = [].concat(
  Users,
  Dashboard,
  Projects,
  Clients,
  Employees,
  Squads
)

export default routes
