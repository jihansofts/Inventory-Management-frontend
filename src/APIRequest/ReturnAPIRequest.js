import store from "../redox/store/store";
import axios from "axios";
import { ShowLoader, HideLoader } from "../redox/state-slice/settingSlice";
import { ErrorToast, SuccessToast } from "../helper/FormHelper";
import {
  SetReturnList,
  SetCustomerDropDown,
  SetProductsDropDown,
  SetReturnTotalList,
} from "../redox/state-slice/returnSlice";
import { baseURL } from "../helper/config";
import { getToken } from "../helper/SessionHelper";
const AxiosHeader = { headers: { token: getToken() } };

export async function RetunListRequest(pageNo, perPage, searchKeyword) {
  try {
    store.dispatch(ShowLoader());
    let URL =
      baseURL + "/ListReturn/" + pageNo + "/" + perPage + "/" + searchKeyword;
    let result = await axios.get(URL, AxiosHeader);
    store.dispatch(HideLoader());
    if (result.status === 200 && result.data["status"] === "success") {
      if (result.data["data"][0]["Rows"].length > 0) {
        store.dispatch(SetReturnList(result.data["data"][0]["Rows"]));
        store.dispatch(
          SetReturnTotalList(result.data["data"][0]["Total"][0]["count"])
        );
        return true;
      } else {
        ErrorToast("No Data Found");
        store.dispatch(SetReturnList([]));
        store.dispatch(SetReturnTotalList(0));
      }
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

export async function CreateReturnRequest(ParentBody, ChildBody) {
  try {
    store.dispatch(ShowLoader());
    let PostBody = { Parent: ParentBody, Childs: ChildBody };
    let URL = baseURL + "/CreateReturn";
    let result = await axios.post(URL, PostBody, AxiosHeader);
    store.dispatch(HideLoader());
    if (result.status === 200 && result.data["status"] === "success") {
      SuccessToast("Create Sucessfull");
      return true;
    } else {
      ErrorToast("Something Went Wrong");
      return false;
    }
  } catch (error) {
    console.log(error);
    store.dispatch(HideLoader());
    ErrorToast("Someting Went Wrong");
    return false;
  }
}
export async function DeleteReturnRequest(ObjectID) {
  try {
    store.dispatch(ShowLoader());
    let URL = baseURL + "/DeleteReturn/" + ObjectID;
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
    store.dispatch(HideLoader());
    ErrorToast("Someting Went Wrong");
    return false;
  }
}
