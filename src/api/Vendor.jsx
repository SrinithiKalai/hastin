import { useEffect, useState } from 'react';
import './Login.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { Select } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { cityRequest, countryRequest, createRequest, currencyRequest } from '../Redux/Action/LoginAction';

const Vendor = () => {
  const [open, setOpen] = useState("basic");
  const [selectedCountry, setSelectedCountry] = useState(null);

  const [formData, setFormData] = useState({
    vendorName: "",
    vendorCode: "",
    vendorType: "",
    taxRegNo: "",
    companyRegNo: "",
    currency: "",
    address1: "",
    address2: "",
    country: "",
    cityId: "",
    zipCode: "",
    bankAccountName: "",
    bankAccountNo: "",
    bankName: "",
    branch: "",
    swiftCode: "",
    createdBy: "",
    documentList: [],
    contactList: [
      { name: "", email: "", phone: "", isDefault: false, id: null }
    ]
  });

  const currencies = useSelector(state => state.currency.data) || [];
  const countries = useSelector(state => state.country.data) || [];
  const cities = useSelector(state => state.city.data) || [];

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(countryRequest());
    dispatch(currencyRequest());
    // dispatch(cityRequest()); // Uncomment if you want to load all cities initially
  }, [dispatch]);

  // Map countries and currencies to AntD select options format
  const metaCountry = countries.map(meta => ({
    value: meta.id,
    label: meta.name,
  }));

  const metaCurrencies = currencies.map(meta => ({
    value: meta.id,
    label: meta.name,
  }));

  // Filter cities based on selected country
  const metaCities = cities.filter(city => city.countryId === selectedCountry);

  // Handle regular input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Handle Select changes
  const handleSelectChange = (name, value) => {
    if (name === "country") {
      setSelectedCountry(value);
      // Clear city if country changes
      setFormData(prev => ({
        ...prev,
        cityId: "",
      }));
    }
    setFormData(prevData => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Add a new empty contact row
  const addContactRow = () => {
    const updated = [...formData.contactList, { name: "", email: "", phone: "", isDefault: false }];
    setFormData({ ...formData, contactList: updated });
  };

  // Delete contact row by index, ensuring at least one remains
  const deleteContactRow = (index) => {
    if (formData.contactList.length === 1) {
      alert("At least one contact is required!");
      return;
    }
    const updated = [...formData.contactList];
    updated.splice(index, 1);
    setFormData({ ...formData, contactList: updated });
  };

  // Update a field for a contact row by index
  const updateContactField = (index, field, value) => {
    const updated = [...formData.contactList];
    updated[index][field] = value;
    setFormData({ ...formData, contactList: updated });
  };

  // Prepare data and dispatch create request
  const createData = () => {
    const updatedFormData = {
      ...formData,
      documentList: formData.documentList || [],
      createdBy: formData.createdBy || null,
      contactList: formData.contactList.map(contact => ({
        ...contact,
        // normalize phone/mobileNo naming
        phone: contact.phone || contact.mobileNo || "",
      })),
      zipCode: formData.zipCode || 0,
    };

    console.log("Payload being sent:", updatedFormData);
    dispatch(createRequest(updatedFormData));
  };

  return (
    <div>
      <h3 style={{ marginLeft: "20px" }}>VENDOR</h3>
      <div className="vendor-container">
        <div className="sidebar">
          <button className="sidebar-button active">VENDOR DETAILS</button>
        </div>

        <div className="content-area">
          <div className="tab-header" onClick={() => setOpen(open === "basic" ? "" : "basic")}>BASIC INFORMATION</div>
          {open === "basic" && (
            <div className="form-section">
              <div className="card">
                <h3>Basic Details</h3>
                <input type="text" name="vendorName" placeholder="Vendor Name" value={formData.vendorName} onChange={handleChange} />
                <input type="text" name="vendorCode" placeholder="Vendor Code" value={formData.vendorCode} onChange={handleChange} />
                <div className="custom-select-wrapper">
                  <Select
                    name="vendorType"
                    value={formData.vendorType || undefined}
                    placeholder="Choose Vendor Type"
                    style={{ width: "100%" }}
                    onChange={(value) => handleSelectChange("vendorType", value)}
                    className="underline-select"
                    suffixIcon={null}
                  >
                    <Select.Option value="Individual">Individual</Select.Option>
                    <Select.Option value="Company">Company</Select.Option>
                  </Select>
                </div>
                <input className='mt-3' type="text" name="taxRegNo" placeholder="Tax Registration No" value={formData.taxRegNo} onChange={handleChange} />
                <input type="text" name="companyRegNo" placeholder="Company Registration No" value={formData.companyRegNo} onChange={handleChange} />
                <div className="custom-select-wrapper">
                  <Select
                    showSearch
                    placeholder="Choose Currency"
                    style={{ width: "100%" }}
                    value={formData.currency || undefined}
                    onChange={(value) => handleSelectChange("currency", value)}
                    options={metaCurrencies}
                    className="underline-select"
                    suffixIcon={null}
                  />
                </div>
              </div>

              <div className="card">
                <h3>Address Details</h3>
                <input type="text" name="address1" placeholder="Address 1" value={formData.address1} onChange={handleChange} />
                <input type="text" name="address2" placeholder="Address 2" value={formData.address2} onChange={handleChange} />
                <div className="custom-select-wrapper">
                  <Select
                    showSearch
                    placeholder="Choose Country"
                    style={{ width: "100%" }}
                    value={formData.country || undefined}
                    onChange={(value) => handleSelectChange("country", value)}
                    options={metaCountry}
                    className="underline-select"
                    suffixIcon={null}
                  />
                </div>
                <div className="custom-select-wrapper">
                  <Select
                    showSearch
                    placeholder="Choose City"
                    style={{ width: "100%" }}
                    value={formData.cityId || undefined}
                    onChange={(value) => handleSelectChange("cityId", value)}
                    options={metaCities.map(city => ({ value: city.id, label: city.name }))}
                    className="underline-select mt-3"
                    suffixIcon={null}
                    disabled={!selectedCountry}
                  />
                </div>
                <input className='mt-3' type="text" name="zipCode" placeholder="Zip Code" value={formData.zipCode} onChange={handleChange} />
              </div>

              <div className="card">
                <h3>Bank Details</h3>
                <input type="text" name="bankAccountName" placeholder="Bank Account Name" value={formData.bankAccountName} onChange={handleChange} />
                <input type="text" name="bankAccountNo" placeholder="Bank Account No" value={formData.bankAccountNo} onChange={handleChange} />
                <input type="text" name="bankName" placeholder="Bank Name" value={formData.bankName} onChange={handleChange} />
                <input type="text" name="branch" placeholder="Branch" value={formData.branch} onChange={handleChange} />
                <input type="text" name="swiftCode" placeholder="Swift Code" value={formData.swiftCode} onChange={handleChange} />
              </div>
            </div>
          )}
        </div>
      </div>

      <div className='content-contact'>
        <div className="tab-header" onClick={() => setOpen(open === "contact" ? "" : "contact")}>CONTACT</div>
        {open === "contact" && (
          <div className='content-table'>
            <table>
              <thead>
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
                {formData.contactList.map((contact, index) => (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>
                      <input type="text" placeholder="Name" value={contact.name} onChange={(e) => updateContactField(index, 'name', e.target.value)} />
                    </td>
                    <td>
                      <input type="email" placeholder="Email" value={contact.email} onChange={(e) => updateContactField(index, 'email', e.target.value)} />
                    </td>
                    <td>
                      <input type="text" placeholder="Phone" value={contact.phone} onChange={(e) => updateContactField(index, 'phone', e.target.value)} />
                    </td>
                    <td className="custom-select-wrapper">
                      <Select
                        value={contact.isDefault || undefined}
                        placeholder="Is Default"
                        suffixIcon={null}
                        onChange={(value) => updateContactField(index, 'isDefault', value)}
                        className="underline-select"
                      >
                        <Select.Option value="Yes">Yes</Select.Option>
                        <Select.Option value="No">No</Select.Option>
                      </Select>
                    </td>
                    <td>
                      <FontAwesomeIcon style={{ color: "red", cursor: "pointer" }} icon={faTrash} onClick={() => deleteContactRow(index)} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <button className="add-btn" onClick={addContactRow}>Add Contact</button>
          </div>
        )}
      </div>

      <div style={{ display: 'flex', justifyContent: 'flex-end', padding: '20px' }}>
        <button className="save-btn" onClick={createData}>Save</button>
      </div>
    </div>
  );
};

export default Vendor;
