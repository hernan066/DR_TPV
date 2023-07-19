import { createSlice } from "@reduxjs/toolkit";

const ofertsSlice = createSlice({
  name: "oferts",
  initialState: {
    allOferts: [],
    searchOfert: null,
    searchTerm: "",
  },
  reducers: {
    getAllOferts: (state, action) => {
      state.allOferts = action.payload;
    },
    setSearchOfert: (state, action) => {
      state.searchOfert = action.payload;
    },
    setSearchTerm: (state, action) => {
      state.searchTerm = action.payload;
    },
    clearSearchOfert: (state) => {
      state.searchOfert = null;
      state.searchTerm = "";
    },
  },
});

export const { getAllOferts, setSearchOfert, clearSearchOfert, setSearchTerm } =
  ofertsSlice.actions;
export default ofertsSlice.reducer;
