import store from "../redox/store/store";
import axios from "axios";
import { ErrorToast, SuccessToast } from "../helper/FormHelper";
import { ShowLoader, HideLoader } from "../redox/state-slice/settingSlice";
import {
  SetProductDropDown,
  SetPurchaseList,
  SetPurchaseTotalList,
  SetSupplierDropDown,
} from "../redox/state-slice/purchaseSlice";
import { getToken } from "../helper/SessionHelper";
import { baseURL } from "../helper/config";

const AxiosHeader = { headers: { token: getToken() } };

export async function PurchaseListRequest(pageNo, perPage, searchKeyword) {
  try {
    store.dispatch(ShowLoader());
    let URL =
      baseURL +
      "/PurchasesList/" +
      pageNo +
      "/" +
      perPage +
      "/" +
      searchKeyword;
    let result = await axios.get(URL, AxiosHeader);
    store.dispatch(HideLoader());
    if (result.status === 200 && result.data["status"] === "success") {
      if (result.data["data"][0]["Rows"].length > 0) {
        store.dispatch(SetPurchaseList(result.data["data"][0]["Rows"]));
        store.dispatch(
          SetPurchaseTotalList(result.data["data"][0]["Total"][0]["count"])
        );
      } else {
        store.dispatch(SetPurchaseList([]));
        store.dispatch(SetPurchaseTotalList(0));
        ErrorToast("No Data Found");
      }
    } else {
      store.dispatch(HideLoader());
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

export async function ProductDropDownRequest() {
  try {
    store.dispatch(ShowLoader());
    let URL = baseURL + "/ProductsDropDown";
    let result = await axios.get(URL, AxiosHeader);
    store.dispatch(HideLoader());
    if (result.status === 200 && result.data["status"] === "success") {
      if (result.data["data"].length > 0) {
        store.dispatch(SetProductDropDown(result.data["data"]));
      } else {
        store.dispatch(SetProductDropDown([]));
        ErrorToast("No Product Found");
      }
    } else {
      ErrorToast("Something Went Wrong");
      return false;
    }
  } catch (error) {
    console.log(error);
    store.dispatch(HideLoader());
    ErrorToast("Something Went Wrong");
    return false;
  }
}
export async function SupplierDropDownRequest() {
  try {
    store.dispatch(ShowLoader());
    let URL = baseURL + "/SupplierDropDown";
    let result = await axios.get(URL, AxiosHeader);
    store.dispatch(HideLoader());
    if (result.status === 200 && result.data["status"] === "success") {
      if (result.data["data"].length > 0) {
        store.dispatch(SetSupplierDropDown(result.data["data"]));
      } else {
        store.dispatch(SetSupplierDropDown([]));
        ErrorToast("No Supplier Found");
      }
    } else {
      ErrorToast("Something Wrong");
    }
  } catch (error) {
    console.log(error);
    ErrorToast("Something Went Wrong");
  }
}
export async function CreatePurchaseRequest(ParentBody, ChildBody) {
  try {
    store.dispatch(ShowLoader());
    let PostBody = { Parent: ParentBody, Childs: ChildBody };
    let URL = baseURL + "/CreatePurchases";
    let result = await axios.post(URL, PostBody, AxiosHeader);
    store.dispatch(HideLoader());
    if (result.status === 200 && result.data["status"] === "success") {
      SuccessToast("Request Successful");
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

export async function DeletePurchaseRequest(ObjectID) {
  try {
    store.dispatch(ShowLoader());
    let URL = baseURL + "/PuchasesDelete/" + ObjectID;
    let result = await axios.get(URL, AxiosHeader);
    store.dispatch(HideLoader());
    if (result.status === 200 && result.data["status"] === "associate") {
      ErrorToast(result.data["data"]);
      return false;
    } else if (result.status === 200 && result.data["status"] === "success") {
      SuccessToast("Delete Successfull");
      return true;
    } else {
      ErrorToast("Request Fail Try Again");
      return false;
    }
  } catch (error) {
    console.log(error);
    store.dispatch(HideLoader());
    ErrorToast("Something Went Wrong");
    return false;
  }
}
