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
        <div style={{backgroundImage: `url(${image1})`, backgroundSize: "cover", height: "100vh", padding: "120px"}}>
            <div className='card mx-auto' style={{ width: "450px", height: "400px"}}>
                <p style={{ fontSize: "20px", textAlign: "center", marginTop: "40px", marginBottom: "50px" }}>Welcome! Log In</p>
                <input type='text' value={userName} placeholder='User Name' className=' input-field   mx-auto' onChange={(e) => setName(e.target.value)} />
                {errors.userName && <div style={{ color: 'red', fontSize: '12px', textAlign: 'center' }}>{errors.userName}</div>}
                <input type='password' value={password} placeholder='Password' className=' input-field mt-4  mx-auto' onChange={(e) => setPassword(e.target.value)} />
                {errors.password && <div style={{ color: 'red', fontSize: '12px', textAlign: 'center' }}>{errors.password}</div>}
                <button className='bg-danger text-white mx-auto mt-5' style={{ border: "none", padding: "7px", width: "360px" }} onClick={handleSubmit} >Login</button>
            </div>
            {visible && (
                <Modal visible={visible} setVisible={setVisible} />
            )}
        </div>
    )
}
export default HastinLogin
