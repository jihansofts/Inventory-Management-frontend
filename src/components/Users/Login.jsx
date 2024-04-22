import React, { Fragment, useRef } from "react";
import { Link } from "react-router-dom";
import { LoginRequest } from "../../APIRequest/UserAPIRequest";
import { ErrorToast, IsEmail, IsEmpty } from "../../helper/FormHelper";
const Login = () => {
  let passRef,
    emailRef = useRef();

  const SubmitLogin = async () => {
    let email = emailRef.value;
    let password = passRef.value;
    if (IsEmail(email)) {
      ErrorToast("Invalid email address");
    } else if (IsEmpty(password)) {
      ErrorToast("Password Required");
    } else {
      let Result = await LoginRequest(email, password);
      if (Result === true) {
        window.location.href = "/";
      }
    }
  };
  return (
    <Fragment>
      <div className="container">
        <div className="row justify-content-center">
          <div className=" col-md-7 col-lg-6 center-screen">
            <div className="card w-90 p-4">
              <div className=" card-body">
                <h5>Sing In</h5>
                <br />
                <input
                  ref={(input) => (emailRef = input)}
                  placeholder="User Email"
                  className="form-control animated fadeInUp"
                  type="email"
                />
                <br />
                <input
                  ref={(input) => (passRef = input)}
                  placeholder="User Password"
                  className="form-control animated fadeInUp"
                  type="password"
                />
                <br />
                <button
                  onClick={SubmitLogin}
                  className="btn w-100 btn-success animated fadeInDown float-end">
                  Next
                </button>
                <div className="text-center w-100">
                  <Link
                    className="text-center animated fadeInUp"
                    to="/Registration">
                    Sign Up
                  </Link>
                  <br />
                  <Link
                    className="text-center animated fadeInUp"
                    to="/SendOTPPage">
                    Forget Password
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default Login;
