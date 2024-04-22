import axios from "axios";
import { ErrorToast } from "../helper/FormHelper";
import { ShowLoader, HideLoader } from "../redox/state-slice/settingSlice";
import store from "../redox/store/store";
import {
  SetExpenseChart,
  SetPurchaseChart,
  SetReturnChart,
  SetSaleChart,
  SetExpenseTotal,
  SetPurchaseTotal,
  SetReturnTotal,
  SetSaleTotal,
} from "../redox/state-slice/dashboardSlice";
import { getToken } from "../helper/SessionHelper";
import { baseURL } from "../helper/config";
const AxiosHeader = { headers: { token: getToken() } };

export async function ExpensesSummary() {
  try {
    store.dispatch(ShowLoader());
    let URL = baseURL + "/ExpensesSummary";
    let result = await axios.get(URL, AxiosHeader);
    store.dispatch(HideLoader());
    if (result.status === 200) {
      store.dispatch(SetExpenseChart(result.data["data"][0]["Last30Days"]));
      store.dispatch(
        SetExpenseTotal(result.data["data"][0]["Total"][0]["TotalAmount"])
      );
      return true;
    } else {
      ErrorToast("Something Wrong");
      return false;
    }
  } catch (error) {
    console.log(error);
    store.dispatch(HideLoader());
    ErrorToast("Something Went Wrong");
    return false;
  }
}

export async function PurchasesSummary() {
  try {
    store.dispatch(ShowLoader());
    let URL = baseURL + "/PurchasesSummary";
    let result = await axios.get(URL, AxiosHeader);
    store.dispatch(HideLoader());
    if (result.status === 200) {
      store.dispatch(SetPurchaseChart(result.data["data"][0]["Last30Days"]));
      store.dispatch(
        SetPurchaseTotal(result.data["data"][0]["Total"][0]["TotalAmount"])
      );
      return true;
    } else {
      ErrorToast("Someting Wrong");
      return false;
    }
  } catch (error) {
    console.log(error);
    store.dispatch(HideLoader());
    ErrorToast("Something Went Wrong");
    return false;
  }
}

export async function SaleSummary() {
  try {
    store.dispatch(ShowLoader());
    let URL = baseURL + "/SaleSummary";
    let result = await axios.get(URL, AxiosHeader);
    store.dispatch(HideLoader());
    if (result.status === 200) {
      console.log(result, "data");
      store.dispatch(SetSaleChart(result.data["data"][0]["Last30Days"]));
      store.dispatch(
        SetSaleTotal(result.data["data"][0]["Total"][0]["TotalAmount"])
      );
      return true;
    } else {
      ErrorToast("Someting Wrong");
      return false;
    }
  } catch (error) {
    console.log(error);
    store.dispatch(HideLoader());
    ErrorToast("Something Went Wrong");
    return false;
  }
}
export async function ReturnSummary() {
  try {
    store.dispatch(ShowLoader());
    let URL = baseURL + "/ReturnSummary";
    let result = await axios.get(URL, AxiosHeader);
    console.log(result, "data");
    store.dispatch(HideLoader());
    if (result.status === 200) {
      store.dispatch(SetReturnChart(result.data["data"][0]["Last30Days"]));
      store.dispatch(
        SetReturnTotal(result.data["data"][0]["Total"][0]["TotalAmount"])
      );
      return true;
    } else {
      ErrorToast("Someting Wrong");
      return false;
    }
  } catch (error) {
    console.log(error);
    store.dispatch(HideLoader());
    ErrorToast("Something Went Wrong");
    return false;
  }
}
