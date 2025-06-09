import React, { useEffect, useState } from 'react';
import { FaTrash } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { cityRequest, createRequest } from '../Redux/Action/LoginAction';

function Vendor() {
  const [open, setOpen] = useState("basic");
  const [selectedCountry, setSelectedCountry] = useState('');
  const [filteredCities, setFilteredCities] = useState([]);
  const [vendorData, setVendorData] = useState({
    vendorName: '',
    vendorCode: '',
    vendorType: '',
    taxRegNo: '',
    companyRegNo: '',
    currency: '',
    address1: '',
    address2: '',
    country: '',
    cityId: '',
    zipCode: '',
    bankAcctName: '',
    bankAccountNum: '',
    bankName: '',
    bankBranchName: '',
    bankSwiftCode: '',
    createdBy: '',
    documentList: '',
    postalCode: 0,
  });

  const [contactList, setContactList] = useState([
    { name: '', email: '', mobileNo: '', isDefault: false }
  ]);

  const currency = useSelector(state => state.currency?.currencyData?.data);
  const country = useSelector(state => state.country?.countryData?.data);
  const cities = useSelector(state => state.city?.cityData?.data);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(cityRequest());
    if (selectedCountry && cities) {
      const filtered = cities.filter(city => city.countryId === selectedCountry);
      setFilteredCities(filtered);
    } else {
      setFilteredCities([]);
    }
  }, [dispatch, selectedCountry]);

  const handleInputChange = (field, value) => {
    setVendorData({ ...vendorData, [field]: value });
  };

  const handleContactChange = (index, field, value) => {
    setContactList(prev => {
      const updated = [...prev];
      updated[index] = { ...updated[index], [field]: value };
      if (index === 0) {
        updated[0].isDefault = true;
      }
      return updated;
    });
  };
  const addContactRow = () => {
    setContactList(prev => [...prev, { name: "", email: "", mobileNo: "", isDefault: false }]);
  };

  const deleteContactRow = (index) => {
    if (contactList.length === 1) {
      alert("At least one contact must remain.");
      return;
    }
    setContactList(prev => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = () => {
    const fullData = {
      ...vendorData,
      contactList: contactList
    };
    dispatch(createRequest(fullData));
  };

  return (

    <div >
      <p style={{ color: '#011c69', marginTop: "20px", marginLeft: "20px" }}>VENDOR</p>
      <button className='btn ' style={{ backgroundColor: "#011c69", color: 'white', borderRadius: "3px", marginLeft: "50px", fontSize: "13px", fontWeight: "700" }}>VENDOR DETAILS</button>
      <div className="container-fluid" >
        <div className="bg-light p-3 fw-bold mt-4" style={{ fontSize: "15px", color: "#011c69", cursor: "pointer" }} onClick={() => setOpen(open === "basic" ? "" : "basic")}>BASIC INFORMATION</div>
        {open === "basic" && (
          <div className="p-3 border">
            <div className="mb-3">
              <div className='d-flex'>
                <div>
                  <label For="vendorName" className="form-label" style={{ marginLeft: "40px" }}>BASIC DETAILS</label>
                  <div className='card' style={{ width: "450px", height: "320px", boxShadow: "2px 2px 10px rgba(0,0,0,0.2)", marginLeft: "30px" }}>
                    <input className='mx-auto mt-4' placeholder='Vendor Name' style={{ border: "none", borderBottom: "2px solid  #D3D3D3", width: "400px", fontSize: "14px", outline: "none" }} value={vendorData.vendorName} onChange={e => handleInputChange('vendorName', e.target.value)} />
                    <input className='mx-auto mt-4' placeholder='Vendor Code' style={{ border: "none", borderBottom: "2px solid  #D3D3D3", width: "400px", fontSize: "14px", outline: "none" }} value={vendorData.vendorCode} onChange={e => handleInputChange('vendorCode', e.target.value)} />
                    <select className='mx-auto mt-4' style={{ color: "#808080", border: "none", borderBottom: "2px solid #D3D3D3", width: "400px", fontSize: "14px", outline: "none", backgroundColor: "transparent" }} value={vendorData.vendorType} onChange={e => handleInputChange('vendorType', e.target.value)}>
                      <option value="">Choose Vendor Type</option>
                      <option value="Individual">Individual</option>
                      <option value="Company">Company</option>
                    </select>
                    <input className='mx-auto mt-4' placeholder='Tax Registration No' style={{ border: "none", borderBottom: "2px solid  #D3D3D3", width: "400px", fontSize: "14px", outline: "none" }} value={vendorData.taxRegNo} onChange={e => handleInputChange('taxRegNo', e.target.value)} />
                    <input className='mx-auto mt-4' placeholder='Company Registration No' style={{ border: "none", borderBottom: "2px solid  #D3D3D3", width: "400px", fontSize: "14px", outline: "none" }} value={vendorData.companyRegNo} onChange={e => handleInputChange('companyRegNo', e.target.value)} />
                    <select className='mx-auto mt-4' style={{ color: "#808080", border: "none", borderBottom: "2px solid  #D3D3D3", width: "400px", fontSize: "14px", outline: "none", backgroundColor: "transparent" }} value={vendorData.currency} onChange={e => handleInputChange('currency', e.target.value)}>
                      <option value="">Choose Currency</option>
                      {currency && [...new Set(currency.map(item => item.code))].map((base, index) => (
                        <option key={index} value={base}>{base}</option>
                      ))}
                    </select>
                  </div>
                </div>
                <div>
                  <label For="vendorName" className="form-label" style={{ marginLeft: '30px' }}>ADDRESS DETAILS</label>
                  <div className='card' style={{ width: "450px", height: "320px", boxShadow: "2px 2px 10px rgba(0,0,0,0.2)", marginLeft: "20px" }}>
                    <input className='mx-auto mt-4' placeholder='Address 1' style={{ border: "none", borderBottom: "2px solid  #D3D3D3", width: "400px", fontSize: "14px", outline: "none" }} value={vendorData.address1} onChange={e => handleInputChange('address1', e.target.value)} />
                    <input className='mx-auto mt-4' placeholder='Address 2' style={{ border: "none", borderBottom: "2px solid  #D3D3D3", width: "400px", fontSize: "14px", outline: "none" }} value={vendorData.address2} onChange={e => handleInputChange('address2', e.target.value)} />
                    <select className='mx-auto mt-4' style={{ color: "#808080", border: "none", borderBottom: "2px solid  #D3D3D3", width: "400px", fontSize: "14px", outline: "none", backgroundColor: "transparent" }} onChange={e => { handleInputChange('country', e.target.value); setSelectedCountry(e.target.value); }}>
                      <option value="">Choose Country</option>
                      {country &&
                        country.map((item, index) => (
                          <option key={index} value={item.id}>{item.name}</option>
                        ))}
                    </select>
                    <select className='mx-auto mt-4' style={{ color: "#808080", border: "none", borderBottom: "2px solid  #D3D3D3", width: "400px", fontSize: "14px", outline: "none", backgroundColor: "transparent" }} value={vendorData.cityId} onChange={e => handleInputChange('cityId', e.target.value)}>
                      <option value="">Choose City</option>
                      {filteredCities && filteredCities.map((city, index) => (
                        <option key={index} value={city.id}>{city.cityName}</option>
                      ))}
                    </select>

                    <input className='mx-auto mt-4' placeholder='Zip Code' style={{ border: "none", borderBottom: "2px solid  #D3D3D3", width: "400px", fontSize: "14px", outline: "none" }} value={vendorData.zipCode} onChange={e => handleInputChange('zipCode', e.target.value)} />
                  </div>
                </div>
                <div>
                  <label For="vendorName" className="form-label" style={{ marginLeft: '30px' }}>BANK DETAILS</label>
                  <div className='card' style={{ width: "450px", height: "320px", boxShadow: "2px 2px 10px rgba(0,0,0,0.2)", marginLeft: "20px" }}>
                    <input className='mx-auto mt-4' placeholder='Bank Account Name' style={{ border: "none", borderBottom: "2px solid  #D3D3D3", width: "400px", fontSize: "14px", outline: "none" }} value={vendorData.bankAcctName} onChange={e => handleInputChange('bankAcctName', e.target.value)} />
                    <input className='mx-auto mt-4' placeholder='Bank Account No' style={{ border: "none", borderBottom: "2px solid  #D3D3D3", width: "400px", fontSize: "14px", outline: "none" }} value={vendorData.bankAccountNum} onChange={e => handleInputChange('bankAccountNum', e.target.value)} />
                    <input className='mx-auto mt-4' placeholder='Bank Name' style={{ border: "none", borderBottom: "2px solid  #D3D3D3", width: "400px", fontSize: "14px", outline: "none" }} value={vendorData.bankName} onChange={e => handleInputChange('bankName', e.target.value)} />
                    <input className='mx-auto mt-4' placeholder='Branch' style={{ border: "none", borderBottom: "2px solid  #D3D3D3", width: "400px", fontSize: "14px", outline: "none" }} value={vendorData.bankBranchName} onChange={e => handleInputChange('bankBranchName', e.target.value)} />
                    <input className='mx-auto mt-4' placeholder='Swift Code' style={{ border: "none", borderBottom: "2px solid  #D3D3D3", width: "400px", fontSize: "14px", outline: "none" }} value={vendorData.bankSwiftCode} onChange={e => handleInputChange('bankSwiftCode', e.target.value)} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
      <div className="container-fluid" >
        <div className="bg-light p-3 fw-bold mt-4" style={{ fontSize: "15px", color: "#011c69" }} onClick={() => setOpen(open === "contact" ? "" : "contact")}>CONTACT</div>

        {open === "contact" && (
          <div className="p-3 border">
            <table className='container-fluid  mx-auto  mt-3 text-center ' >
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
                      <input value={contact.name} onChange={e => handleContactChange(index, 'name', e.target.value)} placeholder='Name' style={{ border: "none", outline: "none", borderBottom: "1px solid #D3D3D3", marginTop: "10px", width: "300px" }} />
                    </td>
                    <td>
                      <input value={contact.email} onChange={e => handleContactChange(index, 'email', e.target.value)} placeholder='Email' style={{ border: "none", outline: "none", borderBottom: "1px solid #D3D3D3", marginTop: "10px", width: "300px" }} />
                    </td>
                    <td>
                      <input value={contact.mobileNo} onChange={e => handleContactChange(index, 'mobileNo', e.target.value)} placeholder='Phone No' style={{ border: "none", outline: "none", borderBottom: "1px solid #D3D3D3", marginTop: "10px", width: "300px" }} />
                    </td>
                    <td>
                      <select value={contact.isDefault.toString()} onChange={e => handleContactChange(index, 'isDefault', e.target.value === 'true')} style={{ color: "#808080", border: "none", outline: "none", borderBottom: "1px solid #D3D3D3", marginTop: "10px", width: "300px" }}>
                        <option value="" disabled hidden>Is Default</option>
                        <option value="true">Yes</option>
                        <option value="false">No</option>
                      </select>
                    </td>
                    <td>
                      <FaTrash style={{ color: 'red', cursor: 'pointer' }} onClick={() => deleteContactRow(index)} />
                    </td>
                  </tr>
                ))}

              </tbody>
            </table>
            <button className='btn mt-4' onClick={addContactRow} style={{ backgroundColor: "#011c69", color: "white" }}>Add Contact</button>
          </div>
        )}
      </div>
      <button className='btn mt-4 float-end' onClick={handleSubmit} style={{ backgroundColor: "#011c69", color: "white", borderRadius: "2px", marginRight: '20px', marginBottom: "20px" }}>Save</button>
    </div>
  );
}
export default Vendor;
