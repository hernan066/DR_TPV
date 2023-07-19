import { createSlice } from "@reduxjs/toolkit";

const clientsSlice = createSlice({
  name: "clients",
  initialState: {
    allClients: [],
  },
  reducers: {
    getAllClients: (state, action) => {
      state.allClients = action.payload;
    },
  },
});

export const { getAllClients } = clientsSlice.actions;
export default clientsSlice.reducer;
