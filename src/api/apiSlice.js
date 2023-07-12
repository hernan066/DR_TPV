/* eslint-disable no-unused-vars */
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { logOut, setCredentials } from "../redux/authSlice";

const API = import.meta.env.VITE_APP_API_URL || "http://localhost:3040/api";

const baseQuery = fetchBaseQuery({
  baseUrl: API,
  credentials: "include",
  prepareHeaders: (headers, { getState }) => {
    const token = getState().authDelivery.token;

    if (token) {
      headers.set("x-token", token);
    }
    return headers;
  },
});

const baseQueryWithReauth = async (args, api, extraOptions) => {
  let result = await baseQuery(args, api, extraOptions);

  if (result?.error?.originalStatus === 403) {
    // send refresh token to get new access token
    const refreshResult = await baseQuery("/auth/refresh", api, extraOptions);
    console.log(refreshResult);

    if (refreshResult?.data) {
      const user = api.getState().authDelivery.user;
      // store the new token
      api.dispatch(setCredentials({ ...refreshResult.data, user }));
      // retry the original query with new access token
      result = await baseQuery(args, api, extraOptions);
    } else {
      api.dispatch(logOut());
    }
  }

  return result;
};

export const apiSlice = createApi({
  baseQuery: baseQueryWithReauth,
  endpoints: (builder) => ({}),
});
