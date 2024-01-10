import React, { useState } from 'react'
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/auth';
import { AiOutlineUser } from 'react-icons/ai'
import { RiLockPasswordFill } from 'react-icons/ri'
import { Helmet } from 'react-helmet';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [auth, setAuth] = useAuth();
    const navigate = useNavigate();
    const location = useLocation();


    // form function
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post(`${process.env.REACT_APP_API}/api/v1/auth/login`, { email, password });
            if (res?.data.success) {
                setAuth({
                    ...auth,
                    user: res.data.user,
                    token: res.data.token
                })
                localStorage.setItem("auth", JSON.stringify(res.data));
                toast.success(res.data.message);
                navigate(location.state || '/');
            } else {
                toast.success(res.data.message)
            }
        } catch (error) {
            toast.error("Something went wrong");
        }
    }
    return (
        <>
            <Helmet><title>Log in | Ecommerce app</title></Helmet>
            <div className="l-container login">
                <img src="https://www.odtap.com/wp-content/uploads/2019/03/delivery.png" alt="login_img" />
                <div className='idiv'>
                    <div className="div1">
                        <h1>Ecommerce<br />mern stack<br /> project</h1>
                    </div>
                    <div className="div2">
                        Lorem ipsum dolor sit amet<br /> consectetur adipisicing elit.<br /> Est voluptate distinctio nobis nihil<br /> quam vero ex tempore earum et, dolorem explicabo consectetur<br /> quasi dicta molestias sed beatae<br /> unde id. Sint?
                    </div>
                </div>
                <div className='register'>
                    <h2 className='lhead'>Ecommerce</h2>
                    <h2 className='lbody'>Log in to your account</h2>
                    <h5 className='llink'>Don't have an account?<Link to={'/register'} className='link'>Sign up</Link> </h5>
                    <h6><span>Or with email and password</span></h6>
                    <form onSubmit={handleSubmit} >
                        <Toaster />
                        <div className="mb-3 d-flex">
                            <div className='userbox'>
                                <AiOutlineUser className='user' />
                            </div>
                            <input type="email"
                                className="form-control no-border"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                aria-describedby="emailHelp"
                                placeholder='Enter your Email' />
                        </div>
                        <div className="mb-3 d-flex">
                            <div className='userbox'>
                                <RiLockPasswordFill className='user' />
                            </div>
                            <input type="password"
                                className="form-control"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder='Enter your Password' />
                        </div>
                        <button type="submit" className="btn btn-primary mb-2 mt-5">Login</button>
                        <button type="text" className="btn-forget" onClick={() => navigate('/forget-password')}>Forgret Password</button>
                    </form>
                </div>
            </div>
        </>
    )
}

export default Login
