import './App.css';
import About from './Pages/user/About';
import Contact from './Pages/user/Contact';
import Homepage from './Pages/user/Homepage';
import { Routes, Route } from 'react-router-dom';
import PageNotFound from './Pages/user/PageNotFound';
import Register from './Pages/Auth/Register';
import Login from './Pages/Auth/Login';
import ForgetPassword from './Pages/Auth/ForgetPassword';
import PrivateRoute from './Routes/Private';
import Dashboard from './Pages/user/Dashboard';
import AdminRoute from './Routes/AdminRoute';
import AdminDashboard from './Pages/Admin/AdminDashboard';
import CreateCategory from './Pages/Admin/CreateCategory';
import CreateProduct from './Pages/Admin/CreateProduct';
import Users from './Pages/Admin/Users';
import Profile from './Pages/user/profile';
import Product from './Pages/Admin/Product';
import { Toaster } from 'react-hot-toast';
import UpdateProduct from './Pages/Admin/UpdateProduct';
import SearchResult from './Pages/user/SearchResult';
import ProductDetails from './Pages/user/ProductDetails';
import Categories from './Pages/user/Categories';
import CategoryProduct from './Pages/user/CategoryProduct';
import CartPage from './Pages/user/CartPage';


function App() {
  return (
    <>  
      <Routes>
        <Route path='/' element={<Homepage />} />
        <Route path='/search' element={<SearchResult />} />
        <Route path='/product/:slug' element={<ProductDetails />} />
        <Route path='/categories' element={<Categories />} />
        <Route path='/category/:slug' element={<CategoryProduct />} />
        <Route path='/dashboard' element={<PrivateRoute />}>
          <Route path='user' element={<Dashboard />}/>
          <Route path='user/profile' element={<Profile/>}/>
        </Route>
        <Route path='/dashboard' element={<AdminRoute />}>
          <Route path='admin' element={<AdminDashboard />} />
          <Route path='admin/create-category' element={<CreateCategory />} />
          <Route path='admin/create-product' element={<CreateProduct />} />
          <Route path='admin/product/:slug' element={<UpdateProduct />} />
          <Route path='admin/product' element={<Product />} />
          <Route path='admin/users' element={<Users />} />
        </Route>
        <Route path='/register' element={<Register />} />
        <Route path='/login' element={<Login />} />
        <Route path='/forget-password' element={<ForgetPassword />} />
        <Route path='/about' element={<About />} />
        <Route path='/contact' element={<Contact />} />
        <Route path='/cart' element={<CartPage />} />
        <Route path='*' element={<PageNotFound />} />
      </Routes>
      <Toaster/>
    </>
  );
}

export default App;
