import { createSlice } from "@reduxjs/toolkit";
export const saleSlice = createSlice({
  name: "sale",
  initialState: {
    List: [],
    TotalList: 0,
    CustomerDropDown: [],
    ProductsDropDown: [],
    SaleFormValue: {
      CustomerID: "",
      VatTax: "",
      Discount: "",
      OhterCost: "",
      ShippingCost: "",
      GrandTotal: "",
      Note: "",
    },
    SaleItemList: [],
  },
  reducers: {
    SetSaleList: (state, action) => {
      state.List = action.payload;
    },
    SetSaleTotalList: (state, action) => {
      state.TotalList = action.payload;
    },
    SetCustomerDropDown: (state, action) => {
      state.CustomerDropDown = action.payload;
    },
    SetProductsDropDown: (state, action) => {
      state.ProductsDropDown = action.payload;
    },
    OnChangeSaleInput: (state, action) => {
      state.SaleFormValue[`${action.payload.Name}`] = action.payload.Value;
    },
    SetSaleItemList: (state, action) => {
      state.SaleItemList.push(action.payload);
    },
    RemoveSaleItemList: (state, action) => {
      state.SaleItemList.splice(action.payload, 1);
    },
  },
});
export const {
  SetSaleList,
  SetSaleTotalList,
  SetCustomerDropDown,
  SetProductsDropDown,
  OnChangeSaleInput,
  SetSaleItemList,
  RemoveSaleItemList,
} = saleSlice.actions;
export default saleSlice.reducer;
