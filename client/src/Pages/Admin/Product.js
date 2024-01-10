import React, { useEffect, useState } from 'react'
import Layout from '../../components/Layout/Layout'
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { Link } from 'react-router-dom';
import AdminManu from '../../components/Layout/AdminManu';

const Product = () => {
    const [products, setProducts] = useState([]);
    const getAllProducts = async () => {
        try {
            const { data } = await axios.get(`${process.env.REACT_APP_API}/api/v1/product/get-product`)
            if (data?.success) {
                setProducts(data.product)
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            toast.error("Something went wrong")
        }
    }

    useEffect(() => {
        getAllProducts();
    }, []);
    return (
        <Layout title={"Ecommerce - All Products"}>
            <div className="container-fluid pt-3">
                <div className="row">
                    <div className="col-md-3 text-center userboard">
                        <h4>Admin Panel</h4>
                        <AdminManu />
                    </div>
                    <div className="col-md-9 w-75 padding-aprod aprod">
                        <div className='w-100'>
                            <h3>All products</h3><hr />
                        </div>
                        <div className="card-group">
                            {products.map((p) => (
                                <Link to={`/dashboard/admin/product/${p.slug}`} className='product-link me-2 mb-2'>
                                    <div className="card" style={{ width: '18rem' }} key={p._id}>
                                        <img src={p.image[0].url}
                                            className="card-img-top"
                                            alt={p.name}
                                            height={'70%'} />
                                        <div className="card-body">
                                            <h5 className="card-title">{p.name}</h5>
                                            <div className='row d-flex'>
                                                <p className="card-text col-md-7 text-start">{p.description.substring(0, 30)}...</p>
                                                <p className='card-text col-md-5  text-end price'>₹ {p.price}.00</p>
                                            </div>
                                        </div>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    )
}

export default Product
