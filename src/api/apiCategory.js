import { apiSlice } from "./apiSlice";

export const clientApi = apiSlice.injectEndpoints({
  keepUnusedDataFor: 60, // duración de datos en cache
  refetchOnMountOrArgChange: true, // revalida al montar el componente
  refetchOnFocus: true, // revalida al cambiar de foco
  refetchOnReconnect: true, // revalida al reconectar
  tagTypes: ["categories"],

  endpoints: (builder) => ({
    getCategories: builder.query({
      query: () => "/categories",
      // keepUnusedDataFor: 3,
      extraOptions: { maxRetries: 5 },
      providesTags: ["categories"],
    }),

    getCategory: builder.query({
      query: (id) => `/categories/${id}`,
      // keepUnusedDataFor: 3,
      extraOptions: { maxRetries: 3 },
      providesTags: ["categories"],
    }),
  }),
});

export const { useGetCategoriesQuery, useGetCategoryQuery } = clientApi;
