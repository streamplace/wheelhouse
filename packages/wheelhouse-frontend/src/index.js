import React from "react";
import ReactDOM from "react-dom";
import { HashRouter as Router, Route } from "react-router-dom";
import { Provider } from "react-redux";
import DevelopmentDataDisplay from "./components/development-data/DevelopmentDataDisplay"; 
import PodsDataDisplay from "./components/kubectl-data/PodsDataDisplay"; 
import store from "./store";
import "./index.css";

const routes = (
  <Provider store={store}>
    <Router>
      <div>
        <Route path='/development' component={DevelopmentDataDisplay} />
        <Route path='/pods' component={PodsDataDisplay} />
      </div>
    </Router>
  </Provider>
);

ReactDOM.render(
 routes,
  document.getElementById("root")
);
