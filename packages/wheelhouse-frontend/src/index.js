import React from "react";
import ReactDOM from "react-dom";
import { HashRouter as Router, Route } from "react-router-dom";
import "milligram";
import { Provider } from "react-redux";
import DevelopmentDataDisplay from "./components/development-data/DevelopmentDataDisplay"; 
import Header from "./components/reusables/Header";
import PodsDataDisplay from "./components/kubectl-data/PodsDataDisplay"; 
import store from "./store";
import "./index.css";

const routes = (
  <Provider store={store}>
    <Router>
      <div>
        <Header />
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
