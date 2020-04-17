import ListOperation from "./listOperation/ListOperation";
import EditOperation from "./editOperation/EditOperation";
import routes from './constants/routes';

export default {
  routeModule: {
    path: routes.LIST_OPERATION,
    component: ListOperation,
    key: 'Operação',
    routeComponents: [
      {
        path: routes.EDIT_OPERATION,
        component: EditOperation,
        key: 'Editar Operação'
      }
    ]
  }
};