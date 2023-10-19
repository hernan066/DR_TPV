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
    deliveryTruck: null,
    shippingCost: 0,
    subTotal: 0,
    receiptId: null,
    validStockQuantity: true,
    active: null,
    maxStock: null,
  },
  reducers: {
    addProduct: (state, action) => {
      state.products = [...state.products, action.payload.product];
      state.maxStock = action.payload.maxStock;

      const sub = state.products.reduce((acc, cur) => {
        return acc + cur.totalPrice;
      }, 0);

      state.subTotal = sub;
    },
    addClient: (state, action) => {
      state.client = action.payload;
      state.receiptId = Date.now();
      if (action.payload.address) {
        state.shippingAddress = {
          addressId: action.payload._id,
          address: action.payload.address,
          flor: action.payload.flor,
          department: action.payload.department,
          city: action.payload.city,
          province: action.payload.province,
          zip: action.payload.zip,
          phone: action.payload.phone,
          type: action.payload.type,
          lat: action.payload?.lat || null,
          lng: action.payload?.lng || null,
        };
      }
    },
    addDeliveryTruck: (state, action) => {
      state.deliveryTruck = action.payload;
    },
    clearClient: (state) => {
      state.client = null;
    },
    deleteProduct: (state, action) => {
      state.products = state.products.filter(
        (product) => product.uniqueId !== action.payload
      );
      state.subTotal = state.products.reduce((acc, cur) => {
        return acc + cur.totalPrice;
      }, 0);
      state.active = null;
    },
    updateProduct: (state, action) => {
      state.products = state.products.map((product) => {
        if (product.uniqueId === action.payload.id) {
          return {
            ...product,
            totalPrice: +action.payload.finalPrice,
            totalQuantity: +action.payload.finalQuantity,
            unitPrice: +action.payload.basePrice,
          };
        } else {
          return product;
        }
      });

      state.subTotal = state.products.reduce((acc, cur) => {
        return acc + cur.totalPrice;
      }, 0);
    },
    updateQuantityProduct: (state, action) => {
      state.products = state.products.map((product) => {
        if (product.uniqueId === action.payload.id) {
          return {
            ...product,
            totalPrice: +action.payload.value * product.unitPrice,
            totalQuantity: +action.payload.value,
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
    addShippingCost: (state, action) => {
      state.shippingCost = action.payload;
      state.subTotal = state.subTotal + action.payload;
    },
    isValidStockOrder: (state, action) => {
      state.validStockQuantity = action.payload;
    },
    clearCart: (state) => {
      state.products = [];
      state.shippingAddress = null;
      state.deliveryTruck = null;
      state.client = null;
      state.shippingCost = 0;
      state.subTotal = 0;
      state.receiptId = null;
      state.validStockQuantity = true;
      state.active = null;
      state.maxStock = null;
    },
    setActiveProduct: (state, action) => {
      state.active = action.payload.uniqueId;
      state.maxStock = action.payload.maxStock;
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
  addDeliveryTruck,
  addShippingCost,
} = orderSlice.actions;
export default orderSlice.reducer;
