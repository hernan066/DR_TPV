import { apiSlice } from "./apiSlice";

export const ofertApi = apiSlice.injectEndpoints({
  keepUnusedDataFor: 60, // duración de datos en cache
  refetchOnMountOrArgChange: true, // revalida al montar el componente
  refetchOnFocus: true, // revalida al cambiar de foco
  refetchOnReconnect: true, // revalida al reconectar
  tagTypes: ["oferts"],

  endpoints: (builder) => ({
    getOferts: builder.query({
      query: () => "/oferts",
      // keepUnusedDataFor: 3,
      extraOptions: { maxRetries: 5 },
      providesTags: ["oferts"],
    }),

    getOfert: builder.query({
      query: (id) => `/oferts/${id}`,
      // keepUnusedDataFor: 3,
      extraOptions: { maxRetries: 3 },
      providesTags: ["oferts"],
    }),
    getOfertByProductId: builder.query({
      query: (id) => `/oferts/product/${id}`,
      // keepUnusedDataFor: 3,
      extraOptions: { maxRetries: 3 },
      providesTags: ["oferts"],
    }),
    getOfertWithCategory: builder.query({
      query: () => `/oferts/categories`,
      // keepUnusedDataFor: 3,
      extraOptions: { maxRetries: 3 },
      providesTags: ["oferts"],
    }),
  }),
});

export const {
  useGetOfertsQuery,
  useGetOfertQuery,
  useGetOfertByProductIdQuery,
  useGetOfertWithCategoryQuery,
} = ofertApi;
