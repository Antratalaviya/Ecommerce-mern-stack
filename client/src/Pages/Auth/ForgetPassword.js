import React, { useState } from 'react'
import Layout from '../../components/Layout/Layout'
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
const ForgetPassword = () => {
    const [email, setEmail] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [answer, setAnswer] = useState('');

    const navigate = useNavigate();
    // form function
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post(`${process.env.REACT_APP_API}/api/v1/auth/forget-password`, { email, answer, newPassword });
            if (res?.data.success) {
                toast.success(res.data.message);
                navigate('/login');
            } else {
                toast.success(res.data.message)
            }
        } catch (error) {
            toast.error("Something went wrong");
        }
    }
    return (
        <Layout title={"forget password - Ecommerce app"}>
            <div className="r-container">
                <div className='register'>
                    <h1>Login Form</h1>
                    <form onSubmit={handleSubmit} >
                        <Toaster />
                        <div className="mb-3">
                            <input type="email"
                                className="form-control no-border"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                aria-describedby="emailHelp"
                                placeholder='Enter your Email' />
                        </div>
                        <div className="mb-3">
                            <input type="text"
                                className="form-control"
                                value={answer}
                                onChange={(e) => setAnswer(e.target.value)}
                                placeholder='Enter your favourite game' />
                        </div>
                        <div className="mb-3">
                            <input type="password"
                                className="form-control"
                                value={newPassword}
                                onChange={(e) => setNewPassword(e.target.value)}
                                placeholder='Enter your new Password' />
                        </div>
                        <button type="submit" className="btn btn-primary">Reset</button>
                    </form>
                </div>
            </div>
        </Layout>
    )
}

export default ForgetPassword
