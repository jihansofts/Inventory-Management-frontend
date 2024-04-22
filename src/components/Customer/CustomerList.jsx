import React, { Fragment, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import ReactPaginate from "react-paginate";
import {
  CustomersListRequest,
  DeleteCustomersRequest,
} from "../../APIRequest/CustomerAPIRequest";
import { DeleteAlert } from "../../helper/DeleteAlert";

const CustomerList = () => {
  let [searchKeyword, SetSearchKeyword] = useState("0");
  let [perPage, SetPerPage] = useState(20);

  useEffect(() => {
    (async () => {
      await CustomersListRequest(1, perPage, searchKeyword);
    })();
  }, [perPage, searchKeyword]);

  let DataList = useSelector((state) => state.customer.List);
  let Total = useSelector((state) => state.customer.TotalList);

  const handlePageClick = async (e) => {
    await CustomersListRequest(e.selected + 1, perPage, searchKeyword);
  };
  const searData = async () => {
    await CustomersListRequest(1, perPage, searchKeyword);
  };
  const perPageChange = async (e) => {
    SetPerPage(parseInt(e.target.value));
    await CustomersListRequest(1, e.target.value, searchKeyword);
  };
  const searchKeywordOnChange = async (e) => {
    SetSearchKeyword(e.target.value);
    if (e.target.value.length === 0) {
      SetSearchKeyword("0");
      await CustomersListRequest(1, perPage, "0");
    }
  };
  const DeleteItem = async (id) => {
    let Result = await DeleteAlert();
    if (Result.isConfirmed) {
      let DeleteResult = await DeleteCustomersRequest(id);
      if (DeleteResult === true) {
        CustomersListRequest(1, perPage, searchKeyword);
      }
    }
  };
  return (
    <Fragment>
      <div className="container-fluid my-5">
        <div className="row">
          <div className="col-12">
            <div className="card">
              <div className="card-body">
                <div className="container-fluid">
                  <div className="row">
                    <div className="col-4">
                      <h5>Customer List</h5>
                    </div>

                    <div className="col-2">
                      <input
                        placeholder="Text Filter"
                        className="form-control form-control-sm"
                      />
                    </div>

                    <div className="col-2">
                      <select
                        onChange={perPageChange}
                        className="form-control mx-2 form-select-sm form-select form-control-sm">
                        <option value="20">20 Per Page</option>
                        <option value="30">30 Per Page</option>
                        <option value="50">50 Per Page</option>
                        <option value="100">100 Per Page</option>
                        <option value="100">200 Per Page</option>
                      </select>
                    </div>
                    <div className="col-4">
                      <div className="input-group mb-3">
                        <input
                          onChange={searchKeywordOnChange}
                          type="text"
                          className="form-control form-control-sm"
                          placeholder="Search.."
                          aria-label="Recipient's username"
                          aria-describedby="button-addon2"
                        />
                        <button
                          onClick={searData}
                          className="btn  btn-success btn-sm mb-0"
                          type="button">
                          Search
                        </button>
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-12">
                      <div className="table-responsive table-section">
                        <table className="table ">
                          <thead className="sticky-top bg-white">
                            <tr>
                              <td className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">
                                No
                              </td>
                              <td className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">
                                Name
                              </td>
                              <td className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">
                                Phone
                              </td>
                              <td className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">
                                Email
                              </td>
                              <td className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">
                                Action
                              </td>
                            </tr>
                          </thead>
                          <tbody>
                            {DataList.map((item, i) => (
                              <tr>
                                <td>
                                  <p className="text-xs text-start">{i + 1}</p>
                                </td>
                                <td>
                                  <p className="text-xs text-start">
                                    {item.CustomarName}
                                  </p>
                                </td>
                                <td>
                                  <p className="text-xs text-start">
                                    {item.Phone}
                                  </p>
                                </td>
                                <td>
                                  <p className="text-xs text-start">
                                    {item.Email}
                                  </p>
                                </td>

                                <td>
                                  <Link
                                    to={`/CustomerCreateUpdatePage?id=${item._id}`}
                                    className="btn text-info btn-outline-light p-2 mb-0 btn-sm">
                                    Edit
                                  </Link>
                                  <button
                                    onClick={DeleteItem.bind(this, item._id)}
                                    className="btn btn-outline-light text-danger p-2 mb-0 btn-sm ms-2">
                                    Delete
                                  </button>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                    <div className="col-12 mt-5">
                      <nav aria-label="Page navigation example">
                        <ReactPaginate
                          previousLabel="<"
                          nextLabel=">"
                          pageClassName="page-item"
                          pageLinkClassName="page-link"
                          previousClassName="page-item"
                          previousLinkClassName="page-link"
                          nextClassName="page-item"
                          nextLinkClassName="page-link"
                          breakLabel="..."
                          breakClassName="page-item"
                          breakLinkClassName="page-link"
                          pageCount={Total / perPage}
                          marginPagesDisplayed={2}
                          pageRangeDisplayed={5}
                          onPageChange={handlePageClick}
                          containerClassName="pagination"
                          activeClassName="active"
                        />
                      </nav>
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

export default CustomerList;
