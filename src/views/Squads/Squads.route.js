import Squads from './Squads';
import SquadRegister from './SquadRegister';
import SquadEdit from './SquadEdit';
let route = [
  {
    path: '/squads',
    component: Squads
  },
  {
    path: '/squad/criar',
    component: SquadRegister
  },
  {
    path: '/squad/editar/:id',
    component: SquadEdit
  }
]
export default route
