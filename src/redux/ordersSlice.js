import { createSlice } from "@reduxjs/toolkit";

const ordersListSlice = createSlice({
  name: "ordersList",
  initialState: {
    orders: [],
    selectOrder: null,
  },
  reducers: {
    addOrder: (state, action) => {
      state.orders = [...state.orders, action.payload];
    },
    addSelectOrder: (state, action) => {
      state.selectOrder = action.payload;
    },
    clearSelectOrder: (state) => {
      state.selectOrder = null;
    },
  },
});

export const { addOrder, addSelectOrder, clearSelectOrder } =
  ordersListSlice.actions;
export default ordersListSlice.reducer;
