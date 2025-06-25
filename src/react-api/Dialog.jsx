import React, { useEffect, useState } from 'react';
import { Dialog } from 'primereact/dialog';
import { useDispatch, useSelector } from 'react-redux';
import { apiRequest, resendRequest } from '../Redux/Action/LoginAction';
import { useNavigate } from 'react-router-dom';

function Modal({ setVisible, visible }) {
  const [value, setValue] = useState('');
  const [timer, setTimer] = useState(120);
  const [canResend, setCanResend] = useState(false);
  const [sessionExpired, setSessionExpired] = useState(false);

  const success = useSelector((state) => state?.login?.data);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (success?.data?.accessCode && !sessionExpired) {
      setValue(success.data.accessCode);
    }
  }, [success, sessionExpired]);

  useEffect(() => {
    let countdown;
    if (visible && timer > 0) {
      countdown = setInterval(() => setTimer((prev) => prev - 1), 1000);
    } else if (timer === 0) {
      setCanResend(true);
      setSessionExpired(true);
      setValue('');
    }
    return () => clearInterval(countdown);
  }, [timer, visible]);

  const formatTime = (seconds) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  const handleResend = () => {
    setTimer(120);
    setCanResend(false);
    setSessionExpired(false);
    setValue('');

    const resendPayload = {
      jwt: success?.data?.jwt
    };
    dispatch(resendRequest(resendPayload));
  };

  const handleSubmit = () => {
    const payload = {
      opaque: success?.data?.opaque,
      accessCode: value,
      jwt: success?.data?.jwt
    };
    dispatch(apiRequest(payload));
    navigate('/table', {
      state: {
        loginSuccess: true,
        accessCodeVerified: true
      }
    });
  };

  return (
    <Dialog
      className="dialog"
      header="OTP VERIFICATION"
      visible={visible}
      position="top"
      style={{
        width: '500px',
        backgroundColor: 'white',
        boxShadow: '2px 2px 10px #D3D3D3',
        borderRadius: '12px',
      }}
      onHide={() => setVisible(false)}
      draggable={false}
    >
      <h4 style={{ textAlign: 'center', fontWeight: 'bold' }}>Enter The OTP</h4>
      <p className="text-center" style={{ marginTop: 10, fontSize: '14px' }}>
        We've sent an OTP to <strong>+6591495625**</strong><br />
        To continue the application, please enter the OTP below.
      </p>

      <div className="text-center mt-3 mb-3">
        {!sessionExpired && (
          <label className="mx-2" style={{ fontWeight: 'bold' }}>{success?.data?.opaque} - </label>
        )}
        <input
          type="text"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          autoFocus
          onPaste={(e) => e.preventDefault()}
          disabled={sessionExpired}
          style={{
            width: '100px',
            height: '40px',
            fontSize: '18px',
            textAlign: 'center',
            borderRadius: '10px',
            border: '1px solid #ced4da'
          }}
        />
      </div>

      {sessionExpired && (
        <p className="text-danger text-center mt-2 mb-0" style={{ fontSize: '14px' }}>
          OTP has expired. Please click "Resend OTP"
        </p>
      )}

      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          gap: '10px',
          alignItems: 'center',
          marginTop: '10px',
          flexWrap: 'wrap'
        }}
      >
        <div
          style={{
            fontSize: '14px',
            display: 'flex',
            alignItems: 'center',
            color: canResend ? 'red' : '#6c757d'
          }}
        >
          <span style={{ marginRight: '5px', marginTop: "5px" }}>🕒</span>
          <span style={{ marginTop: "5px" }}>{formatTime(timer)}</span>
        </div>

        <button
          type="button"
          className="btn btn-danger text-white mt-2"
          onClick={handleResend}
          disabled={!canResend}
        >
          Resend OTP
        </button>

        <button
          type="button"
          className="btn bg-success text-white mt-2"
          onClick={handleSubmit}
          disabled={!value || sessionExpired}
        >
          Verify
        </button>
      </div>
    </Dialog>
  );
}

export default Modal;
