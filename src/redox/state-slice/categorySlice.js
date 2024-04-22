import { createSlice } from "@reduxjs/toolkit";
export const CategorySlice = createSlice({
  name: "category",
  initialState: {
    List: [],
    TotalList: 0,
    FormValue: {
      Name: "",
    },
  },
  reducers: {
    SetCategoryList: (state, action) => {
      state.List = action.payload;
    },
    SetCategoryTotalList: (state, action) => {
      state.TotalList = action.payload;
    },
    OnChangeCategoryInput: (state, action) => {
      state.FormValue[`${action.payload.Name}`] = action.payload.Value;
    },
    ResetCategoryInputValue: (state, action) => {
      Object.keys(state.FormValue).forEach((i) => (state.FormValue[i] = ""));
    },
  },
});

export const {
  SetCategoryList,
  SetCategoryTotalList,
  OnChangeCategoryInput,
  ResetCategoryInputValue,
} = CategorySlice.actions;
export default CategorySlice.reducer;
