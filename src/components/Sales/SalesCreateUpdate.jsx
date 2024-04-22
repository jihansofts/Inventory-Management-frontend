import React, { Fragment, useRef, useEffect } from "react";
import { useSelector } from "react-redux";
import { ErrorToast, IsEmpty } from "../../helper/FormHelper";
import store from "../../redox/store/store";
import {
  OnChangeSaleInput,
  SetSaleItemList,
  RemoveSaleItemList,
} from "../../redox/state-slice/saleSlice";
import {
  CustomerDropDownRequest,
  ProductsDropDownRequest,
  CreateSaleRequest,
} from "../../APIRequest/SaleAPIRequest";
import { useNavigate } from "react-router-dom";
const SalesCreateUpdate = () => {
  let navigate = useNavigate();
  let prodcutRef,
    qtyRef,
    unitRef = useRef();
  useEffect(() => {
    (async () => {
      await CustomerDropDownRequest();
      await ProductsDropDownRequest();
    })();
  }, []);
  let CustomerDropDown = useSelector((state) => state.sale.CustomerDropDown);
  let ProductsDropDown = useSelector((state) => state.sale.ProductsDropDown);
  let SaleItemList = useSelector((state) => state.sale.SaleItemList);
  let SaleFormValue = useSelector((state) => state.sale.SaleFormValue);

  const AddtoCard = () => {
    let ProductValue = prodcutRef.value;
    let Productname = prodcutRef.selectedOptions[0].text;
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
      store.dispatch(SetSaleItemList(item));
    }
  };
  const removeCard = (i) => {
    store.dispatch(RemoveSaleItemList(i));
  };
  const CreateNewSale = async () => {
    if (IsEmpty(SaleFormValue.CustomerID)) {
      ErrorToast("Please Select Customar");
    } else if (IsEmpty(SaleFormValue.VatTax)) {
      ErrorToast("Please VatText Fill");
    } else if (IsEmpty(SaleFormValue.Discount)) {
      ErrorToast("Please Discount Fill");
    } else if (IsEmpty(SaleFormValue.OhterCost)) {
      ErrorToast("Please OhterCost Fill");
    } else if (IsEmpty(SaleFormValue.ShippingCost)) {
      ErrorToast("Please ShippingCost Fill");
    } else if (IsEmpty(SaleFormValue.GrandTotal)) {
      ErrorToast("Please GrandTotal Fill");
    } else if (IsEmpty(SaleItemList)) {
      ErrorToast("Please Product Item Select");
    } else {
      let Result = await CreateSaleRequest(SaleFormValue, SaleItemList);
      if (Result === true) {
        navigate("/SalesListPage");
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
                  <h5>Create Sales</h5>
                  <hr className="bg-light" />
                  <div className="col-12 p-1">
                    <label className="form-label">Customer</label>
                    <select
                      onChange={(e) => {
                        store.dispatch(
                          OnChangeSaleInput({
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
                          OnChangeSaleInput({
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
                          OnChangeSaleInput({
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
                          OnChangeSaleInput({
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
                          OnChangeSaleInput({
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
                          OnChangeSaleInput({
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
                          OnChangeSaleInput({
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
                      onClick={CreateNewSale}
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
                      ref={(input) => (prodcutRef = input)}
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
                      onClick={AddtoCard}
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
                          {SaleItemList.map((item, i) => (
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

export default SalesCreateUpdate;
