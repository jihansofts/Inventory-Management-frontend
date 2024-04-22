import React, { Fragment, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { ErrorToast, IsEmpty } from "../../helper/FormHelper";
import { ResetPasswordRequest } from "../../APIRequest/UserAPIRequest";
import { getEmail, getOTP } from "../../helper/SessionHelper";

const CreatePassword = () => {
  let Navigate = useNavigate();
  let PasswordRef,
    ConfirmPassword = useRef();

  const RestPass = async () => {
    let Password = PasswordRef.value;
    let ConfrimPassword = ConfirmPassword.value;
    if (IsEmpty(Password)) {
      ErrorToast("Password Requried");
    } else if (IsEmpty(ConfrimPassword)) {
      ErrorToast("ComfimPassword Requried");
    } else if (Password !== ConfrimPassword) {
      ErrorToast("Password And Comfrim Password Not Match");
    } else {
      let Result = await ResetPasswordRequest(getEmail(), getOTP(), Password);
      if (Result === true) {
        Navigate("/Login");
      }
    }
  };

  return (
    <Fragment>
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-7 col-lg-6">
            <div className="card w-90 p-4">
              <div className="card-body">
                <h4>SET NEW PASSWORD</h4>
                <br />
                <label>Your Email Address</label>
                <input
                  readOnly={true}
                  value={getEmail()}
                  placeholder="User Email"
                  className="form-control animated fadeInUp"
                  type="email"
                />
                <br />
                <label>New Password</label>
                <input
                  ref={(input) => (PasswordRef = input)}
                  placeholder="New Password"
                  className="form-control animated fadeInUp"
                  type="password"
                />
                <br />
                <label>Confirm Password</label>
                <input
                  ref={(input) => (ConfirmPassword = input)}
                  placeholder="Confirm Password"
                  className="form-control animated fadeInUp"
                  type="password"
                />
                <br />
                <button
                  onClick={RestPass}
                  className="btn w-100 btn-success animated fadeInDown float-end">
                  Next
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default CreatePassword;
