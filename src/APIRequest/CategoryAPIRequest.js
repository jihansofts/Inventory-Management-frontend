import store from "../redox/store/store";
import axios from "axios";
import { ShowLoader, HideLoader } from "../redox/state-slice/settingSlice";
import { ErrorToast, SuccessToast } from "../helper/FormHelper";
import { getToken } from "../helper/SessionHelper";
import {
  OnChangeCategoryInput,
  ResetCategoryInputValue,
  SetCategoryList,
  SetCategoryTotalList,
} from "../redox/state-slice/categorySlice";
import { baseURL } from "../helper/config";
const AxiosHeader = { headers: { token: getToken() } };

export async function CategoryListRequest(pageNo, perPage, searchKeyword) {
  try {
    store.dispatch(ShowLoader());
    let URL =
      baseURL +
      "/ListCategories/" +
      pageNo +
      "/" +
      perPage +
      "/" +
      searchKeyword;
    let result = await axios.get(URL, AxiosHeader);
    store.dispatch(HideLoader());
    if (result.status === 200 && result.data["status"] === "success") {
      if (result.data["data"][0]["Rows"].length > 0) {
        store.dispatch(SetCategoryList(result.data["data"][0]["Rows"]));
        store.dispatch(
          SetCategoryTotalList(result.data["data"][0]["Total"][0]["count"])
        );
        return true;
      } else {
        store.dispatch(SetCategoryList([]));
        store.dispatch(SetCategoryTotalList(0));
        ErrorToast("No Data Found");
        return false;
      }
    }
  } catch (error) {
    console.log(error);
    store.dispatch(HideLoader());
    ErrorToast("Something Went Worng");
    return false;
  }
}

export async function CategoryCreateRequest(PostBody, ObjectID) {
  try {
    store.dispatch(ShowLoader());
    let URL = baseURL + "/CreateCategories";
    if (ObjectID !== 0) {
      URL = baseURL + "/UpdateCategories/" + ObjectID;
    }
    let result = await axios.post(URL, PostBody, AxiosHeader);
    if (result.status === 200 && result.data["status"] === "success") {
      SuccessToast("Request Successfull");
      store.dispatch(ResetCategoryInputValue());
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

export async function FillCategoryFormRequest(ObjectID) {
  try {
    store.dispatch(ShowLoader());
    let URL = baseURL + "/CategorieDetailByID/" + ObjectID;
    let result = await axios.get(URL, AxiosHeader);
    store.dispatch(HideLoader());
    if (result.status === 200 && result.data["status"] === "success") {
      let FormValue = result.data["data"][0];
      store.dispatch(
        OnChangeCategoryInput({ Name: "Name", Value: FormValue["Name"] })
      );
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

export async function DeleteCategoryRequest(ObjectID) {
  try {
    store.dispatch(ShowLoader());
    let URL = baseURL + "/DeleteCategories/" + ObjectID;
    let result = await axios.get(URL, AxiosHeader);
    if (result.status === 200 && result.data["status"] === "associate") {
      store.dispatch(HideLoader());
      ErrorToast(result.data["data"]);
      return false;
    } else if (result.status === 200 && result.data["status"] === "success") {
      SuccessToast("Delete SuccessFull");
      return true;
    } else {
      ErrorToast("Request Fail Try Again");
      return false;
    }
  } catch (error) {
    console.log(error);
    store.dispatch(HideLoader());
    ErrorToast("Something Went Wromg");
    return false;
  }
}
