import React, { useEffect, useState } from 'react'
import Layout from '../../components/Layout/Layout'
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { Checkbox, Radio } from 'antd';
import { Price } from '../../components/Layout/Price'
import { Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../../context/cart';
import {AiOutlineReload} from 'react-icons/ai'
const Homepage = () => {
  const [cart, setCart] = useCart();
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [checked, setChecked] = useState([]);
  const [radio, setRadio] = useState([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const getAllProducts = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(`${process.env.REACT_APP_API}/api/v1/product/product-list/${page}`);
      setLoading(false);
      if (data?.success) {
        setProducts(data.product)
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      setLoading(false);
      toast.error("Something went wrong")
    }
  }
  useEffect(() => {
    getAllProducts();
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (page === 1) return;
    loadMore();
    // eslint-disable-next-line
  }, [page])
  // load more 
  const loadMore = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(`${process.env.REACT_APP_API}/api/v1/product/product-list/${page}`);
      setLoading(false)
      setProducts([...products, ...data?.product]);
    } catch (error) {
      setLoading(false);
      toast.error("Something went wrong")
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
    if (!checked.length || !radio.length)
      getAllCategory();
    totalProduct();
  }, [checked.length, radio.length]);

  useEffect(() => {
    if (checked.length || radio.length) filterProduct();
    // eslint-disable-next-line
  }, [checked, radio])

  // filter product
  const filterProduct = async () => {
    try {
      const { data } = await axios.post(`${process.env.REACT_APP_API}/api/v1/product/product-filter`,
        { checked, radio });
      if (data?.success) {
        setProducts(data.product);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error("Something went wrong");
    }
  }
  //checked category
  const handleChecked = (value, id) => {
    let all = [...checked];
    if (value) {
      all.push(id);
    } else {
      all = all.filter(c => c !== id);
    }
    setChecked(all);
  }
  // total product
  const totalProduct = async () => {
    try {
      const { data } = await axios.get(`${process.env.REACT_APP_API}/api/v1/product/product-total`);
      if (data?.success) {
        setTotal(data.total);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error("Something went wrong");
    }
  } 
  return (
    <Layout title={'Shop now - Ecommerce app'}>
      <div className='container-fluid hero'>
        <div className='eimg'></div>
        <h1>ECOMMERCE</h1>
      </div>
      <div className="container-fluid pt-3 herop">
        <div className="row">
          <div className="col-md-3 p-3 filter">
            <div className='d-flex flex-column pb-3'>
              <h4>Filter by Category</h4><hr/>
              {categories?.map((c) => (
                <Checkbox key={c._id} onClick={(e) => handleChecked(e.target.checked, c._id)}>{c.name}</Checkbox>
              ))}
            </div>
            <div className='d-flex flex-column'>
              <h4>Filter by Price</h4><hr/>
              <Radio.Group className='d-flex flex-column' onChange={(e) => setRadio(e.target.value)}>
                {Price?.map((p) => (
                  <Radio key={p._id} value={p.array}>{p.name}</Radio>
                ))}
              </Radio.Group>
            </div>
            <div className='pt-3 d-flex align-item-center flex-column'>
              <Button className='reset' onClick={() => window.location.reload()}>Reset filter</Button>
            </div>
          </div>
          <div className="col-md-9 w-75 paddinghprod text-center hprod">
            <h3>All products</h3><hr/>
            <div className="card-group">
              {products?.map((p) => (
                <div className='product-link me-2 mb-2'  key={p._id}>
                  <div className="card" style={{ width: '18rem' }}>
                    <img src={p.image[0].url}
                      className="card-img-top"
                      alt={p.name} />
                    <div className="card-body">
                      <h5 className="card-title text-start">{p.name}</h5>
                      <div className='row d-flex'>
                      <p className="card-text col-md-7 text-start">{p.description.substring(0, 30)}...</p>
                      <p className='card-text col-md-5 text-end price'>₹ {p.price}.00</p>
                      </div>
                      <Button variant='primary' className='more' onClick={() => navigate(`/product/${p.slug}`)}>More Details</Button>
                      <Button
                        variant='dark'
                        className='ms-2'
                        onClick={() => {
                          setCart([...cart, p]);
                          localStorage.setItem('cart', JSON.stringify([...cart, p]));
                          toast.success("Item added to Cart")
                        }}
                      >
                        Add to cart</Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className='m-2 p-3'>
              {products && products.length < total &&
                <Button className='load'
                  onClick={(e) => {
                    e.preventDefault();
                    setPage(page + 1);
                  }}>{loading ? 'Loading...' : 'Load More'} <AiOutlineReload/> 
                </Button>}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default Homepage
