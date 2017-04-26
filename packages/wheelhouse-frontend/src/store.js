import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import reducer from "./reducer";

export default createStore(reducer, compose(
  applyMiddleware(thunk)
));
