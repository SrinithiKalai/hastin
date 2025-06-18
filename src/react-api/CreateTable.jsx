import React, { useEffect, useState } from 'react';
import { FaSearch } from "react-icons/fa";
import { useDispatch, useSelector } from 'react-redux';
import { FaEllipsisVertical } from "react-icons/fa6";
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import './CreateTable.css';
import { countryRequest, currencyRequest, getIdRequest, tableRequest, inactiveRequest, tableIdRequest, inactiveIdRequest } from '../Redux/Action/LoginAction';

function CreateTable({ setTable }) {
  const tableData = useSelector(state => state.login?.error?.data?.tableData);
  const dispatch = useDispatch();

  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState("ACTIVE");
  const [showModal, setShowModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

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

  const handleNewVendor = () => {
    dispatch(countryRequest());
    dispatch(currencyRequest());
    setTable('vendorDetails');
  };

  const handleEdit = (id) => {
    dispatch(getIdRequest(id));
    dispatch(countryRequest());
    dispatch(currencyRequest());
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
    <div>
      <button
        className='btn bg-success text-white float-end'
        style={{ borderRadius: "3px", marginRight: "27px", marginTop: "-8px" }}
        onClick={handleNewVendor}
      >
        + New Vendor
      </button><br />

      <div style={{ display: "flex", borderBottom: "2px solid #ccc", marginTop: "-8px", width: "100%" }}>
        {["ACTIVE", "INACTIVE"].map(tab => (
          <div
            key={tab}
            style={{
              padding: "10px 20px",
              cursor: "pointer",
              borderBottom: activeTab === tab ? "3px solid #011c69" : "none",
              color: activeTab === tab ? "#011c69" : "#000",
              fontWeight: activeTab === tab ? "bold" : "normal"
            }}
            onClick={() => setActiveTab(tab)}
          >
            {tab}
          </div>
        ))}
      </div>

      <div className="search-wrapper">
        <input
          className="search-input"
          placeholder="Search by Vendor Name"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <FaSearch className="search-icon" />
      </div>

      <div className="vendor-table-container">
        <table className="vendor-table w-100 text-center mt-3">
          <thead>
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
                  <td
                    title={item.address}
                    style={{
                      maxWidth: "150px",
                      whiteSpace: "nowrap",
                      overflow: "hidden",
                      textOverflow: "ellipsis"
                    }}
                  >
                    {item.address}
                  </td>
                  <td>{item.country}</td>
                  <td>{item.status}</td>
                  <td>
                    <FaEllipsisVertical
                      style={{ cursor: "pointer" }}
                      onClick={() => {
                        setSelectedItem(item);
                        setShowModal(true);
                      }}
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

      {totalPages > 1 && (
        <div className="pagination mt-3" style={{ display: 'flex', justifyContent: 'center' }}>
          {[...Array(totalPages)].map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrentPage(i + 1)}
              style={{
                marginRight: '8px',
                padding: '5px 10px',
                borderRadius: '4px',
                backgroundColor: currentPage === i + 1 ? '#007bff' : '#e9ecef',
                color: currentPage === i + 1 ? 'white' : 'black',
                border: 'none',
                cursor: 'pointer'
              }}
            >
              {i + 1}
            </button>
          ))}
        </div>
      )}

      {showModal && selectedItem && (
        <div className="custom-modal-overlay">
          <div className="custom-modal">
            <h4 className="modal-title">Confirmation</h4>
            <p>Are you sure you want to {selectedItem.status === "ACTIVE" ? "INACTIVE" : "ACTIVE"} "<strong>{selectedItem.vendorName}</strong>"?</p>
            <div className="modal-actions">
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
