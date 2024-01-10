import React from 'react'
import { Link } from 'react-router-dom'

const Footer = () => {
  return (
    <div className='footer'>
        <h1 className='text-center'>All right Reserve</h1>
        <p className='text-center'>
          <Link to='/about'>About</Link>|<Link to='/contact'>Contact</Link>
        </p>
    </div>
  )
}

export default Footer
