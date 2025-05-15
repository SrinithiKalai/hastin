import React, { useEffect } from 'react';
import { FaEllipsisV, FaSearch } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { activeRequest } from '../Redux/Action/LoginAction';

const Table = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const vendorData = () => {
    navigate("/vendorPage");
  };
  useEffect(() => {
    const payload = {
      pagination: {
        index: 1,
        rowCount: -1,
        searchObj: null,
        sortingObj: null
      }
    }
    dispatch(activeRequest(payload))
  }, [dispatch]);

  const tableData = useSelector(state => state.login?.data?.[0]?.data?.tableData);

  useEffect(() => {
  }, [tableData]);
  return (
    <div style={{ padding: "20px" }}>
      <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '10px', marginTop: '-20px' }}>
        <button style={{ backgroundColor: '#28c76f', color: 'white', border: 'none', padding: '10px 20px', cursor: 'pointer', borderRadius: '5px', fontWeight: 'bold' }} onClick={vendorData}>+ New Vendor</button>
      </div>
      <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '20px', marginTop: '30px' }}>
        <div style={{ position: 'relative', width: '250px' }}>
          <input type="text" placeholder="Search" style={{ width: '100%', padding: '8px 30px 8px 10px', borderRadius: '5px', border: '1px solid #ccc', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }} />
          <FaSearch style={{ position: 'absolute', right: '10px', top: '50%', transform: 'translateY(-50%)', color: '#aaa' }} />
        </div>
      </div>
      <div style={{ overflowX: 'auto' }}></div>
      <table style={{
        width: '100%',
        borderCollapse: 'separate',
        borderSpacing: '0 10px',
        boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
        borderRadius: '8px',
        overflow: 'hidden',
        backgroundColor: '#fff'
      }}>
        <thead>
          <tr style={{ backgroundColor: '#4f92b5', color: 'white', fontSize: '14px', textAlign: 'center' }}>
            <th style={{ padding: '10px' }}>S.NO</th>
            <th style={{ padding: '10px' }}>NAME</th>
            <th style={{ padding: '12px', textAlign: 'center' }}>VENDOR CODE</th>
            <th style={{ padding: '10px' }}>TYPE</th>
            <th style={{ padding: '10px' }}>ADDRESS</th>
            <th style={{ padding: '10px' }}>COUNTRY</th>
            <th style={{ padding: '10px' }}>STATUS</th>
            <th style={{ padding: '10px' }}>ACTION</th>
          </tr>
        </thead>
        <tbody>
          {tableData?.map((item, index) => (
            <tr key={index} style={{ backgroundColor: '#f9f9f9', transition: 'background 0.3s ease' }}
              onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#e0f7fa'}
              onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#f9f9f9'}
            >

              <td style={{ padding: '10px', textAlign: 'center', fontSize: '13px' }}>{index + 1}</td>
              <td style={{ padding: '10px', textAlign: 'center', fontSize: '13px', cursor: 'pointer', color: '#007bff' }}>{item.vendorName}</td>
              <td style={{ padding: '10px', textAlign: 'center', fontSize: '13px' }}>{item.vendorCode}</td>
              <td style={{ padding: '10px', textAlign: 'center', fontSize: '13px' }}>{item.vendorType}</td>
              <td style={{ padding: '10px', textAlign: 'center', fontSize: '13px' }}>{item.address}</td>
              <td style={{ padding: '10px', textAlign: 'center', fontSize: '13px' }}>{item.country}</td>
              <td style={{ padding: '10px', textAlign: 'center', fontSize: '13px' }}>{item.status}</td>
              <td style={{ padding: '10px', textAlign: 'center', fontSize: '13px' }}>
                <div style={{ cursor: "pointer" }}>
                  <FaEllipsisV />
                </div>
              </td>
            </tr>
          ))}
        </tbody>

      </table>
    </div>
  );
};

export default Table;
