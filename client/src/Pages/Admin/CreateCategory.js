import React, { useEffect, useState } from 'react'
import Layout from '../../components/Layout/Layout'
import AdminManu from '../../components/Layout/AdminManu'
import toast from 'react-hot-toast'
import axios from 'axios'
import CategoryForm from '../Form/CategoryForm'
import UpdateCategory from '../Modal/UpdateCategory'

const CreateCategory = () => {
  const [categories, setCategories] = useState([]);
  const [name, setName] = useState("");

  //form control
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(`${process.env.REACT_APP_API}/api/v1/category/create-category`,
        { name });
      if (data?.success) {
        toast.success(`${name} is created`)
        getAllCategory();
      }
      else {
        toast.error(data.message)
      }
    } catch (error) {
      toast.error("Somthing went wrong");
    }
  }

  //get all category
  const getAllCategory = async () => {
    try {
      const { data } = await axios.get(`${process.env.REACT_APP_API}/api/v1/category/get-category`)
      if (data?.success) {
        setCategories(data.category);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error("Something went wrong")
    }
  }

  useEffect(()=>{
    getAllCategory();
    // eslint-disable-next-line
  },[])

  // delete category
  const handleDelete = async (name, id, e) => {
    e.preventDefault();
    try {
      const { data } = await axios.delete(`${process.env.REACT_APP_API}/api/v1/category/delete-category/${id}`);
      if (data?.success) {
        toast.success(`${name} is Deleted`);
        getAllCategory();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error("Something went wrong")
    }
  }

  return (
    <Layout title={'Ecommerce - creat Category'}>
      <div className="container-fluid p-3 allcontainer">
        <div className="row">
          <div className="col-md-3 text-center userboard">
            <h4>Admin Panel</h4>
            <AdminManu />
          </div>
          <div className="col-md-9 acprod">
            <h3>Manage Category</h3><hr/>
            <div className='w-75 acform'>
              <div>
                <CategoryForm handleSubmit={handleSubmit} value={name} setValue={setName} />
              </div>
              <table className="table">
                <thead>
                  <tr>
                    <th scope="col">Name</th>
                    <th scope="col">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {categories?.map((c) => (
                    <tr key={c._id}>
                      <td>{c.name}</td>
                      <td>
                        <UpdateCategory id={c._id} updatedname={c.name} getAllCategory={getAllCategory} />
                        <button className='btn btn-danger ms-2' onClick={(e) => handleDelete(c.name, c._id, e)}>Delete</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

          </div>
        </div>
      </div>
    </Layout>
  )
}

export default CreateCategory
