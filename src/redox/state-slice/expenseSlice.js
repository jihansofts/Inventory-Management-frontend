import { createSlice } from "@reduxjs/toolkit";
export const expenseSlice = createSlice({
  name: "expense",
  initialState: {
    List: [],
    TotalList: 0,
    ExpenseTypeDropDown: [],
    FormValue: {
      TypeID: "",
      Amount: 0,
      Note: "",
    },
  },
  reducers: {
    SetExpenseList: (state, action) => {
      state.List = action.payload;
    },
    SetExpenseTotalList: (state, action) => {
      state.TotalList = action.payload;
    },
    SetExpenseTypeDropDown: (state, action) => {
      state.ExpenseTypeDropDown = action.payload;
    },
    OnChangeExpenseInput: (state, action) => {
      state.FormValue[`${action.payload.Name}`] = action.payload.Value;
    },
    ResetExpenseFormValue: (state, action) => {
      Object.keys(state.FormValue).forEach((i) => (state.FormValue[i] = ""));
    },
  },
});
export const {
  SetExpenseList,
  SetExpenseTotalList,
  SetExpenseTypeDropDown,
  OnChangeExpenseInput,
  ResetExpenseFormValue,
} = expenseSlice.actions;
export default expenseSlice.reducer;
