import React, { Fragment, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import store from "../../redox/store/store";
import { OnChangeExpenseInput } from "../../redox/state-slice/expenseSlice";
import { ErrorToast, IsEmpty } from "../../helper/FormHelper";
import {
  ExpenseTypeDropDownRequest,
  CreateExpenseRequest,
  FillExpenseFormRequest,
} from "../../APIRequest/ExpenseAPIRequest";
import { useNavigate } from "react-router-dom";
const ExpenseCreateUpdate = () => {
  let navigate = useNavigate();
  let ExpenseTypeDropDown = useSelector(
    (state) => state.expense.ExpenseTypeDropDown
  );
  let [ObjectID, SetObjectID] = useState(0);
  let FormValue = useSelector((state) => state.expense.FormValue);
  useEffect(() => {
    let params = new URLSearchParams(window.location.search);
    let id = params.get("id");
    if (id !== null) {
      SetObjectID(id);
      (async () => {
        FillExpenseFormRequest(id);
      })();
    }
  }, []);
  useEffect(() => {
    (async () => {
      await ExpenseTypeDropDownRequest();
    })();
  }, []);
  const SaveChange = async () => {
    if (IsEmpty(FormValue.TypeID)) {
      ErrorToast("Expense Type Required");
    } else if (IsEmpty(FormValue.Amount === 0)) {
      ErrorToast("Amount Required");
    } else {
      let Result = await CreateExpenseRequest(FormValue, ObjectID);
      if (Result === true) {
        navigate("/ExpenseListPage");
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
                  <h5>Save Expense</h5>
                  <hr className="bg-light" />
                  <div className="col-4 p-2">
                    <label className="form-label">Expense Type</label>
                    <select
                      onChange={(e) => {
                        store.dispatch(
                          OnChangeExpenseInput({
                            Name: "TypeID",
                            Value: e.target.value,
                          })
                        );
                      }}
                      value={FormValue.TypeID}
                      className="form-select form-select-sm">
                      <option value="">Select Type</option>
                      {ExpenseTypeDropDown.map((item, i) => {
                        return (
                          <option key={i.toLocaleString()} value={item._id}>
                            {item.Name}
                          </option>
                        );
                      })}
                    </select>
                  </div>
                  <div className="col-4 p-2">
                    <label className="form-label">Expense Amount</label>
                    <input
                      onChange={(e) =>
                        store.dispatch(
                          OnChangeExpenseInput({
                            Name: "Amount",
                            Value: e.target.value,
                          })
                        )
                      }
                      value={FormValue.Amount}
                      className="form-control form-control-sm"
                      type="number"
                    />
                  </div>
                  <div className="col-4 p-2">
                    <label className="form-label">Expense Note</label>
                    <input
                      onChange={(e) =>
                        store.dispatch(
                          OnChangeExpenseInput({
                            Name: "Note",
                            Value: e.target.value,
                          })
                        )
                      }
                      value={FormValue.Note}
                      className="form-control form-control-sm"
                      type="text"
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

export default ExpenseCreateUpdate;
