import React, { useEffect, useState } from 'react';
import { FaTrash, FaCheck } from 'react-icons/fa';
import './VendorContact.css';
import { toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import { tickRequest, contactRequest } from '../Redux/Action/LoginAction';

function VendorContact({
  formData,
  setFormdata,
  showErrors,
  setShowContactError,
  contactSubmitClicked,
  setContactSubmitClicked,
  isEditMode,
  setContactListFromTick,
}) {
  const dispatch = useDispatch();
  const { loading, tickResponse, error } = useSelector((state) => state.user);
  const contactState = useSelector((state) => state.contact || {});

  const [localError, setLocalError] = useState(false);
  const [editableContactList, setEditableContactList] = useState(formData.contactList || []);
  const [tickHandled, setTickHandled] = useState(false);

  useEffect(() => {
    setEditableContactList(formData.contactList || []);
  }, [formData.contactList]);

  useEffect(() => {
    if (typeof setContactListFromTick === 'function') {
      setContactListFromTick(editableContactList);
    }
  }, [editableContactList, setContactListFromTick]);

  const isValidEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const isValidPhone = (phone) => /^\d{7,15}$/.test(phone);

  const handleContactChange = (index, field, value) => {
    const updated = [...editableContactList];
    updated[index] = { ...updated[index], [field]: value };
    setEditableContactList(updated);
    setShowContactError(false);
  };

  const handleTickClick = (index) => {
    const contact = editableContactList[index];

    if (!formData.id) {
      toast.error('Save the basic vendor data before updating contact!', { position: 'top-right' });
      return;
    }

    const payload = {
      name: contact.name,
      email: contact.email,
      mobileNo: contact.mobileNo,
      isDefault: contact.isDefault === true,
      vendorId: formData.id,
      createdBy: localStorage.getItem('userId'),
    };

    setTickHandled(false);

    if (contact.id) {
      payload.id = contact.id;
      dispatch(tickRequest(payload));
    } else {
      dispatch(contactRequest(payload));
    }
  };

  useEffect(() => {
    if (!loading && formData.id && tickResponse && !tickHandled) {
      const isSuccess = tickResponse.success ?? tickResponse.status === 'success';

      if (isSuccess) {
        toast.success('Vendor contact updated successfully', { position: 'top-right' });

        const updatedList = editableContactList.map((c) =>
          c.id === tickResponse.id ? { ...tickResponse, isDefault: tickResponse.isDefault === true } : c
        );

        setEditableContactList(updatedList);
        setFormdata((prev) => ({ ...prev, contactList: updatedList }));
        setTickHandled(true);
      }
    }
  }, [tickResponse, loading, formData.id, tickHandled]);

  useEffect(() => {
    if (!contactState.loading && contactState.contactData && !tickHandled) {
      toast.success('Vendor contact created successfully', { position: 'top-right' });

      const updatedList = [...editableContactList];
      updatedList[editableContactList.length - 1] = {
        ...contactState.contactData,
        isDefault: contactState.contactData.isDefault === true,
      };

      setEditableContactList(updatedList);
      setFormdata((prev) => ({ ...prev, contactList: updatedList }));
      setTickHandled(true);
    }
  }, [contactState.contactData, contactState.loading, tickHandled]);

  useEffect(() => {
    if (!loading && error) {
      toast.error(`Update failed: ${error.message || 'Something went wrong'}`, { position: 'top-right' });
    }
  }, [error, loading]);

  const addContactRow = () => {
    setEditableContactList([
      ...editableContactList,
      { name: '', email: '', mobileNo: '', isDefault: undefined, isNew: true },
    ]);
  };

  const deleteContactRow = (index) => {
    const totalRows = editableContactList.length;
    const isNewVendor = !formData.id;

    if (totalRows === 1) {
      toast.warning("Can't delete the row when there is only one row", { position: 'top-right' });
      if (!isNewVendor) {
        const updated = [...editableContactList];
        updated[0] = {
          ...updated[0],
          name: '',
          email: '',
          mobileNo: '',
          isDefault: undefined,
        };
        setEditableContactList(updated);
      }
      return;
    }

    const updatedList = editableContactList.filter((_, i) => i !== index);
    setEditableContactList(updatedList);
    toast.success('Row deleted successfully', { position: 'top-right' });
  };

  useEffect(() => {
    if (!contactSubmitClicked) return;

    const defaultCount = editableContactList.filter(c => c.isDefault === true).length;
    const isDefaultInvalid = defaultCount !== 1;
    setLocalError(isDefaultInvalid);
    setShowContactError(isDefaultInvalid);

    setContactSubmitClicked(false);
  }, [contactSubmitClicked, editableContactList, setShowContactError]);

  return (
    <div className="contact-table-wrapper">
      {localError && (
        <div className="text-center mb-3">
          <div className="error-box">Choose exactly one contact as default.</div>
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
          {editableContactList.map((contact, index) => (
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
                  {showErrors && !contact.name && <small className="p-error">Name is required</small>}
                </div>
              </td>
              <td>
                <div className="input-container">
                  <input
                    className={`underline-input ${showErrors && (!contact.email || !isValidEmail(contact.email)) ? 'p-invalid' : ''}`}
                    placeholder="Email"
                    value={contact.email}
                    onChange={(e) => handleContactChange(index, 'email', e.target.value)}
                  />
                  {showErrors && !contact.email && <small className="p-error">Email is required</small>}
                  {showErrors && contact.email && !isValidEmail(contact.email) && (
                    <small className="p-error">Invalid email format</small>
                  )}
                </div>
              </td>
              <td>
                <div className="input-container">
                  <input
                    className={`underline-input ${showErrors && (!contact.mobileNo || !isValidPhone(contact.mobileNo)) ? 'p-invalid' : ''}`}
                    placeholder="Phone No"
                    value={contact.mobileNo}
                    onChange={(e) => handleContactChange(index, 'mobileNo', e.target.value)}
                  />
                  {showErrors && !contact.mobileNo && <small className="p-error">Phone number is required</small>}
                  {showErrors && contact.mobileNo && !isValidPhone(contact.mobileNo) && (
                    <small className="p-error">Invalid phone number</small>
                  )}
                </div>
              </td>
              <td>
                <select
                  className="underline-input"
                  value={
                    contact.isDefault === true ? 'true' :
                      contact.isDefault === false ? 'false' : ''
                  }
                  onChange={(e) => handleContactChange(index, 'isDefault', e.target.value === 'true')}
                >
                  <option value="" disabled hidden>Is Default</option>
                  <option value="true">Yes</option>
                  <option value="false">No</option>
                </select>
              </td>
              <td>
                {isEditMode && formData.id && (
                  <FaCheck
                    style={{ color: 'green', marginRight: '10px', cursor: 'pointer' }}
                    onClick={() => handleTickClick(index)}
                    title="Confirm Contact Update"
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
