import React from "react";
import ReactDOM from "react-dom";
import "font-awesome/css/font-awesome.css";
import getStore from "./store";
import App from "./app";
import { Provider } from "react-redux";

getStore.then(store => {
  ReactDOM.render(
    <Provider store={store}>
      <App />
    </Provider>,
    document.getElementById("root")
  );
});
