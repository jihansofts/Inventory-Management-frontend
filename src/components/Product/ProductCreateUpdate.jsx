import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import store from "../../redox/store/store";
import { IsEmpty, ErrorToast } from "../../helper/FormHelper";
import { OnChangeProductInput } from "../../redox/state-slice/productSlice";
import {
  FillProductFormRequest,
  ProductBrandDropDownRequest,
  ProductCategoryDropDownRequest,
  ProductCreateUpdateRequest,
} from "../../APIRequest/ProductAPIRequest";
const ProductCreateUpdate = () => {
  let navigate = useNavigate();
  let [ObjectID, SetObjectID] = useState(0);
  let FormValue = useSelector((state) => state.product.FormValue);
  useEffect(() => {
    (async () => {
      await ProductBrandDropDownRequest();
      await ProductCategoryDropDownRequest();
    })();
  }, []);
  useEffect(() => {
    let params = new URLSearchParams(window.location.search);
    let id = params.get("id");
    if (id !== null) {
      SetObjectID(id);
      (async () => {
        await FillProductFormRequest(id);
      })();
    }
  }, []);
  let ProductBrandDropDown = useSelector(
    (state) => state.product.ProductBrandDropDown
  );
  let ProductCategoryDropDown = useSelector(
    (state) => state.product.ProductCategoryDropDown
  );
  const SaveChange = async () => {
    if (IsEmpty(FormValue.Name)) {
      ErrorToast("Product Name Required");
    } else if (IsEmpty(FormValue.BrandID)) {
      ErrorToast("Brand Type Required");
    } else if (IsEmpty(FormValue.CategoriID)) {
      ErrorToast("Category Type Required");
    } else if (IsEmpty(FormValue.Unit)) {
      ErrorToast("Product Unit Required");
    } else if (IsEmpty(FormValue.Detalis)) {
      ErrorToast("Product Details Required");
    } else {
      let Result = await ProductCreateUpdateRequest(FormValue, ObjectID);
      if (Result === true) {
        navigate("/ProductListPage");
      }
    }
  };
  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-12">
          <div className="card">
            <div className="card-body">
              <div className="row">
                <h5>Save Product Type</h5>
                <hr className="bg-light" />
                <div className="col-4 p-2">
                  <label className="form-label">Product Name</label>
                  <input
                    onChange={(e) => {
                      store.dispatch(
                        OnChangeProductInput({
                          Name: "Name",
                          Value: e.target.value,
                        })
                      );
                    }}
                    value={FormValue.Name}
                    className="form-control form-control-sm"
                    type="text"
                  />
                </div>
                <div className="col-4 p-2">
                  <label className="form-label">Product Brand</label>
                  <select
                    onChange={(e) =>
                      store.dispatch(
                        OnChangeProductInput({
                          Name: "BrandID",
                          Value: e.target.value,
                        })
                      )
                    }
                    value={FormValue.BrandID}
                    className="form-select form-select-sm">
                    <option value="">Select Type</option>
                    {ProductBrandDropDown.map((item, i) => {
                      return (
                        <option key={i.toLocaleString()} value={item._id}>
                          {item.Name}
                        </option>
                      );
                    })}
                  </select>
                </div>

                <div className="col-4 p-2">
                  <label className="form-label">Product Category</label>
                  <select
                    onChange={(e) =>
                      store.dispatch(
                        OnChangeProductInput({
                          Name: "CategoriID",
                          Value: e.target.value,
                        })
                      )
                    }
                    value={FormValue.CategoriID}
                    className="form-select form-select-sm">
                    <option value="">Select Type</option>
                    {ProductCategoryDropDown.map((item, i) => {
                      return (
                        <option key={i.toLocaleString()} value={item._id}>
                          {item.Name}
                        </option>
                      );
                    })}
                  </select>
                </div>

                <div className="col-4 p-2">
                  <label className="form-label">Unit</label>
                  <input
                    onChange={(e) =>
                      store.dispatch(
                        OnChangeProductInput({
                          Name: "Unit",
                          Value: e.target.value,
                        })
                      )
                    }
                    value={FormValue.Unit}
                    className="form-control form-control-sm"
                    type="text"
                  />
                </div>

                <div className="col-4 p-2">
                  <label className="form-label">Details</label>
                  <input
                    onChange={(e) =>
                      store.dispatch(
                        OnChangeProductInput({
                          Name: "Detalis",
                          Value: e.target.value,
                        })
                      )
                    }
                    value={FormValue.Detalis}
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
  );
};

export default ProductCreateUpdate;
