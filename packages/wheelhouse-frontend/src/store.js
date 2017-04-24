import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import reducer from "./reducer";

const composeEnhancers = compose;

export default createStore(reducer, composeEnhancers(
  applyMiddleware(thunk)
));
