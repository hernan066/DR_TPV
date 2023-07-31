import { createSlice } from "@reduxjs/toolkit";

const uiSlice = createSlice({
  name: "ui",
  initialState: {
    keypad: false,
    popupProducts: false,
    client: false,
    mode: "letter", // scanner, code, letter
    menu: false,
    keypad_mode: "", //cash, transfer, debt
    cashOut: false,
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
    openPopupProducts: (state) => {
      state.popupProducts = true;
    },
    closePopupProducts: (state) => {
      state.popupProducts = false;
    },
    changeMode: (state, action) => {
      state.mode = action.payload;
    },
    keypadModeQuantity: (state) => {
      state.keypad_mode = "quantity";
    },
    keypadModePrice: (state) => {
      state.keypad_mode = "price";
    },
    keypadModeCash: (state) => {
      state.keypad_mode = "cash";
    },
    keypadModeTransfer: (state) => {
      state.keypad_mode = "transfer";
    },
    keypadModeDebt: (state) => {
      state.keypad_mode = "debt";
    },
    openCashOut: (state) => {
      state.cashOut = true;
    },
    closeCashOut: (state) => {
      state.cashOut = false;
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
  keypadModeQuantity,
  keypadModePrice,
  openPopupProducts,
  closePopupProducts,
  openCashOut,
  closeCashOut,
  keypadModeCash,
  keypadModeTransfer,
  keypadModeDebt,
} = uiSlice.actions;
export default uiSlice.reducer;
