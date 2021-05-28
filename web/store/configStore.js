import { createStore, applyMiddleware, compose } from "redux";
import thunkMiddleware from "redux-thunk";
import reduxPromiseMiddleware from "redux-promise-middleware";
import { routerMiddleware } from "connected-react-router";
import { rootReducer } from "./reducers";

export default function configureStore(history) {
  const middlewareEnhancer = applyMiddleware(
    routerMiddleware(history),
    thunkMiddleware,
    reduxPromiseMiddleware
  );
  const enhancers = [middlewareEnhancer];
  const composedEnhancers = compose(...enhancers);

  const store = createStore(rootReducer(history), composedEnhancers);

  return store;
}
