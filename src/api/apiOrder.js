import { apiSlice } from "./apiSlice";

export const orderApi = apiSlice.injectEndpoints({
  keepUnusedDataFor: 60, // duración de datos en cache
  refetchOnMountOrArgChange: true, // revalida al montar el componente
  refetchOnFocus: true, // revalida al cambiar de foco
  refetchOnReconnect: true, // revalida al reconectar
  tagTypes: ["orders"],

  endpoints: (builder) => ({
    getOrders: builder.query({
      query: (delivery) => `/orders?active=true&delivery=${delivery}`,
      // keepUnusedDataFor: 3,
      extraOptions: { maxRetries: 5 },
      providesTags: ["orders"],
    }),
    getAllOrdersActive: builder.query({
      query: () => "/orders/active",
      // keepUnusedDataFor: 3,
      extraOptions: { maxRetries: 5 },
      providesTags: ["orders"],
    }),
    getCashierOrders: builder.query({
      query: () => "/orders/cashier",
      // keepUnusedDataFor: 3,
      extraOptions: { maxRetries: 5 },
      providesTags: ["orders"],
    }),

    getOrder: builder.query({
      query: (id) => `/orders/${id}`,
      // keepUnusedDataFor: 3,
      extraOptions: { maxRetries: 3 },
      providesTags: ["orders"],
    }),

    getClientOrderDebt: builder.query({
      query: (id) => `/orders/clientDebt/${id}`,
      // keepUnusedDataFor: 3,
      extraOptions: { maxRetries: 3 },
      providesTags: ["orders"],
    }),

    postOrder: builder.mutation({
      query: (newOrders) => ({
        url: "/orders",
        method: "post",
        body: newOrders,
      }),
      invalidatesTags: ["orders"],
      extraOptions: { maxRetries: 0 },
    }),

    putOrder: builder.mutation({
      query: ({ id, ...editOrders }) => ({
        url: `/orders/${id}`,
        method: "put",
        body: editOrders,
      }),
      invalidatesTags: ["orders"],
      extraOptions: { maxRetries: 0 },
    }),

    deleteOrder: builder.mutation({
      query: (id) => ({
        url: `/orders/${id}`,
        method: "delete",
      }),
      invalidatesTags: ["orders"],
      extraOptions: { maxRetries: 0 },
    }),
  }),
});

export const {
  useGetOrdersQuery,
  useGetOrderQuery,
  useGetClientOrderDebtQuery,

  useGetAllOrdersActiveQuery,
  useGetCashierOrdersQuery,

  usePostOrderMutation,
  usePutOrderMutation,
  useDeleteOrderMutation,
} = orderApi;
