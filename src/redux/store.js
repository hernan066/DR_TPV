import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice";
import uiReducer from "./uiSlice";
import orderReducer from "./orderSlice";
import clientsReducer from "./clientsSlice";
import ofertsReducer from "./ofertsSlice";
import ordersListReducer from "./ordersSlice";
import { authApi } from "../api/apiAuth";

export const store = configureStore({
  reducer: {
    authDelivery: authReducer,
    ui: uiReducer,
    order: orderReducer,
    ordersList: ordersListReducer,
    clients: clientsReducer,
    oferts: ofertsReducer,

    [authApi.reducerPath]: authApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }).concat(authApi.middleware),
});
