import React, { Fragment, useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { ErrorToast, IsEmpty } from "../../helper/FormHelper";
import store from "../../redox/store/store";
import { useNavigate } from "react-router-dom";
import {
  OnChangePurchaseInput,
  SetPurchaseItemList,
  RemovePurchaseItemList,
} from "../../redox/state-slice/purchaseSlice";
import {
  ProductDropDownRequest,
  SupplierDropDownRequest,
  CreatePurchaseRequest,
} from "../../APIRequest/PurchaseAPIRequest";

const PurchaseCreateUpdate = () => {
  let navigate = useNavigate();
  let productRef,
    qtyRef,
    unitRef = useRef();
  useEffect(() => {
    (async () => {
      await ProductDropDownRequest();
      await SupplierDropDownRequest();
    })();
  }, []);
  let SupplierDropDown = useSelector(
    (state) => state.purchase.SupplierDropDown
  );
  let ProductDropDown = useSelector((state) => state.purchase.ProductDropDown);
  let PurchaseFormValue = useSelector(
    (state) => state.purchase.PurchaseFormValue
  );
  let PurchaseItemList = useSelector(
    (state) => state.purchase.PurchaseItemList
  );
  const OnAddCard = () => {
    let ProductValue = productRef.value;
    let Productname = productRef.selectedOptions[0].text;
    let QtyValue = qtyRef.value;
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
      store.dispatch(SetPurchaseItemList(item));
    }
  };
  const removeCard = (i) => {
    store.dispatch(RemovePurchaseItemList(i));
  };
  const CreateNewPurchase = async () => {
    if (IsEmpty(PurchaseFormValue.SupplierID)) {
      ErrorToast("Please Select Supplier");
    } else if (IsEmpty(PurchaseFormValue.VatTax)) {
      ErrorToast("Please Fill VatTax");
    } else if (IsEmpty(PurchaseFormValue.Discount)) {
      ErrorToast("Please Fill Discount");
    } else if (IsEmpty(PurchaseFormValue.OhterCost)) {
      ErrorToast("Please Fill OhterCost");
    } else if (IsEmpty(PurchaseFormValue.ShippingCost)) {
      ErrorToast("Please Fill ShippingCost");
    } else if (IsEmpty(PurchaseFormValue.GrandTotal)) {
      ErrorToast("Please Fill GrandTotal");
    } else if (IsEmpty(PurchaseItemList)) {
      ErrorToast("Please Fill Product");
    } else {
      let result = await CreatePurchaseRequest(
        PurchaseFormValue,
        PurchaseItemList
      );
      if (result === true) {
        navigate("/PurchaseListPage");
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
                  <h5>Create Purchase</h5>
                  <hr className="bg-light" />
                  <div className="col-12 p-1">
                    <label className="form-label">Supplier</label>
                    <select
                      onChange={(e) => {
                        store.dispatch(
                          OnChangePurchaseInput({
                            Name: "SupplierID",
                            Value: e.target.value,
                          })
                        );
                      }}
                      className="form-select form-select-sm">
                      <option value="">Select Supplier</option>
                      {SupplierDropDown.map((item, i) => {
                        return (
                          <option key={i.toLocaleString()} value={item._id}>
                            {item.Name}
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
                          OnChangePurchaseInput({
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
                          OnChangePurchaseInput({
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
                          OnChangePurchaseInput({
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
                          OnChangePurchaseInput({
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
                          OnChangePurchaseInput({
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
                          OnChangePurchaseInput({
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
                      onClick={CreateNewPurchase}
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
                      ref={(input) => (productRef = input)}
                      className="form-select form-select-sm">
                      <option value="">Select Product</option>
                      {ProductDropDown.map((item, i) => {
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
                      ref={(input) => (qtyRef = input)}
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
                      onClick={OnAddCard}
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
                          {PurchaseItemList.map((item, i) => {
                            return (
                              <tr>
                                <td>{item.ProductName}</td>
                                <td>{item.Qty}</td>
                                <td>{item.UnitCost}</td>
                                <td>{item.Total}</td>
                                <td>
                                  <button
                                    onClick={removeCard.bind(this, i)}
                                    className="btn btn-outline-light text-danger p-2 mb-0 btn-sm ms-2">
                                    Clear
                                  </button>
                                </td>
                              </tr>
                            );
                          })}
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

export default PurchaseCreateUpdate;
