import axios from "axios";
import { ErrorToast } from "../helper/FormHelper";
import {
  SetSaleByDateList,
  SetReturnByDateList,
  SetExpenseByDateList,
  SetPurchaseByDateList,
} from "../redox/state-slice/reportSlice";
import { ShowLoader, HideLoader } from "../redox/state-slice/settingSlice";
import store from "../redox/store/store";
import { getToken } from "../helper/SessionHelper";
import { baseURL } from "../helper/config";
const AxiosHeader = { headers: { token: getToken() } };

export async function ExpensesByDateRequest(FormDate, ToDate) {
  try {
    store.dispatch(ShowLoader());
    let PostBody = {
      FormDate: FormDate + "T00:00:00.000+00:00",
      ToDate: ToDate + "T00:00:00.000+00:00",
    };
    let URL = baseURL + "/ExpensesByDate";
    let result = await axios.post(URL, PostBody, AxiosHeader);
    console.log(result, "data");
    store.dispatch(HideLoader());
    if (result.status === 200 && result.data["status"] === "success") {
      store.dispatch(SetExpenseByDateList(result.data["data"]));
      return true;
    } else {
      ErrorToast("Someting Wrong");
      return false;
    }
  } catch (error) {
    console.log(error);
    store.dispatch(HideLoader());
    ErrorToast("Something Went Wrong");
  }
}

export async function SaleByDateRequest(FormDate, ToDate) {
  try {
    store.dispatch(ShowLoader());
    let PostBody = {
      FormDate: FormDate + "T00:00:00.000+00:00",
      ToDate: ToDate + "T00:00:00.000+00:00",
    };
    let URL = baseURL + "/SaleByDate";
    let result = await axios.post(URL, PostBody, AxiosHeader);
    store.dispatch(HideLoader());
    if (result.status === 200 && result.data["status"] === "success") {
      store.dispatch(SetSaleByDateList(result.data["data"]));
      console.log(result.data, "salebydate");
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
export async function PurchaseByDateRequest(FormDate, ToDate) {
  try {
    store.dispatch(ShowLoader());
    let PostBody = {
      FormDate: FormDate + "T00:00:00.000+00:00",
      ToDate: ToDate + "T00:00:00.000+00:00",
    };
    let URL = baseURL + "/PurchasesByDate";
    let result = await axios.post(URL, PostBody, AxiosHeader);
    store.dispatch(HideLoader());
    if (result.status === 200 && result.data["status"] === "success") {
      store.dispatch(SetPurchaseByDateList(result.data["data"]));
    } else {
      ErrorToast("Someting Wrong");
    }
  } catch (error) {
    console.log(error);
    store.dispatch(HideLoader());
    ErrorToast("Something Went Wrong");
  }
}

export async function ReturnByDateRequest(FormDate, ToDate) {
  try {
    store.dispatch(ShowLoader());
    let PostBody = {
      FormDate: FormDate + "T00:00:00.000+00:00",
      ToDate: ToDate + "T00:00:00.000+00:00",
    };
    let URL = baseURL + "/ReturnByDate";
    let result = await axios.post(URL, PostBody, AxiosHeader);
    store.dispatch(HideLoader());
    if (result.status === 200 && result.data["status"] === "success") {
      store.dispatch(SetReturnByDateList(result.data["data"]));
    } else {
      ErrorToast("Something Wrong");
    }
  } catch (error) {
    console.log(error);
    store.dispatch(HideLoader());
    ErrorToast("Something Went Wrong");
  }
}
