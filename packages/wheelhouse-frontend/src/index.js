import React from "react";
import ReactDOM from "react-dom";
import { HashRouter as Router, Route } from "react-router-dom";
import "milligram";
import { Provider } from "react-redux";
import DevelopmentDataDisplay
  from "./components/development-data/DevelopmentDataDisplay";
import EnvironmentVariablesDisplay
  from "./components/environment-variables/EnvironmentVariablesDisplay";
import LogsDataDisplay from "./components/logs-data/LogsDataDisplay";
import PodsDataDisplay from "./components/kubectl-data/PodsDataDisplay";
import getStore from "./store";
import Sidebar from "./components/reusables/Sidebar";
import "./index.css";

getStore.then(store => {
  const routes = (
    <Provider store={store}>
      <Router>
        <div className="container">
          <div className="sidebar-container"><Sidebar /></div>
          <div className="content-container">
            <Route path="/development" component={DevelopmentDataDisplay} />
            <Route path="/logs" component={LogsDataDisplay} />
            <Route path="/pods" component={PodsDataDisplay} />
            <Route
              path="/environment-variables"
              component={EnvironmentVariablesDisplay}
            />
          </div>
        </div>
      </Router>
    </Provider>
  );

  ReactDOM.render(routes, document.getElementById("root"));
});
