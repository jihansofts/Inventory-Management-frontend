import store from "../redox/store/store";
import axios from "axios";
import { ShowLoader, HideLoader } from "../redox/state-slice/settingSlice";
import { ErrorToast, SuccessToast } from "../helper/FormHelper";
import {
  SetSaleList,
  SetCustomerDropDown,
  SetProductsDropDown,
  SetSaleTotalList,
} from "../redox/state-slice/saleSlice";
import { getToken } from "../helper/SessionHelper";
import { baseURL } from "../helper/config";
const AxiosHeader = { headers: { token: getToken() } };

export async function SaleListRequest(pageNo, perPage, searchKeyword) {
  try {
    store.dispatch(ShowLoader());
    let URL =
      baseURL + "/SaleList/" + pageNo + "/" + perPage + "/" + searchKeyword;
    let result = await axios.get(URL, AxiosHeader);
    store.dispatch(HideLoader());
    if (result.status === 200 && result.data["status"] === "success") {
      if (result.data["data"][0]["Rows"].length > 0) {
        store.dispatch(SetSaleList(result.data["data"][0]["Rows"]));
        store.dispatch(
          SetSaleTotalList(result.data["data"][0]["Total"][0]["count"])
        );
      } else {
        ErrorToast("No Data Found");
        store.dispatch(SetSaleList([]));
        store.dispatch(SetSaleTotalList(0));
      }
    } else {
      ErrorToast("Someting Wrong");
      return false;
    }
  } catch (error) {
    console.log(error);
    store.dispatch(HideLoader());
    ErrorToast("Someting Went Wrong");
    return false;
  }
}

export async function CustomerDropDownRequest() {
  try {
    store.dispatch(ShowLoader());
    let URL = baseURL + "/CustomerDropDown";
    let result = await axios.get(URL, AxiosHeader);
    store.dispatch(HideLoader());
    if (result.status === 200 && result.data["status"] === "success") {
      if (result.data["data"].length > 0) {
        store.dispatch(SetCustomerDropDown(result.data["data"]));
        return true;
      } else {
        ErrorToast("Not Found");
        return false;
      }
    } else {
      ErrorToast("Something Wrong");
      return false;
    }
  } catch (error) {
    console.log(error);
    store.dispatch(HideLoader());
    ErrorToast("Someting Went Wrong");
    return false;
  }
}
export async function ProductsDropDownRequest() {
  try {
    store.dispatch(ShowLoader());
    let URL = baseURL + "/ProductsDropDown";
    let result = await axios.get(URL, AxiosHeader);
    store.dispatch(HideLoader());
    if (result.status === 200 && result.data["status"] === "success") {
      if (result.data["data"].length > 0) {
        store.dispatch(SetProductsDropDown(result.data["data"]));
        return true;
      } else {
        ErrorToast("Not Found");
        return false;
      }
    } else {
      ErrorToast("Something Wrong");
      return false;
    }
  } catch (error) {
    console.log(error);
    store.dispatch(HideLoader());
    ErrorToast("Someting Went Wrong");
    return false;
  }
}

export async function CreateSaleRequest(ParentBody, ChildBody) {
  try {
    store.dispatch(ShowLoader());
    let PostBody = { Parent: ParentBody, Childs: ChildBody };
    let URL = baseURL + "/CreateSales";
    let result = await axios.post(URL, PostBody, AxiosHeader);
    store.dispatch(HideLoader());
    if (result.status === 200 && result.data["status"] === "success") {
      SuccessToast("Create SuccessFull");
      return true;
    } else {
      ErrorToast("Someting Wrong");
      return false;
    }
  } catch (error) {
    console.log(error);
    store.dispatch(HideLoader());
    ErrorToast("Someting Went Wrong");
    return false;
  }
}
export async function DeleteSaleRequest(ObjectID) {
  try {
    store.dispatch(ShowLoader());
    let URL = baseURL + "/DeleteSale/" + ObjectID;
    let result = await axios.get(URL, AxiosHeader);
    store.dispatch(HideLoader());
    if (result.status === 200 && result.data["status"] === "associate") {
      ErrorToast(result.data["data"]);
    } else if (result.status === 200 && result.data["status"] === "success") {
      SuccessToast("Delete Successfull");
      return true;
    } else {
      ErrorToast("Request Fail Try Again!");
      return false;
    }
  } catch (error) {
    console.log(error);
    store.dispatch(HideLoader());
    ErrorToast("Someting Went Wrong");
    return false;
  }
}
