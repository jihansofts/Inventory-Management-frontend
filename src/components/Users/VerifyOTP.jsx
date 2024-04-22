import React, { Fragment, useState } from "react";
import ReactCodeInput from "react-code-input";
import { useNavigate } from "react-router-dom";
import { RecoveryVerifyOTPRequest } from "../../APIRequest/UserAPIRequest";
import { ErrorToast } from "../../helper/FormHelper";
import { getEmail } from "../../helper/SessionHelper";

const VerifyOTP = () => {
  let Navigate = useNavigate();
  let defaultInputStyle = {
    fontFamily: "monospace",
    MozAppearance: "textfield",
    margin: "4px",
    paddingLeft: "8px",
    width: "45px",
    borderRadius: "3px",
    height: "45px",
    fontSize: "32px",
    border: "1px solid lightskyblue",
    boxSizing: "border-box",
    color: "black",
    backgroundColor: "white",
    borderColor: "lightgrey",
  };
  let [OTP, SetOTP] = useState("");

  const SumitOTP = async () => {
    let Result = await RecoveryVerifyOTPRequest(getEmail(), OTP);
    if (OTP.length === 6) {
      if (Result === true) {
        Navigate("/CreatePasswordPage");
      }
    } else {
      ErrorToast("Enter 6 Digit Code");
    }
  };

  return (
    <Fragment>
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-7 col-lg-6">
            <div className="card w-90 p-4">
              <div className="card-body">
                <h4>OTP VERIFACATION</h4>
                <p>
                  A 6 Digit verifacation code has been send to your email
                  address
                </p>
                <ReactCodeInput
                  onChange={(value) => SetOTP(value)}
                  inputStyle={defaultInputStyle}
                  fields={6}
                />
                <br />
                <br />
                <button
                  onClick={SumitOTP}
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

export default VerifyOTP;
