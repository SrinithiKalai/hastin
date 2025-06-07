import React, { useEffect } from 'react';
import { FaSearch } from "react-icons/fa";
import { useDispatch, useSelector } from 'react-redux';
import { FaEllipsisVertical } from "react-icons/fa6";
import './CreateTable.css';
import { countryRequest, currencyRequest, getIdRequest, tableRequest } from '../Redux/Action/LoginAction';

function CreateTable({ setTable }) {
  const tableData = useSelector(state => state.login?.error?.data?.tableData);

  const dispatch = useDispatch();
  useEffect(() => {
    const payload = {
      pagination: {
        index: 1,
        rowCount: -1,
        searchObj: null,
        sortingObj: null
      }
    }
    dispatch(tableRequest(payload))
  }, [dispatch]);

  const handleNewVendor = () => {
    dispatch(countryRequest());
    dispatch(currencyRequest());
    setTable('vendorDetails'); 
  }

  const handleEdit = (id) => {
    dispatch(getIdRequest(id));      
    dispatch(countryRequest());         
    dispatch(currencyRequest());        
    setTable('vendorDetails');         
  }

  return (
    <div>
      <button className='btn bg-success text-white float-end' style={{ borderRadius: "3px", marginRight: "27px", marginTop: "10px" }} onClick={handleNewVendor}>+ New Vendor</button><br />
      <div style={{ position: "relative", width: "300px", marginTop: "50px", marginBottom: "10px", marginLeft: "79%" }}>
        <input placeholder='Search' style={{ width: "100%", padding: "10px 35px 10px 10px", borderRadius: "5px", border: "1px solid #ccc", outline: "none", fontSize: "14px" }} />
        <FaSearch style={{ position: "absolute", top: "50%", right: "10px", transform: "translateY(-50%)", color: "gray" }} />
      </div>

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
          {tableData?.map((item, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td className="text-primary" style={{ cursor: "pointer" }} onClick={() => handleEdit(item.id)}>{item.vendorName}</td>
              <td>{item.vendorCode}</td>
              <td>{item.vendorType}</td>
              <td>{item.address}</td>
              <td>{item.country}</td>
              <td>{item.status}</td>
              <td><FaEllipsisVertical style={{ cursor: "pointer" }} /></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default CreateTable;



