import { createSlice } from "@reduxjs/toolkit";
export const dashboardSlice = createSlice({
  name: "dashboard",
  initialState: {
    ExpenseChart: [],
    PurchaseChart: [],
    ReturnChart: [],
    SaleChart: [],
    ExpenseTotal: 0,
    SaleTotal: 0,
    PurchaseTotal: 0,
    ReturnTotal: 0,
  },
  reducers: {
    SetExpenseChart: (state, action) => {
      state.ExpenseChart = action.payload;
    },
    SetPurchaseChart: (state, action) => {
      state.PurchaseChart = action.payload;
    },
    SetReturnChart: (state, action) => {
      state.ReturnChart = action.payload;
    },
    SetSaleChart: (state, action) => {
      state.SaleChart = action.payload;
    },
    SetExpenseTotal: (state, action) => {
      state.ExpenseTotal = action.payload;
    },
    SetPurchaseTotal: (state, action) => {
      state.PurchaseTotal = action.payload;
    },
    SetReturnTotal: (state, action) => {
      state.ReturnTotal = action.payload;
    },
    SetSaleTotal: (state, action) => {
      state.SaleTotal = action.payload;
    },
  },
});
export const {
  SetExpenseChart,
  SetPurchaseChart,
  SetReturnChart,
  SetSaleChart,
  SetExpenseTotal,
  SetPurchaseTotal,
  SetReturnTotal,
  SetSaleTotal,
} = dashboardSlice.actions;
export default dashboardSlice.reducer;
