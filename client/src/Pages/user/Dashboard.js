import React from 'react'
import Layout from '../../components/Layout/Layout'
import { useAuth } from '../../context/auth'
import UserMenu from '../../components/Layout/UserMenu';

const Dashboard = () => {
  const [auth] = useAuth();
  return (
    <Layout title={'Ecommerce - User Dashboard'}>
      <div className="container-fluid userdash">
          <div className="row">
            <div className="col-md-3 text-center mt-3 userboard">
              <h4>User Dashboard</h4><hr/>
              <UserMenu />
            </div>
            <div className="col-md-9">
              <div className="card w-75 p-3 mt-3 usercard">
                <h3>Name : {auth?.user?.name}</h3><hr/>
                <h3>Email : {auth?.user?.email}</h3><hr/>
                <h3>Contact : {auth?.user?.phone}</h3><hr/>
              </div>
            </div>
          </div>
        </div>
    </Layout>
  )
}

export default Dashboard
