class SessionHelper {
  setToken(token) {
    localStorage.setItem("token", token);
  }
  getToken() {
    return localStorage.getItem("token");
  }
  setUserDetails(UserDetails) {
    localStorage.setItem("UserDetails", JSON.stringify(UserDetails));
  }
  getUserDetails() {
    return JSON.parse(localStorage.getItem("UserDetails"));
  }
  setEmail(email) {
    localStorage.setItem("email", email);
  }
  getEmail() {
    return localStorage.getItem("email");
  }
  setOTP(OTP) {
    localStorage.setItem("OTP", OTP);
  }
  getOTP() {
    return localStorage.getItem("OTP");
  }
  sessionRemove = () => {
    localStorage.clear();
    window.location.href = "/Login";
  };
}
export const {
  setToken,
  getToken,
  setUserDetails,
  getUserDetails,
  setEmail,
  getEmail,
  setOTP,
  getOTP,
  sessionRemove,
} = new SessionHelper();
