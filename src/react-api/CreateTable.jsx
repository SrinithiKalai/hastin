import React, { useEffect, useState } from 'react';
import { FaSearch } from "react-icons/fa";
import { useDispatch, useSelector } from 'react-redux';
import { FaEllipsisVertical } from "react-icons/fa6";
import './CreateTable.css';
import {
  countryRequest,
  currencyRequest,
  getIdRequest,
  tableRequest
} from '../Redux/Action/LoginAction';

function CreateTable({ setTable }) {
  const tableData = useSelector(state => state.login?.error?.data?.tableData);
  const dispatch = useDispatch();

  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const itemsPerPage = 10;

  useEffect(() => {
    const payload = {
      pagination: {
        index: 1,
        rowCount: -1,
        searchObj: null,
        sortingObj: null
      }
    };
    dispatch(tableRequest(payload));
  }, [dispatch]);

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

  const filteredData = tableData?.filter(item =>
    item.vendorName?.toLowerCase().includes(searchTerm.toLowerCase())
  ) || [];

  const totalItems = filteredData.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedData = filteredData.slice(startIndex, startIndex + itemsPerPage);

  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm]);

  return (
    <div>
      <button
        className='btn bg-success text-white float-end'
        style={{ borderRadius: "3px", marginRight: "27px", marginTop: "10px" }}
        onClick={handleNewVendor}
      >
        + New Vendor
      </button><br />

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
                  <td>
                    <span className="vendor-link" onClick={() => handleEdit(item.id)}>
                      {item.vendorName}
                    </span>
                  </td>
                  <td>{item.vendorCode}</td>
                  <td>{item.vendorType}</td>
                  <td>{item.address}</td>
                  <td>{item.country}</td>
                  <td>{item.status}</td>
                  <td><FaEllipsisVertical style={{ cursor: "pointer" }} /></td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="8">No records found</td>
              </tr>
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
    </div>
  );
}

export default CreateTable;