import React, { useEffect, useState } from 'react'
import Layout from '../../components/Layout/Layout'
import UserMenu from '../../components/Layout/UserMenu'
import { useAuth } from '../../context/auth'
import { toast } from 'react-hot-toast'
import axios from 'axios'
import { useLocation, useNavigate } from 'react-router-dom'

const Profile = () => {
  const [auth, setAuth] = useAuth();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
     const { name, email, phone, address } = auth?.user
      setName(name);
      setEmail(email);
      setPhone(phone);
      setAddress(address)
  }, [auth?.user])
  // form function
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const {data} = await axios.put(`${process.env.REACT_APP_API}/api/v1/auth/profile`, { name, email, password, phone, address });
      if(data?.success) {
        setAuth({...auth, user:data?.user});
        let ls = localStorage.getItem('auth');
        ls = JSON.parse(ls);
        ls.user = data?.user;
        localStorage.setItem('auth', JSON.stringify(ls));
        toast.success("Profile updated Successfully")
        navigate(location.state || '/');
      }
      else {
        toast.error(data?.message);
      }

    } catch (error) {
      toast.error("Something went wrong");
    }

  }
  return (
    <Layout title={'Ecommerce - Profile'}>
      <div className="container-fluid p-3 profile allcontainer">
        <div className="row">
          <div className="col-md-3 text-center userboard">
            <h4 className='mb-3'>User Dashboard</h4><hr/>
            <UserMenu />
          </div>
          <div className="col-md-9 w-75 p-3 mt-2 profile-div">
            <div className="profile-div-1">
              <h1>Your Profile</h1>
              <div>
                <form onSubmit={handleSubmit} >
                  <div className="mb-3">
                    <input type="name"
                      className="form-control no-border"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder='Enter your Name' />
                  </div>
                  <div className="mb-3">
                    <input type="email"
                      className="form-control no-border"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder='Enter your Email'
                      disabled />
                  </div>
                  <div className="mb-3">
                    <input type="password"
                      className="form-control"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder='Enter your Password' />
                  </div>
                  <div className="mb-3">
                    <input type="phone"
                      className="form-control no-border"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder='Enter your Phone' />
                  </div>
                  <div className="mb-3">
                    <input type="address"
                      className="form-control no-border"
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      placeholder='Enter your Address' />
                  </div>
                  <button type="submit" className="btn btn-primary">Update Profile</button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default Profile
