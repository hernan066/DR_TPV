import { createSlice } from "@reduxjs/toolkit";

const ordersListSlice = createSlice({
  name: "ordersList",
  initialState: {
    orders: [],
    selectOrder: null,

    activeProduct: null,
    payment: {
      cash: 0,
      transfer: 0,
      debt: 0,
    },
  },
  reducers: {
    setCash: (state, action) => {
      state.payment = {
        ...state.payment,
        cash: action.payload,
      };
    },
    setTransfer: (state, action) => {
      state.payment = {
        ...state.payment,
        transfer: action.payload,
      };
    },
    setDebt: (state, action) => {
      state.payment = {
        ...state.payment,
        debt: action.payload,
      };
    },
    clearPayment: (state) => {
      state.payment = {
        cash: 0,
        transfer: 0,
        debt: 0,
      };
    },

    addOrder: (state, action) => {
      const newOrder = {
        ...action.payload,
        originalStock: action.payload.orderItems.map((product) => ({
          uniqueId: product.uniqueId,
          name: product.name,
          productId: product.productId,
          stockId: product.stockId,
          totalQuantity: product.totalQuantity,
          newQuantity: product.totalQuantity,
        })),
      };
      state.orders = [...state.orders, newOrder];
    },
    addOrders: (state, action) => {
      state.orders = action.payload.map((order) => ({
        ...order,
        originalStock: order.orderItems.map((product) => ({
          uniqueId: product.uniqueId,
          name: product.name,
          productId: product.productId,
          stockId: product.stockId,
          totalQuantity: product.totalQuantity,
          newQuantity: product.totalQuantity,
        })),
      }));
    },
    addSelectOrder: (state, action) => {
      state.selectOrder = action.payload;
      state.payment = {
        cash: 0,
        transfer: 0,
        debt: 0,
      };
    },
    clearSelectOrder: (state) => {
      state.selectOrder = null;
      state.selectOrderOriginalItems = null;
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

      const stockUpdate = state.selectOrder.originalStock.map((stock) => {
        if (stock.uniqueId === action.payload.id) {
          return {
            ...stock,
            newQuantity: +action.payload.value,
          };
        } else {
          return stock;
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
        originalStock: stockUpdate,
        subTotal,
        total,
      };
      //actualizar orderList
      state.orders = state.orders.map((order) => {
        if (order._id === state.selectOrder._id) {
          return {
            ...order,
            orderItems: productUpdate,
            originalStock: stockUpdate,
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
        if (order._id === state.selectOrder._id) {
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
        numberOfItems: productUpdate.length,
      };

      //actualizar orderList
      state.orders = state.orders.map((order) => {
        if (order._id === state.selectOrder._id) {
          return {
            ...order,
            orderItems: productUpdate,
            subTotal,
            total,
            numberOfItems: productUpdate.length,
          };
        } else {
          return order;
        }
      });

      state.activeProduct = null;
    },
    deleteOrder: (state, action) => {
      state.orders = state.orders.filter(
        (order) => order._id !== action.payload
      );
      state.selectOrder = null;
      state.activeProduct = null;
    },
    updateProductOrder: (state, action) => {
      const newProduct = action.payload;
      const productUpdate = state.selectOrder.orderItems;
      const stockUpdate = state.selectOrder.originalStock;

      console.log(action.payload);

      productUpdate.push(newProduct);
      stockUpdate.push({
        uniqueId: newProduct.uniqueId,
        name: newProduct.name,
        productId: newProduct.productId,
        stockId: newProduct.stockId,
        totalQuantity: newProduct.totalQuantity,
        newQuantity: newProduct.totalQuantity,
        new: newProduct?.new || false,
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
        numberOfItems: productUpdate.length,
        orderItems: productUpdate,
        subTotal,
        total,
        originalStock: stockUpdate,
      };

      //actualizar orderList
      state.orders = state.orders.map((order) => {
        if (order._id === state.selectOrder._id) {
          return {
            ...order,
            orderItems: productUpdate,
            originalStock: stockUpdate,
            subTotal,
            total,
          };
        } else {
          return order;
        }
      });
    },
    clearOrdersList: (state, action) => {
      state.selectOrder = null;
      state.activeProduct = null;
      state.orders = state.orders.filter(
        (order) => order._id !== action.payload
      );
    },
  },
});

export const {
  addOrder,
  addOrders,
  addSelectOrder,
  clearSelectOrder,
  setActiveProduct,
  clearActiveProduct,
  updateQuantityActiveProduct,
  updatePriceActiveProduct,
  deleteActiveProduct,
  deleteOrder,
  updateProductOrder,
  clearOrdersList,
  setCash,
  setDebt,
  setTransfer,
  clearPayment,
} = ordersListSlice.actions;
export default ordersListSlice.reducer;
