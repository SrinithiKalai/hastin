import React, { useEffect, useState, useRef } from 'react';
import { FaTrash } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import {
  cityRequest,
  createRequest,
  getIdRequest,
  updateRequest,
} from '../Redux/Action/LoginAction';

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
  const singleData = useSelector(state => state.user?.editObj);

  const dispatch = useDispatch();
  const location = useLocation();
  const vendorId = location.state?.id;

  const hasLoggedRef = useRef(false);
  useEffect(() => {
    if (!hasLoggedRef.current && singleData && Object.keys(singleData).length > 0) {
      console.log("Single Data:", singleData);
      hasLoggedRef.current = true;
    }
  }, [singleData]);

  useEffect(() => {
    dispatch(cityRequest());
    if (vendorId) dispatch(getIdRequest(vendorId));
  }, [dispatch, vendorId]);

  useEffect(() => {
    if (singleData && Object.keys(singleData).length > 0) {
      setVendorData(prev => ({
        ...prev,
        ...singleData,
        cityId: singleData.cityId?.toString() || '',
      }));
      setContactList(singleData.contactList || [{ name: '', email: '', mobileNo: '', isDefault: false }]);
      setSelectedCountry(singleData.country || '');
    }
  }, [singleData]);

  useEffect(() => {
    if (selectedCountry && cities) {
      const filtered = cities.filter(city => city.countryId === selectedCountry);
      setFilteredCities(filtered);
    } else {
      setFilteredCities([]);
    }
  }, [selectedCountry, cities]);

  const handleInputChange = (field, value) => {
    setVendorData(prev => ({ ...prev, [field]: value }));
  };

  const handleContactChange = (index, field, value) => {
    setContactList(prev => {
      const updated = [...prev];
      updated[index] = { ...updated[index], [field]: value };
      if (index === 0) updated[0].isDefault = true;
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
    const fullData = { ...vendorData, contactList };
    if (vendorId) {
      dispatch(updateRequest(vendorId, fullData));
    } else {
      dispatch(createRequest(fullData));
    }
  };

  return (
    <div>
      <h5 className="mt-3 ms-3" style={{ color: '#011c69' }}>VENDOR</h5>
      <button className='btn ms-5' style={{ backgroundColor: "#011c69", color: 'white' }}>VENDOR DETAILS</button>

      <div className="container-fluid">
        <div className="bg-light p-3 fw-bold mt-4" style={{ fontSize: "15px", color: "#011c69", cursor: "pointer" }} onClick={() => setOpen(open === "basic" ? "" : "basic")}>BASIC INFORMATION</div>
        {open === "basic" && (
          <div className="p-3 border">
            <div className="mb-3 d-flex">
              <div>
                <label className="form-label ms-4">BASIC DETAILS</label>
                <div className='card mx-3' style={{ width: "450px", height: "320px", boxShadow: "2px 2px 10px rgba(0,0,0,0.2)" }}>
                  <input placeholder='Vendor Name' value={vendorData.vendorName} onChange={e => handleInputChange('vendorName', e.target.value)} className="form-control mt-4 mx-auto" style={{ width: '90%' }} />
                  <input placeholder='Vendor Code' value={vendorData.vendorCode} onChange={e => handleInputChange('vendorCode', e.target.value)} className="form-control mt-4 mx-auto" style={{ width: '90%' }} />
                  <select value={vendorData.vendorType} onChange={e => handleInputChange('vendorType', e.target.value)} className="form-select mt-4 mx-auto" style={{ width: '90%' }}>
                    <option value="">Choose Vendor Type</option>
                    <option value="Individual">Individual</option>
                    <option value="Company">Company</option>
                  </select>
                  <input placeholder='Tax Registration No' value={vendorData.taxRegNo} onChange={e => handleInputChange('taxRegNo', e.target.value)} className="form-control mt-4 mx-auto" style={{ width: '90%' }} />
                  <input placeholder='Company Registration No' value={vendorData.companyRegNo} onChange={e => handleInputChange('companyRegNo', e.target.value)} className="form-control mt-4 mx-auto" style={{ width: '90%' }} />
                  <select value={vendorData.currency} onChange={e => handleInputChange('currency', e.target.value)} className="form-select mt-4 mx-auto" style={{ width: '90%' }}>
                    <option value="">Choose Currency</option>
                    {currency && [...new Set(currency.map(item => item.code))].map((base, index) => (
                      <option key={index} value={base}>{base}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="form-label ms-3">ADDRESS DETAILS</label>
                <div className='card mx-3' style={{ width: "450px", height: "320px", boxShadow: "2px 2px 10px rgba(0,0,0,0.2)" }}>
                  <input placeholder='Address 1' value={vendorData.address1} onChange={e => handleInputChange('address1', e.target.value)} className="form-control mt-4 mx-auto" style={{ width: '90%' }} />
                  <input placeholder='Address 2' value={vendorData.address2} onChange={e => handleInputChange('address2', e.target.value)} className="form-control mt-4 mx-auto" style={{ width: '90%' }} />
                  <select value={selectedCountry} onChange={e => { handleInputChange('country', e.target.value); setSelectedCountry(e.target.value); }} className="form-select mt-4 mx-auto" style={{ width: '90%' }}>
                    <option value="">Choose Country</option>
                    {country && country.map((item, index) => (
                      <option key={index} value={item.id}>{item.name}</option>
                    ))}
                  </select>
                  <select value={vendorData.cityId} onChange={e => handleInputChange('cityId', e.target.value)} className="form-select mt-4 mx-auto" style={{ width: '90%' }}>
                    <option value="">Choose City</option>
                    {filteredCities.map((city, index) => (
                      <option key={index} value={city.id}>{city.cityName}</option>
                    ))}
                  </select>
                  <input placeholder='Zip Code' value={vendorData.zipCode} onChange={e => handleInputChange('zipCode', e.target.value)} className="form-control mt-4 mx-auto" style={{ width: '90%' }} />
                </div>
              </div>

              <div>
                <label className="form-label ms-3">BANK DETAILS</label>
                <div className='card mx-3' style={{ width: "450px", height: "320px", boxShadow: "2px 2px 10px rgba(0,0,0,0.2)" }}>
                  <input placeholder='Bank Account Name' value={vendorData.bankAcctName} onChange={e => handleInputChange('bankAcctName', e.target.value)} className="form-control mt-4 mx-auto" style={{ width: '90%' }} />
                  <input placeholder='Bank Account No' value={vendorData.bankAccountNum} onChange={e => handleInputChange('bankAccountNum', e.target.value)} className="form-control mt-4 mx-auto" style={{ width: '90%' }} />
                  <input placeholder='Bank Name' value={vendorData.bankName} onChange={e => handleInputChange('bankName', e.target.value)} className="form-control mt-4 mx-auto" style={{ width: '90%' }} />
                  <input placeholder='Branch' value={vendorData.bankBranchName} onChange={e => handleInputChange('bankBranchName', e.target.value)} className="form-control mt-4 mx-auto" style={{ width: '90%' }} />
                  <input placeholder='Swift Code' value={vendorData.bankSwiftCode} onChange={e => handleInputChange('bankSwiftCode', e.target.value)} className="form-control mt-4 mx-auto" style={{ width: '90%' }} />
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="container-fluid">
        <div className="bg-light p-3 fw-bold mt-4" style={{ fontSize: "15px", color: "#011c69", cursor: "pointer" }} onClick={() => setOpen(open === "contact" ? "" : "contact")}>CONTACT</div>
        {open === "contact" && (
          <div className="p-3 border">
            <table className='table table-bordered text-center'>
              <thead className='bg-primary text-white'>
                <tr>
                  <th>S.NO</th>
                  <th>NAME</th>
                  <th>EMAIL</th>
                  <th>PHONE NO</th>
                  <th>IS DEFAULT</th>
                  <th>ACTION</th>
                </tr>
              </thead>
              <tbody>
                {contactList.map((contact, index) => (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td><input value={contact.name} onChange={e => handleContactChange(index, 'name', e.target.value)} /></td>
                    <td><input value={contact.email} onChange={e => handleContactChange(index, 'email', e.target.value)} /></td>
                    <td><input value={contact.mobileNo} onChange={e => handleContactChange(index, 'mobileNo', e.target.value)} /></td>
                    <td>
                      <select value={contact.isDefault.toString()} onChange={e => handleContactChange(index, 'isDefault', e.target.value === 'true')}>
                        <option value="true">Yes</option>
                        <option value="false">No</option>
                      </select>
                    </td>
                    <td><FaTrash style={{ color: 'red', cursor: 'pointer' }} onClick={() => deleteContactRow(index)} /></td>
                  </tr>
                ))}
              </tbody>
            </table>
            <button className='btn mt-3' onClick={addContactRow} style={{ backgroundColor: "#011c69", color: "white" }}>Add Contact</button>
          </div>
        )}
      </div>

      <button className='btn mt-4 float-end' onClick={handleSubmit} style={{ backgroundColor: "#011c69", color: "white", marginRight: '20px', marginBottom: "20px" }}>
        {vendorId ? 'Update' : 'Save'}
      </button>
    </div>
  );
}

export default Vendor;
