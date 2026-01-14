import React from 'react'
import Home from './Pages/Home/Home'
import { Route, Routes } from 'react-router-dom'
import Navbar from './Components/Navbar/Navbar'
import './assets/Css/Style.css'
import Cursor from './Components/Cursor/Cursor'
import SecondaryNavbar from './Components/Navbar/ScondaryNavbar'
import Contact from './Pages/Contact/Contact'
import PerformanceOverview from './Pages/PerformanceOverview/PerformanceOverview'
import Careers from './Pages/Career/Career'
import SellerProfile from './Pages/SellerProfile/SellerProfile'
import ProductDetail from './Pages/ProductDetail/ProductDetail'
import ShopAllFootwear from './Components/ShopAllFootwear'
import CustomerProductPage from './Pages/Customer/Customer'
import EmployeeConsole from './Pages/Employee/Employee'
import Signup from './Pages/Signup/Signup'

const App = () => {
  return (
    <div>
      <Cursor />
      <Navbar />
      <SecondaryNavbar/>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/performanceoverview" element={<PerformanceOverview />} />
        <Route path="/career" element={<Careers />} />
        <Route path="/sellerProfile" element={<SellerProfile />} />
        <Route path="/SellerProfile/:id" element={<ProductDetail />} />
        <Route path="/customer" element={<CustomerProductPage />} />
        <Route path="/shop-all" element={<ShopAllFootwear />} />
        <Route path="/employee" element={<EmployeeConsole />} />
      </Routes>
    </div>
  )
}

export default App
