import React, { Fragment, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import store from "../../redox/store/store";
import { OnChangeCustomerInput } from "../../redox/state-slice/customerSlice";
import {
  CustomersCreateRequest,
  FillCustomersFormRequest,
} from "../../APIRequest/CustomerAPIRequest";
import { ErrorToast, IsEmail, IsEmpty } from "../../helper/FormHelper";
import { useNavigate } from "react-router-dom";
const CustomerCreateUpdate = () => {
  let FormValue = useSelector((state) => state.customer.FormValue);
  let navigate = useNavigate();
  let [ObjectID, SetObjectID] = useState(0);

  useEffect(() => {
    let params = new URLSearchParams(window.location.search);
    let id = params.get("id");
    if (id !== null) {
      SetObjectID(id);
      (async () => {
        await FillCustomersFormRequest(id);
      })();
    }
  }, []);

  const SaveChange = async () => {
    if (IsEmpty(FormValue.CustomarName)) {
      ErrorToast("Customer Name Required");
    } else if (IsEmpty(FormValue.Phone)) {
      ErrorToast("Phone Number Required");
    } else if (IsEmail(FormValue.Email)) {
      ErrorToast("Email Adrres Required");
    } else if (IsEmpty(FormValue.Address)) {
      ErrorToast("Address Required");
    } else {
      let Result = await CustomersCreateRequest(FormValue, ObjectID);
      if (Result === true) {
        navigate("/CustomerListPage");
      }
    }
  };
  return (
    <Fragment>
      <div className="container-fluid">
        <div className="row">
          <div className="col-12">
            <div className="card">
              <div className="card-body">
                <div className="row">
                  <h5>Save Customer</h5>
                  <hr className="bg-light" />
                  <div className="col-4 p-2">
                    <label className="form-label">Customer Name</label>
                    <input
                      onChange={(e) => {
                        store.dispatch(
                          OnChangeCustomerInput({
                            Name: "CustomarName",
                            Value: e.target.value,
                          })
                        );
                      }}
                      value={FormValue.CustomarName}
                      className="form-control form-control-sm"
                      type="text"
                    />
                  </div>
                  <div className="col-4 p-2">
                    <label className="form-label">Mobile No</label>
                    <input
                      onChange={(e) => {
                        store.dispatch(
                          OnChangeCustomerInput({
                            Name: "Phone",
                            Value: e.target.value,
                          })
                        );
                      }}
                      value={FormValue.Phone}
                      className="form-control form-control-sm"
                      type="text"
                    />
                  </div>
                  <div className="col-4 p-2">
                    <label className="form-label">Email </label>
                    <input
                      onChange={(e) => {
                        store.dispatch(
                          OnChangeCustomerInput({
                            Name: "Email",
                            Value: e.target.value,
                          })
                        );
                      }}
                      value={FormValue.Email}
                      className="form-control form-control-sm"
                      type="text"
                    />
                  </div>
                  <div className="col-12 p-2">
                    <label className="form-label">Address</label>
                    <textarea
                      onChange={(e) => {
                        store.dispatch(
                          OnChangeCustomerInput({
                            Name: "Address",
                            Value: e.target.value,
                          })
                        );
                      }}
                      value={FormValue.Address}
                      className="form-control form-control-sm"
                      rows={4}
                    />
                  </div>
                </div>
                <div className="row">
                  <div className="col-4 p-2">
                    <button
                      onClick={SaveChange}
                      className="btn btn-sm my-3 btn-success">
                      Save Change
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default CustomerCreateUpdate;
