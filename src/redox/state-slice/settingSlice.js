import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loader: " d-none",
};
const settingsSlice = createSlice({
  name: "settings",
  initialState,
  reducers: {
    ShowLoader: (state) => {
      state.loader = "";
    },
    HideLoader: (state) => {
      state.loader = "d-none";
    },
  },
});
export const { ShowLoader, HideLoader } = settingsSlice.actions;
export default settingsSlice.reducer;
