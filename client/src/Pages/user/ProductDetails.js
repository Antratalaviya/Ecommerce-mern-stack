import React, { useEffect, useState } from 'react'
import Layout from '../../components/Layout/Layout'
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import { Button } from 'react-bootstrap';
import { useCart } from '../../context/cart';

const ProductDetails = () => {
    const [product, setProduct] = useState();
    const [relatedProduct, setReletedProduct] = useState([]);
    const [cart, setCart] = useCart();
    const params = useParams();
    const navigate = useNavigate();

    const similarProduct = async (pid, cid) => {
        try {
            const { data } = await axios.get(
                `${process.env.REACT_APP_API}/api/v1/product/product-similar/${pid}/${cid}`);
            setReletedProduct(data?.product);
        } catch (error) {
            toast.error("Something went wrong");
        }
    }
    useEffect(() => {
        if (params?.slug) getProduct();
        // eslint-disable-next-line
    }, [params?.slug])
    // get single product
    const getProduct = async (req, res) => {
        try {
            const { data } = await axios.get(
                `${process.env.REACT_APP_API}/api/v1/product/get-product/${params.slug}`);
            setProduct(data?.product);
            similarProduct(data?.product?._id, data?.product?.category?._id)
        } catch (error) {
            toast.error("Something went wrong");
        }
    }

    return (
        <Layout title={`Ecommerce - ${params.slug}`}>
            <div className="container">
                <div className="row mt-3 d-flex">
                    <div className="col-md-6 d-flex justify-content-center align-item-center">
                        <div className="card" style={{ width: '18rem' }}>
                            <img src={product?.image[0].url} className="card-img-top" alt="product_img" />
                        </div>
                    </div>
                    <div className="col-md-6 cord-body pd">
                        <h1>Product Details</h1><hr/>
                        <h5>Name : {product?.name}</h5>
                        <h5>Description :</h5><p>{product?.description}</p>
                        <h5 className='price'>Price : ₹ {product?.price}</h5>
                        <h5>Category : {product?.category?.name}</h5>
                        <Button 
                        variant='dark' 
                        className='btn-pd'
                        onClick={()=>{
                            setCart([...cart, product]);
                            localStorage.setItem('cart', JSON.stringify([...cart, product]));
                            toast.success("Item added to cart");
                        }}
                        >Add to cart</Button>
                    </div>
                </div>
                <hr />
                <h5>Similar Products</h5>
                {relatedProduct?.length < 1 ? (<p>No Similar Products</p>) :
                    <div className="card-group justify-content-center">
                        {relatedProduct?.map((p) => (
                            <div className='product-link me-2 mb-2'>
                                <div className="card" style={{ width: '18rem' }} key={p._id}>
                                    <img src={p.image[0].url}
                                        className="card-img-top"
                                        alt={p.name}   
                                        height={'70%'} />
                                    <div className="card-body">
                                        <h5 className="card-title">{p.name}</h5>
                                        <div className='row d-flex'>
                                            <p className="card-text col-md-8 text-start">{p.description.substring(0, 30)}...</p>
                                            <p className='card-text col-md-4 price text-end'>₹ {p.price}.00</p>
                                        </div>
                                        <Button variant='primary' className='more' onClick={() => navigate(`/product/${p.slug}`)}>More Details</Button>
                                        <Button 
                                        variant='dark' 
                                        className='ms-2'
                                        onClick={()=>{
                                            setCart([...cart, p]);
                                            localStorage.setItem('cart', JSON.stringify('cart', [...cart, p]));
                                            toast.success('Item added to cart');
                                        }}
                                        >Add to cart</Button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                }
            </div>
        </Layout >
    )
}

export default ProductDetails
