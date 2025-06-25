import React, { useEffect, useState } from 'react';
import { FaTrash, FaCheck } from 'react-icons/fa';
import './VendorContact.css';
import { toast } from 'react-toastify';

function VendorContact({
  formData,
  setFormdata,
  showErrors,
  setShowContactError,
  contactSubmitClicked,
  isEditMode,
}) {
  const [localError, setLocalError] = useState(false);
  const contactList = formData.contactList || [];

  const handleContactChange = (index, field, value) => {
    const updated = [...contactList];
    updated[index] = { ...updated[index], [field]: value };
    setFormdata({ ...formData, contactList: updated });
    setShowContactError(false);
  };

  const handleTickClick = () => {
    toast.success('Vendor contact updated successfully', {
      position: 'top-right',
    });
  };

  const addContactRow = () => {
    const updated = [
      ...contactList,
      { name: '', email: '', mobileNo: '', isDefault: undefined, isNew: true },
    ];
    setFormdata({ ...formData, contactList: updated });
  };

  const deleteContactRow = (index) => {
    const totalRows = contactList.length;
    const isNewVendor = !formData.id;

    const firstRow = contactList[0];
    const isFirstRowFilled =
      firstRow.name?.trim() || firstRow.email?.trim() || firstRow.mobileNo?.trim();

    if (totalRows === 1) {
      if (isNewVendor) {
        toast.warning("Can't delete the row when there is only one row", {
          position: 'top-right',
        });
        return;
      } else {
        const updated = [...contactList];
        updated[0] = {
          ...updated[0],
          name: '',
          email: '',
          mobileNo: '',
          isDefault: undefined,
        };
        setFormdata({ ...formData, contactList: updated });

        toast.warning("Can't delete the row when there is only one row", {
          position: 'top-right',
        });
        return;
      }
    }

    const updatedList = contactList.filter((_, i) => i !== index);
    setFormdata({ ...formData, contactList: updatedList });
  };


  const isValidEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const isValidPhone = (phone) => /^\d{7,15}$/.test(phone);

  useEffect(() => {
    if (!contactSubmitClicked) return;

    let hasToastShown = false;

    const hasContactFilled = contactList.some(
      (c) => c.name?.trim() || c.email?.trim() || c.mobileNo?.trim()
    );

    const isBasicInfoMissing =
      !formData.vendorName ||
      !formData.vendorCode ||
      !formData.vendorType ||
      !formData.companyRegNo ||
      !formData.defaultCurrencyId;

    const firstIsDefaultNo = contactList[0]?.isDefault === false;

    if (hasContactFilled && isBasicInfoMissing && !hasToastShown) {
      toast.error('Missing some details in basic information', {
        position: 'top-right',
      });
      hasToastShown = true;
    }

    setLocalError(firstIsDefaultNo);
    setShowContactError(firstIsDefaultNo);
  }, [contactSubmitClicked, showErrors, formData]);

  return (
    <div className="contact-table-wrapper">
      {localError && (
        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '20px' }}>
          <div className="error-box">Choose one contact as default.</div>
        </div>
      )}

      <table className="table table-bordered text-center">
        <thead style={{ backgroundColor: '#0077b6', color: 'white' }}>
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

              <td>
                <div className="input-container">
                  <input
                    className={`underline-input ${showErrors && !contact.name ? 'p-invalid' : ''}`}
                    placeholder="Name"
                    value={contact.name}
                    onChange={(e) => handleContactChange(index, 'name', e.target.value)}
                  />
                  {showErrors && !contact.name && (
                    <small className="p-error">Name is required</small>
                  )}
                </div>
              </td>

              <td>
                <div className="input-container">
                  <input
                    className={`underline-input ${showErrors && (!contact.email || !isValidEmail(contact.email))
                        ? 'p-invalid'
                        : ''
                      }`}
                    placeholder="Email"
                    value={contact.email}
                    onChange={(e) => handleContactChange(index, 'email', e.target.value)}
                  />
                  {showErrors && !contact.email && (
                    <small className="p-error">Email is required</small>
                  )}
                  {showErrors && contact.email && !isValidEmail(contact.email) && (
                    <small className="p-error">Invalid email format</small>
                  )}
                </div>
              </td>

              <td>
                <div className="input-container">
                  <input
                    className={`underline-input ${showErrors && (!contact.mobileNo || !isValidPhone(contact.mobileNo))
                        ? 'p-invalid'
                        : ''
                      }`}
                    placeholder="Phone No"
                    value={contact.mobileNo}
                    onChange={(e) => handleContactChange(index, 'mobileNo', e.target.value)}
                  />
                  {showErrors && !contact.mobileNo && (
                    <small className="p-error">Phone number is required</small>
                  )}
                  {showErrors && contact.mobileNo && !isValidPhone(contact.mobileNo) && (
                    <small className="p-error">Invalid phone number</small>
                  )}
                </div>
              </td>

              <td>
                <select
                  className="underline-input"
                  value={
                    contact.isDefault === true
                      ? 'true'
                      : contact.isDefault === false
                        ? 'false'
                        : ''
                  }
                  onChange={(e) =>
                    handleContactChange(index, 'isDefault', e.target.value === 'true')
                  }
                >
                  <option value="" disabled hidden>
                    Is Default
                  </option>
                  <option value="true">Yes</option>
                  <option value="false">No</option>
                </select>
              </td>

              <td>
                {isEditMode && formData.id && (
                  <FaCheck
                    style={{ color: 'green', marginRight: '10px', cursor: 'pointer' }}
                    onClick={handleTickClick}
                    title="Confirm Update"
                  />
                )}
                <FaTrash
                  style={{ color: 'red', cursor: 'pointer' }}
                  onClick={() => deleteContactRow(index)}
                  title="Delete Row"
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="d-flex justify-content-start mt-3">
        <button className="btn btn-primary" onClick={addContactRow}>
          Add Contact
        </button>
      </div>
    </div>
  );
}

export default VendorContact;
