import routes from "./constants/routes";
import Login from "./login/Login";

export default {
  routeModule: {
    path: routes.LOGIN,
    component: Login,
    key: 'Login',
    routeComponents: []
  }
};