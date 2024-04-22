import { createSlice } from "@reduxjs/toolkit";
export const purchaseSlice = createSlice({
  name: "purchase",
  initialState: {
    List: [],
    TotalList: [],
    SupplierDropDown: [],
    ProductDropDown: [],
    PurchaseFormValue: {
      SupplierID: "",
      VatTax: 0,
      Discount: 0,
      OhterCost: 0,
      ShippingCost: 0,
      GrandTotal: 0,
      Note: "",
    },
    PurchaseItemList: [],
  },
  reducers: {
    SetPurchaseList: (state, action) => {
      state.List = action.payload;
    },
    SetPurchaseTotalList: (state, action) => {
      state.TotalList = action.payload;
    },
    SetSupplierDropDown: (state, action) => {
      state.SupplierDropDown = action.payload;
    },
    SetProductDropDown: (state, action) => {
      state.ProductDropDown = action.payload;
    },
    OnChangePurchaseInput: (state, action) => {
      state.PurchaseFormValue[`${action.payload.Name}`] = action.payload.Value;
    },
    SetPurchaseItemList: (state, action) => {
      state.PurchaseItemList.push(action.payload);
    },
    RemovePurchaseItemList: (state, action) => {
      state.PurchaseItemList.splice(action.payload);
    },
  },
});
export const {
  SetPurchaseList,
  SetPurchaseTotalList,
  SetProductDropDown,
  SetSupplierDropDown,
  OnChangePurchaseInput,
  SetPurchaseItemList,
  RemovePurchaseItemList,
} = purchaseSlice.actions;
export default purchaseSlice.reducer;
