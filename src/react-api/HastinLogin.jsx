import React, { useEffect, useState } from 'react';
import './HastinLogin.css';
import { useDispatch, useSelector } from 'react-redux';
import { loginRequest } from '../Redux/Action/LoginAction';
import Modal from './Dialog';
import * as Yup from 'yup';
import image1 from "../assets/image1.jpeg";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function HastinLogin() {
    const [userName, setName] = useState("");
    const [password, setPassword] = useState("");
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
            toast.success("Login successfully!");
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

    const handleNameChange = (e) => {
        setName(e.target.value);
        if (errors.userName) {
            setErrors(prev => ({ ...prev, userName: '' }));
        }
    };

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
        if (errors.password) {
            setErrors(prev => ({ ...prev, password: '' }));
        }
    };

    return (
        <div className="login-container" style={{ backgroundImage: `url(${image1})` }}>
            <div className='login-card'>
                <p className='login-title'>Welcome! Log In</p>

                <input
                    type='text'
                    value={userName}
                    placeholder='User Name'
                    className='input-field'
                    onChange={handleNameChange}
                />
                {errors.userName && <div className='error-text'>{errors.userName}</div>}

                <div className='password-container'>
                    <input
                        type={showPassword ? 'text' : 'password'}
                        value={password}
                        placeholder='Password'
                        className='input-field mt-4'
                        onChange={handlePasswordChange}
                    />
                    {password.length > 0 && (
                        <span className='toggle-icon' onClick={() => setShowPassword(!showPassword)}>
                            {showPassword ? <FaEyeSlash /> : <FaEye />}
                        </span>
                    )}
                </div>
                {errors.password && <div className='error-text'>{errors.password}</div>}

                <button className='login-button' onClick={handleSubmit}>Login</button>
            </div>

            {visible && <Modal visible={visible} setVisible={setVisible} />}
            <ToastContainer />
        </div>
    );
}

export default HastinLogin;

