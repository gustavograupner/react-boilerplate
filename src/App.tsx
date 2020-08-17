import React, { useState, useCallback, useEffect } from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import logo from "./assets/img/logo.svg";
import styles from "./app.module.scss";

import modules from "./modules";

const App = () => {
  const [currentTab, setCurrentTab] = useState("Dashboard");
  const { i18n, t } = useTranslation();

  useEffect(() => {
    i18n.changeLanguage("pt");
  }, []);
  
  const handleClick = useCallback(
    (moduleKey: string) => () => {
      setCurrentTab(moduleKey);
    },
    []
  );

  return (
    <Router>
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
    </Router>
  );
};

export default App;
