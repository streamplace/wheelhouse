import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import reducer from "./reducer";
import { createLogger } from "redux-logger";

const logger = createLogger();
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export default createStore(reducer, composeEnhancers(
  applyMiddleware(thunk, logger)
));


// import { createStore, applyMiddleware, compose } from 'redux';
// import thunk from 'redux-thunk';
// import createLogger from 'redux-logger';
// import reducer from './reducer';

// const logger = createLogger();

// const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

// export default createStore(reducer, composeEnhancers(
//   applyMiddleware(thunk, logger)
// ));
