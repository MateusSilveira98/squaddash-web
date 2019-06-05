import Projects from './Projects';
import ProjectRegister from './ProjectRegister';
import ProjectEdit from './ProjectEdit';
let route = [
  {
    path: '/projetos',
    component: Projects
  },
  {
    path: '/projeto/criar',
    component: ProjectRegister
  },
  {
    path: '/projeto/editar/:id',
    component: ProjectEdit
  }
];
export default route
