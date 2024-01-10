import React from 'react'
import Layout from '../../components/Layout/Layout'
import useCategory from '../../hooks/useCategory'
import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const Categories = () => {
    const categories = useCategory();
    return (
        <Layout title={'Ecommerce - All Categories'}>
            <div className="container-fluid catbox allcontainer">
                <div className="center">
                {categories?.map((c) => (
                    <div className="mt-3 mb-3 catboxind">
                    <Link to={`/category/${c.slug}`} key={c._id}>
                        <Button className='btn-cat'>{c.name}</Button>
                    </Link>
                    </div>
                ))}
                </div>
            </div>
        </Layout>
    )
}

export default Categories
