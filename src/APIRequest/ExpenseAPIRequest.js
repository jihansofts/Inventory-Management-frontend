import store from "../redox/store/store";
import axios from "axios";
import {
  SetExpenseList,
  SetExpenseTotalList,
  SetExpenseTypeDropDown,
  OnChangeExpenseInput,
  ResetExpenseFormValue,
} from "../redox/state-slice/expenseSlice";
import { ErrorToast, SuccessToast } from "../helper/FormHelper";
import { ShowLoader, HideLoader } from "../redox/state-slice/settingSlice";
import { getToken } from "../helper/SessionHelper";
import { baseURL } from "../helper/config";

const AxiosHeader = { headers: { token: getToken() } };

export async function ExpenseListRequest(pageNo, perPage, searchKeyword) {
  try {
    store.dispatch(ShowLoader());
    let URL =
      baseURL + "/ListExpense/" + pageNo + "/" + perPage + "/" + searchKeyword;
    let result = await axios.get(URL, AxiosHeader);
    store.dispatch(HideLoader());
    if (result.status === 200 && result.data["status"] === "success") {
      if (result.data["data"][0]["Rows"].length > 0) {
        store.dispatch(SetExpenseList(result.data["data"][0]["Rows"]));
        store.dispatch(
          SetExpenseTotalList(result.data["data"][0]["Total"]["count"])
        );
        return true;
      } else {
        store.dispatch(SetExpenseList([]));
        store.dispatch(SetExpenseTotalList(0));
        ErrorToast("No Data Found");
        return false;
      }
    } else {
      ErrorToast("Something Wromg Server Error");
      return false;
    }
  } catch (error) {
    console.log(error);
    store.dispatch(HideLoader());
    ErrorToast("Something Went Wrong");
    return false;
  }
}

export async function ExpenseTypeDropDownRequest() {
  try {
    store.dispatch(ShowLoader());
    let URL = baseURL + "/DropDownExpenseType";
    let result = await axios.get(URL, AxiosHeader);
    store.dispatch(HideLoader());
    if (result.status === 200 && result.data["status"] === "success") {
      if (result.data["data"].length > 0) {
        store.dispatch(SetExpenseTypeDropDown(result.data["data"]));
        return true;
      } else {
        store.dispatch(SetExpenseTypeDropDown([]));
        ErrorToast("Expense Type Not Found");
        return false;
      }
    } else {
      ErrorToast("Something Error Server");
      return false;
    }
  } catch (error) {
    console.log(error);
    store.dispatch(HideLoader());
    ErrorToast("Something Went Wrong");
    return false;
  }
}
export async function CreateExpenseRequest(PostBody, ObjectID) {
  try {
    store.dispatch(ShowLoader());
    let URL = baseURL + "/CreateExpense";
    if (ObjectID !== 0) {
      URL = baseURL + "/UpdateExpense/" + ObjectID;
    }
    let result = await axios.post(URL, PostBody, AxiosHeader);
    store.dispatch(HideLoader());
    if (result.status === 200 && result.data["status"] === "success") {
      SuccessToast("Expense Request Successfull");
      store.dispatch(ResetExpenseFormValue());
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

export async function FillExpenseFormRequest(ObjectID) {
  try {
    store.dispatch(ShowLoader());
    let URL = baseURL + "/ExpenseDetailsByID/" + ObjectID;
    let result = await axios.get(URL, AxiosHeader);
    if (result.status === 200 && result.data["status"] === "success") {
      let FormValue = result.data["data"][0];
      store.dispatch(
        OnChangeExpenseInput({ Name: "TypeID", Value: FormValue["TypeID"] })
      );
      store.dispatch(
        OnChangeExpenseInput({ Name: "Amount", Value: FormValue["Amount"] })
      );
      store.dispatch(
        OnChangeExpenseInput({ Name: "Note", Value: FormValue["Note"] })
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
  }
}

export async function DeleteExpenseRequest(ObjectID) {
  try {
    store.dispatch(ShowLoader());
    let URL = baseURL + "/DeleteExpense/" + ObjectID;
    let result = await axios.get(URL, AxiosHeader);
    store.dispatch(HideLoader());
    if (result.status === 200 && result.data["status"] === "associate") {
      ErrorToast(result.data["data"]);
      return false;
    } else if (result.status === 200 && result.data["status"] === "success") {
      SuccessToast("Delete Successfull");
      return true;
    } else {
      ErrorToast("Request Fail ! Try Again");
      return false;
    }
  } catch (error) {
    console.log(error);
    store.dispatch(HideLoader());
    ErrorToast("Something Went Wrong ");
    return false;
  }
}
