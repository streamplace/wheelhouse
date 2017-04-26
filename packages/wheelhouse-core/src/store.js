
import { createStore, combineReducers, applyMiddleware } from "redux";
import config from "./config/configReducer";
import thunk from "redux-thunk";

export const reducer = combineReducers({
  config,
});

export const store = createStore(reducer, applyMiddleware(thunk));
