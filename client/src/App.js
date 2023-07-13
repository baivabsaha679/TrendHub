import './App.css';
import {Routes, Route } from 'react-router-dom';
import Home from './Pages/Home';
import About from './Pages/About';
import Contact from './Pages/Contact';
import Policy from './Pages/Policy';
import PageNotFound from './Pages/PageNotFound';
import Register from './Pages/User/Register';
import Login from './Pages/User/Login';
import Dashboard from './Pages/User/Dashboard';
import PrivateRoute from './components/Routes/PrivateRoute';
import ForgotPassword from './Pages/User/ForgotPassword';
import AdminRoute from './components/Routes/AdminRoute';
import AdminDashboard from './Pages/Admin/AdminDashboard';
import Create_Category from './Pages/Admin/Create_Category';
import Create_Product from './Pages/Admin/Create_Product';
import Users from './Pages/Admin/Users';
import Profile from './Pages/User/Profile';
import Orders from './Pages/User/Orders';
import Products from './Pages/Admin/Products';
import UpdateProduct from './Pages/Admin/UpdateProduct';
import Search from './Pages/Search';
import ProductDetails from './Pages/ProductDetails';
import Categories from './Pages/Categories';
import CategoryProduct from './Pages/CategoryProduct';
import CartPage from './Pages/CartPage';
import AdminOrders from './Pages/Admin/AdminOrders';


function App() {
  return (
      <>
        <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path='/product/:slug' element={<ProductDetails/>}/>
          <Route path='/categories' element={<Categories/>}/>
          <Route path='/cart' element={<CartPage/>}/>
          <Route path='/category/:slug' element={<CategoryProduct/>}/>
          <Route path='/search' element={<Search/>}/>
          <Route path='/dashboard' element={<PrivateRoute/>}>
            <Route path='user' element={<Dashboard/>}/>
            <Route path='user/profile' element={<Profile/>}/>
            <Route path='user/orders' element={<Orders/>}/>
          </Route>
          <Route path='/dashboard' element={<AdminRoute/>}>
            <Route path='admin' element={<AdminDashboard/>}/>
            <Route path='admin/create-category' element={<Create_Category/>}/>
            <Route path='admin/create-product' element={<Create_Product/>}/>
            <Route path='admin/product/:slug' element={<UpdateProduct/>}/>
            <Route path='admin/products' element={<Products/>}/>
            <Route path='admin/users' element={<Users/>}/>
            <Route path='admin/orders' element={<AdminOrders/>}/>
          </Route>
          <Route path='/register' element={<Register/>}/>
          <Route path='/login' element={<Login/>}/>
          <Route path='/forgotPassword' element={<ForgotPassword/>}/>
          <Route path='/about' element={<About/>}/>
          <Route path='/contact' element={<Contact/>}/>
          <Route path='/policy' element={<Policy/>}/>
          <Route path='*' element={<PageNotFound/>}/>
        </Routes>
      </>
  )
}

export default App;
