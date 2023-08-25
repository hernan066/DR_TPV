import { createSlice } from "@reduxjs/toolkit";

const clientsSlice = createSlice({
  name: "clients",
  initialState: {
    allClients: [],
    allClientsAddresses: [],
    allDeliveries: [],
  },
  reducers: {
    getAllClients: (state, action) => {
      state.allClients = action.payload;
    },
    getAllClientsAddresses: (state, action) => {
      state.allClientsAddresses = action.payload;
    },
    getAllDeliveries: (state, action) => {
      state.allDeliveries = action.payload;
    },
  },
});

export const { getAllClients, getAllClientsAddresses, getAllDeliveries } =
  clientsSlice.actions;
export default clientsSlice.reducer;
