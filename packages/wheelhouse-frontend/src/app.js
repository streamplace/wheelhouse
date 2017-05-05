import React, { Component } from "react";
import { HashRouter as Router, Route } from "react-router-dom";
import "milligram";
import DevelopmentDataDisplay
  from "./components/development-data/DevelopmentDataDisplay";
import EnvironmentVariablesDisplay
  from "./components/environment-variables/EnvironmentVariablesDisplay";
import LogsDataDisplay from "./components/logs-data/LogsDataDisplay";
import PodsDataDisplay from "./components/kubectl-data/PodsDataDisplay";
import Sidebar from "./components/reusables/Sidebar";
import "./index.css";

export default class App extends Component {
  render() {
    return (
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
    );
  }
}
