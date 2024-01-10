import React, { useState } from 'react'
import Layout from '../../components/Layout/Layout'
import { BsTelephone } from 'react-icons/bs'
import { FiMail } from 'react-icons/fi'
import { FaLocationDot } from 'react-icons/fa6'
import { AiFillFacebook, AiOutlineTwitter, AiFillInstagram, AiOutlineYoutube } from 'react-icons/ai'
import axios from 'axios'
import {BsLinkedin} from 'react-icons/bs'
import { toast } from 'react-hot-toast'

const Contact = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleMail = async (e) => {
    e.preventDefault();
    const contactForm = new FormData();
    contactForm.append('name', name);
    contactForm.append('email', email);
    contactForm.append('message', message);
    try {
      const { data } = await axios.post(`${process.env.REACT_APP_API}/api/v1/auth/send`, contactForm);
      if (data?.success) {
        toast.success(data.message);
        setName('');
        setEmail('');
        setMessage('');
      }
      else {
        toast.error(data.message)
      }
    } catch (error) {
      toast.error('Something went Wrong')
    }
  }

  return (
    <Layout title={'contact- Ecommerce'}>
      <div className='containerbox allcontainer'>
        <h1>Contact Us</h1>
        <div className='contactcon'>
          <div className='contactb1'>
            <div className='contactinfo'>
              <h2>Contact <br />Information</h2>
              <p>Fill up the form and then click send</p>
              <text><BsTelephone style={{ margin: '0 10px 0 0' }} /> 718-234-5678</text><br />
              <text><FiMail style={{ margin: '0 10px 0 0' }} /> antratalaviya@gmail.com</text><br />
              <text><FaLocationDot style={{ margin: '0 10px 0 0' }} /> Gujarat, India</text><br/>
              <text><a href='https://www.linkedin.com/in/antra-talaviya-7a3a16236'><BsLinkedin style={{ margin: '0 10px 0 0' , color : 'white'}}/></a>LinkedIn</text>
              <div className='c1icon'><AiFillFacebook style={{ margin: '5px 0 0 0' }} /><AiOutlineTwitter style={{ margin: '5px 0 0 10px' }} /><AiFillInstagram style={{ margin: '5px 0 0 10px' }} /><AiOutlineYoutube style={{ margin: '5px 0 0 10px' }} /></div>
            </div>
          </div>
          <div className='contactb2'>
            <div className='contact-form'>
              <form>  
                <label>Name :</label>  
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
                <label>Email :</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)} />
                <label>Message : </label>
                <textarea
                  type="text"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)} />
                <button type="submit" onClick={handleMail}>Send Message</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default Contact
