import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import storage from "redux-persist/lib/storage"; // defaults to localStorage for web
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import { createWrapper } from "next-redux-wrapper";
import authSlice from "../features/authSlice";
import chatSlice from "../features/chatSlice";

const rootReducer = combineReducers({
  [authSlice.name]: authSlice.reducer,
  [chatSlice.name]: chatSlice.reducer,
});

const makeStore = ({ isServer }) => {
  if (isServer) {
    const store = configureStore({
      reducer: rootReducer,
      middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
      devTools: process.env.NODE_ENV === "development",
    });
    store.__persistor = persistStore(store);
    return store;
  } else {
    const persistConfig = {
      key: "root",
      version: 1,
      storage,
      blacklist: [chatSlice.name],
    };
    const persistedReducer = persistReducer(persistConfig, rootReducer);
    const store = configureStore({
      reducer: persistedReducer,
      middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
          serializableCheck: {
            ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
          },
        }),
      devTools: process.env.NODE_ENV === "development",
    });
    store.__persistor = persistStore(store);
    return store;
  }
};

export const wrapper = createWrapper(makeStore);
