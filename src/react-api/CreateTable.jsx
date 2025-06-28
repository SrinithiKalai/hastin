import React, { useEffect, useState } from 'react';
import { FaSearch } from "react-icons/fa";
import { useDispatch, useSelector } from 'react-redux';
import { FaEllipsisVertical } from "react-icons/fa6";
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import './CreateTable.css';
import {
  countryRequest,
  currencyRequest,
  getIdRequest,
  tableRequest,
  inactiveRequest,
  tableIdRequest,
  inactiveIdRequest
} from '../Redux/Action/LoginAction';

function CreateTable({ setTable }) {
  const dispatch = useDispatch();

  const tableData = useSelector(state => state.login?.error?.data?.tableData);
  const countryList = useSelector(state => state.country?.countryData?.data || []);

  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState("ACTIVE");
  const [showModal, setShowModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const itemsPerPage = 10;

  useEffect(() => {
    fetchTableData(activeTab);
  }, [dispatch, activeTab]);

  const fetchTableData = (status) => {
    const payload = {
      pagination: {
        index: 1,
        rowCount: -1,
        searchObj: null,
        sortingObj: null
      }
    };
    if (status === "ACTIVE") {
      dispatch(tableRequest(payload));
    } else {
      dispatch(inactiveRequest(payload));
    }
  };

  const getCountryName = (countryId) => {
    const match = countryList.find((c) => c.id === countryId);
    return match?.name || countryId;
  };

  const handleNewVendor = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setTable('vendorDetails');
    }, 1000);
  };

  const handleEdit = (id) => {
    dispatch(getIdRequest(id));
    dispatch(countryRequest());
    dispatch(currencyRequest());
    localStorage.setItem("vendorFetched", "true");
    setTable('vendorDetails');
  };

  const handleConfirm = () => {
    if (selectedItem) {
      const { id, status } = selectedItem;
      if (status === "ACTIVE") {
        dispatch(inactiveIdRequest(id));
        toast.success("Vendor marked as INACTIVE");
        setTimeout(() => fetchTableData("ACTIVE"), 500);
      } else {
        dispatch(tableIdRequest(id));
        toast.success("Vendor marked as ACTIVE");
        setTimeout(() => fetchTableData("INACTIVE"), 500);
      }
      setShowModal(false);
    }
  };

  const filteredData = tableData?.filter(item =>
    item.vendorName?.toLowerCase().includes(searchTerm.toLowerCase()) &&
    item.status === activeTab
  ) || [];

  const totalItems = filteredData.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedData = filteredData.slice(startIndex, startIndex + itemsPerPage);

  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, activeTab]);

  return (
    <div className="table-wrapper">

      {isLoading && (
        <div className="loader-overlay">
          <div className="loader-shape"></div>
          <div className="loader-text">Loading...</div>
        </div>
      )}

      <div className="top-bar">
        <button className='btn btn-success' onClick={handleNewVendor}>+ New Vendor</button>
      </div>

      <div className="tab-search-wrapper">
        <div className="tabs">
          {["ACTIVE", "INACTIVE"].map(tab => (
            <span
              key={tab}
              className={`tab ${activeTab === tab ? 'active' : ''}`}
              onClick={() => {
                if (activeTab !== tab) {
                  setActiveTab(tab);
                  toast.success("Vendor fetched successfully");
                }
              }}
            >{tab}</span>
          ))}
        </div>
        <div className="search-box">
          <input
            className="form-control"
            placeholder="Search by Vendor Name"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <FaSearch className="search-icon" />
        </div>
      </div>

      <div className="vendor-table-container">
        <div className="table-only-wrapper">
          <table className="vendor-table table table-bordered table-hover text-center w-100">
            <thead className="table-light">
              <tr>
                <th>S.NO</th>
                <th>NAME</th>
                <th>VENDOR CODE</th>
                <th>TYPE</th>
                <th>ADDRESS</th>
                <th>COUNTRY</th>
                <th>STATUS</th>
                <th>ACTION</th>
              </tr>
            </thead>
            <tbody>
              {paginatedData.length > 0 ? (
                paginatedData.map((item, index) => (
                  <tr key={index}>
                    <td>{startIndex + index + 1}</td>
                    <td><span className="vendor-link" onClick={() => handleEdit(item.id)}>{item.vendorName}</span></td>
                    <td>{item.vendorCode}</td>
                    <td>{item.vendorType}</td>
                    <td title={item.address} className="text-truncate" style={{ maxWidth: '150px' }}>{item.address}</td>
                    <td>{getCountryName(item.country)}</td>
                    <td>{item.status}</td>
                    <td>
                      <FaEllipsisVertical
                        style={{ cursor: "pointer" }}
                        onClick={() => { setSelectedItem(item); setShowModal(true); }}
                        title={`Mark as ${item.status === "ACTIVE" ? "INACTIVE" : "ACTIVE"}`}
                      />
                    </td>
                  </tr>
                ))
              ) : (
                <tr><td colSpan="8">No records found</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {totalPages > 1 && (
        <div className="pagination-wrapper">
          <button
            className="btn btn-sm btn-outline-primary"
            onClick={() => setCurrentPage(currentPage - 1)}
            disabled={currentPage === 1}
          >Previous</button>

          <span className="fw-bold mx-2">Page {currentPage} of {totalPages}</span>

          <button
            className="btn btn-sm btn-outline-primary"
            onClick={() => setCurrentPage(currentPage + 1)}
            disabled={currentPage === totalPages}
          >Next</button>
        </div>
      )}

      {showModal && selectedItem && (
        <div className="custom-modal-overlay">
          <div className="custom-modal">
            <h4 className="modal-title">Confirmation</h4>
            <p>Are you sure you want to {selectedItem.status === "ACTIVE" ? "INACTIVE" : "ACTIVE"} "<strong>{selectedItem.vendorName}</strong>"?</p>
            <div className="modal-actions mt-3">
              <button className="btn btn-secondary me-2" onClick={() => setShowModal(false)}>No</button>
              <button className="btn btn-primary" onClick={handleConfirm}>Yes</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default CreateTable;
