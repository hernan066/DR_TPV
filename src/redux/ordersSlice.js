import { createSlice } from "@reduxjs/toolkit";

const ordersListSlice = createSlice({
  name: "ordersList",
  initialState: {
    orders: [],
    selectOrder: null,
    activeProduct: null,
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
    setActiveProduct: (state, action) => {
      state.activeProduct = action.payload;
    },
    clearActiveProduct: (state) => {
      state.activeProduct = null;
    },
    updateQuantityActiveProduct: (state, action) => {
      //actualizar la orden activa
      const productUpdate = state.selectOrder.orderItems.map((product) => {
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

      const subTotal = productUpdate.reduce((acc, cur) => {
        return acc + cur.totalPrice;
      }, 0);

      const total =
        productUpdate.reduce((acc, cur) => {
          return acc + cur.totalPrice;
        }, 0) + state.selectOrder.tax;

      state.selectOrder = {
        ...state.selectOrder,
        orderItems: productUpdate,
        subTotal,
        total,
      };
      //actualizar orderList
      state.orders = state.orders.map((order) => {
        if (order.orderId === state.selectOrder.orderId) {
          return {
            ...order,
            orderItems: productUpdate,
            subTotal,
            total,
          };
        } else {
          return order;
        }
      });
    },
    updatePriceActiveProduct: (state, action) => {
      const productUpdate = state.selectOrder.orderItems.map((product) => {
        if (product.uniqueId === action.payload.id) {
          return {
            ...product,
            totalPrice: +action.payload.value * product.totalQuantity,
            unitPrice: +action.payload.value,
          };
        } else {
          return product;
        }
      });

      const subTotal = productUpdate.reduce((acc, cur) => {
        return acc + cur.totalPrice;
      }, 0);

      const total =
        productUpdate.reduce((acc, cur) => {
          return acc + cur.totalPrice;
        }, 0) + state.selectOrder.tax;

      state.selectOrder = {
        ...state.selectOrder,
        orderItems: productUpdate,
        subTotal,
        total,
      };

      //actualizar orderList
      state.orders = state.orders.map((order) => {
        if (order.orderId === state.selectOrder.orderId) {
          return {
            ...order,
            orderItems: productUpdate,
            subTotal,
            total,
          };
        } else {
          return order;
        }
      });
    },
    deleteActiveProduct: (state, action) => {
      const productUpdate = state.selectOrder.orderItems.filter(
        (product) => product.uniqueId !== action.payload
      );
      const subTotal = productUpdate.reduce((acc, cur) => {
        return acc + cur.totalPrice;
      }, 0);

      const total =
        productUpdate.reduce((acc, cur) => {
          return acc + cur.totalPrice;
        }, 0) + state.selectOrder.tax;

      state.selectOrder = {
        ...state.selectOrder,
        orderItems: productUpdate,
        subTotal,
        total,
      };

      //actualizar orderList
      state.orders = state.orders.map((order) => {
        if (order.orderId === state.selectOrder.orderId) {
          return {
            ...order,
            orderItems: productUpdate,
            subTotal,
            total,
          };
        } else {
          return order;
        }
      });

      state.activeProduct = null;
    },
    deleteOrder: (state, action) => {
      state.orders = state.orders.filter(
        (order) => order.orderId !== action.payload
      );
      state.selectOrder = null;
      state.activeProduct = null;
    },
  },
});

export const {
  addOrder,
  addSelectOrder,
  clearSelectOrder,
  setActiveProduct,
  clearActiveProduct,
  updateQuantityActiveProduct,
  updatePriceActiveProduct,
  deleteActiveProduct,
  deleteOrder,
} = ordersListSlice.actions;
export default ordersListSlice.reducer;
