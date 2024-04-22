import React, { Fragment, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { RegistrationRequest } from "../../APIRequest/UserAPIRequest";
import {
  IsEmail,
  IsEmpty,
  IsMobile,
  ErrorToast,
} from "../../helper/FormHelper";

const Registration = () => {
  let navigate = useNavigate();

  let emailRef,
    firstNameRef,
    lastNameRef,
    mobileRef,
    passwordRef = useRef();

  const onRegistration = async () => {
    let email = emailRef.value;
    let firstname = firstNameRef.value;
    let lastname = lastNameRef.value;
    let mobile = mobileRef.value;
    let password = passwordRef.value;
    let photo =
      "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgEAYAAAAj6qa3AAAAIGNIUk0AAHomAACAhAAA+gAAAIDoAAB1MAAA6mAAADqYAAAXcJy6UTwAAAAGYktHRAAAAAAAAPlDu38AAAAJcEhZcwAAAGAAAABgAPBrQs8AAAAHdElNRQfnAgwKJDbERpyrAAAEdUlEQVRo3u2YfUxbVRjG3/eWgRmZkEiLxMFIIGoyNhdnoM6Nja8hDbOOSefURJJ2AxRDYDCnshA2TXB8lLGSdUhDMsLHEMQEV2QtIHMZInFxpiEbZoJAGDA2gYXOUdrXP+RWQ0Juu972btHn73Oe+z6/e8+57zkIblbOFUlv8/lNmygKXsQzKhXIqR+kcXFgxmTUhobaB66lbyhjZITa4Sw+MBqplJllgmpqKvOnDClHTCZ31Yd8G36gD6/UD/n4iO7M68yfqtXQCk9BfXo6hIKJmhjGYaMUiAOR1QotEAZqrdbvVMBmysrNLcJBhWL/4uIjB4ANzoTMLS3EdnRgDRaDOiaGN7IWqsID3d1+GjHZ6pOS+ALh+BvhMto8f3QhraKC9+Cs1uD71BgbO7915gHTXVbGW92uGrBrHLNAiv2HDvEefIWoAvSUmJmZExz4c0vDxo2CA7Bvbs6u8YfVV9AFVpHI1mT7hXRKpeAAYInaQBcf7/bgK4T+8BJcTUgQHkAPHoOhkBBPA4BkTIM9GzYIDyATAqGRyOMAPoSnUe/6c10HcJ2yoHBszOMAdlAxWUdHBQdA3tCOGoPB4wAMcA8zL14UHsByy2rv3Nyt5edYnxVpbVt0OlftRK4a9BsWfjtvmJ6WrvN9XTEhkQDCTxAVGek2ACowgkajqXxuSqEoqatz1Y63/zbbq2MVtcOtri7eg1+ja3DYaDRnTK+7+2ZeHl+2vAFge/MnF8W/U6BMhpegDI0azUMvDXZeGdyEqspKc/jtoLsfy2TVXwCkZ1gsfNXN+2lwpdiWle3c7A3MGCZBw7+Ow8HUAW+NjLCbG7vGT8smaxWKwUF31/m//qty+xJglU1+1Eb+/kyfzyVLc3Aw5VASRqxfby9EjR1kGh/3/toiBxgd/fzkH7OK/XNzjx2AvHcCE85N+vpaDlhb1sqVSpAxnfRDSgp+D23Qtn07e5pb1WB586MdsBf2Xr6MRvoIDre2mr/0OvLEdzpddfWt9D1XzeZHDkD2lsCE5malEreRFbtOnABvMEF8UBBvZI9CAhZMTOBp6iVVQYH6s9vjqfm1tYIBsN/9Wef/NGdptdAFpXQwLY23wFwKoyI43tiIW32G6JhSqd42rlYo7t93O4BCAughL685iSRs5syFC/A23APx7t0eC75SMRAB+Z2dfq9NdwcMJycXIUAMLi05Ot3pRmhOKhmYGSwvFzw4qx4wQUli4iyIU+/klpY6O93hLyD7k4D61veio3GBybHF9PYKnXs1MVewhKmNjS3/cerdffqeHs7xjpgSISJgqu1kcbHQAblku2lbY2v4u04i5HzBnANyX5X82qqXSm3Pwyu2hb4+oQM6Kmpk/JmoyMhTU5ND+0IGBlYbx/kFWM/CBN2Qy4UO5KxQZX2BvuWumxMAVtPLdHDnTqEDOa3rOEyFu3a5DACaoASl/7Ssj4uohY7DG9x1cwKgAYiGYbFY6EDOClUQDokSicsAmGfgBkXU1Xnszs9VsXV2wASe474y+wtUZ9n+9lrctQAAACV0RVh0ZGF0ZTpjcmVhdGUAMjAyMy0wMi0xMlQxMDozNjo1NCswMDowMPQK/iQAAAAldEVYdGRhdGU6bW9kaWZ5ADIwMjMtMDItMTJUMTA6MzY6NTQrMDA6MDCFV0aYAAAAKHRFWHRkYXRlOnRpbWVzdGFtcAAyMDIzLTAyLTEyVDEwOjM2OjU0KzAwOjAw0kJnRwAAAABJRU5ErkJggg==";

    if (IsEmail(email)) {
      ErrorToast("Valid Email Address Required");
    } else if (IsEmpty(firstname)) {
      ErrorToast("First Name Required");
    } else if (IsEmpty(lastname)) {
      ErrorToast("Last Name Required");
    } else if (!IsMobile(mobile)) {
      ErrorToast("Vaild Mobile Number Required");
    } else if (IsEmpty(password)) {
      ErrorToast("Password Required");
    } else {
      let Result = await RegistrationRequest(
        email,
        firstname,
        lastname,
        mobile,
        password,
        photo
      );
      if (Result === true) {
        navigate("/login");
      }
    }
  };

  return (
    <Fragment>
      <div>
        <div className="row justify-content-center">
          <div className="col-md-7 col-lg-6 center-screen">
            <div className="card w-90 p-4">
              <div className="card-body">
                <h5>Sing Up</h5>
                <br />
                <input
                  ref={(input) => (emailRef = input)}
                  placeholder="User Email"
                  className=" form-control animated fadeInDown"
                  type="email"
                />
                <br />
                <input
                  ref={(input) => (firstNameRef = input)}
                  placeholder="First Name"
                  className=" form-control animated fadeInUp"
                  type="text"
                />
                <br />
                <input
                  ref={(input) => (lastNameRef = input)}
                  placeholder="Last Name"
                  className=" form-control animated fadeInLeft"
                  type="text"
                />
                <br />
                <input
                  ref={(input) => (mobileRef = input)}
                  placeholder="Mobile"
                  className=" form-control animated fadeIn"
                  type="mobile"
                />
                <br />
                <input
                  ref={(input) => (passwordRef = input)}
                  placeholder="User Password"
                  className=" form-control animated fadeInLeft"
                  type="password"
                />
                <br />
                <button
                  onClick={onRegistration}
                  className="btn float-end w-100 btn-success animated fadeInDown">
                  Next
                </button>
                <div className="text-center w-100">
                  <Link className="text-center" to="/Login">
                    Sign In
                  </Link>
                  <br />
                  <Link className="text-center" to="/SendOTPPage">
                    Forgrt Passsword
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

export default Registration;
