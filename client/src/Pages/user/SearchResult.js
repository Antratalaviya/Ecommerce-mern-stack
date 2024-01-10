import React from 'react'
import Layout from '../../components/Layout/Layout'
import { useSearch } from '../../context/search'
import { Button } from 'react-bootstrap';
import { useCart } from '../../context/cart';
import { toast } from 'react-hot-toast';

const SearchResult = () => {
    const [values] = useSearch();
    const [cart, setCart] = useCart();
    return (
        <Layout title={`Ecommerce - ${values?.keyword}`}>
            <div className="container searchb">
                <div className="text-center d-flex flex-column">
                    <h1>Search Results</h1>
                    <h6>
                        {values?.results.length < 1 ?
                            'No Product Found' :
                            `Found : ${values?.results.length}`}
                    </h6>
                    <div className="card-group mt-3 searchcard">
                        {values?.results.map((p) => (
                            <div className='product-link me-2 mb-2'>
                                <div className="card" style={{ width: '18rem' }} key={p._id}>
                                    <img src={p.image[0].url}
                                        className="card-img-top"
                                        alt={p.name} />
                                    <div className="card-body">
                                        <h5 className="card-title">{p.name}</h5>
                                        <div className='row d-flex'>
                                            <p className="card-text col-md-8 text-start">{p.description.substring(0, 30)}...</p>
                                            <p className='card-text col-md-4 price text-end'>₹ {p.price}.00</p>
                                        </div>
                                        <Button variant='primary'>More Details</Button>
                                        <Button 
                                        variant='dark' 
                                        className='ms-2' 
                                        onClick={()=>{
                                            setCart([...cart, p]);
                                            localStorage.setItem('cart', JSON.stringify([...cart, p]));
                                            toast.success('Item added to Cart');
                                        }}
                                        >Add to cart</Button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </Layout>
    )
}
export default SearchResult