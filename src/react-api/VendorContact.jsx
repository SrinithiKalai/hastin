import React from 'react';
import { FaTrash } from 'react-icons/fa';
import './FormUpdate.css';

function VendorContact({ formData, setFormdata, showErrors }) {
  const contactList = formData.contactList || [];

  const handleContactChange = (index, field, value) => {
    const updated = [...contactList];
    updated[index] = { ...updated[index], [field]: value };

    if (index === 0 && field !== 'isDefault') {
      updated[0].isDefault = true;
    }

    setFormdata({ ...formData, contactList: updated });
  };

  const addContactRow = () => {
    const updated = [
      ...contactList,
      { name: '', email: '', mobileNo: '', isDefault: undefined },
    ];
    setFormdata({ ...formData, contactList: updated });
  };

  const deleteContactRow = (index) => {
  if (contactList.length === 1) {
    const onlyContact = contactList[0];

    const isEmpty =
      !onlyContact.name?.trim() &&
      !onlyContact.email?.trim() &&
      !onlyContact.mobileNo?.trim();

    if (isEmpty) {
      alert("At least one contact is required.");
      return;
    }

    const cleared = [{ name: '', email: '', mobileNo: '', isDefault: undefined }];
    setFormdata({ ...formData, contactList: cleared });
    return;
  }

    const updated = contactList.filter((_, i) => i !== index);
    setFormdata({ ...formData, contactList: updated });
  };

  const isValidEmail = (email) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const isValidPhone = (phone) => /^\d{7,15}$/.test(phone);

  return (
    <div className="container-fluid">
      <div className="contact-table p-3 border">
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
                  <div className="p-field">
                    <input
                      className={`underline-input ${showErrors && !contact.name ? 'p-invalid' : ''}`}
                      placeholder="Name"
                      value={contact.name}
                      onChange={(e) =>
                        handleContactChange(index, 'name', e.target.value)
                      }
                    />
                    {showErrors && !contact.name && (
                      <small>Name is required</small>
                    )}
                  </div>
                </td>

                <td>
                  <div className="p-field">
                    <input
                      className={`underline-input ${
                        showErrors &&
                        (!contact.email || !isValidEmail(contact.email))
                          ? 'p-invalid'
                          : ''
                      }`}
                      placeholder="Email"
                      value={contact.email}
                      onChange={(e) =>
                        handleContactChange(index, 'email', e.target.value)
                      }
                    />
                    {showErrors && !contact.email && (
                      <small>Email is required</small>
                    )}
                    {showErrors &&
                      contact.email &&
                      !isValidEmail(contact.email) && (
                        <small>Invalid email format</small>
                      )}
                  </div>
                </td>

                <td>
                  <div className="p-field">
                    <input
                      className={`underline-input ${
                        showErrors &&
                        (!contact.mobileNo || !isValidPhone(contact.mobileNo))
                          ? 'p-invalid'
                          : ''
                      }`}
                      placeholder="Phone No"
                      value={contact.mobileNo}
                      onChange={(e) =>
                        handleContactChange(index, 'mobileNo', e.target.value)
                      }
                    />
                    {showErrors && !contact.mobileNo && (
                      <small>Phone number is required</small>
                    )}
                    {showErrors &&
                      contact.mobileNo &&
                      !isValidPhone(contact.mobileNo) && (
                        <small>Invalid phone number</small>
                      )}
                  </div>
                </td>

                <td>
                  <div className="p-field">
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
                        handleContactChange(
                          index,
                          'isDefault',
                          e.target.value === 'true'
                        )
                      }
                    >
                      <option value="" disabled hidden>
                        Is Default
                      </option>
                      <option value="true">Yes</option>
                      <option value="false">No</option>
                    </select>
                  </div>
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
          style={{
            background: 'linear-gradient(to right, #6366f1, #60a5fa)',
            color: 'white',
            border: 'none',
          }}
        >
          Add Contact
        </button>
      </div>
    </div>
  );
}

export default VendorContact;
