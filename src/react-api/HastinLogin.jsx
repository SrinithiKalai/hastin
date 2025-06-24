import React, { useEffect, useState } from 'react';
import './HastinLogin.css';
import { useDispatch, useSelector } from 'react-redux';
import { loginRequest } from '../Redux/Action/LoginAction';
import Modal from './Dialog';
import * as Yup from 'yup';
import bgImage from '../assets/image1.jpeg';
import pic1 from '../assets/pic1.jpg';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function HastinLogin() {
  const [userName, setName] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});
  const [visible, setVisible] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const dispatch = useDispatch();

  const { data: response, loading, error } = useSelector((state) => state?.login);

  const validationSchema = Yup.object().shape({
    userName: Yup.string().required('Username is required'),
    password: Yup.string().required('Password is required')
  });

  useEffect(() => {
    if (!loading && response && !error) {
      localStorage.setItem("isLoggedIn", true);
      toast.success('Login successfully!');
      setVisible(true);
    }
  }, [loading, response, error]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await validationSchema.validate({ userName, password }, { abortEarly: false });
      setErrors({});
      dispatch(loginRequest({ userName, password }));
    } catch (validationErrors) {
      const formattedErrors = {};
      validationErrors.inner.forEach((error) => {
        formattedErrors[error.path] = error.message;
      });
      setErrors(formattedErrors);
    }
  };

  return (
    <div className="login-container" style={{ backgroundImage: `url(${bgImage})` }}>
      <div className="login-card">
        <img src={pic1} alt="User" className="login-user-icon" />
        <p className="login-title">Welcome! Log In</p>
        <label><b>User Name</b></label>
        <input
          type="text"
          value={userName}
          placeholder="User Name"
          className="input-field"
          onChange={(e) => setName(e.target.value)}
        />
        {errors.userName && <div className="error-text">{errors.userName}</div>}
        <label><b>Password</b></label>
        <div className="password-container">
          <input
            type={showPassword ? 'text' : 'password'}
            value={password}
            placeholder="Password"
            className="input-field"
            onChange={(e) => setPassword(e.target.value)}
          />
          {password.length > 0 && (
            <span className="toggle-icon" onClick={() => setShowPassword(!showPassword)}>
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </span>
          )}
        </div>
        {errors.password && <div className="error-text">{errors.password}</div>}

        <button className="login-button" onClick={handleSubmit}>Login</button>
      </div>

      {visible && <Modal visible={visible} setVisible={setVisible} />}
      <ToastContainer />
    </div>
  );
}

export default HastinLogin;