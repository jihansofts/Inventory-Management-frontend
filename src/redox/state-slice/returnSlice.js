import { createSlice } from "@reduxjs/toolkit";
export const returnSlice = createSlice({
  name: "return",
  initialState: {
    List: [],
    TotalList: 0,
    CustomerDropDown: [],
    ProductsDropDown: [],
    ReturnFormValue: {
      CustomerID: "",
      VatTax: "",
      Discount: "",
      OhterCost: "",
      ShippingCost: "",
      GrandTotal: "",
      Note: "",
    },
    ReturnItemList: [],
  },
  reducers: {
    SetReturnList: (state, action) => {
      state.List = action.payload;
    },
    SetReturnTotalList: (state, action) => {
      state.TotalList = action.payload;
    },
    SetCustomerDropDown: (state, action) => {
      state.CustomerDropDown = action.payload;
    },
    SetProductsDropDown: (state, action) => {
      state.ProductsDropDown = action.payload;
    },
    OnChangeReturnInput: (state, action) => {
      state.ReturnFormValue[`${action.payload.Name}`] = action.payload.Value;
    },
    SetReturnItemList: (state, action) => {
      state.ReturnItemList.push(action.payload);
    },
    RemoveReturnItemList: (state, action) => {
      state.ReturnItemList.splice(action.payload, 1);
    },
  },
});
export const {
  SetReturnList,
  SetReturnTotalList,
  SetCustomerDropDown,
  SetProductsDropDown,
  SetReturnItemList,
  RemoveReturnItemList,
  OnChangeReturnInput,
} = returnSlice.actions;
export default returnSlice.reducer;
