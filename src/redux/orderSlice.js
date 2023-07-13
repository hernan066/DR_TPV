/* eslint-disable no-underscore-dangle */
/* eslint-disable no-param-reassign */
/* eslint-disable no-else-return */
/* eslint-disable arrow-body-style */
import { createSlice } from "@reduxjs/toolkit";

const orderSlice = createSlice({
  name: "order",
  initialState: {
    products: [],
    client: null,
    shippingAddress: null,
    shippingCost: 0,
    subTotal: 0,
    receiptId: null,
    validStockQuantity: true,
    active: null,
  },
  reducers: {
    addProduct: (state, action) => {
      state.products = [
        ...state.products,
        {
          ...action.payload,
          quantity: 1,
          totalPrice: action.payload.retailPrice,
        },
      ];

      const sub = state.products.reduce((acc, cur) => {
        return acc + cur.retailPrice;
      }, 0);

      state.subTotal = sub;
    },
    addClient: (state, action) => {
      state.client = action.payload;
      state.receiptId = Date.now();
    },
    clearClient: (state) => {
      state.client = null;
    },
    deleteProduct: (state, action) => {
      state.products = state.products.filter(
        (product) => product._id !== action.payload
      );
      state.subTotal = state.products.reduce((acc, cur) => {
        return acc + cur.totalPrice;
      }, 0);
      state.active = null;
    },
    updateProduct: (state, action) => {
      state.products = state.products.map((product) => {
        if (product._id === action.payload.id) {
          return {
            ...product,
            finalPrice: +action.payload.finalPrice,
            finalQuantity: +action.payload.finalQuantity,
            basePrice: +action.payload.basePrice,
          };
        } else {
          return product;
        }
      });

      state.subTotal = state.products.reduce((acc, cur) => {
        return acc + cur.finalPrice;
      }, 0);
    },
    updateQuantityProduct: (state, action) => {
      state.products = state.products.map((product) => {
        if (product._id === action.payload.id) {
          return {
            ...product,
            totalPrice: +action.payload.quantity * product.retailPrice,
            quantity: +action.payload.quantity,
          };
        } else {
          return product;
        }
      });

      state.subTotal = state.products.reduce((acc, cur) => {
        return acc + cur.totalPrice;
      }, 0);
    },
    addShippingAddress: (state, action) => {
      state.shippingAddress = action.payload.shippingAddress;
      state.shippingCost = action.payload.shippingCost;
    },
    isValidStockOrder: (state, action) => {
      state.validStockQuantity = action.payload;
    },
    clearCart: (state) => {
      state.products = [];
      state.shippingAddress = null;
      state.client = null;
      state.shippingCost = 0;
      state.subTotal = 0;
      state.receiptId = null;
      state.validStockQuantity = true;
      state.active = null;
    },
    setActiveProduct: (state, action) => {
      state.active = action.payload;
    },
    clearActiveProduct: (state) => {
      state.active = null;
    },
  },
});

export const {
  addProduct,
  deleteProduct,
  updateProduct,
  addShippingAddress,
  clearCart,
  addClient,
  clearClient,
  isValidStockOrder,
  setActiveProduct,
  clearActiveProduct,
  updateQuantityProduct,
} = orderSlice.actions;
export default orderSlice.reducer;
