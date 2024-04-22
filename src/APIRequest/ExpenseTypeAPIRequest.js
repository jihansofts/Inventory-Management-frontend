import axios from "axios";
import store from "../redox/store/store";
import { ErrorToast, SuccessToast } from "../helper/FormHelper";
import { HideLoader, ShowLoader } from "../redox/state-slice/settingSlice";
import {
  SetExpenseType,
  SetTotalExpenseType,
  //   OnChangeExpenseTypeInput,
  ResetExpenseTypeInputValue,
  OnChangeExpenseTypeInput,
} from "../redox/state-slice/expensetypeSlice";
import { getToken } from "../helper/SessionHelper";
import { baseURL } from "../helper/config";
const AxiosHeader = { headers: { token: getToken() } };

export async function ExpenseTypeListRequest(pageNo, perPage, searchKeyword) {
  try {
    store.dispatch(ShowLoader());
    let URL =
      baseURL +
      "/ListExpenseType/" +
      pageNo +
      "/" +
      perPage +
      "/" +
      searchKeyword;
    let result = await axios.get(URL, AxiosHeader);
    store.dispatch(HideLoader());
    if (result.status === 200 && result.data["status"] === "success") {
      if (result.data["data"][0]["Rows"].length > 0) {
        store.dispatch(SetExpenseType(result.data["data"][0]["Rows"]));
        store.dispatch(
          SetTotalExpenseType(result.data["data"][0]["Total"]["count"])
        );
        return true;
      } else {
        store.dispatch(SetExpenseType([]));
        store.dispatch(SetTotalExpenseType());
        ErrorToast("No Data Found");
        return false;
      }
    } else {
      ErrorToast("Something Went Wrong");
      return false;
    }
  } catch (error) {
    console.log(error);
    store.dispatch(HideLoader());
    ErrorToast("Something Went Wrong ");
    return false;
  }
}

export async function ExpenseTypeCreateRequest(PostBody, ObjectID) {
  try {
    store.dispatch(ShowLoader());
    let URL = baseURL + "/CreateExpenseType";
    if (ObjectID !== 0) {
      URL = baseURL + "/UpdateExpenseType/" + ObjectID;
    }
    let result = await axios.post(URL, PostBody, AxiosHeader);
    if (result.status === 200 && result.data["status"] === "success") {
      SuccessToast("ExpenseType Create SuccessFull");
      store.dispatch(ResetExpenseTypeInputValue());
      return true;
    } else {
      ErrorToast("Request Fail Try Again");
      ErrorToast("Something Went Wrong Server ");
      return false;
    }
  } catch (error) {
    console.log(error);
    ErrorToast("Something Went Wrong ");
    return false;
  }
}

export async function FillExpenseTypeFormRequest(ObjectID) {
  try {
    store.dispatch(ShowLoader());
    let URL = baseURL + "/ExpenseTypeDetailsByID/" + ObjectID;
    let result = await axios.get(URL, AxiosHeader);
    store.dispatch(HideLoader());
    if (result.status === 200 && result.data["status"] === "success") {
      let FormValue = result.data["data"][0];
      store.dispatch(
        OnChangeExpenseTypeInput({ Name: "Name", Value: FormValue["Name"] })
      );
      return true;
    } else {
      ErrorToast("Request Fail Try Again");
      return false;
    }
  } catch (error) {
    console.log(error);
    ErrorToast("Something Went Wrong");
    store.dispatch(HideLoader());
    return false;
  }
}

export async function DeleteExpenseTypeRequest(ObjectID) {
  try {
    store.dispatch(ShowLoader());
    let URL = baseURL + "/DeleteExpenseType/" + ObjectID;
    let result = await axios.get(URL, AxiosHeader);
    if (result.status === 200 && result.data["status"] === "associate") {
      ErrorToast(result.data["data"]);
      return false;
    }
    if (result.status === 200 && result.data["status"] === "success") {
      SuccessToast("Delete Successfull");
      return true;
    }
  } catch (error) {
    console.log(error);
    ErrorToast("Something Went Wrong");
    store.dispatch(HideLoader());
    return false;
  }
}
