import React from 'react'
import Layout from '../../components/Layout/Layout'

const PageNotFound = () => {
  return (
    <Layout title={'Page not found'}>
      <div className='container d-flex flex-column justify-content-center align-item-center'>
        <h2>OOPS !!!</h2>
        <h1>404</h1>
        <h4>Page Not Found</h4>
      </div>
    </Layout>
  )
}

export default PageNotFound
