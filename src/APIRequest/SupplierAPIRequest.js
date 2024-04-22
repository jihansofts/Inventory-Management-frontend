import store from "../redox/store/store";
import { HideLoader, ShowLoader } from "../redox/state-slice/settingSlice";
import axios from "axios";
import { ErrorToast, SuccessToast } from "../helper/FormHelper";
import { getToken } from "../helper/SessionHelper";
import {
  SetSupplierList,
  SetSupplierListTotal,
  OnChangeSupplierInput,
  ResetSupplierFormValue,
} from "../redox/state-slice/supplierSlice";
import { baseURL } from "../helper/config";
const AxiosHeader = { headers: { token: getToken() } };

export async function SupplierListRequest(pageNo, perPage, searchKeyword) {
  try {
    store.dispatch(ShowLoader());
    let URL =
      baseURL + "/SupplierList/" + pageNo + "/" + perPage + "/" + searchKeyword;
    const result = await axios.get(URL, AxiosHeader);
    store.dispatch(HideLoader());
    if (result.status === 200 && result.data["status"] === "success") {
      if (result.data["data"][0]["Rows"].length > 0) {
        store.dispatch(SetSupplierList(result.data["data"][0]["Rows"]));
        store.dispatch(
          SetSupplierListTotal(result.data["data"][0]["Total"][0]["count"])
        );
      } else {
        store.dispatch(SetSupplierList([]));
        store.dispatch(SetSupplierListTotal(0));
        ErrorToast("No Data Found");
      }
    } else {
      ErrorToast("Something Went Wrong");
    }
  } catch (e) {
    ErrorToast("Something Went Wrong");
    store.dispatch(HideLoader());
  }
}

export async function CreateSupplierRequest(PostBody, ObjectID) {
  try {
    store.dispatch(ShowLoader());
    let URL = baseURL + "/SupplierCreate";
    if (ObjectID !== 0) {
      URL = baseURL + "/SupplierUpdate/" + ObjectID;
    }
    const result = await axios.post(URL, PostBody, AxiosHeader);
    store.dispatch(HideLoader());
    if (result.status === 200 && result.data["status"] === "success") {
      SuccessToast("Request Successful");
      store.dispatch(ResetSupplierFormValue());
      return true;
    } else if (result.status === 200 && result.data["status"] === "fail") {
      if (result.data["data"]["keyPattern"]["Phone"] === 1) {
        ErrorToast("Mobile Number Already Exist");
        return false;
      }
    } else {
      ErrorToast("Request Fail ! Try Again");
      return false;
    }
  } catch (e) {
    ErrorToast("Something Went Wrong");
    store.dispatch(HideLoader());
    return false;
  }
}

export async function FillSupplierFormRequest(ObjectID) {
  try {
    store.dispatch(ShowLoader());
    let URL = baseURL + "/SupplierDetailsByID/" + ObjectID;
    const result = await axios.get(URL, AxiosHeader);
    store.dispatch(HideLoader());
    if (result.status === 200 && result.data["status"] === "success") {
      let FormValue = result.data["data"][0];
      store.dispatch(
        OnChangeSupplierInput({ Name: "Name", Value: FormValue["Name"] })
      );
      store.dispatch(
        OnChangeSupplierInput({ Name: "Phone", Value: FormValue["Phone"] })
      );
      store.dispatch(
        OnChangeSupplierInput({ Name: "Email", Value: FormValue["Email"] })
      );
      store.dispatch(
        OnChangeSupplierInput({ Name: "Address", Value: FormValue["Address"] })
      );
      return true;
    } else {
      ErrorToast("Request Fail ! Try Again");
      return false;
    }
  } catch (error) {
    console.log(error);
    ErrorToast("Something Went Wrong");
    store.dispatch(HideLoader());
    return false;
  }
}

export async function DeleteSupplierRequest(ObjectID) {
  try {
    store.dispatch(ShowLoader());
    let URL = baseURL + "/DeleteSupplier/" + ObjectID;
    const result = await axios.get(URL, AxiosHeader);
    store.dispatch(HideLoader());
    if (result.status === 200 && result.data["status"] === "associate") {
      ErrorToast(result.data["data"]);
      return false;
    } else if (result.status === 200 && result.data["status"] === "success") {
      SuccessToast("Request Successful");
      return true;
    } else {
      ErrorToast("Request Fail ! Try Again");
      return false;
    }
  } catch (error) {
    console.log(error);
    ErrorToast("Something Went Wrong");
    store.dispatch(HideLoader());
    return false;
  }
}
