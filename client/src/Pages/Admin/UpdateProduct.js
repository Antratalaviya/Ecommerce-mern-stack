import React, { useEffect, useState } from 'react'
import AdminManu from '../../components/Layout/AdminManu'
import Layout from '../../components/Layout/Layout'
import { Select } from 'antd'
import toast from 'react-hot-toast';
import axios from 'axios';
import { Button } from 'react-bootstrap';
import { useNavigate, useParams } from 'react-router-dom';
import {BiArrowBack} from 'react-icons/bi';
const { Option } = Select;

const UpdateProduct = () => {
    const params = useParams();
    const [id, setId] = useState('');
    const [categories, setCategories] = useState([]);
    const [image, setImage] = useState("");
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [category, setCategory] = useState("");
    const [price, setPrice] = useState("");
    const [quantity, setQuantity] = useState("");
    const [shipping, setShipping] = useState("");
    const [catname, setCatname] = useState("");
    const [ni, setI] = useState(false);
    const navigate = useNavigate();

    // get single product
    const getSingleProduct = async () => {
        try {
            const { data } = await axios.get(`${process.env.REACT_APP_API}/api/v1/product/get-product/${params.slug}`);
            if (data?.success) {
                setId(data.product._id);
                setName(data.product.name);
                setDescription(data.product.description);
                setCategory(data.product.category._id);
                setPrice(data.product.price);
                setQuantity(data.product.quantity);
                setShipping(data.product.shipping);
                setImage(data.product.image[0].url);
                setCatname(data.product.category)
            }
        } catch (error) {
            toast.error("Something went wrong");
        }
    }

    useEffect(() => {
        getSingleProduct();
        // eslint-disable-next-line
    }, [])

    // delete product
    const handleDelete = async (e) => {
        e.preventDefault();
        try {
            const { data } = await axios.delete(`${process.env.REACT_APP_API}/api/v1/product/delete-product/${id}`);
            if (data?.success) {
                toast.success(data.message);
                navigate("/dashboard/admin/product")
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            toast.error("Something went wrong");
        }
    }

    // create product
    const handleUpdate = async (e) => {
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
            const { data } = await axios.put(`${process.env.REACT_APP_API}/api/v1/product/update-product/${id}`,
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
        <Layout title={'Ecommerce - Update Product'}>
            <div className="container-fluid p-3">
                <div className="row">
                    <div className="col-md-3 text-center userboard">
                        <h4>Admin Panel</h4>
                        <AdminManu />
                    </div>
                    <div className="col-md-9 w-75 p-3">
                        <div className='back-icon'>
                            <BiArrowBack onClick={() => { navigate('/dashboard/admin/product') }} />
                        </div>
                        <h3>Update Product</h3>
                        <div className='m-1 w-75'>
                            <Select
                                bordered={false}
                                placeholder="Select Category"
                                className='form-select mb-3'
                                value={catname.name}
                                onChange={(value) => setCategory(value)}
                            >
                                {categories?.map((c) => (
                                    <Option key={c._id} >{c.name}</Option>
                                ))}
                            </Select>
                            <div className="mb-3">
                                <label className="btn btn-outline-secondary col-md-12">
                                    Upload Image
                                    <input
                                        type="file"
                                        name='image'
                                        accept='image/*'
                                        onChange={(e) => {
                                            setImage(e.target.files[0]);
                                            setI(true)
                                        }}
                                        hidden />
                                </label>
                            </div>
                            <div className='mb-3'>
                                {ni ? (
                                    <div className='text-center'>
                                        <img
                                            src={URL.createObjectURL(image)}
                                            alt='product_img'
                                            height={'200px'}
                                            className='img img-responsive'>
                                        </img>
                                    </div>
                                ) : (
                                    <div className='text-center'>
                                        <img
                                            src={image}
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
                                value={shipping ? 'Yes' : 'No'}
                                onChange={(value) => setShipping(value)}
                            >
                                <Option value='0'>No</Option>
                                <Option value='1'>Yes</Option>
                            </Select>
                            <div className="mb-3">
                                <Button variant='success' className='m-2' onClick={handleUpdate}>UPDATE PRODUCT</Button>
                                <Button variant='danger' className='m-2' onClick={handleDelete}>DELETE PRODUCT</Button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    )
}

export default UpdateProduct
