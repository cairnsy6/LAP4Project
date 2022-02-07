import { createStore, applyMiddleware } from "redux";
import loggingReducer from "../reducers/loggingReducer";
import { devToolsEnhancer } from "redux-devtools-extension";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";

export const store = createStore(
  loggingReducer,
  composeWithDevTools(applyMiddleware(thunk))
);
