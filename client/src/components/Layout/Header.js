import React from 'react'
import { NavLink, Link } from 'react-router-dom'
import { GiShoppingBag } from 'react-icons/gi'
import { useAuth } from '../../context/auth'
import toast, { Toaster } from 'react-hot-toast'
import SearchInput from '../../Pages/Form/SearchInput'
import useCategory from '../../hooks/useCategory'
import { useCart } from '../../context/cart'
import { Badge } from 'antd'

const Header = () => {
  const [auth, setAuth] = useAuth();
  const [cart] = useCart();
  const categories = useCategory();

  const handleLogout = () => {
    setAuth({
      ...auth,
      user: null,
      token: ""
    })
    localStorage.removeItem("auth");
    toast.success("Logout successfully")
  }
  return (
    <>
      <nav className="navbar navbar-expand-lg bg-body-tertiary">
        <div className="container-fluid">
          <Link to='/' className="navbar-brand"><GiShoppingBag /> Ecommerce App</Link>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon" />
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <div className='searchContain'>
              <SearchInput />
            </div>
            <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <NavLink to='/' className="nav-link active" aria-current="page">Home</NavLink>
              </li>
              <li className="nav-item dropdown">
                <Link className="nav-link dropdown-toggle" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                  Categories
                </Link>
                <ul className="dropdown-menu categorybox">
                  <li>
                    <Link to={`/categories`} className="dropdown-item">All categories
                    </Link>
                  </li>
                  {categories?.map((c) => (
                    <li key={c._id}>
                      <Link to={`/category/${c.slug}`} className="dropdown-item">{c.name}
                      </Link>
                    </li>
                  ))}
                </ul> 
              </li>
              {!auth?.user ? (
                <><li className="nav-item">
                  <NavLink to='/register' className="nav-link">Register</NavLink>
                </li>
                  <li className="nav-item">
                    <NavLink to='/login' className="nav-link">Login</NavLink>
                  </li>
                </>
              ) : (
                <>
                  <div>
                    <li className="nav-item dropdown">
                      <NavLink className="nav-link dropdown-toggle" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                        {auth?.user?.name}
                      </NavLink>
                      <ul className="dropdown-menu hdrop">
                        <li><NavLink to={`/dashboard/${auth?.user?.role === 1 ? "admin" : "user"}`}
                          className="dropdown-item" >Dashboard</NavLink>
                        </li>
                        <li>
                          <NavLink to='/login' onClick={handleLogout} className="dropdown-item">Logout</NavLink>
                        </li>
                      </ul>
                    </li>
                  </div>
                </>
              )}
              <li className="nav-item cartbadge">
                <Badge className='nav-item' count={cart.length}>
                  <NavLink to='/cart' className="nav-link">Cart</NavLink>
                </Badge>
              </li>
            </ul>
          </div>
        </div>
      </nav>
      <Toaster />
    </>
  )
}

export default Header
