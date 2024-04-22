import { createSlice } from "@reduxjs/toolkit";
export const reportSlice = createSlice({
  name: "report",
  initialState: {
    SaleByDateList: [],
    ExpenseByDateList: [],
    PurchaseByDateList: [],
    ReturnByDateList: [],
  },
  reducers: {
    SetSaleByDateList: (state, action) => {
      state.SaleByDateList = action.payload;
    },
    SetExpenseByDateList: (state, action) => {
      state.ExpenseByDateList = action.payload;
    },
    SetPurchaseByDateList: (state, action) => {
      state.PurchaseByDateList = action.payload;
    },
    SetReturnByDateList: (state, action) => {
      state.ReturnByDateList = action.payload;
    },
  },
});
export const {
  SetSaleByDateList,
  SetExpenseByDateList,
  SetPurchaseByDateList,
  SetReturnByDateList,
} = reportSlice.actions;
export default reportSlice.reducer;
