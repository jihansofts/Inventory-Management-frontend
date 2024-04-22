import { createSlice } from "@reduxjs/toolkit";
export const customerSlice = createSlice({
  name: "customer",
  initialState: {
    List: [],
    TotalList: 0,
    FormValue: {
      CustomarName: "",
      Phone: "",
      Email: "",
      Address: "",
    },
  },
  reducers: {
    SetCustomerList: (state, action) => {
      state.List = action.payload;
    },
    SetCustomerTotalList: (state, action) => {
      state.TotalList = action.payload;
    },
    OnChangeCustomerInput: (state, action) => {
      state.FormValue[`${action.payload.Name}`] = action.payload.Value;
    },
    ResetCustomerFormValue: (state, action) => {
      Object.keys(state.FormValue).forEach((i) => (state.FormValue[i] = ""));
    },
  },
});

export const {
  SetCustomerList,
  SetCustomerTotalList,
  OnChangeCustomerInput,
  ResetCustomerFormValue,
} = customerSlice.actions;
export default customerSlice.reducer;
