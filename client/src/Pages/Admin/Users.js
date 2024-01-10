import React, { useEffect, useState } from 'react'
import AdminManu from '../../components/Layout/AdminManu'
import Layout from '../../components/Layout/Layout'
import axios from 'axios';
import { toast } from 'react-hot-toast';

const Users = () => {
  const [users, setUsers] = useState([]);
  const getUser = async () => {
    try {
      const { data } = await axios.get(`${process.env.REACT_APP_API}/api/v1/auth/all-user`);
      setUsers(data?.users);
    } catch (error) {
      toast.error('Something went wrong');
    }
  }

  useEffect(() => {
    getUser();
    // eslint-disable-next-line
  }, [])
  return (
    <Layout title={"Ecommerce - all Users"}>
      <div className="container-fluid p-3 auserb allcontainer">
        <div className="row">
          <div className="col-md-3 text-center userboard">
            <h4>Admin Panel</h4>
            <AdminManu />
          </div>
          <div className="col-md-9 w-75 p-3 auser userboard">
            <h3>All Users</h3><hr />
            <table class="table">
              <thead>
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">name</th>
                  <th scope="col">email</th>
                  <th scope="col">phone</th>
                  <th scope="col">address</th>
                </tr>
              </thead>
              {users?.map((u, i) => (
                <tbody>
                  <tr>
                    <th scope="row">{i + 1}</th>
                    <td>{u.name}</td>
                    <td>{u.email}</td>
                    <td>{u.phone}</td>
                    <td>{u.address}</td>
                  </tr>
                </tbody>
              ))}
            </table>
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default Users
