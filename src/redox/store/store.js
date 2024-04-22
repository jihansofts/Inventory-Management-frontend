import { configureStore } from "@reduxjs/toolkit";
import settingReducer from "../state-slice/settingSlice";
import taskReducer from "../state-slice/taskSlice";
import summaryReducer from "../state-slice/summarySlice";
import profileReducer from "../state-slice/profileSlice";
import brandReducer from "../state-slice/brandSlice";
import customerReducer from "../state-slice/customerSlice";
import categoryReducer from "../state-slice/categorySlice";
import expensetypeReducer from "../state-slice/expensetypeSlice";
import supplierReducer from "../state-slice/supplierSlice";
import expenseReducer from "../state-slice/expenseSlice";
import productReducer from "../state-slice/productSlice";
import dashboardReducer from "../state-slice/dashboardSlice";
import purchaseReducer from "../state-slice/purchaseSlice";
import saleReducer from "../state-slice/saleSlice";
import returnReducer from "../state-slice/returnSlice";
import reportReducer from "../state-slice/reportSlice";

export default configureStore({
  reducer: {
    settings: settingReducer,
    task: taskReducer,
    summary: summaryReducer,
    profile: profileReducer,
    brand: brandReducer,
    customer: customerReducer,
    category: categoryReducer,
    expensetype: expensetypeReducer,
    supplier: supplierReducer,
    expense: expenseReducer,
    product: productReducer,
    dashboard: dashboardReducer,
    purchase: purchaseReducer,
    sale: saleReducer,
    return: returnReducer,
    report: reportReducer,
  },
});
