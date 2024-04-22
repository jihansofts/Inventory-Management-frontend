import { createSlice } from "@reduxjs/toolkit";
export const expensetypeSlice = createSlice({
  name: "expensetype",
  initialState: {
    List: [],
    TotalList: 0,
    FormValue: {
      Name: "",
    },
  },
  reducers: {
    SetExpenseType: (state, action) => {
      state.List = action.payload;
    },
    SetTotalExpenseType: (state, action) => {
      state.TotalList = action.payload;
    },
    OnChangeExpenseTypeInput: (state, action) => {
      state.FormValue[`${action.payload.Name}`] = action.payload.Value;
    },
    ResetExpenseTypeInputValue: (state, action) => {
      Object.keys(state.FormValue).forEach((i) => (state.FormValue[i] = ""));
    },
  },
});
export const {
  SetExpenseType,
  SetTotalExpenseType,
  OnChangeExpenseTypeInput,
  ResetExpenseTypeInputValue,
} = expensetypeSlice.actions;
export default expensetypeSlice.reducer;
