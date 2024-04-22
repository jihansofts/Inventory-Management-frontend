import React, { Fragment, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { ErrorToast, IsEmpty } from "../../helper/FormHelper";
import store from "../../redox/store/store";
import { useNavigate } from "react-router-dom";
import {
  OnChangeReturnInput,
  RemoveReturnItemList,
  SetReturnItemList,
} from "../../redox/state-slice/returnSlice";
import {
  CreateReturnRequest,
  CustomerDropDownRequest,
  ProductsDropDownRequest,
} from "../../APIRequest/ReturnAPIRequest";
const ReturnCreateUpdate = () => {
  let navigate = useNavigate();
  let producRef,
    QtyRef,
    unitRef = useState();
  useEffect(() => {
    (async () => {
      await CustomerDropDownRequest();
      await ProductsDropDownRequest();
    })();
  }, []);
  let CustomerDropDown = useSelector((state) => state.return.CustomerDropDown);
  let ProductsDropDown = useSelector((state) => state.return.ProductsDropDown);
  let ReturnItemList = useSelector((state) => state.return.ReturnItemList);
  let ReturnFormValue = useSelector((state) => state.return.ReturnFormValue);
  const AddCard = () => {
    let ProductValue = producRef.value;
    let Productname = producRef.selectedOptions[0].text;
    let QtyValue = QtyRef.value;
    let UnitPrice = unitRef.value;
    if (IsEmpty(ProductValue)) {
      ErrorToast("Product Select Required");
    } else if (IsEmpty(Productname)) {
      ErrorToast("Product Value Required");
    } else if (IsEmpty(QtyValue)) {
      ErrorToast("QTY Required");
    } else if (IsEmpty(UnitPrice)) {
      ErrorToast("Unit Price Required");
    } else {
      let item = {
        ProductID: ProductValue,
        ProductName: Productname,
        Qty: QtyValue,
        UnitCost: UnitPrice,
        Total: parseInt(QtyValue) * parseInt(UnitPrice),
      };
      store.dispatch(SetReturnItemList(item));
    }
  };
  const RemoveCard = (i) => {
    store.dispatch(RemoveReturnItemList(i));
  };
  const CreateReturn = async () => {
    if (IsEmpty(ReturnFormValue.CustomerID)) {
      ErrorToast("Please Select Customar");
    } else if (IsEmpty(ReturnFormValue.VatTax)) {
      ErrorToast("Please VatText Fill");
    } else if (IsEmpty(ReturnFormValue.Discount)) {
      ErrorToast("Please Discount Fill");
    } else if (IsEmpty(ReturnFormValue.OhterCost)) {
      ErrorToast("Please OhterCost Fill");
    } else if (IsEmpty(ReturnFormValue.ShippingCost)) {
      ErrorToast("Please ShippingCost Fill");
    } else if (IsEmpty(ReturnFormValue.GrandTotal)) {
      ErrorToast("Please GrandTotal Fill");
    } else if (IsEmpty(ReturnItemList)) {
      ErrorToast("Please Product Item Select");
    } else {
      let Result = await CreateReturnRequest(ReturnFormValue, ReturnItemList);
      if (Result === true) {
        navigate("/ReturnListPage");
      }
    }
  };
  return (
    <Fragment>
      <div className="container-fluid">
        <div className="row">
          <div className="col-12 col-md-4 col-lg-4 mb-3">
            <div className="card h-100">
              <div className="card-body">
                <div className="row">
                  <h5>Create Return</h5>
                  <hr className="bg-light" />
                  <div className="col-12 p-1">
                    <label className="form-label">Customer</label>
                    <select
                      onChange={(e) => {
                        store.dispatch(
                          OnChangeReturnInput({
                            Name: "CustomerID",
                            Value: e.target.value,
                          })
                        );
                      }}
                      className="form-select form-select-sm">
                      <option value="">Select Customer</option>
                      {CustomerDropDown.map((item, i) => {
                        return (
                          <option key={i.toLocaleString()} value={item._id}>
                            {item.CustomarName}
                          </option>
                        );
                      })}
                    </select>
                  </div>

                  <div className="col-12 p-1">
                    <label className="form-label">Vat/Tax</label>
                    <input
                      onChange={(e) => {
                        store.dispatch(
                          OnChangeReturnInput({
                            Name: "VatTax",
                            Value: e.target.value,
                          })
                        );
                      }}
                      className="form-control form-control-sm"
                      type="number"
                    />
                  </div>

                  <div className="col-12 p-1">
                    <label className="form-label">Discount</label>
                    <input
                      onChange={(e) => {
                        store.dispatch(
                          OnChangeReturnInput({
                            Name: "Discount",
                            Value: e.target.value,
                          })
                        );
                      }}
                      className="form-control form-control-sm"
                      type="number"
                    />
                  </div>

                  <div className="col-12 p-1">
                    <label className="form-label">Other Cost</label>
                    <input
                      onChange={(e) => {
                        store.dispatch(
                          OnChangeReturnInput({
                            Name: "OhterCost",
                            Value: e.target.value,
                          })
                        );
                      }}
                      className="form-control form-control-sm"
                      type="number"
                    />
                  </div>

                  <div className="col-12 p-1">
                    <label className="form-label">Shipping Cost</label>
                    <input
                      onChange={(e) => {
                        store.dispatch(
                          OnChangeReturnInput({
                            Name: "ShippingCost",
                            Value: e.target.value,
                          })
                        );
                      }}
                      className="form-control form-control-sm"
                      type="number"
                    />
                  </div>

                  <div className="col-12 p-1">
                    <label className="form-label">Grand Total</label>
                    <input
                      onChange={(e) => {
                        store.dispatch(
                          OnChangeReturnInput({
                            Name: "GrandTotal",
                            Value: e.target.value,
                          })
                        );
                      }}
                      className="form-control form-control-sm"
                      type="number"
                    />
                  </div>

                  <div className="col-12 p-1">
                    <label className="form-label">Note</label>
                    <input
                      onChange={(e) => {
                        store.dispatch(
                          OnChangeReturnInput({
                            Name: "Note",
                            Value: e.target.value,
                          })
                        );
                      }}
                      className="form-control form-control-sm"
                      type="number"
                    />
                  </div>
                </div>
                <div className="row">
                  <div className="col-4 p-2">
                    <button
                      onClick={CreateReturn}
                      className="btn btn-sm my-3 btn-success">
                      Create
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-12 col-md-8 col-lg-8 mb-3">
            <div className="card  h-100">
              <div className="card-body">
                <div className="row">
                  <div className="col-6  p-1">
                    <label className="form-label">Select Product</label>
                    <select
                      ref={(input) => (producRef = input)}
                      className="form-select form-select-sm">
                      <option value="">Select Product</option>
                      {ProductsDropDown.map((item, i) => {
                        return (
                          <option key={i.toLocaleString()} value={item._id}>
                            {item.Name}
                          </option>
                        );
                      })}
                    </select>
                  </div>
                  <div className="col-2 p-1">
                    <label className="form-label">Qty</label>
                    <input
                      ref={(input) => (QtyRef = input)}
                      className="form-control form-control-sm"
                    />
                  </div>
                  <div className="col-2 p-1">
                    <label className="form-label">Unit Price</label>
                    <input
                      ref={(input) => (unitRef = input)}
                      className="form-control form-control-sm"
                    />
                  </div>
                  <div className="col-2 p-1">
                    <label className="form-label">Add to cart</label>
                    <button
                      onClick={AddCard}
                      className="btn w-100 btn-success btn-sm">
                      Check
                    </button>
                  </div>
                </div>

                <div className="row">
                  <div className="col-12">
                    <div className="table-responsive table-section">
                      <table className="table-sm text-center table">
                        <thead className="sticky-top bg-white">
                          <tr>
                            <th>Name</th>
                            <th>Qty</th>
                            <th>Unit Price</th>
                            <th>Total</th>
                            <th>Remove</th>
                          </tr>
                        </thead>
                        <tbody>
                          {ReturnItemList.map((item, i) => (
                            <tr>
                              <td>{item.ProductName}</td>
                              <td>{item.Qty}</td>
                              <td>{item.UnitCost}</td>
                              <td>{item.Total}</td>
                              <td>
                                <button
                                  onClick={RemoveCard.bind(this, i)}
                                  className="btn btn-outline-light text-danger p-2 mb-0 btn-sm ms-2">
                                  Clear
                                </button>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
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

export default ReturnCreateUpdate;
