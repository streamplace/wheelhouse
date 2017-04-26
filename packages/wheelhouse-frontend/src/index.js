import React from "react";
import ReactDOM from "react-dom";
import { HashRouter as Router, Route } from "react-router-dom";
import "milligram";
import { Provider } from "react-redux";
import DevelopmentDataDisplay from "./components/development-data/DevelopmentDataDisplay"; 
// import Header from "./components/reusables/Header";
import LogsDataDisplay from "./components/logs-data/LogsDataDisplay";
import PodsDataDisplay from "./components/kubectl-data/PodsDataDisplay"; 
import store from "./store";
import "./index.css";

const routes = (
  <Provider store={store}>
    <Router>
      <div>
        <Route path='/development' component={DevelopmentDataDisplay} />
        <Route path='/logs' component={LogsDataDisplay} />
        <Route path='/pods' component={PodsDataDisplay} />
      </div>
    </Router>
  </Provider>
);

ReactDOM.render(
 routes,
  document.getElementById("root")
);
