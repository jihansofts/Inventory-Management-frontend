import { createSlice } from "@reduxjs/toolkit";
export const productSlice = createSlice({
  name: "product",
  initialState: {
    List: [],
    TotalList: 0,
    ProductCategoryDropDown: [],
    ProductBrandDropDown: [],
    FormValue: {
      CategoriID: "",
      BrandID: "",
      Name: "",
      Unit: "",
      Detalis: "",
    },
  },
  reducers: {
    SetProductList: (state, action) => {
      state.List = action.payload;
    },
    SetProductTotalList: (state, action) => {
      state.TotalList = action.payload;
    },
    SetProductBrandDropDown: (state, action) => {
      state.ProductBrandDropDown = action.payload;
    },
    SetProductCategoryDropDown: (state, action) => {
      state.ProductCategoryDropDown = action.payload;
    },
    OnChangeProductInput: (state, action) => {
      state.FormValue[`${action.payload.Name}`] = action.payload.Value;
    },
    ResetProductFormValue: (state, action) => {
      Object.keys(state.FormValue).forEach((i) => (state.FormValue[i] = ""));
    },
  },
});
export const {
  SetProductList,
  SetProductTotalList,
  SetProductBrandDropDown,
  SetProductCategoryDropDown,
  OnChangeProductInput,
  ResetProductFormValue,
} = productSlice.actions;
export default productSlice.reducer;
