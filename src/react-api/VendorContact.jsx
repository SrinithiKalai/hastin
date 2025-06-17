import React from 'react';
import { FaTrash } from 'react-icons/fa';
import "./FormUpdate.css";

function VendorContact({ formData, setFormdata, showErrors }) {
  const contactList = formData.contactList || [];

  const handleContactChange = (index, field, value) => {
    const updated = [...contactList];
    updated[index] = { ...updated[index], [field]: value };
    if (index === 0) updated[0].isDefault = true;

    setFormdata({ ...formData, contactList: updated });
  };

  const addContactRow = () => {
    const updated = [...contactList, { name: "", email: "", mobileNo: "", isDefault: false }];
    setFormdata({ ...formData, contactList: updated });
  };

  const deleteContactRow = (index) => {
    if (contactList.length === 1) return;
    const updated = contactList.filter((_, i) => i !== index);
    setFormdata({ ...formData, contactList: updated });
  };

  const isValidEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const isValidPhone = (phone) => /^\d{7,15}$/.test(phone);
  return (
    <div className="container-fluid">
      <div className="contact-table p-3 border">
        <table className="table table-bordered text-center">
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
            {contactList.map((contact, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>
                  <input
                    className="underline-input"
                    value={contact.name}
                    onChange={e => handleContactChange(index, 'name', e.target.value)}
                  />
                  {showErrors && !contact.name && (
                    <div className="text-danger">Name is required</div>
                  )}
                </td>
                <td>
                  <input
                    className="underline-input"
                    value={contact.email}
                    onChange={e => handleContactChange(index, 'email', e.target.value)}
                  />
                  {showErrors && !contact.email && (
                    <div className="text-danger">Email is required</div>
                  )}
                  {showErrors && contact.email && !isValidEmail(contact.email) && (
                    <div className="text-danger">Invalid email format</div>
                  )}
                </td>
                <td>
                  <input
                    className="underline-input"
                    value={contact.mobileNo}
                    onChange={e => handleContactChange(index, 'mobileNo', e.target.value)}
                  />
                  {showErrors && !contact.mobileNo && (
                    <div className="text-danger">Phone number is required</div>
                  )}
                  {showErrors && contact.mobileNo && !isValidPhone(contact.mobileNo) && (
                    <div className="text-danger">Invalid phone number</div>
                  )}
                </td>
                <td>
                  <select
                    className="underline-input"
                    value={(contact.isDefault ?? false).toString()}
                    onChange={e => handleContactChange(index, 'isDefault', e.target.value === 'true')}
                  >
                    <option value="true">Yes</option>
                    <option value="false">No</option>
                  </select>
                </td>
                <td>
                  <FaTrash
                    style={{ color: 'red', cursor: 'pointer' }}
                    onClick={() => deleteContactRow(index)}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <button
          className="btn mt-3"
          onClick={addContactRow}
          style={{ background: 'linear-gradient(to right, #ec4899, #8b5cf6)', color: 'white', border: 'none' }}
        >
          Add Contact
        </button>
      </div>
    </div>
  );
}

export default VendorContact;
