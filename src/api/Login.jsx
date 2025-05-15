import React, { useState } from 'react';
import "./Login.css";
import { useDispatch } from 'react-redux';
import { Button } from 'primereact/button';
import rose from "../assets/rose.jpg";
import OtpModal from './Otp';

function Login() {
    const [userName, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [errors, setErrors] = useState({ userName: "", password: "" });
    const [visible, setVisible] = useState(false);

    const dispatch = useDispatch();
    
    const submitData = (e) => {
        e.preventDefault();
        let valid = true;
        let tempErrors = { userName: "", password: "" };
        if (userName.trim() === "") {
            tempErrors.userName = "User name is required";
            valid = false;
        }
        if (password.trim() === "") {
            tempErrors.password = "Password is required";
            valid = false;
        }
        if (valid) {
            if (userName !== "ebrain" || password !== "Ji#993te") {
                tempErrors.userName = "Invalid credentials";
                tempErrors.password = "Invalid credentials";
                valid = false;
            }
        }
    
        setErrors(tempErrors);
        if (valid) {
            const payload = { userName, password };
            dispatch({ type: "LOGIN_REQUEST", payload });
            setUsername("");
            setPassword("");
            setErrors({ userName: "", password: "" });
            setVisible(true);
        }
    };
    const modalClose = () => {
        setVisible(false);
    }
    
    return (
        <div className='card-container' style={{ backgroundImage: `url(${rose})`, backgroundSize: "cover", height: "100vh" }}>
            <div className='login-card'>
                <h2>Welcome! Log In</h2>
                <div className='field mt-4'>
                    <input className='field1' type='text' value={userName} onChange={(e) => setUsername(e.target.value)} placeholder='User Name' />
                    {errors.userName && <span style={{ color: 'red' }}>{errors.userName}</span>}
                </div>

                <div className='field mt-4'>
                    <input className='field2' type='password' value={password} onChange={(e) => setPassword(e.target.value)} placeholder='Password' />
                    {errors.password && <span style={{ color: 'red' }}>{errors.password}</span>}
                </div>

                <div className='mt-4'>
                    <Button label="Login" onClick={submitData} className="w-100 p-button-danger" style={{ width: '100%', border: 'none' }} />

                </div>
            </div>
            <OtpModal visible={visible} onHide={modalClose} />
        </div>

    )
}

export default Login
