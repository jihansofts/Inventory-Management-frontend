import store from "../redox/store/store";
import axios from "axios";
import { ShowLoader, HideLoader } from "../redox/state-slice/settingSlice";
import {
  SetProductList,
  SetProductTotalList,
  SetProductCategoryDropDown,
  SetProductBrandDropDown,
  OnChangeProductInput,
  ResetProductFormValue,
} from "../redox/state-slice/productSlice";
import { ErrorToast, SuccessToast } from "../helper/FormHelper";
import { getToken } from "../helper/SessionHelper";
import { baseURL } from "../helper/config";
const AxiosHeader = { headers: { token: getToken() } };

export async function ProductListRequest(pageNo, perPage, searchKeyword) {
  try {
    store.dispatch(ShowLoader());
    let URL =
      baseURL + "/ProductList/" + pageNo + "/" + perPage + "/" + searchKeyword;
    let result = await axios.get(URL, AxiosHeader);
    store.dispatch(HideLoader());
    if (result.status === 200 && result.data["status"] === "success") {
      if (result.data["data"].length > 0) {
        store.dispatch(SetProductList(result.data["data"][0]["Rows"]));
        store.dispatch(
          SetProductTotalList(result.data["data"][0]["Total"]["count"])
        );
        return true;
      } else {
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
    ErrorToast("Something Went Wrong Error");
    return false;
  }
}
export async function ProductCreateUpdateRequest(PostBody, ObjectID) {
  try {
    store.dispatch(ShowLoader());
    let URL = baseURL + "/CreateProducts";
    if (ObjectID !== 0) {
      URL = baseURL + "/UpdateProducts/" + ObjectID;
    }
    let result = await axios.post(URL, PostBody, AxiosHeader);
    store.dispatch(HideLoader());
    if (result.status === 200 && result.data["status"] === "success") {
      SuccessToast("Request Successfull");
      store.dispatch(ResetProductFormValue());
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
export async function FillProductFormRequest(ObjectID) {
  try {
    store.dispatch(ShowLoader());
    let URL = baseURL + "/ProductDetailsByID/" + ObjectID;
    let result = await axios.get(URL, AxiosHeader);
    if (result.status === 200 && result.data["status"] === "success") {
      let FormValue = result.data["data"][0];
      store.dispatch(
        OnChangeProductInput({
          Name: "CategoriID",
          Value: FormValue["CategoriID"],
        })
      );
      store.dispatch(
        OnChangeProductInput({ Name: "BrandID", Value: FormValue["BrandID"] })
      );
      store.dispatch(
        OnChangeProductInput({ Name: "Name", Value: FormValue["Name"] })
      );
      store.dispatch(
        OnChangeProductInput({ Name: "Unit", Value: FormValue["Unit"] })
      );
      store.dispatch(
        OnChangeProductInput({ Name: "Detalis", Value: FormValue["Detalis"] })
      );
    }
  } catch (error) {
    console.log(error);
    store.dispatch(HideLoader());
    ErrorToast("Something Went Wrong");
    return false;
  }
}
export async function ProductCategoryDropDownRequest() {
  try {
    store.dispatch(ShowLoader());
    let URL = baseURL + "/DropDownCategories";
    let result = await axios.get(URL, AxiosHeader);
    store.dispatch(HideLoader());
    if (result.status === 200 && result.data["status"] === "success") {
      if (result.data["data"].length > 0) {
        store.dispatch(SetProductCategoryDropDown(result.data["data"]));
        return true;
      } else {
        store.dispatch(SetProductBrandDropDown([]));
        ErrorToast("Not Found Category");
        return false;
      }
    } else {
      ErrorToast("Somethig Went Wrog ");
      return false;
    }
  } catch (error) {
    console.log(error);
    store.dispatch(HideLoader());
    ErrorToast("Somethig Went Wrong");
  }
}

export async function ProductBrandDropDownRequest() {
  try {
    store.dispatch(ShowLoader());
    let URL = baseURL + "/BrandDropDown";
    let result = await axios.get(URL, AxiosHeader);
    if (result.status === 200 && result.data["status"] === "success") {
      if (result.data["data"].length > 0) {
        store.dispatch(SetProductBrandDropDown(result.data["data"]));
        return true;
      } else {
        store.dispatch(SetProductBrandDropDown([]));
        ErrorToast("Not Found Brand");
        return false;
      }
    } else {
      ErrorToast("Someting Wrong");
    }
  } catch (error) {
    console.log(error);
    ErrorToast("Someting Went Wrong");
    return false;
  }
}

export async function DeleteProductRequest(ObjectID) {
  try {
    store.dispatch(ShowLoader());
    let URL = baseURL + "/DeleteProduct/" + ObjectID;
    let result = await axios.get(URL, AxiosHeader);
    store.dispatch(HideLoader());
    if (result.status === 200 && result.data["status"] === "associate") {
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
    ErrorToast("Something Went Wrong");
    return false;
  }
}
