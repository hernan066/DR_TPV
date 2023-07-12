import { apiSlice } from "./apiSlice";

export const clientApi = apiSlice.injectEndpoints({
  keepUnusedDataFor: 60, // duración de datos en cache
  refetchOnMountOrArgChange: true, // revalida al montar el componente
  refetchOnFocus: true, // revalida al cambiar de foco
  refetchOnReconnect: true, // revalida al reconectar
  tagTypes: ["clients"],

  endpoints: (builder) => ({
    getClients: builder.query({
      query: () => "/clients",
      // keepUnusedDataFor: 3,
      extraOptions: { maxRetries: 5 },
      providesTags: ["clients"],
    }),

    getClient: builder.query({
      query: (id) => `/clients/${id}`,
      // keepUnusedDataFor: 3,
      extraOptions: { maxRetries: 3 },
      providesTags: ["clients"],
    }),
  }),
});

export const { useGetClientsQuery, useGetClientQuery } = clientApi;
