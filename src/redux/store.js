import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice";
import uiReducer from "./uiSlice";
import orderReducer from "./orderSlice";
import clientsReducer from "./clientsSlice";
import ofertsReducer from "./ofertsSlice";
import ordersListReducer from "./ordersSlice";
import userReducer from "./userSlice";
import { authApi } from "../api/apiAuth";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    ui: uiReducer,
    order: orderReducer,
    ordersList: ordersListReducer,
    clients: clientsReducer,
    oferts: ofertsReducer,
    user: userReducer,

    [authApi.reducerPath]: authApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }).concat(authApi.middleware),
});
