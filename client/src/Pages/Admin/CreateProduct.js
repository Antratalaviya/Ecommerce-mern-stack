import React, { useEffect, useState } from 'react'
import AdminManu from '../../components/Layout/AdminManu'
import Layout from '../../components/Layout/Layout'
import { Select } from 'antd'
import toast from 'react-hot-toast';
import axios from 'axios';
import { Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
const { Option } = Select;

const CreateProduct = () => {
  const [categories, setCategories] = useState([]);
  const [image, setImage] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState("");
  const [quantity, setQuantity] = useState("");
  const [shipping, setShipping] = useState("");
  const navigate = useNavigate();

  // create product
  const handleCreate = async (e) => {
    e.preventDefault();
    const productData = new FormData();
    productData.append('name', name);
    productData.append('description', description);
    productData.append('category', category);
    productData.append('price', price);
    productData.append('quantity', quantity);
    productData.append('shipping', shipping);
    productData.append('file', image);

    try {
      const { data } = await axios.post(`${process.env.REACT_APP_API}/api/v1/product/create-product`,
        productData)
      if (data?.success) {
        toast.success(data.message);
        navigate('/dashboard/admin/product')
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error('Somthing went wrong');
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

  useEffect(() => {
    getAllCategory();
  }, []);
  return (
    <Layout title={'Ecommerce - create Product'}>
      <div className="container-fluid p-3 allcontainer">
        <div className="row">
          <div className="col-md-3 text-center userboard">
            <h4>Admin Panel</h4>
            <AdminManu />
          </div>
          <div className="col-md-9 w-75 p-3 acprod">
            <h3>Create Product</h3><hr/>
            <div className='m-1 w-75 adprod'>
              <Select
                bordered={false}
                placeholder="Select Category"
                className='form-select mb-3'
                onChange={(value) => setCategory(value)}
              >
                {categories?.map((c) => (
                  <Option key={c._id}>{c.name}</Option>
                ))}
              </Select>
              <div className="mb-3">
                <label className="btn btn-outline-secondary col-md-12">
                  {image ? image.name : "Upload Image"}
                  <input
                    type="file"
                    name='image'
                    accept='image/*'
                    onChange={(e) => setImage(e.target.files[0])}
                    hidden />
                </label>
              </div>
              <div className='mb-3'>
                {image && (
                  <div className='text-center'>
                    <img
                      src={URL.createObjectURL(image)}
                      alt='product_img'
                      height={'200px'}
                      className='img img-responsive'>
                    </img>
                  </div>
                )}
              </div>

              <div className="mb-3">
                <input
                  type="text"
                  value={name}
                  className="form-control"
                  placeholder="Enter Product name"
                  onChange={(e) => setName(e.target.value)} />
              </div>
              <div className="mb-3">
                <textarea
                  className="form-control"
                  rows={3}
                  defaultValue={""}
                  value={description}
                  placeholder="Enter Product description"
                  onChange={(e) => setDescription(e.target.value)} />
              </div>
              <div className="mb-3">
                <input
                  type="number"
                  value={price}
                  className="form-control"
                  placeholder="Enter Product price"
                  onChange={(e) => setPrice(e.target.value)} />
              </div>
              <div className="mb-3">
                <input
                  type="number"
                  value={quantity}
                  className="form-control"
                  placeholder="Enter Product quantity"
                  onChange={(e) => setQuantity(e.target.value)} />
              </div>
              <Select
                bordered={false}
                placeholder="Select Shipping"
                className='form-select mb-3'
                onChange={(value) => setShipping(value)}
              >
                <Option value='0'>No</Option>
                <Option value='1'>Yes</Option>
              </Select>
              <div className="mb-3">
                <Button variant='success' onClick={handleCreate}>CREATE PRODUCT</Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default CreateProduct
