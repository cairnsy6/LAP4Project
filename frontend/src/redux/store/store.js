import { createStore, applyMiddleware } from "redux";
import loggingReducer from "../reducers/loggingReducer";
import { devToolsEnhancer } from "redux-devtools-extension";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage"; // defaults to localStorage for web
import { createTransform } from "redux-persist";
import JSOG from "jsog";

export const JSOGTransform = createTransform(
  (inboundState, key) => JSOG.encode(inboundState),
  (outboundState, key) => JSOG.decode(outboundState)
);

const persistConfig = {
  key: "root",
  storage: storage,
  transforms: [JSOGTransform],
};

const persistedReducer = persistReducer(persistConfig, loggingReducer);

const store = createStore(
  persistedReducer,
  composeWithDevTools(applyMiddleware(thunk))
);

let persistor = persistStore(store);

export { store, persistor };
