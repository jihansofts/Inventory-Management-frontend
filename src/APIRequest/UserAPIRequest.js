import axios from "axios";
import { ErrorToast, SuccessToast } from "../helper/FormHelper";
import {
  setToken,
  setUserDetails,
  getToken,
  setEmail,
  setOTP,
} from "../helper/SessionHelper";
import { HideLoader, ShowLoader } from "../redox/state-slice/settingSlice";
import { setProfile } from "../redox/state-slice/profileSlice";
import store from "../redox/store/store";
import { baseURL } from "../helper/config";

const AxiosHeader = { headers: { token: getToken() } };

export const LoginRequest = async (email, password) => {
  try {
    store.dispatch(ShowLoader());
    let URL = baseURL + "/Login";
    let postBody = { email: email, password: password };
    let res = await axios.post(URL, postBody);
    store.dispatch(HideLoader());
    if (res.status === 200 && res.data["status"] === "unathorized") {
      ErrorToast("User Not Found");
      return false;
    } else if (res.status === 200) {
      setToken(res.data["token"]);
      setUserDetails(res.data["data"]);
      SuccessToast("User Login Success");
      store.dispatch(HideLoader());
      return true;
    } else {
      store.dispatch(HideLoader());
      ErrorToast("Invaild Email Or Password");
      return false;
    }
  } catch (error) {
    store.dispatch(HideLoader());
    ErrorToast(" Something Went Worng try Again");
    return false;
  }
};

export async function RegistrationRequest(
  email,
  firstname,
  lastname,
  mobile,
  password,
  photo
) {
  try {
    store.dispatch(ShowLoader());
    let URL = baseURL + "/Registrations";
    let postBody = {
      email: email,
      firstname: firstname,
      lastname: lastname,
      mobile: mobile,
      password: password,
      photo: photo,
    };
    let res = await axios.post(URL, postBody);
    store.dispatch(HideLoader());
    if (res.status === 200) {
      if (res.data["status"] === "fail") {
        if (res.data["data"]["keyPattern"]["email"] === 1) {
          ErrorToast("Email Already Exist");
          return false;
        } else {
          ErrorToast("Something Went Wrong");
          return false;
        }
      } else {
        SuccessToast("Registrations Success");
        return true;
      }
    } else {
      ErrorToast("Somethibg Went Wrong");
      return false;
    }
  } catch (error) {
    store.dispatch(HideLoader());
    ErrorToast("Something Went Wrong");
    return false;
  }
}

export async function GetProfileDetails() {
  try {
    store.dispatch(ShowLoader());
    let URL = baseURL + "/ProfileDetalis";
    let res = await axios.get(URL, AxiosHeader);
    store.dispatch(HideLoader());
    if (res.status === 200) {
      store.dispatch(setProfile(res.data["data"][0]));
    } else {
      ErrorToast("Something Went Wrong");
    }
  } catch (e) {
    store.dispatch(HideLoader());
    ErrorToast("Something Went Wrong");
  }
}

export async function UserProfileUpdate(
  email,
  firstname,
  lastname,
  mobile,
  password,
  photo
) {
  try {
    store.dispatch(ShowLoader());
    let URL = baseURL + "/ProfileUpdate";
    let PostBody = {
      email: email,
      firstname: firstname,
      lastname: lastname,
      mobile: mobile,
      password: password,
      photo: photo,
    };
    let UserDetails = {
      email: email,
      firstname: firstname,
      lastname: lastname,
      mobile: mobile,
      photo: photo,
    };
    let res = await axios.post(URL, PostBody, AxiosHeader);
    store.dispatch(HideLoader());
    if (res.status === 200) {
      SuccessToast("Profile Update Success");
      setUserDetails(UserDetails);
      return true;
    } else {
      ErrorToast("Something Went Wrong");
      return false;
    }
  } catch (e) {
    ErrorToast("Something Went Wrong");
    store.dispatch(HideLoader());
    return false;
  }
}
// Recovery Password step 1 SendOTP
export const RecoveryVerifyEmailRequest = async (email) => {
  try {
    store.dispatch(ShowLoader());
    let URL = baseURL + "/RecoverVerifyEmail/" + email;
    let res = await axios.get(URL);
    store.dispatch(HideLoader());
    if (res.status === 200) {
      if (res.data["status"] === "fail") {
        ErrorToast("No user found");
        return false;
      } else {
        setEmail(email);
        SuccessToast(
          "A 6 Digit verification code has been sent to your email address. "
        );
        return true;
      }
    } else {
      ErrorToast("Something Went Wrong");
      return false;
    }
  } catch (e) {
    ErrorToast("Something Went Wrong");
    store.dispatch(HideLoader());
    return false;
  }
};

// Recovery Password step 2 Verify OTP
export const RecoveryVerifyOTPRequest = async (email, OTP) => {
  try {
    store.dispatch(ShowLoader());
    let URL = baseURL + "/RecoverVerifyOTP/" + email + "/" + OTP;
    let res = await axios.get(URL);
    store.dispatch(HideLoader());
    if (res.status === 200) {
      if (res.data["status"] === "fail") {
        ErrorToast("Code Verification Fail");
        return false;
      } else {
        setOTP(OTP);
        SuccessToast("Code Verification Success");
        return true;
      }
    } else {
      ErrorToast("Something Went Wrong");
      return false;
    }
  } catch (e) {
    ErrorToast("Something Went Wrong");
    store.dispatch(HideLoader());
    return false;
  }
};

// Recovery Password step 3 Rest Password
export const ResetPasswordRequest = async (email, OTP, password) => {
  try {
    store.dispatch(ShowLoader());
    let URL = baseURL + "/ResetPassword";
    let PostBody = { email: email, OTP: OTP, password: password };
    let res = await axios.post(URL, PostBody);
    store.dispatch(HideLoader());
    if (res.status === 200) {
      if (res.data["status"] === "fail") {
        ErrorToast(res.data["data"]);
        return false;
      } else {
        setOTP(OTP);
        SuccessToast("NEW PASSWORD CREATED");
        return true;
      }
    } else {
      ErrorToast("Something Went Wrong");
      return false;
    }
  } catch (e) {
    ErrorToast("Something Went Wrong");
    store.dispatch(HideLoader());
    return false;
  }
};
