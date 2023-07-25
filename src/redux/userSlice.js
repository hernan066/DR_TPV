import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {
    user: null,
  },
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
      localStorage.setItem("tpv_user_data", JSON.stringify(action.payload));
    },
    getUser: (state) => {
      const user = localStorage.getItem("tpv_user_data");
      if (user) {
        state.user = JSON.parse(user);
      }
    },
    clearUser: (state) => {
      state.user = null;
      localStorage.removeItem("tpv_user_data");
    },
  },
});

export const { setUser, getUser, clearUser } = userSlice.actions;
export default userSlice.reducer;
