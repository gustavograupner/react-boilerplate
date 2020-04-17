import Dashboard from "./dashboard/Dashboard";
import routes from "./constants/routes";

export default {
  routeModule: {
    path: routes.DASHBOARD,
    component: Dashboard,
    key: 'Dashboard',
    routeComponents: []
  }
};