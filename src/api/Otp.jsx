import React, { useEffect, useState } from 'react';
import { Button, Input, Modal } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { validRequest } from '../Redux/Action/LoginAction';
import { useNavigate } from 'react-router-dom';

function OtpModal({ visible, onHide }) {
  const dispatch = useDispatch();
  const [resdata, setResdata] = useState("");
  const responseData = useSelector((state) => state?.login?.data);
  const navigate = useNavigate();
  
  const validData = (e) => {
    e.preventDefault();
  
    const response = responseData?.[0]?.data;
  
    const payload = {
      ...response,
      accessCode: resdata 
    };
  
    dispatch(validRequest(payload));
    navigate("/navbar")
  };
  

  useEffect(() => {
    if (responseData?.[0]?.data?.accessCode) {
      setResdata(responseData[0]?.data?.accessCode);
    }
  }, [responseData]);
  
  return (
    <Modal title="OTP VERIFICATION" open={visible} onCancel={onHide} footer={null} width="500px" closable>
      <div className="text-center">
        <h3>Enter Your OTP</h3>
        <p>We've sent an OTP to +6591495625 ** To continue the application,</p>
        <p>Please enter the OTP below</p>
        <div style={{ display: "flex", justifyContent: "center", gap: "5px" }}>
          <label className='mt-2'>{responseData?.[0]?.data?.opaque}-</label>
          <Input className="mb-3" style={{ width: "100px" }} size='large'value={resdata} onChange={(e) => setResdata(e.target.value)} />
        </div>
        <div>
          <Button style={{ border: 'none', backgroundColor: 'red', color: 'white' }} onClick={validData}>Verify</Button>
        </div>
      </div>
    </Modal>
  );
}

export default OtpModal;
