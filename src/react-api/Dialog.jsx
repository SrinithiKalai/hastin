import React, { useEffect, useState } from 'react';
import { Dialog } from 'primereact/dialog';
import { useDispatch, useSelector } from 'react-redux';
import { apiRequest } from '../Redux/Action/LoginAction';
import { useNavigate } from 'react-router-dom';

function Modal({ setVisible, visible }) {
  const [value, setValue] = useState("");
  const success = useSelector((state) => state?.login?.data);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (success?.data.accessCode) {
      setValue(success.data.accessCode);
    }
  }, [success]);

  const handleSubmit = () => {
    const payload = success?.data;
    dispatch(apiRequest(payload));
    navigate("/table");
  };

  return (
    <Dialog
      className="dialog"
      header="OTP VERIFICATION"
      visible={visible}
      position="top"
      style={{
        maxWidth: "100vw !important",
        backgroundColor: "white",
        boxShadow: "2px 2px 10px #D3D3D3",
        padding: "20px",
      }}
      onHide={() => setVisible(false)}
    >
      <h3 style={{ textAlign: 'center' }}>Enter The OTP</h3>
      <p className="text-center">
        We've sent an OTP to +6591495625 ** To Continue the application,
      </p>
      <p className="text-center pb-0">please enter the OTP below</p>
      <div className="text-center">
        <label className="mx-2">{success?.data.opaque}- </label>
        <input
          type="text"
          style={{ width: '100px', textAlign: "center" }}
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
      </div>
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <button
          type="button"
          className="btn bg-danger text-white mt-3"
          onClick={handleSubmit}
          disabled={!value}
        >
          Verify
        </button>
      </div>
    </Dialog>
  );
}

export default Modal;
