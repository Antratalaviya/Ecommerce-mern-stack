import React, { useState } from 'react'
import axios from 'axios';
import toast from 'react-hot-toast';
import { Link, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { Checkbox } from 'antd';
import { BsEye, BsEyeSlash } from 'react-icons/bs'

const Register = () => {

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [answer, setAnswer] = useState('');
  const [eye, setEye] = useState(false);
  const navigate = useNavigate();

  // form function
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${process.env.REACT_APP_API}/api/v1/auth/register`, { name, email, password, phone, address, answer });
      if (res.data.success) {
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
    <>
      <Helmet><title>Sign up | Ecommerce app</title></Helmet>
      <div className="r-container">
        <h2 className='rhead'>Ecommerce</h2>
        <div className='r-box'>
          <div className='r-box1'>
            <h1>Ecommerce <br /> Application</h1>
          </div>
          <div className='r-box2'>
            Maecenas non felis nec ex dignissim lobortis.<br />Praesent vel arcu id dui interdum maximus.<br />  Interdum et malesuada fames ac ante ipsum primis in faucibus.
          </div>
          <div className='r-box2'>
            Maecenas non felis nec ex dignissim lobortis.<br />Praesent vel arcu id dui interdum maximus.<br />  Interdum et malesuada fames ac ante ipsum primis in faucibus.
          </div>
          <div className='r-box2'>
            Maecenas non felis nec ex dignissim lobortis.<br />Praesent vel arcu id dui interdum maximus.<br />  Interdum et malesuada fames ac ante ipsum primis in faucibus.
          </div>
        </div>
        <div className='register2 register'>
          <h1>Sign up</h1>
          <form>
            <div className="mb-3">
              <input type="name"
                className="form-control no-border"
                value={name}
                onChange={(e) => setName(e.target.value)}
                aria-describedby="emailHelp"
                placeholder='Name *' />
            </div>
            <div className="mb-3">
              <input type="email"
                className="form-control no-border"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                aria-describedby="emailHelp"
                placeholder='Email *' />
            </div>
            <div className="mb-3 password">
              <input type={eye ? 'text' : 'password'}
                className="form-control"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder='Password *' />
              <button onClick={(e) => {
                e.preventDefault();
                setEye(!eye);
              }} className='btn-eye'>{eye ? <BsEye /> : <BsEyeSlash />}</button>
            </div>
            <div className="mb-3">
              <input type="phone"
                className="form-control no-border"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                aria-describedby="emailHelp"
                placeholder='Phone *' />
            </div>
            <div className="mb-3">
              <input type="address"
                className="form-control no-border"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                aria-describedby="emailHelp"
                placeholder='Address *' />
            </div>
            <div className="mb-3">
              <input type="text"
                className="form-control no-border"
                value={answer}
                onChange={(e) => setAnswer(e.target.value)}
                aria-describedby="emailHelp"
                placeholder='favourite sports *' />
            </div>
            <div className='mb-3 checkbox'>
              <Checkbox>
                I agree to the <span className='spanc'>Terms of Service</span> and <span className='spanc'>Privacy Policy.</span>
              </Checkbox>
            </div>
            <button type="submit"
              className="btn btn-primary"
              onClick={() => handleSubmit}>Create your account</button>
            <div className='rlinkb'>
              <Link to={'/login'} className='rlink'>Sign in</Link>
            </div>
          </form>
        </div>
      </div>
    </>
  )
}

export default Register
