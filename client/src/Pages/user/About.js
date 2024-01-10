import React from 'react'
import Layout from '../../components/Layout/Layout'

const About = () => {
  return (
    <Layout title={'About - Ecommerce'}>
      <div className='aboutcontainer allcontainer'>
        <div className='aboutbox2'>
          <div className='aboutbox1'>
            <h1>About Us</h1>
            <p>Welcome to eCommerce application, your one-stop<br /> destination for sustainable and stylish home products<br /> that help you create an eco-friendly and beautiful<br /> living space. We believe that small changes<br /> can make a big impact, and that's why<br /> we're dedicated to offering high-quality,<br /> environmentally-conscious products that elevate<br /> your home while minimizing your carbon footprint.</p>
          </div>
          <div className='img'></div>
        </div>
      </div>
    </Layout>
  )
}

export default About
