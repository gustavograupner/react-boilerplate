import React from "react";
import {
  BrowserRouter as HashRouter,
  Route,
  Redirect,
  Link,
  useHistory
} from "react-router-dom";
import { isAuthenticated } from "../libs/localStorage";
import Auth from "../modules/Auth";

const PrivateRoute = ({ children, ...rest }) => {
  return (
    <Route
      {...rest}
      render={({ location }) =>
        true ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: Auth.routeModule.path,
              state: { from: location }
            }}
          />
        )
      }
    />
  );
};

export default PrivateRoute;
