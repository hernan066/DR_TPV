import { createSlice } from "@reduxjs/toolkit";

const uiSlice = createSlice({
  name: "ui",
  initialState: {
    keypad: false,
    popupProducts: false,
    mode: "letter", // scanner, code, letter
    menu: false,
    keypad_mode: "", //cash, transfer, debt
    cashOut: false,
    selector: false,
    selectLocalOrder: false,
    selectDeliveryOrder: false,
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
    openSelector: (state) => {
      state.selector = true;
    },
    closeSelector: (state) => {
      state.selector = false;
    },
    openLocalOrder: (state) => {
      state.selectLocalOrder = true;
      state.selector = false;
    },
    closeLocalOrder: (state) => {
      state.selectLocalOrder = false;
    },
    openDeliveryOrder: (state) => {
      state.selectDeliveryOrder = true;
      state.selector = false;
    },
    closeDeliveryOrder: (state) => {
      state.selectDeliveryOrder = false;
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
  openSelector,
  closeSelector,
  openLocalOrder,
  closeLocalOrder,
  openDeliveryOrder,
  closeDeliveryOrder,
} = uiSlice.actions;
export default uiSlice.reducer;
