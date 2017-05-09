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
import Notifications from "./components/reusables/Notifications.js";
import "./index.css";
import { connect } from "react-redux";

class App extends Component {
  render() {
    if (!this.props.serverConnected) {
      return (
        <div className="error-container">
          <div className="error-content">
            <span>Oh no!</span>
            {" "}
            🤦‍
            <br />
            {" "}
            The server crashed.💥⚡😞
            <br />
            {" "}
            Run wheelhouse dev in your terminal to restart.🔄
          </div>
        </div>
      );
    } else {
      return (
        <Router>
          <div className="container">
            <Notifications /> 
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
}

const mapStateToProps = state => {
  return {
    serverConnected: state.server.connected
  };
};

export default connect(mapStateToProps)(App);
