import { createSlice } from "@reduxjs/toolkit";

const uiSlice = createSlice({
  name: "ui",
  initialState: {
    keypad: false,
    client: false,
    mode: "letter", // scanner, code, letter
    menu: false,
  },
  reducers: {
    openKeypad: (state) => {
      state.keypad = true;
    },
    closeKeypad: (state) => {
      state.keypad = false;
    },
    openMenu: (state) => {
      state.menu = true;
    },
    closeMenu: (state) => {
      state.menu = false;
    },
    openClient: (state) => {
      state.client = true;
    },
    closeClient: (state) => {
      state.client = false;
    },
    changeMode: (state, action) => {
      state.mode = action.payload;
    },
  },
});

export const {
  openKeypad,
  closeKeypad,
  openClient,
  closeClient,
  changeMode,
  openMenu,
  closeMenu,
} = uiSlice.actions;
export default uiSlice.reducer;
