import { createSlice } from "@reduxjs/toolkit";

const uiSlice = createSlice({
  name: "ui",
  initialState: {
    keypad: false,
    products: false,
  },
  reducers: {
    openKeypad: (state) => {
      state.keypad = true;
    },
    closeKeypad: (state) => {
      state.keypad = false;
    },
    openProducts: (state) => {
      state.keypad = true;
    },
    closeProducts: (state) => {
      state.keypad = false;
    },
  },
});

export const { openKeypad, closeKeypad, openProducts, closeProducts } =
  uiSlice.actions;
export default uiSlice.reducer;
