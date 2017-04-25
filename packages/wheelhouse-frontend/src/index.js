import React from "react";
import ReactDOM from "react-dom";
import { HashRouter as Router, Route } from "react-router-dom";
import { Provider } from "react-redux";
import App from "./components/App"; 
import Table from "./components/Table";
import store from "./store";
import "./index.css";

const routes = (
  <Provider store={store}>
    <Router>
      <div>
        <Route path='/home' component={App} />
        <Route path='/pods' component={Table} />
      </div>
    </Router>
  </Provider>
);

ReactDOM.render(
 routes,
  document.getElementById("root")
);
