import React, { useEffect, useState } from 'react'
import './HastinLogin.css';
import { useDispatch, useSelector } from 'react-redux';
import { loginRequest } from '../Redux/Action/LoginAction'
import Modal from './Dialog';
import * as Yup from 'yup';
import image1 from "../assets/image1.jpeg";

function HastinLogin() {
    const [userName, setName] = useState("");
    const [password, setPassword] = useState("");
    const [errors, setErrors] = useState({});
    const [visible, setVisible] = useState(false);
    const dispatch = useDispatch();
    const { data: response, loading, error } = useSelector((state) => state?.login);
    const validationSchema = Yup.object().shape({
        userName: Yup.string().required('Username is required'),
        password: Yup.string().required('Password is required')
    });

    useEffect(() => {
        console.log("loading:", loading, "response:", response, "error:", error);
        if (!loading && response && !error) {
            setVisible(true);
        }
    }, [loading, response, error]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            await validationSchema.validate({ userName, password }, { abortEarly: false });
            setErrors({});

            const payload = {
                userName,
                password
            };
            dispatch(loginRequest(payload));

        } catch (validationErrors) {
            const formattedErrors = {};
            validationErrors.inner.forEach((error) => {
                formattedErrors[error.path] = error.message;
            });
            setErrors(formattedErrors);
        }
    };

    return (
        <div className="login-container" style={{ backgroundImage: `url(${image1})` }}>
            <div className='login-card'>
                <p className='login-title'>Welcome! Log In</p>
                <input type='text' value={userName} placeholder='User Name' className='input-field' onChange={(e) => setName(e.target.value)} />
                {errors.userName && <div className='error-text'>{errors.userName}</div>}
                <input type='password' value={password} placeholder='Password' className='input-field mt-4' onChange={(e) => setPassword(e.target.value)} />
                {errors.password && <div className='error-text'>{errors.password}</div>}
                <button className='login-button' onClick={handleSubmit}>Login</button>
            </div>
            {visible && <Modal visible={visible} setVisible={setVisible} />}
        </div>

    )
}
export default HastinLogin
