import { compose, createStore, applyMiddleware } from "redux";
// import logger from "redux-logger";

import { rootReducer } from "./root-reducer";

// interceptor

const longerMiddleware = (store) => (next) => (action) => {
  if (!action.type) {
    return next(action);
  }

  console.log("type", action.type);
  console.log("payload", action.payload);
  console.log("currentState", store.getState());

  next(action);

  console.log("next state", store.getState());
};

// catch actions before dispatch
const middleWares = [longerMiddleware];

const composedEnhancers = compose(applyMiddleware(...middleWares));

// composedEnhances enhances the store with interceptors

export const store = createStore(rootReducer, undefined, composedEnhancers);
