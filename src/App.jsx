import { useState,useContext } from 'react'

import './App.css'

import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Category from './component/Category';
import Navbar from './component/Navbar';
import Login from './component/Login';
import {UserContext} from "./Context"
import Register from './component/Register';
import Cart from './component/Cart';
import Address from './component/Address';
import MultiAddress from './component/MultiAddress';
import Delivery from './component/Delivery';
import Payment from './component/stripe/Payment';
import Ordered from './component/Ordered';
function App() {
  const value = useContext(UserContext);
  return (
    <>    
    
    
    
    {value.connect && <Navbar/>}
    <Routes>
        {!value.connect && <Route path="/*" element={<Login/>} />}
        {value.connect &&   <Route  path="/product/category/:id" element={<Category/>} />}
        {value.connect &&   <Route  path="/product/category/parent/:id" element={<Category/>} />}
        {value.connect &&   <Route  path="/product/category/search/:id" element={<Category/>} />}
        {value.connect &&   <Route  path="/cart" element={<Cart/>} />}
        {value.connect &&   <Route  path="/checkout" element={<Delivery/>} />}
        {value.connect &&   <Route  path="/ordered" element={<Ordered/>} />}

        {value.connect &&   <Route  path="/payment" element={<Payment/>} />}
        {value.connect &&   <Route  path="/address" element={<Address/>} />}
        {value.connect &&   <Route  path="/address/new" element={<MultiAddress/>} />}
        
        <Route path="/users/new" element={<Register/>} />
        </Routes>
     
    
     </>
  )
}

export default App
