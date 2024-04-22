import React, { Fragment, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { ErrorToast, IsEmail } from "../../helper/FormHelper";
import { RecoveryVerifyEmailRequest } from "../../APIRequest/UserAPIRequest";

const SendOTP = () => {
  let Navigate = useNavigate();
  let emailRef = useRef();

  const VerifyEmail = () => {
    let email = emailRef.value;
    if (IsEmail(email)) {
      ErrorToast("Please Valid Email Address");
    } else {
      RecoveryVerifyEmailRequest(email).then((result) => {
        if (result === true) {
          Navigate("/VerifyOTPPage");
        }
      });
    }
  };
  return (
    <Fragment>
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-7 col-lg-6">
            <div className="card w-90 p-4">
              <div className="card-body">
                <h4>Email Address</h4>
                <br />
                <label>Your Email Address</label>
                <input
                  ref={(input) => (emailRef = input)}
                  placeholder="User Email"
                  className="form-control animated fadeInUp"
                  type="email"
                />
                <br />
                <button
                  onClick={VerifyEmail}
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

export default SendOTP;
