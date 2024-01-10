import React from 'react'
import Layout from '../../components/Layout/Layout'
import { useAuth } from '../../context/auth'
import { useCart } from '../../context/cart';
import { Button } from 'react-bootstrap';
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

const CartPage = () => {
    const [auth] = useAuth();
    const navigate = useNavigate();
    const [cart, setCart] = useCart();

    const totalPrice = () => {
        try {
            let total = 0;
            cart?.map((c) => (
                total = total + c.price
            ));
            return total;
        } catch (error) {
            toast.error('SOmething Went Wrong')
        }
    }

    const handleRemove = (pid) => {
        try {
            let myCart = [...cart];
            let index = myCart.findIndex((item => item._id === pid));
            myCart.splice(index, 1);
            setCart(myCart);
            localStorage.setItem('cart', JSON.stringify(myCart))
        } catch (error) {
            toast.error('Something went wrong');
        }
    }
    return (
        <Layout title={'Ecommerce - Cart Item'}>
            <div className="container cartb ">
                <div className="row">
                    <div className="col-md-12 text-center">
                        <h1 className='carth'>
                            {`Hello ${auth?.token && auth?.user?.name}`}<hr />
                        </h1>
                        <h4 className='text-center'>
                            {cart?.length > 0 ? `You have ${cart?.length} Item in Cart ${auth?.token ? '' : 'Please login to check out'}` : `You don't have any item`}
                        </h4>
                    </div>
                    <div className="row mt-3 d-flex cartbox">
                        <div className="col-md-8">
                            {cart?.map((p) => (
                                <div className="d-flex justify-content-center align-item-center cartprod">
                                    <div className="card col-md-4" style={{ width: '18rem' }} key={p._id}>
                                        <img src={p?.image[0].url} className="card-img-top" alt="product_img" />
                                    </div>
                                    <div className="pt-3 ps-3 col-md 4">
                                        <h6>Name : {p?.name}</h6>
                                        <h6>Description :</h6><p>{p?.description}</p>
                                        <h6>Price : ₹ {p?.price}</h6>
                                        <h6>Category : {p?.category?.name}</h6>
                                        <Button variant='danger' className='btn-remove' onClick={() => handleRemove(p._id)}>Remove</Button>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div className="col-md-4 cartside">
                            <h2>Cart Summary</h2>
                            <p>Total || Checkout || Payment</p>
                            <hr />
                            <h4>Total : ₹ {totalPrice()}</h4>
                            {auth?.user?.address ? (
                                <>
                                    <div className="mb-3 text-center">
                                        <h4>Current address</h4>
                                        <h5>{auth?.user?.address}</h5>
                                        <button
                                            className='btn-add'
                                            onClick={() =>navigate('/dashboard/user/profile')}
                                        >
                                            Update Address
                                        </button>
                                    </div>
                                </>
                            ) : (
                                <div className="mb-3">
                                    {auth?.token ? (
                                        <button
                                            className='btn-add'
                                            onClick={() => navigate('/dashboard/user/profile')}
                                        >
                                            Update Address
                                        </button>
                                    ) : (
                                        <button
                                            className='btn-add'
                                            onClick={() => navigate('/login', {state : '/cart'})}
                                        >
                                            Please login to Checkout
                                        </button>
                                    )}
                                </div>
                            )}
                        </div>
                    </div>
                    <hr />
                </div>
            </div>
        </Layout>
    )
}

export default CartPage
