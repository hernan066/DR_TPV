import { createSlice } from "@reduxjs/toolkit";

const uiSlice = createSlice({
  name: "ui",
  initialState: {
    keypad: false,
  },
  reducers: {
    openKeypad: (state) => {
      state.keypad = true;
    },
    closeKeypad: (state) => {
      state.keypad = false;
    },
  },
});

export const { openKeypad, closeKeypad } = uiSlice.actions;
export default uiSlice.reducer;
