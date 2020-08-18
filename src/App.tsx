import React, { useState, useCallback, useEffect } from "react";
import {
  BrowserRouter as HashRouter,
  Route,
  Link,
  useHistory,
  Switch
} from "react-router-dom";
import { useTranslation } from "react-i18next";
import styles from "./app.module.scss";

import modules from "./modules";
import Login from "./modules/Auth/login/Login";
import Auth from "./modules/Auth";
import PrivateRoute from "./navigation/PrivateRoute";
import InterceptorService from "./services/InterceptorService";
import { setAuthenticated } from "./libs/localStorage";
import { ToastContainer } from "react-toastify";

const App = () => {
  const [currentTab, setCurrentTab] = useState("Dashboard");
  const { i18n, t } = useTranslation();
  const history = useHistory();

  useEffect(() => {
    InterceptorService.setupInterceptors(resetAuth);
    i18n.changeLanguage("pt");
  }, []);

  const resetAuth = () => {
    setAuthenticated(false);
    history.push("/");
  };

  const handleClick = useCallback(
    (moduleKey: string) => () => {
      setCurrentTab(moduleKey);
    },
    []
  );

  const renderContent = () => (
    <div className={styles.app}>
      <div className={styles.appHeader}>
        <div className={styles.appLogo}>
          {/* TODO LOGO HERE */}
          {/* <img src={logo}  alt="ABInBev" height="20" width="110"/> */}
          <h2> LOGO </h2>
        </div>
      </div>
      <div className={styles.appBody}>
        <div className={styles.appMenu}>
          <ul className={styles.appNav}>
            {modules.map(module => (
              <li
                key={module.routeModule.key}
                className={
                  currentTab === module.routeModule.key ? styles.active : ""
                }
              >
                <Link
                  to={module.routeModule.path}
                  onClick={handleClick(module.routeModule.key)}
                >
                  {module.routeModule.key}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div className={styles.appContent}>
          {modules.map(module => (
            <Route
              path={module.routeModule.path}
              component={module.routeModule.component}
              key={module.routeModule.key}
            />
          ))}
          {modules.map(module => {
            return module.routeModule.routeComponents.map(component => (
              <Route {...component} />
            ));
          })}
        </div>
      </div>
    </div>
  );

  return (
    <HashRouter basename={"#"}>
      <ToastContainer
        position="top-left"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <Switch>
        <Route path={Auth.routeModule.path}>
          <Login />
        </Route>
        <PrivateRoute path={"/"}>{renderContent()}</PrivateRoute>
      </Switch>
    </HashRouter>
  );
};

export default App;
