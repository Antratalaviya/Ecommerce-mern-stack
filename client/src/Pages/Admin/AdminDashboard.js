import React from 'react'
import Layout from '../../components/Layout/Layout'
import AdminManu from '../../components/Layout/AdminManu'
import { useAuth } from '../../context/auth'

const AdminDashboard = () => {
  const [auth] = useAuth();
  return (
    <Layout title={'Ecommerce - Admin Dashboard'}>
      <div className="container-fluid p-3 userdash">
        <div className="row">
          <div className="col-md-3 text-center userboard">
            <h4>Admin Panel</h4>
            <AdminManu/>
          </div>
          <div className="col-md-9 userdetail">
            <div className="card w-75 p-3 mt-3 usercard">
              <h3>Admin Name : {auth?.user?.name}</h3><hr/>
              <h3>Admin Email : {auth?.user?.email}</h3><hr/>
              <h3>Admin Contact : {auth?.user?.phone}</h3><hr/>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default AdminDashboard
