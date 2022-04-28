import { applyMiddleware, createStore, compose } from "redux";
import thunk from "redux-thunk";
import rootReducer from "../reducers";

const middlewares = applyMiddleware(thunk);
const enhancer = (typeof window !== 'undefined' &&
window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) ||
compose(middlewares);

export default function (initialState) {
  return createStore(rootReducer, initialState, enhancer);
}
