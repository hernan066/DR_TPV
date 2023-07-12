import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "authDelivery",
  initialState: { user: null, token: null },
  reducers: {
    setCredentials: (state, action) => {
      const { id, accessToken } = action.payload;
      state.user = id;
      state.token = accessToken;
    },
    logOut: (state) => {
      state.user = null;
      state.token = null;
    },
  },
});

export const { setCredentials, logOut } = authSlice.actions;

export default authSlice.reducer;

export const selectCurrentUser = (state) => state.authDelivery.user;
export const selectCurrentToken = (state) => state.authDelivery.token;
