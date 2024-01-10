import React, { useEffect, useState } from 'react'
import Layout from '../../components/Layout/Layout'
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import { Button } from 'react-bootstrap';
import axios from 'axios';
import { useCart } from '../../context/cart';

const CategoryProduct = () => {
    const [products, setProducts] = useState([]);
    const [cart, setCart] = useCart();
    const params = useParams();
    const navigate = useNavigate();
    // get category products
    const categoryProducts = async () => {
        try {
            const { data } = await axios.get(
                `${process.env.REACT_APP_API}/api/v1/product/category-product/${params.slug}`);
            setProducts(data?.product)
        } catch (error) {
            toast.error("Something went Wrong");
        }
    }

    useEffect(() => {
        categoryProducts();
        // eslint-disable-next-line
    }, [params.slug])
    return (
        <Layout title={`Ecommerce - ${params.slug}`}>
            {products?.length < 1 ? (<div className='catProd'><p>No category Products</p></div>) :
                <div className="card-group justify-content-center mt-5 catProdb allcontainer">
                    <div >
                        <h3>All {params.slug} Products</h3>
                        <hr />
                    </div>
                    <div className='d-flex justify-content-center align-item-center flex-wrap'> 
                        {products?.map((p) => (
                            <div className='product-link me-2 mb-2' key={p._id}>
                                <div className="card" style={{ width: '18rem' }}>
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
                                            localStorage.setItem('cart', [...cart, p]);
                                            toast.success('Item added to cart');
                                        }}
                                        >Add to cart</Button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            }
        </Layout>
    )
}

export default CategoryProduct
