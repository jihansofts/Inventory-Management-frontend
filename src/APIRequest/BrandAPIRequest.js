import store from "../redox/store/store";
import { HideLoader, ShowLoader } from "../redox/state-slice/settingSlice";
import axios from "axios";
import { ErrorToast, SuccessToast } from "../helper/FormHelper";
import { getToken } from "../helper/SessionHelper";
import {
  OnChangeBrandInput,
  ResetBrandFormValue,
  SetBrandList,
  SetBrandTotalList,
} from "../redox/state-slice/brandSlice";
import { baseURL } from "../helper/config";
const AxiosHeader = { headers: { token: getToken() } };

export async function BrandListRequest(pageNo, perPage, searchKeyword) {
  try {
    store.dispatch(ShowLoader());
    let URL =
      baseURL + "/BrandList/" + pageNo + "/" + perPage + "/" + searchKeyword;
    let result = await axios.get(URL, AxiosHeader);
    store.dispatch(HideLoader());
    if (result.status === 200 && result.data["status"] === "success") {
      if (result.data["data"][0]["Rows"].length > 0) {
        store.dispatch(SetBrandList(result.data["data"][0]["Rows"]));
        store.dispatch(
          SetBrandTotalList(result.data["data"][0]["Total"][0]["count"])
        );
        return true;
      } else {
        store.dispatch(SetBrandList([]));
        store.dispatch(SetBrandTotalList(0));
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
    ErrorToast("Somethong Went Worng Try Again");
    return false;
  }
}

export async function BrandCreateRequest(PostBody, ObjectID) {
  try {
    store.dispatch(ShowLoader());
    let URL = baseURL + "/CreateBrand";
    if (ObjectID !== 0) {
      URL = baseURL + "/UpdateBrand/" + ObjectID;
    }
    let result = await axios.post(URL, PostBody, AxiosHeader);
    store.dispatch(HideLoader());
    if (result.status === 200 && result.data["status"] === "success") {
      SuccessToast("Brand Create Successfull");
      store.dispatch(ResetBrandFormValue());
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

export async function FillBrandFormRequest(ObjectID) {
  try {
    store.dispatch(ShowLoader());
    let URL = baseURL + "/BrandDetailsByID/" + ObjectID;
    let result = await axios.get(URL, AxiosHeader);
    store.dispatch(HideLoader());
    if (result.status === 200 && result.data["status"] === "success") {
      let FormValu = result.data["data"][0];
      store.dispatch(
        OnChangeBrandInput({ Name: "Name", Value: FormValu["Name"] })
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
  }
}

export async function DeleteBrandRequest(ObjectID) {
  try {
    store.dispatch(ShowLoader());
    let URL = baseURL + "/BrandDelete/" + ObjectID;
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
  } catch (error) {}
}
