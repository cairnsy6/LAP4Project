import { createStore } from "redux";
import loggingReducer from "../reducers/loggingReducer";
import { devToolsEnhancer } from "redux-devtools-extension";

export const store = createStore(loggingReducer, devToolsEnhancer());
