// import React, { useEffect, useState } from 'react';
// import { FaTrash } from 'react-icons/fa';
// import { useDispatch, useSelector } from 'react-redux';
// import { cityRequest, createRequest } from '../Redux/Action/LoginAction';

// function Vendor() {
//     const [open, setOpen] = useState("basic");
//     const [selectedCountry, setSelectedCountry] = useState('');
//     const [filteredCities, setFilteredCities] = useState([]);
//     const [vendorData, setVendorData] = useState({
//   vendorName: '',
//   vendorCode: '',
//   vendorType: '',
//   taxRegNo: '',
//   companyRegNo: '',
//   currency: '',
//   address1: '',
//   address2: '',
//   country: '',
//   cityId: '',
//   zipCode: '',
//   bankAccountName: '',
//   bankAccountNo: '',
//   bankName: '',
//   branch: '',
//   swiftCode: '',
//   createdBy: '',
//   documentList: '',
//   postalCode: 0,
// });

//     const [contactList, setContactList] = useState([
//         { name: '', email: '', phone: '', isDefault: false }
//     ]);

//     const currency = useSelector(state => state.currency?.currencyData?.data);
//     const country = useSelector(state => state.country?.countryData?.data);
//     const cities = useSelector(state => state.city?.cityData?.data);

//     const dispatch = useDispatch();

//     useEffect(() => {
//         dispatch(cityRequest());
//         if (selectedCountry && cities) {
//             const filtered = cities.filter(city => city.countryId === selectedCountry);
//             setFilteredCities(filtered);
//         } else {
//             setFilteredCities([]);
//         }
//     }, [dispatch, selectedCountry]);

//     const handleInputChange = (field, value) => {
//         setVendorData({ ...vendorData, [field]: value });
//     };

//     const handleContactChange = (index, field, value) => {
//         setContactList(prev => {
//             const updated = [...prev];
//             updated[index] = { ...updated[index], [field]: value };
//             if (index === 0) {
//                 updated[0].isDefault = true;
//             }
//             return updated;
//         });
//     };
//     const addContactRow = () => {
//         setContactList(prev => [...prev, { name: "", email: "", phone: "", isDefault: false }]);
//     };

//     const deleteContactRow = (index) => {
//         if (contactList.length === 1) {
//             alert("At least one contact must remain.");
//             return;
//         }
//         setContactList(prev => prev.filter((_, i) => i !== index));
//     };

//     const handleSubmit = () => {
//         const fullData = {
//             ...vendorData,
//             contactList: contactList
//         };
//         dispatch(createRequest(fullData));
//     };

//     return (

//         <div >
//             <p style={{ color: '#011c69', marginTop: "20px", marginLeft: "20px" }}>VENDOR</p>
//             <button className='btn ' style={{ backgroundColor: "#011c69", color: 'white', borderRadius: "3px", marginLeft: "50px", fontSize: "13px", fontWeight: "700" }}>VENDOR DETAILS</button>
//             <div className="container-fluid" >
//                 <div className="bg-light p-3 fw-bold mt-4" style={{ fontSize: "15px", color: "#011c69", cursor: "pointer" }} onClick={() => setOpen(open === "basic" ? "" : "basic")}>BASIC INFORMATION</div>
//                 {open === "basic" && (
//                     <div className="p-3 border">
//                         <div className="mb-3">
//                             <div className='d-flex'>
//                                 <div>
//                                     <label For="vendorName" className="form-label" style={{ marginLeft: "40px" }}>BASIC DETAILS</label>
//                                     <div className='card' style={{ width: "450px", height: "320px", boxShadow: "2px 2px 10px rgba(0,0,0,0.2)", marginLeft: "30px" }}>
//                                         <input className='mx-auto mt-4' placeholder='Vendor Name' style={{ border: "none", borderBottom: "2px solid  #D3D3D3", width: "400px", fontSize: "14px", outline: "none" }} value={vendorData.vendorName} onChange={e => handleInputChange('vendorName', e.target.value)} />
//                                         <input className='mx-auto mt-4' placeholder='Vendor Code' style={{ border: "none", borderBottom: "2px solid  #D3D3D3", width: "400px", fontSize: "14px", outline: "none" }} value={vendorData.vendorCode} onChange={e => handleInputChange('vendorCode', e.target.value)} />
//                                         <select className='mx-auto mt-4' style={{ color: "#808080", border: "none", borderBottom: "2px solid #D3D3D3", width: "400px", fontSize: "14px", outline: "none", backgroundColor: "transparent" }} value={vendorData.vendorType} onChange={e => handleInputChange('vendorType', e.target.value)}>
//                                             <option value="">Choose Vendor Type</option>
//                                             <option value="Individual">Individual</option>
//                                             <option value="Company">Company</option>
//                                         </select>
//                                         <input className='mx-auto mt-4' placeholder='Tax Registration No' style={{ border: "none", borderBottom: "2px solid  #D3D3D3", width: "400px", fontSize: "14px", outline: "none" }} value={vendorData.taxRegNo} onChange={e => handleInputChange('taxRegNo', e.target.value)} />
//                                         <input className='mx-auto mt-4' placeholder='Company Registration No' style={{ border: "none", borderBottom: "2px solid  #D3D3D3", width: "400px", fontSize: "14px", outline: "none" }} value={vendorData.companyRegNo} onChange={e => handleInputChange('companyRegNo', e.target.value)} />
//                                         <select className='mx-auto mt-4' style={{ color: "#808080", border: "none", borderBottom: "2px solid  #D3D3D3", width: "400px", fontSize: "14px", outline: "none", backgroundColor: "transparent" }} value={vendorData.currency} onChange={e => handleInputChange('currency', e.target.value)}>
//                                             <option value="">Choose Currency</option>
//                                             {currency && [...new Set(currency.map(item => item.code))].map((base, index) => (
//                                                 <option key={index} value={base}>{base}</option>
//                                             ))}
//                                         </select>
//                                     </div>
//                                 </div>
//                                 <div>
//                                     <label For="vendorName" className="form-label" style={{ marginLeft: '30px' }}>ADDRESS DETAILS</label>
//                                     <div className='card' style={{ width: "450px", height: "320px", boxShadow: "2px 2px 10px rgba(0,0,0,0.2)", marginLeft: "20px" }}>
//                                         <input className='mx-auto mt-4' placeholder='Address 1' style={{ border: "none", borderBottom: "2px solid  #D3D3D3", width: "400px", fontSize: "14px", outline: "none" }} value={vendorData.address1} onChange={e => handleInputChange('address1', e.target.value)} />
//                                         <input className='mx-auto mt-4' placeholder='Address 2' style={{ border: "none", borderBottom: "2px solid  #D3D3D3", width: "400px", fontSize: "14px", outline: "none" }} value={vendorData.address2} onChange={e => handleInputChange('address2', e.target.value)} />
//                                         <select
//                                             className='mx-auto mt-4' style={{ color: "#808080", border: "none", borderBottom: "2px solid  #D3D3D3", width: "400px", fontSize: "14px", outline: "none", backgroundColor: "transparent" }} onChange={e => { handleInputChange('country', e.target.value); setSelectedCountry(e.target.value); }}>
//                                             <option value="">Choose Country</option>
//                                             {country &&
//                                                 country.map((item, index) => (
//                                                     <option key={index} value={item.id}>{item.name}</option>
//                                                 ))}
//                                         </select>
//                                         <select className='mx-auto mt-4' style={{ color: "#808080", border: "none", borderBottom: "2px solid  #D3D3D3", width: "400px", fontSize: "14px", outline: "none", backgroundColor: "transparent" }} value={vendorData.cityId}
//                                             onChange={e => handleInputChange('cityId', e.target.value)}>
//                                             <option value="">Choose City</option>
//                                             {filteredCities && filteredCities.map((city, index) => (
//                                                 <option key={index} value={city.id}>{city.cityName}</option>
//                                             ))}
//                                         </select>

//                                         <input className='mx-auto mt-4' placeholder='Zip Code' style={{ border: "none", borderBottom: "2px solid  #D3D3D3", width: "400px", fontSize: "14px", outline: "none" }} value={vendorData.zipCode} onChange={e => handleInputChange('zipCode', e.target.value)} />
//                                     </div>
//                                 </div>
//                                 <div>
//                                     <label For="vendorName" className="form-label" style={{ marginLeft: '30px' }}>BANK DETAILS</label>
//                                     <div className='card' style={{ width: "450px", height: "320px", boxShadow: "2px 2px 10px rgba(0,0,0,0.2)", marginLeft: "20px" }}>
//                                         <input className='mx-auto mt-4' placeholder='Bank Account Name' style={{ border: "none", borderBottom: "2px solid  #D3D3D3", width: "400px", fontSize: "14px", outline: "none" }} value={vendorData.bankAccountName} onChange={e => handleInputChange('bankAccountName', e.target.value)} />
//                                         <input className='mx-auto mt-4' placeholder='Bank Account No' style={{ border: "none", borderBottom: "2px solid  #D3D3D3", width: "400px", fontSize: "14px", outline: "none" }} value={vendorData.bankAccountNo} onChange={e => handleInputChange('bankAccountNo', e.target.value)} />
//                                         <input className='mx-auto mt-4' placeholder='Bank Name' style={{ border: "none", borderBottom: "2px solid  #D3D3D3", width: "400px", fontSize: "14px", outline: "none" }} value={vendorData.bankName} onChange={e => handleInputChange('bankName', e.target.value)} />
//                                         <input className='mx-auto mt-4' placeholder='Branch' style={{ border: "none", borderBottom: "2px solid  #D3D3D3", width: "400px", fontSize: "14px", outline: "none" }} value={vendorData.branch} onChange={e => handleInputChange('branch', e.target.value)} />
//                                         <input className='mx-auto mt-4' placeholder='Swift Code' style={{ border: "none", borderBottom: "2px solid  #D3D3D3", width: "400px", fontSize: "14px", outline: "none" }} value={vendorData.swiftCode} onChange={e => handleInputChange('swiftCode', e.target.value)} />
//                                     </div>
//                                 </div>
//                             </div>
//                         </div>
//                     </div>
//                 )}
//             </div>
//             <div className="container-fluid" >
//                 <div className="bg-light p-3 fw-bold mt-4" style={{ fontSize: "15px", color: "#011c69" }} onClick={() => setOpen(open === "contact" ? "" : "contact")}>CONTACT</div>

//                 {open === "contact" && (
//                     <div className="p-3 border">
//                         <table className='container-fluid  mx-auto  mt-3 text-center ' >
//                             <thead style={{ backgroundColor: "#011c69", height: "35px" }}>
//                                 <tr>
//                                     <th style={{ color: "white", fontSize: '13px', paddingLeft: "20px" }}>S.NO</th>
//                                     <th style={{ color: "white", fontSize: '13px' }}>NAME</th>
//                                     <th style={{ color: "white", fontSize: '13px' }}>EMAIL</th>
//                                     <th style={{ color: "white", fontSize: '13px' }}>PHONE NO</th>
//                                     <th style={{ color: "white", fontSize: '13px' }}>IS DEFAULT</th>
//                                     <th style={{ color: "white", fontSize: '13px', paddingRight: "20px" }}>ACTION</th>
//                                 </tr>
//                             </thead>
//                             <tbody className='text-center'>
//                                 {contactList.map((contact, index) => (
//                                     <tr key={index}>
//                                         <td>{index + 1}</td>
//                                         <td>
//                                             <input value={contact.name} onChange={e => handleContactChange(index, 'name', e.target.value)} placeholder='Name' style={{ border: "none", outline: "none", borderBottom: "1px solid #D3D3D3", marginTop: "10px", width: "300px" }} />
//                                         </td>
//                                         <td>
//                                             <input value={contact.email} onChange={e => handleContactChange(index, 'email', e.target.value)} placeholder='Email' style={{ border: "none", outline: "none", borderBottom: "1px solid #D3D3D3", marginTop: "10px", width: "300px" }} />
//                                         </td>
//                                         <td>
//                                             <input value={contact.phone} onChange={e => handleContactChange(index, 'phone', e.target.value)} placeholder='Phone No' style={{ border: "none", outline: "none", borderBottom: "1px solid #D3D3D3", marginTop: "10px", width: "300px" }} />
//                                         </td>
//                                         <td>
//                                             <select value={contact.isDefault.toString()} onChange={e => handleContactChange(index, 'isDefault', e.target.value === 'true')} style={{ color: "#808080", border: "none", outline: "none", borderBottom: "1px solid #D3D3D3", marginTop: "10px", width: "300px" }}>
//                                                 <option value="" disabled hidden>Is Default</option>
//                                                 <option value="true">Yes</option>
//                                                 <option value="false">No</option>
//                                             </select>
//                                         </td>
//                                         <td>
//                                             <FaTrash style={{ color: 'red', cursor: 'pointer' }} onClick={() => deleteContactRow(index)} />
//                                         </td>
//                                     </tr>
//                                 ))}

//                             </tbody>
//                         </table>
//                         <button className='btn mt-4' onClick={addContactRow} style={{ backgroundColor: "#011c69", color: "white" }}>Add Contact</button>
//                     </div>
//                 )}
//             </div>
//             <button className='btn mt-4 float-end' onClick={handleSubmit} style={{ backgroundColor: "#011c69", color: "white", borderRadius: "2px", marginRight: '20px', marginBottom: "20px" }}>Save</button>
//         </div>
//     );
// }
// export default Vendor;

import React, { useEffect, useState } from 'react';
import { FaTrash } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { cityRequest, createRequest, updateRequest } from '../Redux/Action/LoginAction';

function Vendor() {
  const [open, setOpen] = useState("basic");
  const [selectedCountry, setSelectedCountry] = useState('');
  const [filteredCities, setFilteredCities] = useState([]);
  const [editMode, setEditMode] = useState(false);
  const [vendorId, setVendorId] = useState(null);

  const [vendorData, setVendorData] = useState({
    vendorName: '', vendorCode: '', vendorType: '', taxRegNo: '',
    companyRegNo: '', currency: '', address1: '', address2: '',
    country: '', cityId: '', zipCode: '', bankAccountName: '',
    bankAccountNo: '', bankName: '', branch: '', swiftCode: '',
    createdBy: '', documentList: '', postalCode: 0,
  });

  const [contactList, setContactList] = useState([
    { name: '', email: '', phone: '', isDefault: true }
  ]);

  const currency = useSelector(state => state.currency?.currencyData?.data);
  const country = useSelector(state => state.country?.countryData?.data);
  const cities = useSelector(state => state.city?.cityData?.data);

  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();

  // Fetch cities data on mount
  useEffect(() => {
    dispatch(cityRequest());
  }, [dispatch]);

  // Filter cities when country changes or cities data changes
  useEffect(() => {
    if (selectedCountry && cities) {
      const filtered = cities.filter(city => city.countryId === selectedCountry);
      setFilteredCities(filtered);
    } else {
      setFilteredCities([]);
    }
  }, [selectedCountry, cities]);

  // Load vendor data from location.state for edit mode
  useEffect(() => {
    if (location.state && location.state.vendor) {
      const data = location.state.vendor;

      // Set vendor data
      setVendorData({
        vendorName: data.vendorName || '',
        vendorCode: data.vendorCode || '',
        vendorType: data.vendorType || '',
        taxRegNo: data.taxRegNo || '',
        companyRegNo: data.companyRegNo || '',
        currency: data.currency || '',
        address1: data.address1 || '',
        address2: data.address2 || '',
        country: data.country || '',
        cityId: data.cityId || '',
        zipCode: data.zipCode || '',
        bankAccountName: data.bankAccountName || '',
        bankAccountNo: data.bankAccountNo || '',
        bankName: data.bankName || '',
        branch: data.branch || '',
        swiftCode: data.swiftCode || '',
        createdBy: data.createdBy || '',
        documentList: data.documentList || '',
        postalCode: data.postalCode || 0,
      });

      // Set contacts
      setContactList(data.contactList && data.contactList.length ? data.contactList : [{ name: '', email: '', phone: '', isDefault: true }]);

      // Set selected country for filtering cities
      setSelectedCountry(data.country);

      setVendorId(data.id);
      setEditMode(true);
    }
  }, [location.state]);

  // Handle vendor data input changes
  const handleInputChange = (field, value) => {
    setVendorData(prev => ({ ...prev, [field]: value }));
  };

  // Handle contact list input changes
  const handleContactChange = (index, field, value) => {
    setContactList(prev => {
      const updated = [...prev];
      updated[index] = { ...updated[index], [field]: value };

      // Ensure only first contact isDefault true, others false
      if (field === 'isDefault' && value === true) {
        updated.forEach((c, i) => {
          updated[i].isDefault = i === index;
        });
      }

      return updated;
    });
  };

  // Add new empty contact row
  const addContactRow = () => {
    setContactList(prev => [...prev, { name: '', email: '', phone: '', isDefault: false }]);
  };

  // Delete contact row with minimum one contact validation
  const deleteContactRow = (index) => {
    if (contactList.length === 1) {
      alert("At least one contact must remain.");
      return;
    }
    setContactList(prev => prev.filter((_, i) => i !== index));
  };

  // On form submit
  const handleSubmit = () => {
    const payload = { ...vendorData, contactList };
    if (editMode && vendorId) {
      dispatch(updateRequest(vendorId, payload));
    } else {
      dispatch(createRequest(payload));
    }
    navigate('/vendor-list');
  };

  return (
    <div>
      <p style={{ color: '#011c69', marginTop: "20px", marginLeft: "20px" }}>VENDOR</p>
      <button className='btn ' style={{ backgroundColor: "#011c69", color: 'white', borderRadius: "3px", marginLeft: "50px", fontSize: "13px", fontWeight: "700" }}>VENDOR DETAILS</button>

      {/* BASIC INFORMATION */}
      <div className="container-fluid" >
        <div className="bg-light p-3 fw-bold mt-4" style={{ fontSize: "15px", color: "#011c69", cursor: "pointer" }} onClick={() => setOpen(open === "basic" ? "" : "basic")}>BASIC INFORMATION</div>
        {open === "basic" && (
          <div className="p-3 border">
            <div className="mb-3">
              <div className='d-flex'>

                {/* BASIC DETAILS */}
                <div>
                  <label htmlFor="vendorName" className="form-label" style={{ marginLeft: "40px" }}>BASIC DETAILS</label>
                  <div className='card' style={{ width: "450px", height: "320px", boxShadow: "2px 2px 10px rgba(0,0,0,0.2)", marginLeft: "30px" }}>
                    <input
                      className='mx-auto mt-4'
                      placeholder='Vendor Name'
                      style={{ border: "none", borderBottom: "2px solid  #D3D3D3", width: "400px", fontSize: "14px", outline: "none" }}
                      value={vendorData.vendorName}
                      onChange={e => handleInputChange('vendorName', e.target.value)}
                    />
                    <input
                      className='mx-auto mt-4'
                      placeholder='Vendor Code'
                      style={{ border: "none", borderBottom: "2px solid  #D3D3D3", width: "400px", fontSize: "14px", outline: "none" }}
                      value={vendorData.vendorCode}
                      onChange={e => handleInputChange('vendorCode', e.target.value)}
                    />
                    <select
                      className='mx-auto mt-4'
                      style={{ color: "#808080", border: "none", borderBottom: "2px solid #D3D3D3", width: "400px", fontSize: "14px", outline: "none", backgroundColor: "transparent" }}
                      value={vendorData.vendorType}
                      onChange={e => handleInputChange('vendorType', e.target.value)}
                    >
                      <option value="">Choose Vendor Type</option>
                      <option value="Individual">Individual</option>
                      <option value="Company">Company</option>
                    </select>
                    <input
                      className='mx-auto mt-4'
                      placeholder='Tax Registration No'
                      style={{ border: "none", borderBottom: "2px solid  #D3D3D3", width: "400px", fontSize: "14px", outline: "none" }}
                      value={vendorData.taxRegNo}
                      onChange={e => handleInputChange('taxRegNo', e.target.value)}
                    />
                    <input
                      className='mx-auto mt-4'
                      placeholder='Company Registration No'
                      style={{ border: "none", borderBottom: "2px solid  #D3D3D3", width: "400px", fontSize: "14px", outline: "none" }}
                      value={vendorData.companyRegNo}
                      onChange={e => handleInputChange('companyRegNo', e.target.value)}
                    />
                    <select
                      className='mx-auto mt-4'
                      style={{ color: "#808080", border: "none", borderBottom: "2px solid  #D3D3D3", width: "400px", fontSize: "14px", outline: "none", backgroundColor: "transparent" }}
                      value={vendorData.currency}
                      onChange={e => handleInputChange('currency', e.target.value)}
                    >
                      <option value="">Choose Currency</option>
                      {currency && [...new Set(currency.map(item => item.code))].map((code, index) => (
                        <option key={index} value={code}>{code}</option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* ADDRESS DETAILS */}
                <div>
                  <label htmlFor="vendorName" className="form-label" style={{ marginLeft: '30px' }}>ADDRESS DETAILS</label>
                  <div className='card' style={{ width: "450px", height: "320px", boxShadow: "2px 2px 10px rgba(0,0,0,0.2)", marginLeft: "20px" }}>
                    <input
                      className='mx-auto mt-4'
                      placeholder='Address 1'
                      style={{ border: "none", borderBottom: "2px solid  #D3D3D3", width: "400px", fontSize: "14px", outline: "none" }}
                      value={vendorData.address1}
                      onChange={e => handleInputChange('address1', e.target.value)}
                    />
                    <input
                      className='mx-auto mt-4'
                      placeholder='Address 2'
                      style={{ border: "none", borderBottom: "2px solid  #D3D3D3", width: "400px", fontSize: "14px", outline: "none" }}
                      value={vendorData.address2}
                      onChange={e => handleInputChange('address2', e.target.value)}
                    />
                    <select
                      className='mx-auto mt-4'
                      style={{ color: "#808080", border: "none", borderBottom: "2px solid  #D3D3D3", width: "400px", fontSize: "14px", outline: "none", backgroundColor: "transparent" }}
                      value={vendorData.country}
                      onChange={e => {
                        handleInputChange('country', e.target.value);
                        setSelectedCountry(e.target.value);
                        handleInputChange('cityId', ''); // reset city when country changes
                      }}
                    >
                      <option value="">Choose Country</option>
                      {country && country.map((item, index) => (
                        <option key={index} value={item.id}>{item.name}</option>
                      ))}
                    </select>
                    <select
                      className='mx-auto mt-4'
                      style={{ color: "#808080", border: "none", borderBottom: "2px solid  #D3D3D3", width: "400px", fontSize: "14px", outline: "none", backgroundColor: "transparent" }}
                      value={vendorData.cityId}
                      onChange={e => handleInputChange('cityId', e.target.value)}
                    >
                      <option value="">Choose City</option>
                      {filteredCities && filteredCities.map((city, index) => (
                        <option key={index} value={city.id}>{city.cityName}</option>
                      ))}
                    </select>
                    <input
                      className='mx-auto mt-4'
                      placeholder='Zip Code'
                      style={{ border: "none", borderBottom: "2px solid  #D3D3D3", width: "400px", fontSize: "14px", outline: "none" }}
                      value={vendorData.zipCode}
                      onChange={e => handleInputChange('zipCode', e.target.value)}
                    />
                  </div>
                </div>

                {/* BANK DETAILS */}
                <div>
                  <label htmlFor="vendorName" className="form-label" style={{ marginLeft: '30px' }}>BANK DETAILS</label>
                  <div className='card' style={{ width: "450px", height: "320px", boxShadow: "2px 2px 10px rgba(0,0,0,0.2)", marginLeft: "20px" }}>
                    <input
                      className='mx-auto mt-4'
                      placeholder='Bank Account Name'
                      style={{ border: "none", borderBottom: "2px solid  #D3D3D3", width: "400px", fontSize: "14px", outline: "none" }}
                      value={vendorData.bankAccountName}
                      onChange={e => handleInputChange('bankAccountName', e.target.value)}
                    />
                    <input
                      className='mx-auto mt-4'
                      placeholder='Bank Account No'
                      style={{ border: "none", borderBottom: "2px solid  #D3D3D3", width: "400px", fontSize: "14px", outline: "none" }}
                      value={vendorData.bankAccountNo}
                      onChange={e => handleInputChange('bankAccountNo', e.target.value)}
                    />
                    <input
                      className='mx-auto mt-4'
                      placeholder='Bank Name'
                      style={{ border: "none", borderBottom: "2px solid  #D3D3D3", width: "400px", fontSize: "14px", outline: "none" }}
                      value={vendorData.bankName}
                      onChange={e => handleInputChange('bankName', e.target.value)}
                    />
                    <input
                      className='mx-auto mt-4'
                      placeholder='Branch'
                      style={{ border: "none", borderBottom: "2px solid  #D3D3D3", width: "400px", fontSize: "14px", outline: "none" }}
                      value={vendorData.branch}
                      onChange={e => handleInputChange('branch', e.target.value)}
                    />
                    <input
                      className='mx-auto mt-4'
                      placeholder='Swift Code'
                      style={{ border: "none", borderBottom: "2px solid  #D3D3D3", width: "400px", fontSize: "14px", outline: "none" }}
                      value={vendorData.swiftCode}
                      onChange={e => handleInputChange('swiftCode', e.target.value)}
                    />
                  </div>
                </div>

              </div>
            </div>
          </div>
        )}
      </div>

      {/* CONTACT SECTION */}
      <div className="container-fluid" >
        <div className="bg-light p-3 fw-bold mt-4" style={{ fontSize: "15px", color: "#011c69", cursor: "pointer" }} onClick={() => setOpen(open === "contact" ? "" : "contact")}>CONTACT</div>

        {open === "contact" && (
          <div className="p-3 border">
            <table className='container-fluid mx-auto mt-3 text-center'>
              <thead style={{ backgroundColor: "#011c69", height: "35px" }}>
                <tr>
                  <th style={{ color: "white", fontSize: '13px', paddingLeft: "20px" }}>S.NO</th>
                  <th style={{ color: "white", fontSize: '13px' }}>NAME</th>
                  <th style={{ color: "white", fontSize: '13px' }}>EMAIL</th>
                  <th style={{ color: "white", fontSize: '13px' }}>PHONE NO</th>
                  <th style={{ color: "white", fontSize: '13px' }}>IS DEFAULT</th>
                  <th style={{ color: "white", fontSize: '13px', paddingRight: "20px" }}>ACTION</th>
                </tr>
              </thead>
              <tbody className='text-center'>
                {contactList.map((contact, index) => (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>
                      <input
                        value={contact.name}
                        onChange={e => handleContactChange(index, 'name', e.target.value)}
                        placeholder='Name'
                        style={{ border: "none", outline: "none", borderBottom: "1px solid #D3D3D3", marginTop: "10px", width: "300px" }}
                      />
                    </td>
                    <td>
                      <input
                        value={contact.email}
                        onChange={e => handleContactChange(index, 'email', e.target.value)}
                        placeholder='Email'
                        style={{ border: "none", outline: "none", borderBottom: "1px solid #D3D3D3", marginTop: "10px", width: "300px" }}
                      />
                    </td>
                    <td>
                      <input
                        value={contact.phone}
                        onChange={e => handleContactChange(index, 'phone', e.target.value)}
                        placeholder='Phone No'
                        style={{ border: "none", outline: "none", borderBottom: "1px solid #D3D3D3", marginTop: "10px", width: "300px" }}
                      />
                    </td>
                    <td>
                      <select
                        value={contact.isDefault.toString()}
                        onChange={e => handleContactChange(index, 'isDefault', e.target.value === 'true')}
                        style={{ color: "#808080", border: "none", outline: "none", borderBottom: "1px solid #D3D3D3", marginTop: "10px", width: "300px" }}
                      >
                        <option value="" disabled hidden>Choose</option>
                        <option value="true">True</option>
                        <option value="false">False</option>
                      </select>
                    </td>
                    <td>
                      <FaTrash
                        onClick={() => deleteContactRow(index)}
                        style={{ cursor: "pointer", color: "red", marginTop: "10px" }}
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <button onClick={addContactRow} className="btn btn-primary mt-3" style={{ marginLeft: "80px" }}>Add Contact</button>
          </div>
        )}
      </div>

      {/* SAVE BUTTON */}
      <div className='d-flex justify-content-center mt-4'>
        <button
          className="btn btn-primary"
          style={{ backgroundColor: "#011c69", borderRadius: "3px", fontSize: "15px" }}
          onClick={handleSubmit}
        >
          {editMode ? 'Update' : 'Save'}
        </button>
      </div>
    </div>
  );
}

export default Vendor;
