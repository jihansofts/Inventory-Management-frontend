import store from "../redox/store/store";
import { HideLoader, ShowLoader } from "../redox/state-slice/settingSlice";
import axios from "axios";
import { ErrorToast, SuccessToast } from "../helper/FormHelper";
import { getToken } from "../helper/SessionHelper";
import {
  SetCustomerList,
  SetCustomerTotalList,
  ResetCustomerFormValue,
} from "../redox/state-slice/customerSlice";
import { baseURL } from "../helper/config";
import { OnChangeCustomerInput } from "../redox/state-slice/customerSlice";
const AxiosHeader = { headers: { token: getToken() } };

export async function CustomersListRequest(pageNo, perPage, searchKeyword) {
  try {
    store.dispatch(ShowLoader());
    let URL =
      baseURL + "/CustomerList/" + pageNo + "/" + perPage + "/" + searchKeyword;
    let result = await axios.get(URL, AxiosHeader);
    store.dispatch(HideLoader());
    if (result.status === 200 && result.data["status"] === "success") {
      if (result.data["data"][0]["Rows"].length > 0) {
        store.dispatch(SetCustomerList(result.data["data"][0]["Rows"]));
        store.dispatch(
          SetCustomerTotalList(result.data["data"][0]["Total"][0]["count"])
        );
      } else {
        store.dispatch(SetCustomerList([]));
        store.dispatch(SetCustomerTotalList(0));
        ErrorToast("No Data Found");
      }
    } else {
      ErrorToast("Something Went Wrong");
    }
  } catch (error) {
    console.log(error);
    store.dispatch(HideLoader());
    ErrorToast("Somethong Went Worng Try Again");
    return false;
  }
}

export async function CustomersCreateRequest(PostBody, ObjectID) {
  try {
    store.dispatch(ShowLoader());
    let URL = baseURL + "/CustomerCreate";
    if (ObjectID !== 0) {
      URL = baseURL + "/CustomerUpdate/" + ObjectID;
    }
    let result = await axios.post(URL, PostBody, AxiosHeader);
    store.dispatch(HideLoader());
    if (result.status === 200 && result.data["status"] === "success") {
      SuccessToast("Request SuccessFull");
      store.dispatch(ResetCustomerFormValue());
      return true;
    } else {
      ErrorToast("Request Fail Try Again");
      return false;
    }
  } catch (error) {
    console.log(error);
    store.dispatch(HideLoader());
    ErrorToast("Somethong Went Worng Try Again");
    return false;
  }
}

export async function FillCustomersFormRequest(ObjectID) {
  try {
    store.dispatch(ShowLoader());
    let URL = baseURL + "/CustomersDetailsByID/" + ObjectID;
    let result = await axios.get(URL, AxiosHeader);
    store.dispatch(HideLoader());
    if (result.status === 200 && result.data["status"] === "success") {
      let FormValue = result.data["data"][0];
      store.dispatch(
        OnChangeCustomerInput({
          Name: "CustomarName",
          Value: FormValue["CustomarName"],
        })
      );
      store.dispatch(
        OnChangeCustomerInput({ Name: "Phone", Value: FormValue["Phone"] })
      );
      store.dispatch(
        OnChangeCustomerInput({ Name: "Email", Value: FormValue["Email"] })
      );
      store.dispatch(
        OnChangeCustomerInput({ Name: "Address", Value: FormValue["Address"] })
      );
      return true;
    } else {
      ErrorToast("Request Fail Try Again");
      return false;
    }
  } catch (error) {
    console.log(error);
    store.dispatch(HideLoader());
    ErrorToast("Somethong Went Worng Try Again");
    return false;
  }
}

export async function DeleteCustomersRequest(ObjectID) {
  try {
    store.dispatch(ShowLoader());
    let URL = baseURL + "/DeleteCustomers/" + ObjectID;
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
    ErrorToast("Somethong Went Worng Try Again");
    return false;
  }
}
